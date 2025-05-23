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
  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      axios
        .get(
          "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const imageUrl = res.data.profileImage;
          const baseImageUrl = "http://3.37.188.91:8080"; // 서버 이미지 주소

          if (imageUrl && imageUrl !== "null" && imageUrl !== "") {
            setProfileImage(`${baseImageUrl}${imageUrl}`); // 서버에서 바로 가져온 경로 사용
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
            <Link to={"/HospitalMap"}>
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

            <Link to={"/faq"}>
              <Button>FAQ</Button>
            </Link>

            {!isLoggedIn ? (
              <ImageButton2 onClick={() => setShowModal(true)}>
                <img src={defaultProfileImage} alt="로그인" />
              </ImageButton2>
            ) : (
              <DropdownWrapper>
                <ImageButton2
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <img
                    src={profileImage}
                    alt="프로필"
                    style={{
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                    }} // 원형
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultProfileImage;
                    }}
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
