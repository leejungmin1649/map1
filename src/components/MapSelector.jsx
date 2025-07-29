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

    L.tileLayer("https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png", {
      attribution: "© VWorld",
    }).addTo(map);

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
