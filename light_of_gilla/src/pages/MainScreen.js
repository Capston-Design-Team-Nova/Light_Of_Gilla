import React, { useEffect, useState } from 'react';
import { 
    Main, Center, P, P3, P4, FeaturesSection, FeatureImage, 
    FeatureBox1, FeatureBox2, FeaturesContainer, Footer, RowContainer,
    LastSection, MobileOnlyBr, P2 ,LinkButton, Button, ButtonWrapper, OverlayTitle, Intro, P5
} from '../styles/MainScreenStyles';
import Header from '../components/Header';
import featureImage1 from '../assets/images/featureImage1.png';
import featureImage2 from '../assets/images/featureImage2.png';
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
            
            <Center/>
            <Intro data-aos="fade-up">
                <P>길라의 빛 소개</P>
                <P4 data-aos="fade-up" data-aos-delay="400"> "길라의 빛"은 "주변 병원으로 가는 방법을 알려주는 길라잡이의 빛"이라는 뜻을 가지고 있습니다. </P4>
                <P5 data-aos="fade-up" data-aos-delay="600">주변 병원과 약국을 쉽고, 빠르게 찾을 수 있도록 도와드리겠습니다. </P5>
                
                </Intro>
           

            <FeaturesSection data-aos="fade-up">
                <FeaturesContainer data-aos="fade-up">
                    <RowContainer>
                        <FeatureBox1 data-aos="fade-up" data-aos-delay="100">
                            <FeatureImage src={featureImage1} alt="기능1" />
                            <P4> 거리 8: 평점 2 비율로 계산한 기본정렬 방식으로<br/> 병원을 추천해드리고 있습니다. <br/> 무슨 병원을 가야할지 모르겠다면? 챗봇에게 물어보세요</P4>
                        </FeatureBox1>
                        <ButtonWrapper>
                            <LinkButton to="/HospitalMap">병원&약국 찾기 <br/>바로가기 {'>'} </LinkButton>
                        </ButtonWrapper>
                    </RowContainer>
                    <RowContainer>
                        <FeatureBox2 data-aos="fade-up" data-aos-delay="500">
                            <FeatureImage src={featureImage2} alt="기능2" />
                            <P4>언제 어디서나 다른 사람들과 함께 증상에 대한 지식을 공유해보세요. 또한, FAQ에서 전문가의 답변을 확인할 수 있습니다. </P4>
                        </FeatureBox2>
                        <ButtonWrapper>
                            <Button onClick={() => handleNavigateWithAuth('/Community')}>Q&A 바로가기 {'>'}</Button>
                        </ButtonWrapper>
                    
                    </RowContainer>                   
                </FeaturesContainer>
            </FeaturesSection>

            <LastSection data-aos="fade-up">
                <P data-aos="fade-up" data-aos-delay="0">GILLA의 모든 서비스를 이용하고 싶다면?</P>
                <P2 data-aos="fade-up" data-aos-delay="600">로그인하세요</P2>
                <P3 data-aos="fade-up" data-aos-delay="800" style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        setShowModal(true); // ✅ 로그인 안 되어 있으면 모달 열기
                    } else {
                        alert("이미 로그인하셨습니다. 서비스를 자유롭게 이용해보세요!"); // ✅ 로그인 상태면 안내
                        }
                    }}>  로그인 & 회원가입 하러가기 {'>'}</P3>

            </LastSection>

            <Footer> LIGHT OF GILLA(길라의 빛) <br />한성대학교 컴퓨터공학부 캡스톤 디자인 Team Nova 팀장: 김어진, 팀원: 김나영, 유현서, 이종민 <br />©2025 LIGHT OF GILLA ALL RIGHTS RESERVED.  </Footer>

            {showModal && <AuthModalManager onCloseAll={() => setShowModal(false)} />} {/* ✅ 모달 렌더 */}
        </Main>
    );
}

export default MainScreen;
