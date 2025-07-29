import DxfWriter from "dxf-writer";

export function generateDXFFromGeoJSON(geojson) {
  const writer = new DxfWriter();

  const drawPolygon = (coordinates) => {
    const points = coordinates[0];
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      writer.addLine(x1, y1, 0, x2, y2, 0);
    }
  };

  if (geojson.type === "FeatureCollection") {
    geojson.features.forEach((feature) => {
      if (feature.geometry.type === "Polygon") {
        drawPolygon(feature.geometry.coordinates);
      }
    });
  } else if (geojson.type === "Feature" && geojson.geometry.type === "Polygon") {
    drawPolygon(geojson.geometry.coordinates);
  } else if (geojson.geometry?.type === "Polygon") {
    drawPolygon(geojson.geometry.coordinates);
  } else {
    alert("지원되지 않는 GeoJSON 형식입니다 (Polygon만 지원).");
  }

  return new Blob([writer.stringify()], { type: "application/dxf" });
}
