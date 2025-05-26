import React, { useEffect, useState } from 'react';
import { 
    Main, Center, P, P3, P4, CardContainer, Card, CardImage, CardTitle, CardText,
    PrimaryButton, SecondaryButton, TertiaryButton, Footer, IconWrapper,
    QnAButton, HeroPrimaryButton, P2 ,LinkButton, Button, ButtonWrapper, OverlayTitle, Intro, P5
} from '../styles/MainScreenStyles';
import Header from '../components/Header';
import featureImage1 from '../assets/images/featureImage1.png';
import featureImage2 from '../assets/images/featureImage2.png';
import featureImage3 from '../assets/images/featureImage3.png';
import featureImage4 from '../assets/images/featureImage4.png';
import AOS from "aos";
import "aos/dist/aos.css";
import AuthModalManager from "../pages/Login_Singup_Modal/AuthModalManager"; // ✅ 로그인 모달 추가
import { useNavigate } from 'react-router-dom'; // ✅ 추가


function MainScreen() {
    const [showModal, setShowModal] = useState(false); // ✅ 모달 상태 추가
    const navigate = useNavigate(); // ✅ useNavigate 훅

    const handleNavigateWithAuth = (path) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setShowModal(true); // 로그인 안 되어 있으면 모달 열기
        } else {
            navigate(path); // 로그인 되어 있으면 이동
        }
    };
    useEffect(() => {
        document.body.className = 'body-Center';
        AOS.init({
            duration: 800,
            once: false
        });

        return () => {
            document.body.className = '';
        };
    }, []);

    return (
        <Main>
            <Header />
            <Center>
            <div className="hero-text-wrapper">
                <OverlayTitle data-aos="fade-down">Light of Gilla</OverlayTitle>
                <P3 data-aos="fade-up" data-aos-delay="200">가장 가까운 병원을 빠르게 찾으세요</P3>
                <ButtonWrapper>
                    <HeroPrimaryButton onClick={() => navigate("/HospitalMap")}>병원&약국 찾기 <br/>바로가기 {'>'} </HeroPrimaryButton>
                </ButtonWrapper>
            </div>
            </Center>
            <Intro>
            <IconWrapper>💡</IconWrapper>
            <P>길라의 빛 소개</P>

            <P4>
                「길라의 빛」은 주변 병원으로 가는 방법을 알려주는 <br />
                <strong>길라잡이의 빛</strong>이라는 뜻을 가지고 있습니다.
            </P4>

            <P5>
                주변 병원과 약국을 쉽고 빠르게 찾을 수 있도록 도와드리겠습니다.
            </P5>

            <P4 style={{ marginTop: '20px' }}>
                🧭 길라의 빛은 <strong>거리 8 : 평점 2의 비율</strong>로 병원을 추천합니다.<br />
                검색창에서 <strong>증상 검색 모드</strong> 또는 <strong>병원 검색 모드</strong>를 선택하여<br />
                OpenAI 기반 AI가 적절한 병원을 안내해드립니다.
            </P4>
            </Intro>
           

            <CardContainer>
                <Card data-aos="fade-up" data-aos-delay="100">
                    <CardImage src={featureImage1} alt="병원 찾기" />
                    <CardTitle>병원과 약국 찾기</CardTitle>
                    <CardText>거리와 평점으로 병원을 똑똑하게 추천해드려요!
                    검색창에 증상만 입력해도 AI가 알아서 찾아줍니다.</CardText>
                    <PrimaryButton onClick={() => navigate("/HospitalMap")}>바로가기 &gt;</PrimaryButton>
                </Card>

                <Card data-aos="fade-up" data-aos-delay="300">
                    <CardImage src={featureImage2} alt="Q&A" />
                    <CardTitle>Q&A 확인</CardTitle>
                    <CardText>증상에 대한 지식을 나누고 FAQ에서 전문가의 답변도 확인할 수 있어요.</CardText>
                    <SecondaryButton onClick={() => navigate("/Community")}>Q&A 바로가기 &gt;</SecondaryButton>
                </Card>

                <Card data-aos="fade-up" data-aos-delay="500">
                    <CardImage src={featureImage4} alt="전문가 Q&A" />
                    <CardTitle>전문가 Q&A</CardTitle>
                    <CardText>
                        자주 묻는 질문에 대해 의사들이 직접 답변합니다. 신뢰할 수 있는 의료 정보를 확인해보세요.
                    </CardText>
                    <QnAButton onClick={() => navigate("/faq")}>전문가 답변 보기 &gt;</QnAButton>
                </Card>

                <Card data-aos="fade-up" data-aos-delay="700">
                    <CardImage src={featureImage3} alt="로그인" />
                    <CardTitle>로그인하고 더 많은 기능을!</CardTitle>
                    <CardText>즐겨찾기, 커뮤니티, 병원 관리 기능까지 자유롭게 사용해보세요.</CardText>
                    <TertiaryButton onClick={() => {
                    const token = localStorage.getItem("token");
                    if (!token) setShowModal(true);
                    else alert("이미 로그인하셨습니다.");
                    }} variant="tertiary">로그인 / 회원가입 &gt;</TertiaryButton>
                </Card>

            </CardContainer>
            <Footer>
                <strong>LIGHT OF GILLA (길라의 빛)</strong><br />
                한성대학교 컴퓨터공학부 캡스톤 디자인 <strong>Team Nova</strong><br />
                팀장: 김어진 | 팀원: 김나영, 유현서, 이종민<br />
                <small>© 2025 LIGHT OF GILLA. All rights reserved.</small>
            </Footer>
            {showModal && <AuthModalManager onCloseAll={() => setShowModal(false)} />} {/* ✅ 모달 렌더 */}
        </Main>
    );
}

export default MainScreen;
