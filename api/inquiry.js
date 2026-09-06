// お問い合わせフォーム（contact.html）を受け取り、Resend 経由で official@zen-bu.co へ送る。
//
// 応募フォーム（api/contact.js）とは項目も件名も違うので別の窓口にしている。
// 依存パッケージを増やさずに済むよう、SDK ではなく Resend の REST API を直接呼ぶ。
// 認証情報は Vercel の環境変数（RESEND_API_KEY / RESEND_EMAIL_DOMAIN）から読む。

const crypto = require('crypto');

const TO = 'official@zen-bu.co';

const ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ESCAPE[c]);

// 受け取った値は必ずエスケープしてから本文へ入れる
const row = (label, value) =>
  '<tr>' +
  '<td style="padding:7px 16px 7px 0;color:#6A6A5D;white-space:nowrap;vertical-align:top">' + esc(label) + '</td>' +
  '<td style="padding:7px 0;color:#1A1A16">' + (esc(value) || '—') + '</td>' +
  '</tr>';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const get = (k) => String(b[k] == null ? '' : b[k]).trim();

  const name    = get('name');
  const email   = get('email');
  const intro   = get('intro');
  const subject = get('subject');
  const message = get('message');

  // ボットよけ。人には見えない項目が埋まっていたら、成功を装って捨てる
  if (get('website')) return res.status(200).json({ ok: true });

  const missing = [];
  if (!name) missing.push('name');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) missing.push('email');
  if (!subject) missing.push('subject');
  if (!message) missing.push('message');
  if (missing.length) {
    return res.status(400).json({ ok: false, error: 'invalid_input', fields: missing });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!apiKey || !domain) {
    console.error('inquiry: RESEND_API_KEY / RESEND_EMAIL_DOMAIN が未設定');
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  const html =
    '<div style="font-family:sans-serif;font-size:14px;line-height:1.9;color:#1A1A16">' +
    '<p style="margin:0 0 18px">SHINDO サイトのお問い合わせフォームから送信がありました。</p>' +
    '<table style="border-collapse:collapse;font-size:14px">' +
    row('お名前', name) +
    row('メールアドレス', email) +
    row('件名', subject) +
    '</table>' +
    (intro
      ? '<p style="margin:20px 0 6px;color:#6A6A5D">簡単な自己紹介</p>' +
        '<div style="white-space:pre-wrap;border-left:2px solid #CBB96A;padding:2px 0 2px 14px">' +
          esc(intro) +
        '</div>'
      : '') +
    '<p style="margin:20px 0 6px;color:#6A6A5D">お問い合わせ内容</p>' +
    '<div style="white-space:pre-wrap;border-left:2px solid #CBB96A;padding:2px 0 2px 14px">' +
      esc(message) +
    '</div>' +
    '<p style="margin:22px 0 0;color:#6A6A5D;font-size:12px">' +
      'このメールにそのまま返信すると、送信者へ届きます。' +
    '</p></div>';

  const text =
    'SHINDO サイトのお問い合わせフォームから送信がありました。\n\n' +
    'お名前: ' + name + '\n' +
    'メールアドレス: ' + email + '\n' +
    '件名: ' + subject + '\n\n' +
    '簡単な自己紹介:\n' + (intro || '—') + '\n\n' +
    'お問い合わせ内容:\n' + message + '\n';

  // 連打やリトライで同じ内容が二重に届かないようにする
  const idempotencyKey = crypto
    .createHash('sha256')
    .update([name, email, intro, subject, message].join(' '))
    .digest('hex')
    .slice(0, 40);

  let r;
  try {
    r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({
        from: 'SHINDO お問い合わせ <noreply@' + domain + '>',
        to: [TO],
        reply_to: email,
        subject: '【SHINDO お問い合わせ】' + subject + '／' + name + ' 様',
        html,
        text,
      }),
    });
  } catch (e) {
    console.error('inquiry: Resend への接続に失敗', e);
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }

  // 送信できていないのに成功を返さない。問い合わせを黙って捨てないため
  if (!r.ok) {
    const detail = await r.text().catch(() => '');
    console.error('inquiry: Resend が ' + r.status + ' を返した', detail);
    return res.status(502).json({ ok: false, error: 'send_failed', status: r.status });
  }

  return res.status(200).json({ ok: true });
};
