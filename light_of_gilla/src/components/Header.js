import { useEffect, useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // ✅ 드롭다운 열림 여부
  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [showModal]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");

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
            <Link to="/HospitalMap">
              <Button>병원&약국 찾기</Button>
            </Link>
            <Link to="/Community">
              <Button>Q&A</Button>
            </Link>

            {!isLoggedIn ? (
              <ImageButton2 onClick={() => setShowModal(true)}>
                <img
                  src={require("../assets/images/login2.png")}
                  alt="로그인"
                />
              </ImageButton2>
            ) : (
              <DropdownWrapper
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <ImageButton2>
                  <img
                    src={require("../assets/images/login2.png")}
                    alt="프로필"
                  />
                </ImageButton2>
                {isDropdownOpen && (
                  <DropdownMenu>
                    <DropdownItem as={Link} to="/mypage">마이페이지</DropdownItem>
                    <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
                  </DropdownMenu>
                )}
              </DropdownWrapper>
            )}
          </NavRight>
        </Nav>
      </PageHeader>

      {/* 모달 렌더링 */}
      {showModal && <AuthModalManager onCloseAll={() => setShowModal(false)} />}
    </>
  );
}

export default Header;
