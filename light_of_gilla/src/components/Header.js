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
import LoginModal from "../pages/LoginModal";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 로그인 모달 상태 관리

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
            {/* 로그인 버튼 클릭 시 로그인 모달 열기 */}
            <ImageButton2 onClick={() => setIsModalOpen(true)}>
              <img src={require("../assets/images/login2.png")} alt=" " />
            </ImageButton2>
          </NavRight>
        </Nav>
      </PageHeader>

      {/* 모달 렌더링 (isModalOpen이 true일 때만 보이게) */}
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Header;
