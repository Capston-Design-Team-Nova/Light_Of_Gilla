import { useState } from "react";
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
import LoginModal from "../pages/LoginModal";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 로그인 모달 상태 관리
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);

  let timer1, timer2;

  const handleMouseEnter1 = () => {
    timer1 = setTimeout(() => setShowTooltip1(true), 3000);
  };

  const handleMouseLeave1 = () => {
    clearTimeout(timer1);
    setShowTooltip1(false);
  };

  const handleMouseEnter2 = () => {
    timer2 = setTimeout(() => setShowTooltip2(true), 3000);
  };

  const handleMouseLeave2 = () => {
    clearTimeout(timer2);
    setShowTooltip2(false);
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
            {/* 로그인 버튼 클릭 시 로그인 모달 열기 */}
            <ImageButton2 onClick={() => setIsModalOpen(true)} onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>
              <img src={require("../assets/images/login2.png")} alt=" " />
              {showTooltip2 && <Tooltip>로그인,회원가입</Tooltip>}
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
