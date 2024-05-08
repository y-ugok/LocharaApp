"use strict";

PetiteVue.createApp({
  marker: null,
  lat: 35.276456,
  lon: 136.2492734,
  map: {},
  data: {},

  async initMap() {
    // const res = await fetch('http://localhost:8000/');
    const res = await fetch("https://locharaapp.deno.dev/");
    const obj = await res.json();
    //    console.log(obj.map_apikey);

    ((g) => {
      let h,
        a,
        k,
        p = "The Google Maps JavaScript API",
        c = "google",
        l = "importLibrary",
        q = "__ib__",
        m = document,
        b = window;
      b = b[c] || (b[c] = {});
      let d = b.maps || (b.maps = {}),
        r = new Set(),
        e = new URLSearchParams(),
        u = () =>
          h ||
          (h = new Promise(async (f, n) => {
            await (a = m.createElement("script"));
            e.set("libraries", [...r] + "");
            for (k in g)
              e.set(
                k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
                g[k]
              );
            e.set("callback", c + ".maps." + q);
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
            d[q] = f;
            a.onerror = () => (h = n(Error(p + " could not load.")));
            a.nonce = m.querySelector("script[nonce]")?.nonce || "";
            m.head.append(a);
          }));
      d[l]
        ? console.warn(p + " only loads once. Ignoring:", g)
        : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
    })({
      key: obj.map_apikey,
    });

    const { Map } = await google.maps.importLibrary("maps");
    this.map = new Map(document.getElementById("map"), {
      center: { lat: this.lat, lng: this.lon },
      zoom: 10,
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: { lat: this.lat, lng: this.lon },
      visible: true,
    });

    this.map.addListener("click", (e) => {
      this.getClickLatLng(e.latLng, this.map);
    });
  },

  getClickLatLng(lat_lng, map) {
    this.marker.setVisible(false);
    this.marker.setPosition(lat_lng);
    this.marker.setVisible(true);
    this.lat = this.marker.getPosition().lat();
    this.lon = this.marker.getPosition().lng();
  },

  async getResource() {
    const query = new URLSearchParams({
      ll: `${this.lat},${this.lon}`,
    });
    const res = await fetch("https://locharaapp.deno.dev/?" + query);
    // const res = await fetch("http://localhost:8000/?" + query);
    const obj = await res.json();
    console.log(JSON.stringify(obj, null, 2));
    this.data = obj;
  },
}).mount();
