import { useState } from "react";
import MapSelector from "./components/MapSelector";
import SearchBar from "./components/SearchBar";
import { generateDXFFromGeoJSON } from "./utils/dxfGenerator";

function App() {
  const [selectedArea, setSelectedArea] = useState(null);

  const handleDownloadDXF = () => {
    if (!selectedArea) {
      alert("먼저 영역을 선택하세요!");
      return;
    }
    const blob = generateDXFFromGeoJSON(selectedArea);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "map_area.dxf";
    link.click();
  };

  return (
    <div>
      <SearchBar onSearchResult={(coords) => console.log("검색 결과:", coords)} />
      <MapSelector onAreaSelected={(geo) => setSelectedArea(geo)} />
      <button onClick={handleDownloadDXF} style={{ margin: "10px" }}>
        DXF 다운로드
      </button>
    </div>
  );
}

export default App;
