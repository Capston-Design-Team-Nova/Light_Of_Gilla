import { useEffect, useState } from "react";
import {
  PageHeader,
  Nav,
  NavRight,
  Button,
  ImageButton1,
  ImageButton2,
  Tooltip,
} from "../styles/HeaderStyles";
import { Link } from "react-router-dom";
import AuthModalManager from "../pages/Login_Singup_Modal/AuthModalManager";

function Header() {
  const [showModal, setShowModal] = useState(false); // 로그인 모달 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부

  // 로그인 상태를 localStorage에서 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [showModal]); // showModal 변경 시 로그인 상태 다시 확인

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
  };

  return (
    <>
      <PageHeader>
        <Nav>
          <Link to="/">
            <ImageButton1 onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}>
              <img src={require("../assets/images/길라로고3.png")} alt=" " />
              {showTooltip1 && <Tooltip>메인화면</Tooltip>}
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
              <ImageButton2 onClick={handleLogout}>
                <img
                  src={require("../assets/images/login2.png")}
                  alt="로그아웃"
                />
              </ImageButton2>
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
