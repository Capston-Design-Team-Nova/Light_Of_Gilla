import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Papa from "papaparse";
import hospitalData from "../assets/data/강서구/hospital_list_가양동_병원.csv";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import {
  Main,
  MapContainer,
  Sidebar,
  SearchContainer,
  SearchBox,
  SearchInput,
  CategoryButtons,
} from "../styles/HospitalMapStyles";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

function HospitalMap() {
  const [state, setState] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    errMsg: null,
    isLoading: true,
  });

  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [sortOption, setSortOption] = useState(() => {
    return localStorage.getItem("sortOption") || "distance";
  });
  const [selectedPosition, setSelectedPosition] = useState(null); // 병원 위치 좌표

  useEffect(() => {
    fetch(hospitalData)
      .then((res) => res.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => setCsvData(result.data),
        });
      });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setState({
            center: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
            isLoading: false,
            errMsg: null,
          });
          fetchHospitals(pos.coords.latitude, pos.coords.longitude);
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
      category,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setHospitals(data);
        }
      },
      { location: new window.kakao.maps.LatLng(lat, lng) }
    );
  };

  const getHospitalDetails = (name) => {
    return csvData.find((h) => h.name === name);
  };

  // 거리 구하기
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lng2 - lng1);
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getSortedHospitals = () => {
    let sorted = [...hospitals];

    if (sortOption === "rating") {
      sorted.sort((a, b) => {
        const aData = csvData.find((x) => x.name === a.place_name);
        const bData = csvData.find((x) => x.name === b.place_name);
        const aScore = aData?.score ? parseFloat(aData.score) : -1;
        const bScore = bData?.score ? parseFloat(bData.score) : -1;

        if (bScore !== aScore) return bScore - aScore;

        const aDist = getDistance(
          state.center.lat,
          state.center.lng,
          parseFloat(a.y),
          parseFloat(a.x)
        );
        const bDist = getDistance(
          state.center.lat,
          state.center.lng,
          parseFloat(b.y),
          parseFloat(b.x)
        );
        return aDist - bDist;
      });
    } else if (sortOption === "distance") {
      sorted.sort((a, b) => {
        const aDist = getDistance(
          state.center.lat,
          state.center.lng,
          parseFloat(a.y),
          parseFloat(a.x)
        );
        const bDist = getDistance(
          state.center.lat,
          state.center.lng,
          parseFloat(b.y),
          parseFloat(b.x)
        );
        return aDist - bDist;
      });
    }

    return sorted;
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    localStorage.setItem("sortOption", value);
  };

  const formatOpenHours = (openHours) => {
    if (!openHours) return <p>정보가 등록되지 않았어요.</p>;
    try {
      const hours = JSON.parse(openHours.replace(/'/g, '"'));
      return Object.entries(hours).map(([day, time]) => (
        <p key={day}>{day === "휴무일" ? "휴무일" : `${day}: ${time}`}</p>
      ));
    } catch {
      return <p>진료 시간 정보를 불러올 수 없습니다.</p>;
    }
  };

  const renderReviews = (reviews) => {
    if (!reviews) return null;
    try {
      const list = JSON.parse(reviews.replace(/'/g, '"'));
      return list.map((r, i) => (
        <div
          key={i}
          style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
        >
          <h4>{r.작성자}</h4>
          <div>{renderRating(parseFloat(r.별점))}</div>
          <p>{r.내용}</p>
          <p>{r.날짜}</p>
        </div>
      ));
    } catch {
      return <p>리뷰 정보를 불러올 수 없습니다.</p>;
    }
  };

  const renderRating = (score) => {
    score = isNaN(score) ? 0 : score;
    const full = Math.floor(score);
    const half = score % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {[...Array(full)].map((_, i) => (
          <BsStarFill key={i} style={{ color: "red", fontSize: "20px" }} />
        ))}
        {half && <BsStarHalf style={{ color: "red", fontSize: "20px" }} />}
        {[...Array(empty)].map((_, i) => (
          <BsStar key={i} style={{ color: "gray", fontSize: "20px" }} />
        ))}
        <span style={{ marginLeft: "5px", fontSize: "14px", color: "#333" }}>
          {score.toFixed(1)}
        </span>
      </div>
    );
  };

  const handleHospitalClick = (h) => {
    const details = getHospitalDetails(h.place_name);
    setSelectedHospital(
      details || {
        name: h.place_name,
        address: h.road_address_name || h.address_name,
        score: 0,
        open_hour: "",
        reviews: [],
      }
    );
    setSelectedPosition({ lat: parseFloat(h.y), lng: parseFloat(h.x) });
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(
      searchTerm,
      (data, status) => {
        setHospitals(
          status === window.kakao.maps.services.Status.OK ? data : []
        );
      },
      {
        location: new window.kakao.maps.LatLng(
          state.center.lat,
          state.center.lng
        ),
      }
    );
  };

  const handleCategoryClick = (category) => {
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(
      category,
      (data, status) => {
        setHospitals(
          status === window.kakao.maps.services.Status.OK ? data : []
        );
      },
      {
        location: new window.kakao.maps.LatLng(
          state.center.lat,
          state.center.lng
        ),
      }
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleGoBack = () => setSelectedHospital(null);

  return (
    <Main>
      <Header />
      <SearchContainer>
        <SearchBox>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="병원 검색..."
          />
          <img
            src={require("../assets/images/돋보기.png")}
            alt="검색"
            onClick={handleSearch}
          />
        </SearchBox>
        <CategoryButtons>
          {[
            "약국",
            "내과",
            "피부과",
            "치과",
            "소아과",
            "산부인과",
            "정형외과",
            "안과",
            "성형외과",
            "이비인후과",
          ].map((cat) => (
            <button key={cat} onClick={() => handleCategoryClick(cat)}>
              #{cat}
            </button>
          ))}
        </CategoryButtons>
      </SearchContainer>

      <Sidebar>
        <div style={{ padding: "10px" }}>
          <label>정렬 기준: </label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="distance">거리순</option>
            <option value="rating">평점순</option>
          </select>
        </div>
        <div>
          {getSortedHospitals().map((h, i) => (
            <div
              key={i}
              onClick={() => handleHospitalClick(h)}
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
                options: { offset: { x: 27, y: 69 } },
              }}
            />
          )}
          {getSortedHospitals().map((h, i) => {
            const markerImage =
              i < 5
                ? require("../assets/images/상위 5개 병원 마커.png")
                : require("../assets/images/병원마커.png");

            return (
              <MapMarker
                key={i}
                position={{ lat: h.y, lng: h.x }}
                onClick={() => handleHospitalClick(h)}
                image={{
                  src: markerImage,
                  size: { width: 40, height: 45 },
                  options: { offset: { x: 27, y: 69 } },
                }}
              />
            );
          })}
          {selectedHospital && selectedPosition && (
            <CustomOverlayMap position={selectedPosition}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "250px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  fontSize: "14px",
                  position: "relative",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  {selectedHospital.name}
                </div>
                <div style={{ color: "#666", marginBottom: "5px" }}>
                  {selectedHospital.address}
                </div>
                {selectedHospital.img_url && (
                  <img
                    src={selectedHospital.img_url}
                    alt="병원 이미지"
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginBottom: "8px",
                    }}
                  />
                )}
                <button
                  onClick={() => {
                    setSelectedHospital(null);
                    setSelectedPosition(null);
                  }}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "8px",
                    background: "transparent",
                    border: "none",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>
            </CustomOverlayMap>
          )}
        </Map>
      </MapContainer>

      {selectedHospital && (
        <Sidebar>
          <div>
            <img
              src={require("../assets/images/뒤로가기.png")}
              onClick={handleGoBack}
              alt="뒤로가기"
            />
            <h2>{selectedHospital.name}</h2>
            <p>{selectedHospital.address}</p>
            <p>{renderRating(parseFloat(selectedHospital.score))}</p>
            {selectedHospital.img_url && (
              <img
                src={selectedHospital.img_url}
                alt="병원 이미지"
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <h3>진료 시간</h3>
            {formatOpenHours(selectedHospital.open_hour)}
            <h3>리뷰</h3>
            {renderReviews(selectedHospital.reviews)}
          </div>
        </Sidebar>
      )}
    </Main>
  );
}

export default HospitalMap;
