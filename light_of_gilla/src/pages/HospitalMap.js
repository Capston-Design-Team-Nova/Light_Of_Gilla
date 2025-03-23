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
            "HP8" // 기본 카테고리는 병원
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

  const fetchHospitals = (lat, lng, category = "HP8") => {
    const ps = new window.kakao.maps.services.Places();

    ps.categorySearch(
      category,  // 병원(HP8) 카테고리 검색
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setHospitals(data);
        }
      },
      { location: new window.kakao.maps.LatLng(lat, lng) }
    );
  };

  const symptomToCategory = {
    "두통": "신경과",
    "치통": "치과",
    "소화불량": "내과",
    "피부 가려움": "피부과",
    "눈 충혈": "안과",
    "충혈": "안과",
    "귀 통증": "이비인후과",
    "골절": "정형외과",
    "산전 검사": "산부인과",
    "복통": "내과",
    "기침": "호흡기내과",
    "발열": "내과",
    "피로": "내과",
    "어지러움": "신경과",
    "가슴 통증": "심장내과",
    "배뇨 문제": "비뇨기과",
    "관절 통증": "정형외과",
    "호흡 곤란": "호흡기내과",
    "어깨 통증": "정형외과",
    "배변 문제": "소화기내과",
    "피부 발진": "피부과",
    "근육통": "정형외과, 류마티스내과",
    "손발 저림": "신경과, 혈관외과, 내분비내과",
    "불면증": "정신건강의학과, 신경과",
    "갑상선 문제": "내분비내과",
    "알레르기": "알레르기내과, 피부과, 이비인후과",
    "요통": "정형외과, 신경외과",
    "탈모": "피부과",
    "우울감": "정신건강의학과",
    "불안감": "정신건강의학과",
    "수면장애": "정신건강의학과, 신경과",
    "구토": "소화기내과",
    "설사": "소화기내과",
};
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
  
    const ps = new window.kakao.maps.services.Places();
    let searchKeyword = searchTerm;
  
    // 입력한 증상이 사전 정의된 리스트에 있으면 해당 병원명으로 검색
    if (symptomToCategory[searchTerm]) {
      searchKeyword = symptomToCategory[searchTerm]; // 예: "두통" → "신경과"
    }
  
    ps.keywordSearch(
      searchKeyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setHospitals(data); // 결과 업데이트
        } else {
          setHospitals([]);
        }
      },
      { location: new window.kakao.maps.LatLng(state.center.lat, state.center.lng) }
    );
  };
  

  const handleCategoryClick = (category) => {
    const categoryCodes = {
      약국: "PM8",
      내과: "HP8", 
      피부과: "HP8",
      치과: "HP8",
      소아과: "HP8",
      산부인과: "HP8",
      정형외과: "HP8",
      안과: "HP8",
      성형외과: "HP8",
      이비인후과: "HP8",
    };
  
    const ps = new window.kakao.maps.services.Places();
    const selectedCode = categoryCodes[category];
  
    if (!selectedCode) return;
  
    ps.keywordSearch(
      `${category}`, // 선택한 카테고리 키워드 검색
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setHospitals(data);
        } else {
          setHospitals([]);
        }
      },
      { location: new window.kakao.maps.LatLng(state.center.lat, state.center.lng) }
    );
  };
  

  // 검색창에서 Enter 키 입력 가능하도록 설정
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 뒤로가기 버튼 클릭 처리
  const handleGoBack = () => {
    setSelectedHospital(null); // 병원 정보 초기화
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
            onKeyPress={handleKeyPress} // Enter 키로 검색 가능
            placeholder="병원 검색..."
          />
          <img
            src={require("../assets/images/돋보기.png")}
            alt=" "
            onClick={handleSearch}
          />
        </SearchBox>

        <CategoryButtons>
          {["약국", "내과", "피부과", "치과", "소아과", "산부인과", "정형외과", "안과", "성형외과", "이비인후과"].map((cat) => (
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
            <MapMarker
              position={state.center}
              image={{
                src: require("../assets/images/내 위치 마커.png"),
                size: { width: 40, height: 45 },
                options: { offset: { x: 27, y: 69 } }
              }}
            />
          )}

          {hospitals.map((h, idx) => (
            <MapMarker
              key={idx}
              position={{ lat: h.y, lng: h.x }}
              onClick={() => setSelectedHospital(h)}
              image={{
                src: require("../assets/images/병원마커.png"),
                size: { width: 40, height: 45 },
                options: { offset: { x: 27, y: 69 } }
              }}
            />
          ))}
        </Map>
      </MapContainer>

      {/* 선택한 병원 정보 패널 */}
      {selectedHospital && (
        <Sidebar>
          <img
            src={require("../assets/images/뒤로가기.png")} // 뒤로가기 버튼
            onClick={handleGoBack}
          />
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
