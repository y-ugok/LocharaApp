import "https://deno.land/std/dotenv/load.ts";

Deno.serve(async (req) => {
  const { searchParams } = new URL(req.url);
  const lat_lon = searchParams.get("ll");

  if (lat_lon === null) {
    const map_apikey = { map_apikey: Deno.env.get("MAP_APIKEY") };
    const body = JSON.stringify(map_apikey);
    return new Response(body, {
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Origin": "https://y-ugok.github.io",
        "content-type": "application/json; charset=utf-8",
      },
    });
  }

  const apikey = Deno.env.get("CHAR_APIKEY");
  //  console.log(apikey);
  const url = "https://localchara.jp/services/api/search/location/character";
  const res = await fetch(url + `?api_key=${apikey}&ll=${lat_lon}`);
  const obj = await res.json();

  // console.log(JSON.stringify(obj, null, 2));
  const body = JSON.stringify(obj);

  return new Response(body, {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Origin": "https://y-ugok.github.io",
      "content-type": "application/json; charset=utf-8",
    },
  });
});
