import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PageHeader,
  Nav,
  NavRight,
  Button,
  ImageButton1,
  ImageButton2,
  DropdownWrapper,
  DropdownMenu,
  DropdownItem,
} from "../styles/HeaderStyles";
import AuthModalManager from "../pages/Login_Singup_Modal/AuthModalManager";

// 기본 이미지 선언
const defaultProfileImage = require("../assets/images/login2.png");

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfileImage); // ✅ 추가

  const location = useLocation();
  const navigate = useNavigate();

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
          if (imageUrl && imageUrl !== "null" && imageUrl !== "") {
            setProfileImage(imageUrl);
          } else {
            setProfileImage(defaultProfileImage);
          }
        })
        .catch((err) => {
          console.error("프로필 이미지 로딩 실패:", err);
          setProfileImage(defaultProfileImage);
        });
    } else {
      setProfileImage(defaultProfileImage);
    }
  }, [showModal]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    setIsLoggedIn(false);
    setProfileImage(defaultProfileImage);
    alert("로그아웃 되었습니다.");
    window.location.href = "/"; // 메인화면으로 강제 이동
    if (location.pathname === "/mypage") {
      navigate("/");
    }
  };

  return (
    <>
      <PageHeader>
        <Nav>
          <Link to="/">
            <ImageButton1>
              <img src={require("../assets/images/길라로고3.png")} alt=" " />
            </ImageButton1>
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
              <Button>병원&약국 찾기</Button>
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

            {!isLoggedIn ? (
              <ImageButton2 onClick={() => setShowModal(true)}>
                <img src={defaultProfileImage} alt="로그인" />
              </ImageButton2>
            ) : (
              <DropdownWrapper
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <ImageButton2>
                  <img
                    src={profileImage}
                    alt="프로필"
                    style={{ borderRadius: "50%", width: "36px", height: "36px" }} // 원형
                  />
                </ImageButton2>
                {isDropdownOpen && (
                  <DropdownMenu>
                    <DropdownItem as={Link} to="/mypage">
                      마이페이지
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
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
