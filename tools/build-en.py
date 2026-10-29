#!/usr/bin/env python3
"""日本語ページから英語ページ（en/*.html）を生成する。

使い方:
  python3 tools/build-en.py            # en/ を生成。未翻訳の文字列は i18n/_missing/ に書き出す
  python3 tools/build-en.py --check    # 生成せず、未翻訳の有無だけ確かめる（終了コード 1 = 未翻訳あり）

仕組み:
  - 辞書は i18n/common.json（全ページ共通）と i18n/<page>.json（ページ固有）。
    どちらも {"日本語": "English"} の平らな対応表。ページ固有が共通より優先。
  - 文章はテキストノード単位で置き換える。<br> や <span> で区切られた
    断片はそれぞれ独立した見出し語になる。
  - alt / placeholder / aria-label / title / meta description も置き換える。
  - <script> 内は、辞書に載っている文字列リテラルだけを置き換える。
  - 日本語ページの文言が変わると、その文字列は未翻訳として報告される。
    英語ページを直接編集せず、辞書を直してから再生成すること。
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
I18N = ROOT / "i18n"
OUT = ROOT / "en"
PAGES = ["index", "about", "people", "projects", "partnership",
         "recruit", "contact", "privacy-policy", "people-uno", "zen-bu", "radio", "riku"]
ASSET_EXT = r"(?:css|js|jpg|jpeg|png|svg|webp|ico|mp4|pdf)"
ATTRS = ("alt", "placeholder", "aria-label", "title", "content")

def load(name):
    p = I18N / f"{name}.json"
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}

def norm(s):
    return " ".join(s.split())

def translate_text(text, dic, missing):
    """テキストノードを翻訳。前後の空白はそのまま残す。"""
    core = norm(text)
    if not core:
        return text
    if core in dic:
        tr = dic[core]
        if tr == "":          # 空文字は「訳さずそのまま」
            return text
        lead = text[:len(text) - len(text.lstrip())]
        trail = text[len(text.rstrip()):]
        return lead + tr + trail
    if re.search(r"[ぁ-んァ-ン一-龥]", core):
        missing.setdefault(core, "")
    return text

def translate_tag(tag, dic, missing):
    def sub(m):
        name, q, val = m.group(1), m.group(2), m.group(3)
        if name == "content" and 'name="description"' not in tag and 'property="og:description"' not in tag:
            return m.group(0)
        core = norm(val)
        if core in dic and dic[core]:
            return f"{name}={q}{dic[core]}{q}"
        if re.search(r"[ぁ-んァ-ン一-龥]", core):
            missing.setdefault(core, "")
        return m.group(0)
    return re.sub(r'\b(' + "|".join(ATTRS) + r')=(["\'])(.*?)\2', sub, tag)

def rewrite_paths(tag, page):
    """en/ 配下から見たパスに直し、言語切替リンクを日本語側へ向ける。"""
    if 'class="lang-switch"' in tag:
        ja = "/" if page == "index" else f"/{page}"
        tag = re.sub(r'href="[^"]*"', f'href="{ja}"', tag)
        tag = tag.replace('hreflang="en"', 'hreflang="ja"').replace('lang="en"', 'lang="ja"')
        return tag
    # 共有アセット（CSS / JS / 画像）は一段上
    tag = re.sub(r'(href|src)="(?!https?:|/|\.\./|#|data:)([^"]+\.' + ASSET_EXT + r')(\?[^"]*)?"',
                 lambda m: f'{m.group(1)}="../{m.group(2)}{m.group(3) or ""}"', tag)
    # トップへのリンク
    tag = re.sub(r'href="/"', 'href="/en/"', tag)
    return tag

def translate_script(src, dic):
    for ja, en in dic.items():
        if en and ja in src:
            src = src.replace(ja, en)
    return src

def build(page, common, check_only=False):
    dic = {**common, **load(page)}
    html = (ROOT / f"{page}.html").read_text(encoding="utf-8")
    missing = {}
    out = []
    pos = 0
    # <script>…</script> と <style>…</style> は塊で扱う
    for m in re.finditer(r"<(script|style)\b[^>]*>.*?</\1>", html, flags=re.S):
        out.append(translate_chunk(html[pos:m.start()], dic, missing, page))
        block = m.group(0)
        out.append(translate_script(block, dic) if m.group(1) == "script" else block)
        out.append("")  # placeholder, keeps structure simple
        pos = m.end()
    out.append(translate_chunk(html[pos:], dic, missing, page))
    result = "".join(out)
    result = result.replace('<html lang="ja">', '<html lang="en">', 1)
    # <script src="design.js"> のパスも一段上に
    result = re.sub(r'(<script[^>]*src=")(?!https?:|/|\.\./)', r'\1../', result)
    result = re.sub(r'(<link[^>]*href=")(?!https?:|/|\.\./)([^"]+\.css)', r'\1../\2', result)
    # 英語専用の調整は、すべてのCSSより後ろで読み込む
    result = result.replace("</head>", '<link rel="stylesheet" href="../en.css?v=2">\n</head>', 1)
    if not check_only:
        OUT.mkdir(exist_ok=True)
        (OUT / f"{page}.html").write_text(result, encoding="utf-8")
    return missing

def translate_chunk(chunk, dic, missing, page):
    # 見出し語に "<" を含むものは、<br> や <span> をまたぐ言い回し。
    # ノード単位に分ける前に、HTML の文字列としてそのまま置き換える。
    for ja, en in dic.items():
        if "<" in ja and en and ja in chunk:
            chunk = chunk.replace(ja, en)
    parts = re.split(r"(<[^>]*>)", chunk)
    for i, part in enumerate(parts):
        if not part:
            continue
        if part.startswith("<"):
            if part.startswith("<!--"):
                continue
            parts[i] = rewrite_paths(translate_tag(part, dic, missing), page)
        else:
            parts[i] = translate_text(part, dic, missing)
    return "".join(parts)

def main():
    check = "--check" in sys.argv
    common = load("common")
    total = 0
    mdir = I18N / "_missing"
    for page in PAGES:
        missing = build(page, common, check)
        if missing:
            total += len(missing)
            if not check:
                mdir.mkdir(exist_ok=True)
                (mdir / f"{page}.json").write_text(
                    json.dumps(missing, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            print(f"{page:16s} 未翻訳 {len(missing):3d} 件")
        else:
            print(f"{page:16s} OK")
            if not check and (mdir / f"{page}.json").exists():
                (mdir / f"{page}.json").unlink()
    if total:
        print(f"合計 {total} 件が未翻訳。i18n/_missing/*.json を埋めて i18n/<page>.json に移すこと。")
        sys.exit(1)
    print("すべて翻訳済み。")

if __name__ == "__main__":
    main()
