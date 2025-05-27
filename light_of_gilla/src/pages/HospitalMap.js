import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import {
  Main,
  MapContainer,
  Sidebar,
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
  ShimmerOverlay,
  SortingButton,
  SortingButtonWrapper,
  SearchContainer,
  ModeSwitcher,
  ModeButton,
  SearchBoxWrapper,
  SearchInput,
  SearchIcon,
} from "../styles/HospitalMapStyles";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import AuthModalManager from "../pages/Login_Singup_Modal/AuthModalManager";

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
    return localStorage.getItem("sortOption") || "recommend";
  });
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [likedReviews, setLikedReviews] = useState({});
  const [favoriteHospitals, setFavoriteHospitals] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [editingReviewId, setEditingReviewId] = useState(null);
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
  const [highlightedHospitalName, setHighlightedHospitalName] = useState(null);
  const [selectedHospitalLoading, setSelectedHospitalLoading] = useState(false);
  const [mode, setMode] = useState("symptom");
  const inputWrapperRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [showDepartments, setShowDepartments] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const renderStars = (score) => {
    const full = Math.floor(score);
    const half = score % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {[...Array(full)].map((_, i) => (
          <BsStarFill
            key={`f-${i}`}
            style={{ color: "red", fontSize: "14px" }}
          />
        ))}
        {half && <BsStarHalf style={{ color: "red", fontSize: "14px" }} />}
        {[...Array(empty)].map((_, i) => (
          <BsStar key={`e-${i}`} style={{ color: "gray", fontSize: "14px" }} />
        ))}
      </div>
    );
  };
  const geocoder = new window.kakao.maps.services.Geocoder();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const ensureLogin = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  // 좋아요 토글
  const toggleLike = async (reviewId) => {
    if (!ensureLogin()) return;
    const userNickname = localStorage.getItem("nickname");
    if (!userNickname || !reviewId) return;

    try {
      const res = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/${reviewId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-Name": encodeURIComponent(userNickname),
          },
        }
      );

      if (res.ok && selectedHospital?.id) {
        const updatedRes = await fetch(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${selectedHospital.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-User-Name": encodeURIComponent(userNickname),
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
    if (!ensureLogin()) return;
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
              "X-User-Name": encodeURIComponent(userNickname),
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
              "X-User-Name": encodeURIComponent(userNickname),
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
          // 추가 전 10개 초과 시 가장 오래된 항목 삭제
          const keys = Object.keys(newFavorites);
          if (keys.length >= 10) {
            delete newFavorites[keys[0]]; // FIFO
          }

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
              "X-User-Name": encodeURIComponent(userNickname),
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
          const newLatLng = new window.kakao.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
          );

          mapRef.current?.panTo(newLatLng); // 먼저 지도 이동

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
      fetchRatingsForHospitals(hospitals); // 병원 리스트가 변경될 때 자동 호출
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
  const fetchRatingsForHospitals = async (hospitalList = []) => {
    setState((prev) => ({ ...prev, isLoading: true })); // 로딩 시작

    const newDetails = {};

    await Promise.all(
      hospitalList.map(async (h) => {
        try {
          const res = await fetch(
            `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/hospitals/search?name=${encodeURIComponent(
              h.place_name
            )}`
          );
          const [details] = await res.json();

          let reviewCount = 0;
          let avgScore = 0;

          if (details?.id) {
            // 리뷰 목록 조회
            const reviewRes = await fetch(
              `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${details.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-User-Name": encodeURIComponent(
                    localStorage.getItem("nickname") || ""
                  ),
                },
              }
            );
            const reviews = await reviewRes.json();
            reviewCount = Array.isArray(reviews) ? reviews.length : 0;

            // 평균 평점 조회
            const avgRes = await fetch(
              `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${details.id}/average-rating`
            );
            const avg = await avgRes.text();
            avgScore = parseFloat(avg);
          }

          if (details?.id && details?.name) {
            newDetails[h.place_name] = {
              ...details,
              id: details.id,
              reviewCount,
              score: isNaN(avgScore) ? 0 : avgScore,
            };
          }
        } catch {
          newDetails[h.place_name] = { score: 0, reviewCount: 0 };
        }
      })
    );

    setHospitalDetails(newDetails);
    setState((prev) => ({ ...prev, isLoading: false })); // 로딩 종료
  };

  const fetchHospitals = (lat, lng, category = "HP8") => {
    const ps = new window.kakao.maps.services.Places();
    setState((prev) => ({ ...prev, isLoading: true }));

    setSelectedHospital(null); // ← 추가
    setSelectedPosition(null); // ← 추가

    ps.categorySearch(
      category,
      async (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setHospitals(data);
          if (mapRef.current && window.kakao && data.length > 0) {
            const bounds = new window.kakao.maps.LatLngBounds();
            data.forEach((h) => {
              bounds.extend(new window.kakao.maps.LatLng(h.y, h.x));
            });
            mapRef.current.setBounds(bounds);
          }

          await fetchRatingsForHospitals(data);
          setState((prev) => ({ ...prev, isLoading: false }));
        } else {
          setHospitals([]);
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      },
      {
        location: new window.kakao.maps.LatLng(lat, lng),
        radius: 3000,
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

    // 병원들의 영업 상태 분류
    const open = [];
    const closed = [];
    const unknown = [];

    sorted.forEach((h) => {
      const detail = getHospitalDetails(h.place_name);
      const status = isHospitalOpen(detail?.openHour);

      if (status === "open") open.push(h);
      else if (status === "closed") closed.push(h);
      else unknown.push(h);
    });

    // 정렬 함수 정의
    const applySorting = (list) => {
      if (sortOption === "rating") {
        list.sort((a, b) => {
          const aScore = parseFloat(
            getHospitalDetails(a.place_name).score || 0
          );
          const bScore = parseFloat(
            getHospitalDetails(b.place_name).score || 0
          );
          return bScore - aScore;
        });
      } else if (sortOption === "recommend") {
        list.sort((a, b) => {
          const aScore = parseFloat(
            getHospitalDetails(a.place_name).score || 0
          );
          const bScore = parseFloat(
            getHospitalDetails(b.place_name).score || 0
          );
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
          const aWeighted = 8 * (1 / (aDist + 1)) + 2 * aScore;
          const bWeighted = 8 * (1 / (bDist + 1)) + 2 * bScore;
          return bWeighted - aWeighted;
        });
      } else {
        list.sort((a, b) => {
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
      return list;
    };

    // 만약 영업 중인 병원이 있다면 우선적으로 출력
    if (open.length > 0) {
      return [
        ...applySorting(open),
        ...applySorting(closed),
        ...applySorting(unknown),
      ];
    }

    // 영업 중 없음 → 기존 방식 유지
    return applySorting(sorted);
  };

  // 정렬 옵션 설정
  const handleSortChange = (value) => {
    setSortOption(value);
    localStorage.setItem("sortOption", value);
  };

  // 진료 시간
  const formatOpenHours = (openHours) => {
    if (
      !openHours ||
      (typeof openHours === "string" && openHours.trim() === "{}")
    ) {
      return <p style={{ color: "#888" }}>운영시간 정보가 없어요</p>;
    }

    try {
      const parsed =
        typeof openHours === "string"
          ? JSON.parse(openHours.replace(/'/g, '"'))
          : openHours;

      if (!parsed || Object.keys(parsed).length === 0) {
        return <p style={{ color: "#888" }}>운영시간 정보가 없어요</p>;
      }

      const dayOrder = ["월", "화", "수", "목", "금", "토", "일"];
      const todayIndex = new Date().getDay();
      const todayLabel = ["일", "월", "화", "수", "목", "금", "토"][todayIndex];

      return dayOrder.map((day) => {
        const time = parsed[day];
        const isToday = day === todayLabel;

        return (
          <p
            key={day}
            style={{
              fontWeight: isToday ? "bold" : "normal",
              margin: "8px 0",
            }}
          >
            {day}: {time ?? "휴무일"}
          </p>
        );
      });
    } catch (e) {
      console.error("운영시간 파싱 오류:", e);
      return <p style={{ color: "#888" }}>운영시간 정보가 없어요</p>;
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
            "X-User-Name": encodeURIComponent(userNickname),
          },
          body: JSON.stringify({
            author: userNickname,
            content: editedReviewContent,
            rating: editedReviewRating,
          }),
        }
      );

      const result = await response.json();
      alert("리뷰가 수정되었습니다.");
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
            <h4 style={{ margin: 0 }}>{r.author}</h4>
            <div style={{ marginTop: "6px" }}>{renderRating(r.rating)}</div>

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
    setSelectedHospitalLoading(true);
    try {
      // 병원 정보 조회
      const res = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/hospitals/search?name=${encodeURIComponent(
          h.place_name
        )}`
      );
      const [details] = await res.json();

      // 평균 평점 조회
      const avgRatingRes = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${details.id}/average-rating`
      );
      const avgScore = await avgRatingRes.text();
      const parsedScore = parseFloat(avgScore);

      // 선택 병원 상태 업데이트
      setSelectedHospital({
        ...details,
        score: isNaN(parsedScore) ? 0 : parsedScore,
        id: details.id,
      });

      setSelectedPosition({ lat: parseFloat(h.y), lng: parseFloat(h.x) });

      // 병원 목록용 상태도 반영
      setHospitalDetails((prev) => ({
        ...prev,
        [details.name]: {
          ...prev[details.name],
          ...details,
          score: isNaN(parsedScore) ? 0 : parsedScore,
        },
      }));

      // 리뷰 목록 조회
      const reviewRes = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${details.id}`,
        {
          headers: {
            "X-User-Name": encodeURIComponent(
              localStorage.getItem("nickname") || ""
            ),
          },
        }
      );
      const reviewList = await reviewRes.json();
      setHospitalReviews(Array.isArray(reviewList) ? reviewList : []);
      initializeLikedReviews(reviewList);

      // 지도를 선택 병원 위치로 이동
      const mapInstance = mapRef.current;
      if (mapInstance) {
        smoothPanTo(parseFloat(h.y), parseFloat(h.x));
      }
    } catch (err) {
      console.error("병원 상세 또는 리뷰 데이터 요청 실패", err);
      setHospitalReviews([]);
    } finally {
      setSelectedHospitalLoading(false); // 로딩 종료
    }
  };

  const departmentList = [
    "내과",
    "외과",
    "치과",
    "이비인후과",
    "피부과",
    "소아과",
    "안과",
    "비뇨기과",
    "정형외과",
    "정신건강의학과",
    "산부인과",
    "성형외과",
    "신경외과",
    "가정의학과",
  ];

  const handleSearchInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // 병원 검색 모드가 아닐 경우 자동완성 사용 안 함
    if (mode !== "keyword" || !value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/hospitals/search?name=${encodeURIComponent(
          value
        )}`
      );
      const results = await res.json();

      const seen = new Set();
      const unique = results.filter((h) => {
        const key = `${h.name}_${h.address}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setSuggestions(
        unique.filter((h) => !h.name.includes("약국")).slice(0, 100)
      );
    } catch (e) {
      console.error("자동완성 실패:", e);
      setSuggestions([]);
    }
  };

  // 검색 로직
  const handleSearch = async (customTerm) => {
    const rawTerm = customTerm ?? searchTerm;
    const trimmedTerm = typeof rawTerm === "string" ? rawTerm.trim() : "";

    setSelectedHospital(null); // ← 추가
    setSelectedPosition(null); // ← 선택 마커도 제거

    if (!trimmedTerm) return;

    if (mode === "keyword") {
      saveSearchKeyword(trimmedTerm);
    }

    if (["약국", "응급실"].includes(trimmedTerm)) {
      handleCategoryClick(trimmedTerm);
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    if (mode === "symptom") {
      const dept = await fetchDepartmentFromSymptom(trimmedTerm);
      if (dept && departmentList.includes(dept)) {
        handleCategoryClick(dept);
      } else {
        alert("적절한 진료과를 찾을 수 없어요.");
      }
      return;
    }

    // 병원 검색 모드: 키워드 검색으로 병원 목록 불러오기
    ps.keywordSearch(
      trimmedTerm,
      async (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const hospitalResults = data.filter(
            (item) =>
              item.category_group_code === "HP8" ||
              item.category_group_code === "PM9"
          );

          const filtered = filterHospitalsWithin2km(hospitalResults);
          const uniqueHospitals = deduplicateHospitals(filtered);
          setHospitals(uniqueHospitals);

          await fetchRatingsForHospitals(uniqueHospitals);

          if (mapRef.current && filtered.length > 0) {
            const lat = parseFloat(filtered[0].y);
            const lng = parseFloat(filtered[0].x);
            mapRef.current.panTo(new window.kakao.maps.LatLng(lat, lng));
          }
        } else {
          setHospitals([]);
        }
      },
      {
        location: new window.kakao.maps.LatLng(
          state.center.lat,
          state.center.lng
        ),
      }
    );
    setSuggestions([]);
  };

  // 카테고리 버튼
  const handleCategoryClick = (category) => {
    const ps = new window.kakao.maps.services.Places();
    setState((prev) => ({ ...prev, isLoading: true }));

    setSelectedHospital(null); // ← 추가
    setSelectedPosition(null); // ← 추가

    ps.keywordSearch(
      category,
      async (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const nearby = filterHospitalsWithin2km(data);
          setHospitals(nearby);
          await fetchRatingsForHospitals(nearby);
          setState((prev) => ({ ...prev, isLoading: false }));

          if (mapRef.current && window.kakao && nearby.length > 0) {
            const avgLat =
              nearby.reduce((sum, h) => sum + parseFloat(h.y), 0) /
              nearby.length;
            const avgLng =
              nearby.reduce((sum, h) => sum + parseFloat(h.x), 0) /
              nearby.length;

            const map = mapRef.current;

            map.setLevel(5); // 먼저 레벨 조정
            smoothPanTo(avgLat, avgLng); // 이후 부드럽게 이동
          }
        } else {
          setHospitals([]);
          setState((prev) => ({ ...prev, isLoading: false }));
        }
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

  const handleGoBack = () => {
    setSelectedHospital(null);
    setSelectedPosition(null);
  };

  const handleSearchInputClick = () => {
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(e.target) &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
            "X-User-Name": encodeURIComponent(userNickname),
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
    if (!ensureLogin()) return;
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
          "X-User-Name": encodeURIComponent(userNickname),
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(
        editingReviewId ? "리뷰 수정 완료" : "리뷰 등록 완료",
        result
      );

      await refreshSelectedHospital();

      setReviewContent("");
      setReviewRating(5);
      setEditingReviewId(null);

      // 등록 성공 후 reviewCount 증가
      if (!editingReviewId) {
        setHospitalDetails((prev) => {
          const current = prev[selectedHospital.name];
          return {
            ...prev,
            [selectedHospital.name]: {
              ...current,
              reviewCount: (current?.reviewCount || 0) + 1,
            },
          };
        });
        alert("리뷰가 등록되었습니다.");
      }
    } catch (e) {
      console.error("❌ 리뷰 저장 실패:", e);
    }
  };

  // 리뷰 삭제
  const handleDeleteReview = async (reviewId) => {
    const userNickname = localStorage.getItem("nickname");
    if (!userNickname || !reviewId) return;

    const confirmed = window.confirm("리뷰를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-User-Name": encodeURIComponent(userNickname),
          },
        }
      );
      // 최신 리뷰 및 평균 평점 다시 반영
      await refreshSelectedHospital();

      // hospitalDetails 내 reviewCount 업데이트
      const hospitalId = selectedHospital.id;
      const updatedReviewRes = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${hospitalId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Name": encodeURIComponent(userNickname),
          },
        }
      );
      const updatedReviews = await updatedReviewRes.json();
      const updatedCount = Array.isArray(updatedReviews)
        ? updatedReviews.length
        : 0;

      setHospitalDetails((prev) => ({
        ...prev,
        [selectedHospital.name]: {
          ...prev[selectedHospital.name],
          reviewCount: updatedCount,
        },
      }));
      alert("리뷰가 삭제되었습니다.");
    } catch (e) {
      console.error("❌ 리뷰 삭제 실패:", e);
    }
  };

  // 선택 병원 정보 갱신
  const refreshSelectedHospital = async () => {
    if (!selectedHospital?.name) return;

    try {
      // 병원 정보 가져오기
      const res = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/hospitals/search?name=${encodeURIComponent(
          selectedHospital.name
        )}`
      );
      const [details] = await res.json();

      // 평균 평점 API 호출
      const avgRatingRes = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${details.id}/average-rating`
      );
      const avgScore = await avgRatingRes.text(); // 예: "4.2"
      const parsedScore = parseFloat(avgScore);

      // 병원 상태 업데이트
      setSelectedHospital((prev) => ({
        ...prev,
        ...details,
        score: isNaN(parsedScore) ? 0 : parsedScore,
      }));

      // 병원 목록용 평점 정보도 업데이트
      setHospitalDetails((prev) => ({
        ...prev,
        [details.name]: {
          ...prev[details.name],
          ...details,
          score: isNaN(parsedScore) ? 0 : parsedScore,
        },
      }));

      // 리뷰 목록 갱신
      const reviewRes = await fetch(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/${details.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Name": encodeURIComponent(
              localStorage.getItem("nickname") || ""
            ),
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
    const confirmed = window.confirm("검색기록을 모두 삭제하시겠습니까?");
    if (!confirmed) return;

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
      alert("검색기록이 모두 삭제되었습니다.");
    } catch (e) {
      console.error("검색기록 전체 삭제 실패", e);
    }
  };

  // 즐겨찾기 전체 삭제
  const handleClearFavorites = () => {
    const confirmed = window.confirm("즐겨찾기를 모두 삭제하시겠습니까?");
    if (!confirmed) return;

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
              "X-User-Name": encodeURIComponent(userNickname),
            },
          }
        )
      )
    )
      .then(() => {
        setFavoriteHospitals({});
        alert("즐겨찾기가 모두 삭제되었습니다.");
      })
      .catch((e) => console.error("전체 즐겨찾기 삭제 실패", e));
  };

  // 4. 즐겨찾기 렌더링 함수
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
            onClick={() => {
              setIsDropdownOpen(false);
              searchAndSelectHospitalByName(hospital.name);
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
              saveSearchKeyword(item.keyword);
              setIsDropdownOpen(false);

              if (["약국", "응급실"].includes(item.keyword)) {
                handleCategoryClick(item.keyword); // ← 카테고리 검색
              } else {
                searchAndSelectHospitalByName(item.keyword); // ← 일반 병원 검색
              }
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

        const refreshed = await fetch(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/search/history`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const updatedHistory = await refreshSearchHistory();

        // 10개 초과 시 오래된 항목 삭제
        if (Array.isArray(updatedHistory) && updatedHistory.length > 10) {
          const sorted = [...updatedHistory].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          const excess = sorted.length - 10;

          for (let i = 0; i < excess; i++) {
            await fetch(
              `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/search/history/${sorted[i].id}`,
              {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              }
            );
          }
        }

        // 최신 검색 기록 다시 불러오기
        refreshSearchHistory();
      })
      .catch((e) => {
        console.error("검색 기록 처리 실패", e);
      });
  };

  // 검색기록 API 호출
  useEffect(() => {
    refreshSearchHistory();
  }, []);

  const refreshSearchHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return [];

    try {
      const res = await fetch(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/search/history",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const history = await res.json();

      if (Array.isArray(history)) {
        const sorted = [...history].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        if (sorted.length > 10) {
          const trimmed = sorted.slice(0, 10); // 최신순 상위 10개만 유지
          setSearchHistory(trimmed);
          return trimmed;
        }

        setSearchHistory(sorted);
        return sorted;
      } else {
        setSearchHistory([]);
        return [];
      }
    } catch (e) {
      console.error("검색기록 갱신 실패", e);
      setSearchHistory([]);
      return [];
    }
  };

  // 영업 정보 파싱
  const parseOpenHourString = (raw) => {
    if (!raw || typeof raw !== "string") return null;

    try {
      const normalized = raw.replace(/'/g, '"');
      return JSON.parse(normalized);
    } catch (e) {
      console.warn("openHour 파싱 실패:", raw);
      return null;
    }
  };

  // 영업 여부 판단함수
  const isHospitalOpen = (openHourString) => {
    if (!openHourString || openHourString === "{}") return "none";

    try {
      const hours = parseOpenHourString(openHourString);
      if (!hours || typeof hours !== "object") return "none";

      const now = new Date();
      const today = ["일", "월", "화", "수", "목", "금", "토"][now.getDay()];
      const timeStr = hours[today];

      if (
        !timeStr ||
        typeof timeStr !== "string" ||
        timeStr === "휴무" ||
        !timeStr.includes("~")
      ) {
        return "closed";
      }

      const [start, end] = timeStr.split("~").map((t) => t.trim());
      const nowTime = now.getHours() * 60 + now.getMinutes();
      const [sH, sM] = start.split(":").map(Number);
      const [eH, eM] = end.split(":").map(Number);

      return nowTime >= sH * 60 + sM && nowTime <= eH * 60 + eM
        ? "open"
        : "closed";
    } catch (e) {
      console.error("isHospitalOpen 오류:", e);
      return "none";
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

  const categoryWrapperRef = useRef(null);

  useEffect(() => {
    const el = categoryWrapperRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY; // 수직 스크롤을 좌우로 전환
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const filterHospitalsWithin2km = (list) =>
    list.filter((h) => {
      const distance = getDistance(
        state.center.lat,
        state.center.lng,
        parseFloat(h.y),
        parseFloat(h.x)
      );
      return distance <= 2500;
    });

  useEffect(() => {
    if (inputWrapperRef.current) {
      const rect = inputWrapperRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: "100%",
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isDropdownOpen]);

  // GPT 호출
  const fetchDepartmentFromSymptom = async (symptom) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // .env에 설정

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "사용자가 증상을 입력하면, 그에 해당하는 진료과를 한국어로 대답하세요. 예: '배가 아파요' → '내과'. 다른 설명은 하지 마세요. 단, 내과, 가정의학과, 치과, 이비인후과, 소아과, 피부과, 산부인과, 안과, 정형외과, 비뇨기과, 신경외과, 외과, 성형외과, 정신건강의학과 중 하나로면 대답하세요.",
            },
            {
              role: "user",
              content: symptom,
            },
          ],
          temperature: 0.2,
        }),
      });

      const data = await res.json();
      const department = data?.choices?.[0]?.message?.content?.trim();
      console.log("GPT-4o 진료과 응답:", department);
      return department;
    } catch (e) {
      console.error("GPT-4o 호출 실패:", e);
      return null;
    }
  };

  const getDepartmentStats = () => {
    const deptSet = new Set();
    const validLabels = categoryList.map((c) => c.label); // 카테고리 리스트 기준

    hospitals.forEach((h) => {
      let dept = h.category_name;

      if (typeof dept === "string") {
        // 예: "의료,건강 > 병원 > 피부과 (2)"
        const parts = dept.split(" > ");
        dept = parts[parts.length - 1];
        dept = dept.replace(/\s*\(\d+\)/, ""); // 괄호 숫자 제거 → '피부과'
      }

      if (dept && validLabels.includes(dept)) {
        deptSet.add(dept);
      }
    });

    return Array.from(deptSet); // ['피부과', '정형외과', ...]
  };

  const categoryIconMap = Object.fromEntries(
    categoryList.map((item) => [item.label, item.icon])
  );

  const searchAndSelectHospitalByName = (hospitalName) => {
    const ps = new window.kakao.maps.services.Places();
    setSelectedHospitalLoading(true);

    ps.categorySearch(
      "HP8",
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const matched = data.find(
            (item) =>
              item.place_name === hospitalName ||
              item.place_name.includes(hospitalName) ||
              hospitalName.includes(item.place_name)
          );

          if (matched) {
            handleHospitalClick(matched);
            smoothPanTo(parseFloat(matched.y), parseFloat(matched.x));
          } else {
            ps.keywordSearch(hospitalName, (res, stat) => {
              if (
                stat === window.kakao.maps.services.Status.OK &&
                res.length > 0
              ) {
                handleHospitalClick(res[0]);
                smoothPanTo(parseFloat(res[0].y), parseFloat(res[0].x));
              } else {
                alert("병원 위치를 찾을 수 없습니다.");
                setSelectedHospitalLoading(false);
              }
            });
          }
        } else {
          setSelectedHospitalLoading(false);
        }
      },
      {
        location: new window.kakao.maps.LatLng(
          state.center.lat,
          state.center.lng
        ),
        radius: 3000,
      }
    );
  };

  const deduplicateHospitals = (list) => {
    const seen = new Set();
    return list.filter((h) => {
      const key = `${h.place_name}_${h.address_name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const smoothPanTo = (targetLat, targetLng) => {
    const map = mapRef.current;
    if (!map) return;

    const currentCenter = map.getCenter();
    const currentLat = currentCenter.getLat();
    const currentLng = currentCenter.getLng();

    const distance = getDistance(currentLat, currentLng, targetLat, targetLng);

    if (distance < 1000) {
      // 가까우면 panTo로 충분
      map.panTo(new window.kakao.maps.LatLng(targetLat, targetLng));
      return;
    }

    // 멀면 직접 보간 이동
    const steps = 30;
    const duration = 500; // 총 0.5초
    const delay = duration / steps;

    let step = 0;

    const deltaLat = (targetLat - currentLat) / steps;
    const deltaLng = (targetLng - currentLng) / steps;

    const interval = setInterval(() => {
      step++;
      const newLat = currentLat + deltaLat * step;
      const newLng = currentLng + deltaLng * step;

      map.setCenter(new window.kakao.maps.LatLng(newLat, newLng));

      if (step >= steps) {
        clearInterval(interval);
      }
    }, delay);
  };

  const handleDirectionsClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const locPosition = new window.kakao.maps.LatLng(lat, lng);

          geocoder.coord2Address(lng, lat, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const detailAddr =
                result[0].road_address?.address_name ||
                result[0].address?.address_name ||
                "출발지";

              const destName = selectedHospital?.name;
              const url = `https://map.kakao.com/?sName=${encodeURIComponent(
                detailAddr
              )}&eName=${encodeURIComponent(destName)}`;

              window.open(url, "_blank");
            } else {
              alert("현 위치 주소를 찾을 수 없습니다.");
            }
          });
        },
        () => {
          alert("현 위치 정보를 가져올 수 없습니다.");
        }
      );
    } else {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  };

  return (
    <Main>
      <Header />
      <SearchContainer className="search-container">
        <ModeSwitcher>
          <ModeButton
            $active={mode === "symptom"}
            $mode="symptom"
            onClick={() => setMode("symptom")}
          >
            증상 검색
          </ModeButton>
          <ModeButton
            $active={mode === "keyword"}
            $mode="keyword"
            onClick={() => setMode("keyword")}
          >
            병원 검색
          </ModeButton>
        </ModeSwitcher>
        <SearchBoxWrapper ref={inputWrapperRef}>
          <SearchInput
            ref={inputRef}
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            placeholder={
              mode === "symptom"
                ? "증상을 입력하세요"
                : "병원 이름 또는 진료과를 입력하세요"
            }
            onClick={handleSearchInputClick}
            mode={mode}
          />

          <SearchIcon
            src={require("../assets/images/돋보기.png")}
            alt="검색"
            onClick={() => {
              if (!searchTerm.trim()) {
                alert("검색어를 입력해주세요.");
                return;
              }
              handleSearch();
            }}
          />
          {isDropdownOpen && (
            <div
              className="search-dropdown"
              ref={dropdownRef}
              style={{
                position: "absolute",
                top: "100%",
                left: "calc(10% - 29px)",
                width: "calc(80% + 55px)",
                maxWidth: "calc(80% + 55px)",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                zIndex: 5,
              }}
            >
              {suggestions.length > 0 ? (
                <div
                  style={{
                    maxHeight: "320px",
                    overflowY: "auto",
                  }}
                >
                  {suggestions.map((s, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSearchTerm(s.name);
                        saveSearchKeyword(s.name);
                        setIsDropdownOpen(false);
                        searchAndSelectHospitalByName(s.name);
                      }}
                      style={{
                        padding: "12px 14px",
                        borderBottom: "1px solid #eee",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "15px",
                          flexShrink: 0,
                        }}
                      >
                        {s.name}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          flexShrink: 0,
                        }}
                      >
                        {renderStars(s.score)}
                        <span style={{ fontSize: "13px", color: "#333" }}>
                          {parseFloat(s.score || 0).toFixed(1)}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: "12px",
                          color: "#666",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          flex: 1,
                        }}
                      >
                        {s.address ?? "주소 정보 없음"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // 🔸 즐겨찾기 + 검색기록 (기존 UI 유지)
                <>
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
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid #eee",
                      width: "99%",
                      margin: "8px auto",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      padding: "3px 9px 10px 0",
                    }}
                  >
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "16px",
                        cursor: "pointer",
                        color: "#999",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#000")
                      }
                      onMouseOut={(e) => (e.currentTarget.style.color = "#999")}
                    >
                      닫기
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </SearchBoxWrapper>

        <CategoryButtonsWrapper ref={categoryWrapperRef}>
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
        <SortingButtonWrapper>
          <SortingButton
            $active={sortOption === "recommend"}
            onClick={() => handleSortChange("recommend")}
          >
            <span>추천순</span>
          </SortingButton>
          <SortingButton
            $active={sortOption === "distance"}
            onClick={() => handleSortChange("distance")}
          >
            <span>거리순</span>
          </SortingButton>
          <SortingButton
            $active={sortOption === "rating"}
            onClick={() => handleSortChange("rating")}
          >
            <span>평점순</span>
          </SortingButton>
        </SortingButtonWrapper>
        <hr />

        {/* 현재 검색된 진료과 요약 표시 */}
        <div
          style={{
            padding: "0 10px 10px 10px",
            fontSize: "15px",
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexWrap: "wrap",
          }}
        >
          {(() => {
            const stats = getDepartmentStats();
            const count = hospitals.length;
            if (stats.length === 0 || count === 0) return null;

            return (
              <>
                {stats.slice(0, 2).map((dept) => (
                  <div
                    key={dept}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <img
                      src={categoryIconMap[dept]}
                      alt={dept}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        boxShadow: "0 0 8px rgba(255, 107, 107, 0.7)",
                        border: "2px solid #ff6b6b",
                        padding: "3px",
                        backgroundColor: "#fff",
                      }}
                    />

                    <span style={{ fontWeight: 500 }}>{dept}</span>
                  </div>
                ))}
                <span style={{ color: "#666" }}>
                  을 포함한{" "}
                  <strong style={{ color: "#ff6b6b" }}>{count}</strong>개의
                  병원이 검색되었어요
                </span>
              </>
            );
          })()}
        </div>

        <div>
          {state.isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <img
                src={require("../assets/images/spinner.gif")}
                alt="로딩 중"
                style={{ width: "40px", height: "40px" }}
              />
            </div>
          ) : getSortedHospitals().length === 0 ? (
            <p style={{ padding: "10px", color: "#888" }}>
              주변에 적절한 병원이 없어요.
            </p>
          ) : (
            getSortedHospitals().map((h, i) => {
              const detail = getHospitalDetails(h.place_name);
              const isFavorite = !!favoriteHospitals[detail?.id];
              const score = parseFloat(detail?.score || 0);

              const distance = getDistance(
                state.center.lat,
                state.center.lng,
                parseFloat(h.y),
                parseFloat(h.x)
              );
              const distanceInMeters = Math.round(distance);

              return (
                <HospitalItem
                  key={i}
                  onClick={() => handleHospitalClick(h)}
                  style={{
                    border:
                      i === 0
                        ? "2px solid #FFD700"
                        : i === 1
                        ? "2px solid #C0C0C0"
                        : i === 2
                        ? "2px solid #CD7F32"
                        : "2px solid #eee",
                    boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                    background:
                      i === 0
                        ? "linear-gradient(to right, #fff8dc, #fff)"
                        : i === 1
                        ? "linear-gradient(to right, #f0f0f0, #fff)"
                        : i === 2
                        ? "linear-gradient(to right, #fdf5e6, #fff)"
                        : "white",
                    borderRadius: "10px",
                    margin: "8px 8px",
                    width: "90%",
                  }}
                >
                  {i < 3 && <ShimmerOverlay />}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {i < 3 && (
                          <span
                            style={{
                              alignSelf: "flex-start",
                              backgroundColor:
                                i === 0
                                  ? "#FFD700"
                                  : i === 1
                                  ? "#C0C0C0"
                                  : "#CD7F32",
                              color: "white",
                              fontSize: "10px",
                              padding: "2px 6px",
                              borderRadius: "10px",
                              marginTop: "4px",
                            }}
                          >
                            TOP {i + 1}
                          </span>
                        )}
                        <h3 style={{ margin: 0, wordBreak: "keep-all" }}>
                          {h.place_name}
                        </h3>
                      </div>

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
                      <div style={{ margin: "4px 0" }}>
                        {renderRating(score)}
                      </div>
                    )}

                    <p
                      style={{
                        display: "flex",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      <span
                        style={{
                          color:
                            isHospitalOpen(detail?.openHour) === "open"
                              ? "green"
                              : isHospitalOpen(detail?.openHour) === "closed"
                              ? "red"
                              : "#888",
                          marginRight: "16px",
                        }}
                      >
                        {
                          {
                            open: "영업 중",
                            closed: "영업 종료",
                            none: "영업 정보 없음",
                          }[isHospitalOpen(detail?.openHour)]
                        }
                      </span>

                      <span style={{ marginRight: "20px" }}>
                        리뷰 {detail?.reviewCount ?? 0}개
                      </span>

                      <span>{distanceInMeters}m</span>
                    </p>
                  </div>
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

                smoothPanTo(newCenter.lat, newCenter.lng);
                setState((prev) => ({
                  ...prev,
                  center: newCenter,
                }));
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
          level={4}
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
            const lat = parseFloat(h.y);
            const lng = parseFloat(h.x);

            // 겹침 방지를 위한 위치 보정
            const offset = 0.00004; // 약 4~5m 정도
            const adjustedLat =
              lat + (i % 3 === 1 ? offset : i % 3 === 2 ? -offset : 0);
            const adjustedLng =
              lng + (i % 3 === 1 ? -offset : i % 3 === 2 ? offset : 0);

            // 마커 이미지 설정
            let markerSrc;
            let markerSize = { width: 80, height: 85 };
            let markerOffset = { x: 20, y: 45 };

            if (i === 0) {
              markerSrc = require("../assets/images/one.png");
            } else if (i === 1) {
              markerSrc = require("../assets/images/two.png");
            } else if (i === 2) {
              markerSrc = require("../assets/images/three.png");
            } else {
              markerSrc = require("../assets/images/병원마커.png");
              markerSize = { width: 25, height: 27 };
              markerOffset = { x: 14, y: 32 };
            }

            return (
              <MapMarker
                key={i}
                position={{ lat: adjustedLat, lng: adjustedLng }}
                onClick={() => handleHospitalClick(h)}
                image={{
                  src: markerSrc,
                  size: markerSize,
                  options: { offset: markerOffset },
                }}
                zIndex={5 - i}
              />
            );
          })}

          {selectedHospital && selectedPosition && (
            <CustomOverlayMap
              position={selectedPosition}
              xAnchor={0.43} // 왼쪽으로 이동 (기본값은 0.5)
              yAnchor={1.6} // 마커보다 위로 이동 (기본값은 0.5)
              zIndex={10}
            >
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "250px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  fontSize: "14px",
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

      {selectedHospitalLoading ? (
        <Sidebar>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={require("../assets/images/spinner.gif")}
              alt="로딩 중"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        </Sidebar>
      ) : selectedHospital ? (
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
              <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold" }}>
                {selectedHospital.name}
              </h1>

              <div style={{ display: "flex", gap: "12px" }}>
                {/* 길찾기 버튼 */}
                <button
                  onClick={handleDirectionsClick}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <img
                    src={require("../assets/images/길찾기.png")}
                    alt="길찾기"
                    style={{ width: "24px", height: "24px" }}
                  />
                </button>

                {/* 즐겨찾기 버튼 */}
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
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <p style={{ margin: 0 }}>{selectedHospital.address}</p>

              {/* 영업 상태 텍스트만 표시 */}
              <span
                style={{
                  display: "inline-block",
                  fontSize: "14px",
                  color:
                    isHospitalOpen(selectedHospital.openHour) === "open"
                      ? "green"
                      : isHospitalOpen(selectedHospital.openHour) === "closed"
                      ? "red"
                      : "#888",
                }}
              >
                {
                  {
                    open: "영업 중",
                    closed: "영업 종료",
                    none: "영업 정보 없음",
                  }[isHospitalOpen(selectedHospital.openHour)]
                }
              </span>
            </div>
            <div>{renderRating(parseFloat(selectedHospital.score))}</div>
            {selectedHospital.imgUrl && (
              <img
                src={selectedHospital.imgUrl}
                alt="병원 이미지"
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <hr style={{ margin: "16px 0", borderColor: "#eee" }} />
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              운영 시간
            </h1>
            {formatOpenHours(selectedHospital.openHour)}
            {isHospitalOpen(selectedHospital.openHour) === "none" && (
              <a
                href={`https://search.naver.com/search.naver?query=${encodeURIComponent(
                  selectedHospital.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "14px",
                  color: "#1E90FF",
                  textDecoration: "underline",
                  display: "inline-block",
                  marginTop: "4px",
                }}
              >
                영업 정보 검색하기
              </a>
            )}
            <hr style={{ margin: "16px 0", borderColor: "#eee" }} />
            <h1 style={{ fontWeight: "bold", fontSize: "20px" }}>리뷰</h1>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "5px",
                marginTop: "15px",
                background: "#fdfdfd",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "6px" }}>✏️</span>리뷰 작성
              </div>

              {/* 입력창 */}
              <div style={{ position: "relative" }}>
                <textarea
                  placeholder="내용을 입력하세요 (최대 300자)"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  maxLength={300}
                  style={{
                    width: "100%",
                    height: "80px",
                    padding: "10px 10px 10px 10px", // 하단 패딩 확보
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    resize: "none",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "6px",
                    right: "10px",
                    fontSize: "12px",
                    color: "#999",
                    pointerEvents: "none",
                  }}
                >
                  {reviewContent.length} / 300
                </div>
              </div>

              {/* 별점 + 버튼 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "8px",
                  marginBottom: "0px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <span
                      key={val}
                      onClick={() => handleRatingClick(val)}
                      style={{
                        cursor: "pointer",
                        fontSize: "22px",
                        color: val <= reviewRating ? "red" : "#ddd",
                      }}
                    >
                      <BsStarFill />
                    </span>
                  ))}
                  <span
                    style={{ fontSize: "14px", color: "#333", marginLeft: 6 }}
                  >
                    {reviewRating.toFixed(1)}점
                  </span>
                </div>

                <button
                  onClick={handleReviewSubmit}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#e14e4e";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#ff6b6b";
                  }}
                  style={{
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    padding: "6px 14px",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  {editingReviewId ? "수정" : "등록"}
                </button>
              </div>
            </div>
            {renderReviews()}
          </div>
        </Sidebar>
      ) : null}
      {showModal && <AuthModalManager onCloseAll={() => setShowModal(false)} />}
    </Main>
  );
}

export default HospitalMap;
