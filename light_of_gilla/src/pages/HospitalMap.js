import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import {
  Main,
  MapContainer,
  Sidebar,
  SearchContainer,
  SearchBox,
  SearchInput,
  HospitalItem,
  DropdownWrapper,
  Column,
  TabSwitcher,
  GpsButton,
  CategoryItem,
  CategoryModalContent,
  CategoryModalOverlay,
  CategoryButtonsWrapper,
  CategoryAllButton,
  CategoryGrid,
} from "../styles/HospitalMapStyles";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

function HospitalMap() {
  const [state, setState] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    errMsg: null,
    isLoading: true,
  });

  const [hospitals, setHospitals] = useState([]);
  const [hospitalDetails, setHospitalDetails] = useState({});
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(() => {
    return localStorage.getItem("sortOption") || "distance";
  });
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [likedReviews, setLikedReviews] = useState({});
  const [favoriteHospitals, setFavoriteHospitals] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [editingReviewId, setEditingReviewId] = useState(null); // null이면 신규 작성, 값이 있으면 수정 중
  const [hospitalReviews, setHospitalReviews] = useState([]);
  const [editingReviewIndex, setEditingReviewIndex] = useState(null);
  const [editedReviewContent, setEditedReviewContent] = useState("");
  const [editedReviewRating, setEditedReviewRating] = useState(5);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("favorites");
  const mapRef = useRef(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [maxVisible, setMaxVisible] = useState(5);

  // 좋아요 토글
  const toggleLike = async (reviewId) => {
    const userNickname = localStorage.getItem("nickname");
    if (!userNickname || !reviewId) return;

    try {
      const res = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/${reviewId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-Name": userNickname,
          },
        }
      );

      if (res.ok && selectedHospital?.id) {
        const updatedRes = await fetch(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${selectedHospital.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-User-Name": userNickname,
            },
          }
        );
        const updated = await updatedRes.json();
        setHospitalReviews(updated);
      }
    } catch (e) {
      console.error("좋아요 토글 실패:", e);
    }
  };

  // 즐겨찾기 토글
  const toggleFavorite = async (hospitalName) => {
    const hospitalDetail = getHospitalDetails(hospitalName);
    const hospitalId = hospitalDetail?.id;
    if (!hospitalId) {
      console.warn("병원 ID 없음:", hospitalName);
      return;
    }

    const userNickname = localStorage.getItem("nickname");
    const isFavorite = !!favoriteHospitals[String(hospitalId)];

    try {
      if (isFavorite) {
        console.log(
          `[DELETE] 즐겨찾기 제거 요청 → 유저명:${userNickname}, 병원명: ${hospitalName}, 병원ID: ${hospitalId}`
        );
        await fetch(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/favorites/${hospitalId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-User-Name": userNickname,
            },
          }
        );
      } else {
        console.log(
          `[POST] 즐겨찾기 등록 요청 → 유저명:${userNickname}, 병원명: ${hospitalName}, 병원ID: ${hospitalId}`
        );
        await fetch(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/favorites/${hospitalId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-User-Name": userNickname,
            },
          }
        );
      }

      setFavoriteHospitals((prev) => {
        const newFavorites = { ...prev };
        if (isFavorite) {
          // 삭제
          Object.keys(newFavorites).forEach((key) => {
            if (newFavorites[key].id === hospitalId) delete newFavorites[key];
          });
        } else {
          // 추가
          newFavorites[hospitalId] = {
            id: hospitalId,
            name: hospitalName,
            place_name: hospitalName,
          };
        }
        return newFavorites;
      });
    } catch (error) {
      console.error("즐겨찾기 변경 실패:", error);
    }
  };

  // 즐겨찾기 패치
  useEffect(() => {
    const fetchFavoriteHospitals = async () => {
      const userNickname = localStorage.getItem("nickname");
      if (!userNickname) {
        console.error("닉네임이 없습니다. 로그인 정보를 확인하세요.");
        return;
      }

      try {
        const response = await fetch(
          "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/favorites",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-User-Name": userNickname,
            },
          }
        );

        const favoriteList = await response.json();
        console.log("📦 원본 즐겨찾기 응답:", favoriteList);

        const favorites = {};
        favoriteList.forEach((fav, idx) => {
          console.log(`[${idx}] 병원 ID 체크:`, fav.id);
          if (fav.id && fav.name) {
            favorites[String(fav.id)] = {
              id: fav.id,
              name: fav.name,
            };
          }
        });

        console.log("🧩 최종 favorites 객체:", favorites);
        console.log("🧷 key 목록:", Object.keys(favorites));

        setFavoriteHospitals(favorites);
      } catch (error) {
        console.error("즐겨찾기 불러오기 실패:", error);
      }
    };

    fetchFavoriteHospitals();
  }, []);

  // GPS
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

  // 병원 패치 호출
  useEffect(() => {
    if (hospitals.length > 0) {
      fetchRatingsForHospitals(); // 조건 없이 실행
    }
  }, [hospitals]);

  // 지도 현재 위치 호출
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
    }
  }, []);

  // 병원 평점 패치
  const fetchRatingsForHospitals = async () => {
    const newDetails = {};

    await Promise.all(
      hospitals.map(async (h) => {
        try {
          const res = await fetch(
            `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/hospitals/search?name=${encodeURIComponent(
              h.place_name
            )}`
          );
          const [details] = await res.json();

          let reviewCount = 0;

          if (details && details.id) {
            const reviewRes = await fetch(
              `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${details.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-User-Name": localStorage.getItem("nickname") || "",
                },
              }
            );
            const reviews = await reviewRes.json();
            if (Array.isArray(reviews)) {
              reviewCount = reviews.length;
            }
          }

          if (details && details.name && details.id) {
            newDetails[h.place_name] = {
              ...details,
              id: details.id,
              reviewCount,
            };
          }
        } catch (e) {
          newDetails[h.place_name] = { score: 0, reviewCount: 0 };
        }
      })
    );

    setHospitalDetails(newDetails);
  };

  const fetchHospitals = (lat, lng, category = "HP8") => {
    const ps = new window.kakao.maps.services.Places();
    ps.categorySearch(
      category,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setHospitals(data);
        }
      },
      {
        location: new window.kakao.maps.LatLng(lat, lng),
        radius: 3000, // 반경 3km로 제한
      }
    );
  };

  const getHospitalDetails = (name) => hospitalDetails[name] || { score: 0 };

  // 거리 계산 함수
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lng2 - lng1);
    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // 병원 정렬
  const getSortedHospitals = () => {
    const sorted = [...hospitals];
    if (sortOption === "rating") {
      sorted.sort((a, b) => {
        const aScore = parseFloat(getHospitalDetails(a.place_name).score || 0);
        const bScore = parseFloat(getHospitalDetails(b.place_name).score || 0);
        return bScore - aScore;
      });
    } else {
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

  // 정렬 옵션 설정
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
  };

  // 진료 시간
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

  // 리뷰 수정
  const handleEditSubmit = async (reviewId, index) => {
    const userNickname = localStorage.getItem("nickname");
    if (!userNickname || !reviewId || !editedReviewContent) return;

    try {
      const response = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-User-Name": userNickname,
          },
          body: JSON.stringify({
            author: userNickname,
            content: editedReviewContent,
            rating: editedReviewRating,
          }),
        }
      );

      const result = await response.json();
      console.log("✏️ 리뷰 수정 완료", result);

      setEditingReviewIndex(null);
      await refreshSelectedHospital();
    } catch (e) {
      console.error("리뷰 수정 실패:", e);
    }
  };

  // 리뷰 랜더링
  const renderReviews = () => {
    if (!Array.isArray(hospitalReviews) || hospitalReviews.length === 0)
      return <p>리뷰가 없습니다.</p>;

    return hospitalReviews
      .filter(
        (r) =>
          typeof r.author === "string" &&
          typeof r.content === "string" &&
          r.content.trim() !== "" &&
          typeof r.rating === "number" &&
          !isNaN(r.rating) &&
          r.rating > 0
      )
      .map((r, i) => {
        const isMine = r.author === localStorage.getItem("nickname");

        return (
          <div
            key={r.id}
            style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
          >
            <h4>{r.author}</h4>
            <div>{renderRating(r.rating)}</div>

            {editingReviewIndex === i ? (
              <>
                <textarea
                  value={editedReviewContent}
                  onChange={(e) => setEditedReviewContent(e.target.value)}
                  style={{ width: "100%", height: "60px", margin: "5px 0" }}
                />
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  {[1, 2, 3, 4, 5].map((val) => (
                    <span
                      key={val}
                      onClick={() => setEditedReviewRating(val)}
                      style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        color: val <= editedReviewRating ? "red" : "lightgray",
                      }}
                    >
                      <BsStarFill />
                    </span>
                  ))}
                  <button
                    onClick={() => handleEditSubmit(r.id, i)}
                    style={{
                      marginLeft: "auto",
                      background: "red",
                      color: "#fff",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    저장
                  </button>
                </div>
              </>
            ) : (
              <p>{r.content}</p>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              {/* 작성일 */}
              <p style={{ fontSize: "13px", color: "#666" }}>
                {r.createdAt
                  ? new Date(r.createdAt).toLocaleDateString("ko-KR")
                  : "작성일 미상"}
              </p>

              {/* 좋아요 + ... 버튼 */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <button
                  onClick={() => toggleLike(r.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <img
                    src={
                      r.likedByCurrentUser
                        ? require("../assets/images/채운 하트.png")
                        : require("../assets/images/빈 하트.png")
                    }
                    alt="좋아요"
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span style={{ fontSize: "13px", color: "#666" }}>
                    {r.likes}
                  </span>
                </button>

                {isMine && (
                  <div style={{ position: "relative" }}>
                    <button
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === i ? null : i)
                      }
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    >
                      ...
                    </button>

                    {openMenuIndex === i && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: "0",
                          transform: "translateY(8px)",
                          background: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "10px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          zIndex: 100,
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "70px",
                          overflow: "hidden",
                        }}
                      >
                        <button
                          onClick={() => {
                            setEditingReviewIndex(i);
                            setEditedReviewContent(r.content);
                            setEditedReviewRating(r.rating);
                            setOpenMenuIndex(null);
                          }}
                          style={{
                            padding: "8px 12px",
                            fontSize: "14px",
                            textAlign: "left",
                            border: "none",
                            background: "white",
                            cursor: "pointer",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.background = "#eee")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.background = "white")
                          }
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteReview(r.id)}
                          style={{
                            padding: "8px 12px",
                            fontSize: "14px",
                            textAlign: "left",
                            border: "none",
                            background: "white",
                            cursor: "pointer",
                            color: "red",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.background = "#eee")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.background = "white")
                          }
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      });
  };

  // 평점 별 표시
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

  // 리뷰 좋아요
  const initializeLikedReviews = (reviews) => {
    const liked = {};
    reviews.forEach((r) => {
      liked[r.id] = r.likedByCurrentUser;
    });
    setLikedReviews(liked);
  };

  // 병원 정보 및 리뷰 api
  const handleHospitalClick = async (h) => {
    try {
      const res = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/hospitals/search?name=${encodeURIComponent(
          h.place_name
        )}`
      );
      const [details] = await res.json();
      setSelectedHospital({
        name: details.name,
        address: details.address,
        score: details.score,
        openHour: details.openHour,
        imgUrl: details.imgUrl,
        id: details.id,
      });
      setSelectedPosition({ lat: parseFloat(h.y), lng: parseFloat(h.x) });

      const reviewRes = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${details.id}`,
        {
          headers: {
            "X-User-Name": localStorage.getItem("nickname"),
          },
        }
      );
      const reviewList = await reviewRes.json();
      setHospitalReviews(Array.isArray(reviewList) ? reviewList : []);
      initializeLikedReviews(reviewList);
    } catch (err) {
      console.error("병원 상세 또는 리뷰 데이터 요청 실패", err);
      setHospitalReviews([]);
    }
  };

  // 증상 검색어 매핑
  const symptomToCategory = {
    두통: "신경과",
    치통: "치과",
    소화불량: "내과",
    목감기: "이비인후과",
    "피부 가려움": "피부과",
    "눈 충혈": "안과",
    충혈: "안과",
    "귀 통증": "이비인후과",
    골절: "정형외과",
    "산전 검사": "산부인과",
    복통: "내과",
    기침: "호흡기내과",
    발열: "내과",
    피로: "내과",
    어지러움: "신경과",
    "가슴 통증": "심장내과",
    "배뇨 문제": "비뇨기과",
    "관절 통증": "정형외과",
    "호흡 곤란": "호흡기내과",
    "어깨 통증": "정형외과",
    "배변 문제": "소화기내과",
    "피부 발진": "피부과",
    근육통: "정형외과, 류마티스내과",
    "손발 저림": "신경과, 혈관외과, 내분비내과",
    불면증: "정신건강의학과, 신경과",
    "갑상선 문제": "내분비내과",
    알레르기: "알레르기내과, 피부과, 이비인후과",
    요통: "정형외과, 신경외과",
    탈모: "피부과",
    우울감: "정신건강의학과",
    불안감: "정신건강의학과",
    수면장애: "정신건강의학과, 신경과",
    구토: "소화기내과",
    설사: "소화기내과",
  };

  // 검색 로직
  const handleSearch = (customTerm) => {
    const rawTerm = customTerm ?? searchTerm;
    const trimmedTerm =
      typeof rawTerm === "string"
        ? rawTerm.trim()
        : typeof rawTerm === "number"
        ? String(rawTerm).trim()
        : ""; // undefined, null, object 등은 빈 문자열로 처리

    if (!trimmedTerm) return;

    if (!trimmedTerm) return;

    saveSearchKeyword(trimmedTerm);

    const matchedCategory = symptomToCategory[trimmedTerm];
    if (matchedCategory) {
      matchedCategory
        .split(",")
        .forEach((cat) => handleCategoryClick(cat.trim()));
    } else {
      // 매핑되지 않은 경우: 주변 병원 중 검색어 포함된 항목만 필터링
      const ps = new window.kakao.maps.services.Places();
      ps.categorySearch(
        "HP8", // 병원 카테고리
        (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const filtered = data.filter(
              (item) =>
                item.place_name.includes(trimmedTerm) ||
                item.road_address_name?.includes(trimmedTerm) ||
                item.address_name?.includes(trimmedTerm)
            );
            setHospitals(filtered);
          } else {
            setHospitals([]);
          }
        },
        {
          location: new window.kakao.maps.LatLng(
            state.center.lat,
            state.center.lng
          ),
          radius: 3000, // 반경 3km 제한
        }
      );
    }
  };

  // 카테고리 버튼
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

  const handleSearchInputClick = () => {
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // 즐겨찾기 삭제
  const handleRemoveFavorite = async (hospitalId) => {
    const userNickname = localStorage.getItem("nickname");
    const hospitalInfo = favoriteHospitals[String(hospitalId)];
    if (!userNickname || !hospitalInfo) return;

    try {
      await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/favorites/${hospitalInfo.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-User-Name": userNickname,
          },
        }
      );

      setFavoriteHospitals((prev) => {
        const updated = { ...prev };
        delete updated[String(hospitalId)];
        return updated;
      });
    } catch (error) {
      console.error("즐겨찾기 삭제 실패:", error);
    }
  };

  // 리뷰 등록 및 수정
  const handleReviewSubmit = async () => {
    const userNickname = localStorage.getItem("nickname");
    const hospitalId = getHospitalDetails(selectedHospital.name)?.id;
    if (!userNickname || !hospitalId || !reviewContent) return;

    const payload = {
      author: userNickname,
      rating: reviewRating,
      content: reviewContent,
    };

    try {
      const url = editingReviewId
        ? `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/${editingReviewId}`
        : `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/${hospitalId}`;

      const response = await fetch(url, {
        method: editingReviewId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Name": userNickname,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(
        editingReviewId ? "✅ 리뷰 수정 완료" : "✅ 리뷰 등록 완료",
        result
      );

      await refreshSelectedHospital(); // 최신 리뷰 불러오기

      setReviewContent("");
      setReviewRating(5);
      setEditingReviewId(null);
    } catch (e) {
      console.error("❌ 리뷰 저장 실패:", e);
    }
  };

  // 리뷰 삭제
  const handleDeleteReview = async (reviewId) => {
    const userNickname = localStorage.getItem("nickname");
    if (!userNickname || !reviewId) return;

    try {
      await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-User-Name": userNickname,
          },
        }
      );
      console.log("🗑️ 리뷰 삭제 완료");
      await refreshSelectedHospital();
    } catch (e) {
      console.error("❌ 리뷰 삭제 실패:", e);
    }
  };

  // 선택 병원 정보 갱신
  const refreshSelectedHospital = async () => {
    if (!selectedHospital?.name) return;

    try {
      const res = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/hospitals/search?name=${encodeURIComponent(
          selectedHospital.name
        )}`
      );
      const [details] = await res.json();

      setSelectedHospital((prev) => ({
        ...prev,
        ...details,
      }));

      // 병원 평점도 hospitalDetails에 반영
      setHospitalDetails((prev) => ({
        ...prev,
        [details.name]: {
          ...prev[details.name],
          ...details, // score 포함
        },
      }));

      const reviewRes = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${details.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Name": localStorage.getItem("nickname") || "",
          },
        }
      );
      const reviewList = await reviewRes.json();
      setHospitalReviews(Array.isArray(reviewList) ? reviewList : []);
    } catch (e) {
      console.error("병원 데이터 갱신 실패:", e);
    }
  };

  const handleRatingClick = (value) => {
    setReviewRating(value);
  };

  // 검색기록 API 호출
  useEffect(() => {
    const fetchSearchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/search/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const history = await res.json();
          setSearchHistory(history);
        }
      } catch (e) {
        console.error("검색기록 불러오기 실패", e);
      }
    };

    fetchSearchHistory();
  }, []);

  // 검색기록 삭제
  const handleDeleteSearchHistory = async (historyId) => {
    const token = localStorage.getItem("token");
    if (!token || !historyId) return;

    try {
      await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/search/history/${historyId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchHistory((prev) => prev.filter((item) => item.id !== historyId));
    } catch (e) {
      console.error("검색기록 삭제 실패", e);
    }
  };

  // 검색기록 전체 삭제
  const handleClearSearchHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/search/history",
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchHistory([]);
    } catch (e) {
      console.error("검색기록 전체 삭제 실패", e);
    }
  };

  // 즐겨찾기 전체 삭제
  const handleClearFavorites = () => {
    const userNickname = localStorage.getItem("nickname");
    if (!userNickname) return;

    Promise.all(
      Object.values(favoriteHospitals).map((h) =>
        fetch(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/favorites/${h.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-User-Name": userNickname,
            },
          }
        )
      )
    )
      .then(() => setFavoriteHospitals({}))
      .catch((e) => console.error("전체 즐겨찾기 삭제 실패", e));
  };

  // ✅ 4. 즐겨찾기 렌더링 함수
  const renderFavorites = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <h4 style={{ margin: 0 }}>⭐ 즐겨찾기 병원</h4>
        <button
          onClick={handleClearFavorites}
          style={{
            fontSize: "12px",
            color: "red",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          전체 삭제
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {Object.values(favoriteHospitals).map((hospital) => (
          <li
            key={hospital.id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={async () => {
              try {
                const res = await fetch(
                  `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/hospitals/${hospital.id}`
                );
                const details = await res.json();
                await handleHospitalClick({
                  place_name: details.name,
                  x: details.lng,
                  y: details.lat,
                });
                setSelectedHospital(details);
                setSelectedPosition({
                  lat: parseFloat(details.lat),
                  lng: parseFloat(details.lng),
                });
                setIsDropdownOpen(false);
              } catch (err) {
                console.error("❌ 병원 상세 정보 로딩 실패", err);
              }
            }}
          >
            <span>{hospital.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFavorite(hospital.id);
              }}
              style={{
                background: "none",
                border: "none",
                color: "red",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </>
  );

  // 검색 기록 랜더링
  const renderSearchHistory = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <h4 style={{ margin: 0 }}>🔍 최근 검색 기록</h4>
        <button
          onClick={handleClearSearchHistory}
          style={{
            fontSize: "12px",
            color: "red",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          전체 삭제
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {searchHistory.map((item) => (
          <li
            key={item.id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => {
              setSearchTerm(item.keyword);
              handleSearch(item.keyword);
              setIsDropdownOpen(false);
            }}
          >
            <span>{item.keyword}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteSearchHistory(item.id);
              }}
              style={{
                background: "none",
                border: "none",
                color: "red",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </>
  );

  // 검색 기록 저장
  const saveSearchKeyword = (keyword) => {
    const token = localStorage.getItem("token");
    if (!token || !keyword) return;

    // 중복 기록이 있으면 삭제하고 다시 추가
    fetch(
      "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/search/history",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then(async (history) => {
        const duplicate = history.find((item) => item.keyword === keyword);

        if (duplicate) {
          // 기존 기록 삭제
          await fetch(
            `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/search/history/${duplicate.id}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }

        // 새로 추가
        await fetch(
          "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/search/log",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ keyword }),
          }
        );

        refreshSearchHistory(); // 최신 기록 다시 가져오기
      })
      .catch((e) => {
        console.error("검색 기록 중복 확인/처리 실패", e);
      });
  };

  // ✅ 2. 검색기록 API 호출
  useEffect(() => {
    refreshSearchHistory();
  }, []);

  const refreshSearchHistory = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(
      "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/search/history",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((history) => {
        if (Array.isArray(history)) {
          setSearchHistory(history);
        } else {
          setSearchHistory([]); // fallback
          console.warn("searchHistory 응답이 배열이 아님:", history);
        }
      })
      .catch((e) => {
        console.error("검색기록 갱신 실패", e);
        setSearchHistory([]); // 실패 시에도 fallback
      });
  };

  // 영업 여부 판단함수
  const isHospitalOpen = (openHourString) => {
    try {
      const now = new Date();
      const today = ["일", "월", "화", "수", "목", "금", "토"][now.getDay()];
      const hours = JSON.parse(openHourString.replace(/'/g, '"'));
      const timeStr = hours[today];

      if (!timeStr || timeStr === "휴무") return false;

      const [start, end] = timeStr.split("~").map((t) => t.trim());
      const nowTime = now.getHours() * 60 + now.getMinutes();
      const [sH, sM] = start.split(":").map(Number);
      const [eH, eM] = end.split(":").map(Number);

      return nowTime >= sH * 60 + sM && nowTime <= eH * 60 + eM;
    } catch {
      return false;
    }
  };

  const categoryList = [
    { label: "응급실", icon: require("../assets/icons/응급실.png") },
    { label: "약국", icon: require("../assets/icons/약국.png") },
    { label: "내과", icon: require("../assets/icons/내과.png") },
    { label: "가정의학과", icon: require("../assets/icons/가정의학과.png") },
    { label: "치과", icon: require("../assets/icons/치과.png") },
    { label: "이비인후과", icon: require("../assets/icons/이비인후과.png") },
    { label: "소아과", icon: require("../assets/icons/소아과.png") },
    { label: "피부과", icon: require("../assets/icons/피부과.png") },
    { label: "산부인과", icon: require("../assets/icons/산부인과.png") },
    { label: "안과", icon: require("../assets/icons/안과.png") },
    { label: "정형외과", icon: require("../assets/icons/정형외과.png") },
    { label: "비뇨기과", icon: require("../assets/icons/비뇨기과.png") },
    { label: "신경외과", icon: require("../assets/icons/신경외과.png") },
    { label: "외과", icon: require("../assets/icons/외과.png") },
    { label: "성형외과", icon: require("../assets/icons/성형외과.png") },
    {
      label: "정신건강의학과",
      icon: require("../assets/icons/정신건강의학과.png"),
    },
    {
      label: "마취통증의학과",
      icon: require("../assets/icons/마취통증의학과.png"),
    },
  ];

  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth;
      if (width > 1200) setMaxVisible(13);
      else if (width > 1000) setMaxVisible(10);
      else if (width > 800) setMaxVisible(9);
      else if (width > 600) setMaxVisible(8);
      else if (width > 500) setMaxVisible(7);
      else setMaxVisible(4);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const [gpsTop, setGpsTop] = useState(0);

  useEffect(() => {
    const updateGpsPosition = () => {
      if (window.innerWidth <= 480) {
        const sidebar = document.querySelector(".sidebar");
        if (sidebar) {
          const rect = sidebar.getBoundingClientRect();
          setGpsTop(rect.top - 65); // 사이드바 바로 위 50px 위치
        }
      } else {
        setGpsTop(0); // 데스크탑 초기화
      }
    };

    updateGpsPosition();
    window.addEventListener("resize", updateGpsPosition);
    return () => window.removeEventListener("resize", updateGpsPosition);
  }, []);

  return (
    <Main>
      <Header />
      <SearchContainer className="search-container">
        <SearchBox style={{ position: "relative", width: "100%" }}>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="병원 검색..."
            onClick={handleSearchInputClick}
          />
          <img
            src={require("../assets/images/돋보기.png")}
            alt="검색"
            onClick={handleSearch}
            style={{
              position: "absolute",
              right: "0px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          />

          {isDropdownOpen && (
            <div
              className="search-dropdown"
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                width: "100%",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                zIndex: 5,
              }}
            >
              {window.innerWidth >= 768 ? (
                <DropdownWrapper>
                  <Column>{renderFavorites()}</Column>
                  <Column>{renderSearchHistory()}</Column>
                </DropdownWrapper>
              ) : (
                <div style={{ padding: "10px" }}>
                  <TabSwitcher>
                    <button
                      className={activeTab === "favorites" ? "active" : ""}
                      onClick={() => setActiveTab("favorites")}
                    >
                      즐겨찾기
                    </button>
                    <button
                      className={activeTab === "history" ? "active" : ""}
                      onClick={() => setActiveTab("history")}
                    >
                      검색기록
                    </button>
                  </TabSwitcher>

                  {activeTab === "favorites"
                    ? renderFavorites()
                    : renderSearchHistory()}
                </div>
              )}
            </div>
          )}
        </SearchBox>

        <CategoryButtonsWrapper>
          {categoryList.slice(0, maxVisible).map((cat) => (
            <CategoryItem
              key={cat.label}
              onClick={() => handleCategoryClick(cat.label)}
            >
              <img src={cat.icon} alt={cat.label} />
              <span>{cat.label}</span>
            </CategoryItem>
          ))}

          <CategoryAllButton onClick={() => setIsCategoryModalOpen(true)}>
            <img src={require("../assets/icons/전체보기.png")} alt="전체보기" />
            <span>전체보기</span>
          </CategoryAllButton>
        </CategoryButtonsWrapper>
      </SearchContainer>

      <Sidebar className="sidebar">
        <div style={{ padding: "10px" }}>
          <label>정렬 기준: </label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="distance">거리순</option>
            <option value="rating">평점순</option>
          </select>
        </div>
        <div>
          {getSortedHospitals().length === 0 ? (
            <p style={{ padding: "10px", color: "#888" }}>
              주변에 적절한 병원이 없어요.
            </p>
          ) : (
            getSortedHospitals().map((h, i) => {
              const detail = getHospitalDetails(h.place_name);
              const isFavorite = !!favoriteHospitals[detail?.id];
              const score = parseFloat(detail?.score || 0);

              return (
                <HospitalItem key={i} onClick={() => handleHospitalClick(h)}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3>{h.place_name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(h.place_name);
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <img
                        src={
                          isFavorite
                            ? require("../assets/images/채운 별.png")
                            : require("../assets/images/빈 별.png")
                        }
                        alt="즐겨찾기"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                  </div>

                  {score !== null && (
                    <div style={{ margin: "4px 0" }}>{renderRating(score)}</div>
                  )}

                  <p style={{ color: "#555", fontSize: "14px" }}>
                    {detail?.openHour && isHospitalOpen(detail.openHour)
                      ? "영업 중"
                      : "영업 종료"}{" "}
                    · 리뷰 {detail?.reviewCount ?? 0}개
                  </p>
                </HospitalItem>
              );
            })
          )}
        </div>
      </Sidebar>

      <MapContainer style={{ position: "relative" }}>
        <GpsButton
          style={
            window.innerWidth <= 480
              ? { top: `${gpsTop}px` }
              : { bottom: "20px", left: "10px" }
          }
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                const newCenter = {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude,
                };
                setState((prev) => ({
                  ...prev,
                  center: newCenter,
                }));

                const mapInstance = mapRef.current;
                if (mapInstance && mapInstance.panTo) {
                  mapInstance.panTo(
                    new window.kakao.maps.LatLng(newCenter.lat, newCenter.lng)
                  );
                }
              });
            }
          }}
        >
          <img
            src={require("../assets/images/gps버튼.png")}
            alt="내 위치"
            style={{ width: "35px", height: "35px" }}
          />
        </GpsButton>

        <Map
          center={state.center}
          style={{ width: "100%", height: "100%" }}
          level={3}
          ref={mapRef}
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
                {selectedHospital.imgURL && (
                  <img
                    src={selectedHospital.imgURL}
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

      {isCategoryModalOpen && (
        <CategoryModalOverlay onClick={() => setIsCategoryModalOpen(false)}>
          <CategoryModalContent onClick={(e) => e.stopPropagation()}>
            <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                onMouseOver={(e) => (e.currentTarget.style.background = "#eee")}
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "4px 10px",
                  borderRadius: "8px",
                  transition: "background 0.2s",
                }}
              >
                ✕
              </button>
            </div>

            {categoryList.map((cat) => (
              <CategoryItem
                key={cat.label}
                onClick={() => {
                  handleCategoryClick(cat.label);
                  setIsCategoryModalOpen(false);
                }}
              >
                <img src={cat.icon} alt={cat.label} />
                <span>{cat.label}</span>
              </CategoryItem>
            ))}
          </CategoryModalContent>
        </CategoryModalOverlay>
      )}

      {selectedHospital && (
        <Sidebar>
          <div>
            <img
              src={require("../assets/images/뒤로가기.png")}
              onClick={handleGoBack}
              alt="뒤로가기"
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2 style={{ margin: 0 }}>{selectedHospital.name}</h2>
              <button
                onClick={() => toggleFavorite(selectedHospital.name)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <img
                  src={
                    !!favoriteHospitals[
                      String(getHospitalDetails(selectedHospital.name)?.id)
                    ]
                      ? require("../assets/images/채운 별.png")
                      : require("../assets/images/빈 별.png")
                  }
                  alt="즐겨찾기"
                  style={{ width: "22px", height: "22px" }}
                />
              </button>
            </div>
            <p>{selectedHospital.address}</p>
            <p>{renderRating(parseFloat(selectedHospital.score))}</p>
            {selectedHospital.imgUrl && (
              <img
                src={selectedHospital.imgUrl}
                alt="병원 이미지"
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <h3>운영 시간</h3>
            {formatOpenHours(selectedHospital.openHour)}
            <h3>리뷰</h3>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "0px",
                background: "#fdfdfd",
              }}
            >
              <textarea
                placeholder="리뷰를 남겨보세요"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                style={{
                  width: "94%",
                  minHeight: "60px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <span
                      key={val}
                      onClick={() => handleRatingClick(val)}
                      style={{
                        cursor: "pointer",
                        fontSize: "22px",
                        color: val <= reviewRating ? "red" : "lightgray",
                      }}
                    >
                      <BsStarFill />
                    </span>
                  ))}
                  <span
                    style={{ marginLeft: 8, fontSize: "14px", color: "#333" }}
                  >
                    {reviewRating.toFixed(1)}
                  </span>
                </div>
                <button
                  onClick={handleReviewSubmit}
                  style={{
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  {editingReviewId ? "수정" : "등록"}
                </button>
              </div>
            </div>
            {renderReviews()}
          </div>
        </Sidebar>
      )}
    </Main>
  );
}

export default HospitalMap;
