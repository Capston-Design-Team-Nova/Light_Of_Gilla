import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Main,
  MapContainer,
  Sidebar,
  SearchContainer,
  SearchBox,
  SearchInput,
  CategoryButtons,
} from "../styles/HospitalMapStyles";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function HospitalMap() {
  const [state, setState] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    errMsg: null,
    isLoading: true,
  });

  const [hospitals, setHospitals] = useState([]); // 병원 리스트
  const [selectedHospital, setSelectedHospital] = useState(null); // 선택한 병원 정보
  const [searchTerm, setSearchTerm] = useState(""); // 검색어

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 API가 로드되지 않았습니다.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
            errMsg: null,
          });
          fetchHospitals(
            position.coords.latitude,
            position.coords.longitude,
            "병원"
          );
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "Geolocation을 사용할 수 없어요.",
        isLoading: false,
      }));
    }
  }, []);

  const fetchHospitals = (lat, lng, keyword) => {
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setHospitals(data);
        }
      },
      { location: new window.kakao.maps.LatLng(lat, lng) }
    );
  };

  const handleSearch = () => {
    fetchHospitals(state.center.lat, state.center.lng, searchTerm);
  };

  const handleCategoryClick = (category) => {
    fetchHospitals(state.center.lat, state.center.lng, category);
  };

  return (
    <Main>
      <Header />
      <SearchContainer>
        <SearchBox>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="병원 검색..."
          />
          <button onClick={handleSearch}>검색</button>
        </SearchBox>

        <CategoryButtons>
          {["약국", "내과", "피부과", "치과", "소아과", "산부인과", "정형외과", "안과", "성형외과"].map((cat) => (
            <button key={cat} onClick={() => handleCategoryClick(cat)}>
              #{cat}
            </button>
          ))}
        </CategoryButtons>
      </SearchContainer>

      {/* 왼쪽 사이드바 병원 리스트 */}
      <Sidebar>
        <div>
          {hospitals.map((h, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedHospital(h)}
              style={{
                cursor: "pointer",
                padding: "5px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <h3>{h.place_name}</h3>
              <p>{h.road_address_name || h.address_name}</p>
            </div>
          ))}
        </div>
      </Sidebar>

      {/* 지도 영역 */}
      <MapContainer>
        <Map
          center={state.center}
          style={{ width: "100%", height: "100%" }}
          level={3}
        >
          {!state.isLoading && (
            <MapMarker position={state.center}>
              <div style={{ padding: "5px", color: "#000" }}>
                {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
              </div>
            </MapMarker>
          )}

          {hospitals.map((h, idx) => (
            <MapMarker
              key={idx}
              position={{ lat: h.y, lng: h.x }}
              onClick={() => setSelectedHospital(h)}
            />
          ))}
        </Map>
      </MapContainer>

      {/* 선택한 병원 정보 패널 */}
      {selectedHospital && (
        <Sidebar>
          <h2>{selectedHospital.place_name}</h2>
          <p>
            {selectedHospital.road_address_name ||
              selectedHospital.address_name}
          </p>
          <p>{selectedHospital.phone}</p>
          <a
            href={selectedHospital.place_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            상세 보기
          </a>
        </Sidebar>
      )}
    </Main>
  );
}

export default HospitalMap;
