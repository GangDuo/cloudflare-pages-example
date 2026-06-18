export async function onRequestPut(context) {
  const { KINTONE_DOMAIN, KINTONE_APP_ID, KINTONE_API_TOKEN } = context.env;
  const { id } = context.params;
  const { brand, model } = await context.request.json();

  const url = `https://${KINTONE_DOMAIN}/k/v1/record.json`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "X-Cybozu-API-Token": KINTONE_API_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app: KINTONE_APP_ID,
      id,
      record: {
        brand: { value: brand },
        model: { value: model },
      },
    }),
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
