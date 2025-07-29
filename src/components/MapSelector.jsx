import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "@turf/turf";

export default function MapSelector({ onAreaSelected }) {
  useEffect(() => {
    const map = L.map("map", {
      center: [36.5, 127.5],
      zoom: 7,
    });

    // VWorld 타일 URL에 API 키 포함
    L.tileLayer(
      "https://api.vworld.kr/req/wmts/1.0.0/Base/{z}/{y}/{x}.png?key=A08018CE-2661-3CBF-95D0-0D9615ACFEE6&service=WMTS&request=GetTile&version=1.0.0&layer=Base&style=default&format=image/png&tileMatrixSet=EPSG:3857",
      {
        attribution: "© VWorld",
        maxZoom: 19,
      }
    ).addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        rectangle: true,
        circle: false,
        marker: false,
        polyline: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (e) {
      const layer = e.layer;
      drawnItems.addLayer(layer);
      const geojson = layer.toGeoJSON();
      onAreaSelected(geojson);
    });

    return () => map.remove();
  }, [onAreaSelected]);

  return <div id="map" style={{ width: "100%", height: "80vh" }} />;
}
