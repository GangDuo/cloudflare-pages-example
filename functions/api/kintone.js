export async function onRequest(context) {
  const { KINTONE_DOMAIN, KINTONE_APP_ID, KINTONE_API_TOKEN } = context.env;

  const url = `https://${KINTONE_DOMAIN}/k/v1/records.json?app=${KINTONE_APP_ID}`;

  const res = await fetch(url, {
    headers: {
      "X-Cybozu-API-Token": KINTONE_API_TOKEN,
    },
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
