import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PageHeader,
  Nav,
  NavRight,
  Button,
  TextLogo,
  ImageButton2,
  DropdownWrapper,
  DropdownMenu,
  DropdownItem,
  LogoWrapper
} from "../styles/HeaderStyles";
import AuthModalManager from "../pages/Login_Singup_Modal/AuthModalManager";

// 기본 이미지 선언
const defaultProfileImage = require("../assets/images/login.png");
const defaultLogoImage = require("../assets/images/logo.png"); // 로고 이미지

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfileImage); // ✅ 추가
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 480; // 모바일 여부 확인

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      // top이 10px 이하면 항상 보이도록
      setVisible(isScrollingUp || currentScrollPos < 10);
      setHasShadow(currentScrollPos > 10);
      setOpacity(isScrollingUp || currentScrollPos < 10 ? 1 : 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  
    if (token) {
      axios
        .get("https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const imageUrl = res.data.profileImage;
          const baseImageUrl = "http://3.37.188.91:8080"; // ✅ 서버 이미지 주소
  
          if (imageUrl && imageUrl !== "null" && imageUrl !== "") {
            setProfileImage(`${baseImageUrl}${imageUrl}`); // ✅ 서버에서 바로 가져온 경로 사용
          } else {
            setProfileImage(defaultProfileImage); // 기본 이미지
          }
        })
        .catch((err) => {
          console.error("프로필 이미지 로딩 실패:", err);
          setProfileImage(defaultProfileImage);
        });
    } else {
      setProfileImage(defaultProfileImage); // 로그인 안 된 경우
    }
  }, [showModal]);
  
  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("nickname");
      setIsLoggedIn(false);
      setProfileImage(defaultProfileImage);
      alert("로그아웃 되었습니다.");
      window.location.href = "/"; // 메인화면으로 강제 이동
      if (location.pathname === "/mypage") {
        navigate("/");
      }
    }
  };

  return (
    <>
      <PageHeader
        style={{
          ...(isMobile
            ? { bottom: 0, top: "unset" } // ✅ 모바일일 때 top 무시
            : { top: visible ? "0" : "-80px" }),
          opacity: opacity,
          boxShadow: hasShadow ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <Nav>
          <Link to="/">
            <LogoWrapper>
              <img src={defaultLogoImage} alt="길라의 빛 로고"/>
            </LogoWrapper>
          </Link>
          <NavRight>
            <Link
              to={isLoggedIn ? "/HospitalMap" : "#"}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  setShowModal(true);
                }
              }}
            >
              <Button>병원 찾기</Button>
            </Link>

            <Link
              to={isLoggedIn ? "/Community" : "#"}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  setShowModal(true);
                }
              }}
            >
              <Button>Q&A</Button>
            </Link>

            <Link
              to={isLoggedIn ? "/faq" : "#"}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  setShowModal(true);
                }
              }}
            >
              <Button>FAQ</Button>
            </Link>

            {!isLoggedIn ? (
              <ImageButton2 onClick={() => setShowModal(true)}>
                <img src={defaultProfileImage} alt="로그인" />
              </ImageButton2>
            ) : (
              <DropdownWrapper>
                <ImageButton2 onClick={() => setIsDropdownOpen(prev => !prev)}>
                  <img
                    src={profileImage}
                    alt="프로필"
                    style={{
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      border: "2px solid white",
                      objectFit: "cover",
                      boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultProfileImage;
                    }}
                  />
                </ImageButton2>

                {isDropdownOpen && (
                  <DropdownMenu $open={isDropdownOpen}>
                    <DropdownItem onClick={() => navigate("/mypage")}>
                      🧑 마이페이지
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout} $danger>
                      🔓 로그아웃
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </DropdownWrapper>
            )}
          </NavRight>
        </Nav>
      </PageHeader>

      {showModal && <AuthModalManager onCloseAll={() => setShowModal(false)} />}
    </>
  );
}

export default Header;
