import DxfWriter from "dxf-writer";

export function generateDXFFromGeoJSON(geojson) {
  const writer = new DxfWriter();
  if (geojson.geometry.type === "Polygon") {
    const coords = geojson.geometry.coordinates[0];
    for (let i = 0; i < coords.length - 1; i++) {
      const [x1, y1] = coords[i];
      const [x2, y2] = coords[i + 1];
      writer.addLine(x1, y1, 0, x2, y2, 0);
    }
  }
  return new Blob([writer.stringify()], { type: "application/dxf" });
}
