// Cloudflare Worker — بروكسي لـ Gemini (المفتاح بيفضل سري عندك)
// Settings → Variables: GEMINI_KEY (secret) ، MODEL (مثلاً gemini-2.0-flash — اكتب اسم موديل متاح من aistudio.google.com)
export default {
  async fetch(req, env) {
    const h = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST,OPTIONS'};
    if (req.method === 'OPTIONS') return new Response(null, {headers: h});
    const body = await req.text();
    if (body.length > 200000) return new Response('{"error":"too big"}', {status: 413, headers: h});
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${env.MODEL}:generateContent`,
      {method: 'POST', headers: {'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_KEY}, body});
    return new Response(r.body, {status: r.status, headers: {...h, 'Content-Type': 'application/json'}});
  }
};
