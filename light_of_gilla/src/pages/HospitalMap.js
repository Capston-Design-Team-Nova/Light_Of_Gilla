import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import {
  Main,
  MapContainer,
  Sidebar,
  SearchContainer,
  SearchBox,
  SearchInput,
  CategoryButtons,
  HospitalItem,
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

  const toggleLike = (reviewIndex) => {
    setLikedReviews((prev) => ({ ...prev, [reviewIndex]: !prev[reviewIndex] }));
  };

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

  useEffect(() => {
    if (sortOption === "rating") {
      fetchRatingsForHospitals();
    }
  }, [hospitals, sortOption]);

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
          if (details && details.name && details.id) {
            newDetails[h.place_name] = {
              ...details,
              id: details.id,
            };
          }
        } catch (e) {
          newDetails[h.place_name] = { score: 0 };
        }
      }),
      console.log(newDetails)
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
      { location: new window.kakao.maps.LatLng(lat, lng) }
    );
  };

  const getHospitalDetails = (name) => hospitalDetails[name] || { score: 0 };

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

  const renderReviews = () => {
    if (!Array.isArray(hospitalReviews) || hospitalReviews.length === 0) {
      return <p>리뷰가 없습니다.</p>;
    }

    const validReviews = hospitalReviews.filter(
      (r) =>
        typeof r.author === "string" &&
        typeof r.content === "string" &&
        r.content.trim() !== "" &&
        typeof r.rating === "number" &&
        !isNaN(r.rating)
    );

    if (validReviews.length === 0) {
      return <p>유효한 리뷰가 없습니다.</p>;
    }

    return validReviews.map((r, i) => {
      const liked = likedReviews[i] || false;
      const displayedLikes = liked ? r.likes + 1 : r.likes;
      const isMine = r.author === localStorage.getItem("nickname");

      return (
        <div
          key={r.id}
          style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
        >
          <h4>{r.author}</h4>
          <div>{renderRating(r.rating)}</div>
          <p>{r.content}</p>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <p style={{ marginRight: "10px" }}>
              {new Date(r.createdAt).toLocaleDateString("ko-KR")}
            </p>
            <button
              onClick={() => toggleLike(i)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              <img
                src={
                  liked
                    ? require("../assets/images/채운 하트.png")
                    : require("../assets/images/빈 하트.png")
                }
                alt="좋아요"
                style={{ width: "18px", height: "18px", marginRight: "6px" }}
              />
              {displayedLikes}
            </button>
            {isMine && (
              <>
                <button
                  onClick={() => {
                    setReviewContent(r.content);
                    setReviewRating(r.rating);
                    setEditingReviewId(r.id);
                  }}
                  style={{ marginLeft: "10px", fontSize: "14px" }}
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteReview(r.id)}
                  style={{
                    marginLeft: "5px",
                    fontSize: "14px",
                    color: "red",
                  }}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      );
    });
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

      // 리뷰 요청
      const reviewRes = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${details.id}`
      );
      const reviewList = await reviewRes.json();
      setHospitalReviews(Array.isArray(reviewList) ? reviewList : []);
    } catch (err) {
      console.error("병원 상세 또는 리뷰 데이터 요청 실패", err);
      setHospitalReviews([]);
    }
  };

  const symptomToCategory = {
    두통: "신경과",
    치통: "치과",
    소화불량: "내과",
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

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;

    const matchedCategory = symptomToCategory[trimmedTerm];
    if (matchedCategory) {
      // 진료과에 해당하는 검색어일 경우 해당 카테고리(들)로 검색
      matchedCategory.split(",").forEach((cat) => {
        handleCategoryClick(cat.trim());
      });
    } else {
      // 일반 키워드 검색 수행
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(
        trimmedTerm,
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
    }
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

  const scrollCategory = (direction) => {
    const scrollContainer = document.getElementById("category-scroll");
    const scrollAmount = 150;

    if (!scrollContainer) return;

    if (direction === "left") {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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

  const refreshSelectedHospital = async () => {
    if (!selectedHospital?.name) return;
    try {
      const res = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/hospitals/search?name=${encodeURIComponent(
          selectedHospital.name
        )}`
      );
      const [details] = await res.json();

      setSelectedHospital(details);
      console.log("📥 병원 상세 데이터 재로딩 완료", details);

      // 리뷰도 다시 로딩
      const reviewRes = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${details.id}`
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
                top: "100%", // 바로 아래에 위치
                left: 0,
                width: "100%",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                zIndex: 5,
              }}
            >
              <h4 style={{ margin: "10px" }}>⭐ 즐겨찾기 병원</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {Object.values(favoriteHospitals).map((hospital, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      const matched = hospitals.find(
                        (h) => h.place_name === hospital.name
                      );
                      if (matched) handleHospitalClick(matched);
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                      cursor: "pointer",
                    }}
                  >
                    {hospital.name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(hospital.id);
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "red",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </SearchBox>

        <CategoryButtons>
          <button
            className="scroll-btn left-btn"
            onClick={() => scrollCategory("left")}
          >
            ◀
          </button>

          <div className="category-scroll" id="category-scroll">
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
              "마치통증의학과",
              "비뇨기과",
              "신경과",
              "병리과",
              "가정의학과",
            ].map((cat) => (
              <button key={cat} onClick={() => handleCategoryClick(cat)}>
                #{cat}
              </button>
            ))}
          </div>

          <button
            className="scroll-btn right-btn"
            onClick={() => scrollCategory("right")}
          >
            ▶
          </button>
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
          {getSortedHospitals().map((h, i) => {
            const detail = getHospitalDetails(h.place_name);
            const isFavorite = !!favoriteHospitals[detail?.id];
            const hospitalDetail = getHospitalDetails(h.place_name);
            const score = hospitalDetail?.score
              ? parseFloat(hospitalDetail.score)
              : 0;

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

                {/* 평점 표시 추가 */}
                {score !== null && (
                  <div style={{ margin: "4px 0" }}>{renderRating(score)}</div>
                )}

                <p>{h.road_address_name || h.address_name}</p>
              </HospitalItem>
            );
          })}
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
                placeholder="댓글을 남겨보세요"
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
