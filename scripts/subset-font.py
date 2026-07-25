#!/usr/bin/env python3
"""
見出し用の明朝（Satsuki Gendai Mincho）をサブセット化する。

元ファイルは 16MB ある。日本語フォントは全字入れると必ずこの規模になるので、
サイトに実際に出てくる文字だけに絞ってから配信する。見出しに使う字数は
たかが知れているため、これで数百KB以下に落ちる。

出力は2種類:
  - woff2 … ブラウザ向け（next/font/local が読む）
  - ttf  … OG画像向け（Satori は woff2 を読めない）

コピーを追加・変更したら再実行すること:
    python3 scripts/subset-font.py

元フォントはリポジトリに入れていない（16MB あるため）。
再生成には Satsuki Gendai Mincho がインストールされている必要がある。
ライセンス: SIL Open Font License 1.1（埋め込み・サブセット化ともに許諾）
"""

from __future__ import annotations

import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "app" / "fonts"

SOURCE_CANDIDATES = [
    pathlib.Path.home() / "Library/Fonts/SatsukiGendaiMincho-M.ttf",
    pathlib.Path("/Library/Fonts/SatsukiGendaiMincho-M.ttf"),
]

# 文字を拾う対象。見出しに現れうる文字列はここに全部入っている。
SCAN_DIRS = ["content", "components", "app"]
SCAN_SUFFIXES = {".ts", ".tsx"}

# コピーに無くても、あとで足したくなる可能性が高いもの。
# ひらがな・カタカナ全域と英数記号は入れておく（合計しても軽い）。
ALWAYS = (
    "".join(chr(c) for c in range(0x3041, 0x3097))  # ひらがな
    + "".join(chr(c) for c in range(0x30A0, 0x30FB))  # カタカナ
    + "".join(chr(c) for c in range(0x0020, 0x007F))  # ASCII
    + "、。「」『』（）〈〉《》【】〔〕・…‥ー〜～－—–‐"
    + "！？：；，．／＼＆％＃＠＊＋＝＜＞｜"
    + "０１２３４５６７８９"
    + "℃±×÷≒≦≧∞→←↑↓↗↘♪§¶†‡©®™"
)


def collect_chars() -> set[str]:
    chars: set[str] = set(ALWAYS)
    files = 0
    for d in SCAN_DIRS:
        for path in (ROOT / d).rglob("*"):
            if path.suffix in SCAN_SUFFIXES and path.is_file():
                chars.update(path.read_text(encoding="utf-8"))
                files += 1
    print(f"  走査したファイル: {files}")
    # 制御文字は不要
    return {c for c in chars if c.isprintable() and not c.isspace()}


def find_source() -> pathlib.Path:
    for p in SOURCE_CANDIDATES:
        if p.exists():
            return p
    sys.exit(
        "元フォントが見つかりません。Satsuki Gendai Mincho をインストールするか、\n"
        "SOURCE_CANDIDATES にパスを追加してください。\n"
        "探した場所:\n  " + "\n  ".join(str(p) for p in SOURCE_CANDIDATES)
    )


def subset(source: pathlib.Path, chars: set[str], flavor: str, out: pathlib.Path) -> None:
    cmd = [
        sys.executable,
        "-m",
        "fontTools.subset",
        str(source),
        f"--text={''.join(sorted(chars))}",
        f"--output-file={out}",
        # 縦書きや約物詰めに使う機能は残す。palt を落とすと日本語の
        # 約物アキが詰まらず、見出しの字面が間延びする。
        "--layout-features=kern,liga,palt,vert,vrt2,halt",
        "--no-hinting",
        "--desubroutinize",
        "--drop-tables+=DSIG",
    ]
    if flavor:
        cmd.append(f"--flavor={flavor}")
    subprocess.run(cmd, check=True)


def main() -> None:
    source = find_source()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"元フォント: {source} ({source.stat().st_size / 1_048_576:.1f} MB)")
    chars = collect_chars()
    print(f"  収録する文字数: {len(chars)}")

    targets = [
        ("woff2", OUT_DIR / "SatsukiGendaiMincho-subset.woff2"),
        ("", OUT_DIR / "SatsukiGendaiMincho-subset.ttf"),  # OG画像用
    ]
    for flavor, out in targets:
        subset(source, chars, flavor, out)
        print(f"  → {out.relative_to(ROOT)}  {out.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
