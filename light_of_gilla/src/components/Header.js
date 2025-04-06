import { useState } from "react";
import {
  PageHeader,
  Nav,
  NavRight,
  Button,
  ImageButton1,
  ImageButton2,
} from "../styles/HeaderStyles";
import { Link } from "react-router-dom";
import AuthModalManager from "../pages/Login_Singup_Modal/AuthModalManager";

function Header() {
  const [showModal, setShowModal] = useState(false); // 로그인 모달 상태 관리

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
            <ImageButton2 onClick={() => setShowModal(true)}>
              <img src={require("../assets/images/login2.png")} alt=" " />
            </ImageButton2>
          </NavRight>
        </Nav>
      </PageHeader>

      {/* 모달 렌더링 */}
      {showModal && <AuthModalManager onCloseAll={() => setShowModal(false)} />}
    </>
  );
}

export default Header;
