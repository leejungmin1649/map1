import { useState } from "react";
import axios from "axios";

export default function SearchBar({ onSearchResult }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    try {
      const API_KEY = "A08018CE-2661-3CBF-95D0-0D9615ACFEE6";
      const url = `https://api.vworld.kr/req/search?key=${A08018CE-2661-3CBF-95D0-0D9615ACFEE6}&request=search&query=${A08018CE-2661-3CBF-95D0-0D9615ACFEE6}&type=place&format=json`;
      const res = await axios.get(url);
      if (res.data.response.result.items.length > 0) {
        const { point } = res.data.response.result.items[0];
        onSearchResult([point.y, point.x]);
      }
    } catch (err) {
      console.error("검색 실패:", err);
    }
  };

  return (
    <div style={{ padding: "10px", background: "#f0f0f0" }}>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="지번/주소 검색"
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
