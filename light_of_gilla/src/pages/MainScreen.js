import React, { useEffect, useState } from 'react';
import { 
    Main, Center, P, P3, P4, FeaturesSection, FeatureImage, 
    FeatureBox1, FeatureBox2, FeaturesContainer, Footer, 
    LastSection, MobileOnlyBr, P2 
} from '../styles/MainScreenStyles';
import Header from '../components/Header';
import featureImage1 from '../assets/images/featureImage1.png';
import featureImage2 from '../assets/images/featureImage2.png';
import AOS from "aos";
import "aos/dist/aos.css";
import AuthModalManager from "../pages/Login_Singup_Modal/AuthModalManager"; // ✅ 로그인 모달 추가

function MainScreen() {
    const [showModal, setShowModal] = useState(false); // ✅ 모달 상태 추가

    useEffect(() => {
        document.body.className = 'body-MainScreen';
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
            <Center />
            
            <FeaturesSection data-aos="fade-up">
                <FeaturesContainer data-aos="fade-up">
                    <FeatureBox1 data-aos="fade-up" data-aos-delay="100">
                        <FeatureImage src={featureImage1} alt="기능1" />
                        <P4>무슨 병원을 가야할지 모르겠다면? 챗봇에게 물어보세요</P4>
                    </FeatureBox1>
                    <FeatureBox2 data-aos="fade-up" data-aos-delay="500">
                        <FeatureImage src={featureImage2} alt="기능2" />
                        <P4>언제 어디서나 다른 사람들과 함께 증상에 대한 지식을 공유해보세요.</P4>
                    </FeatureBox2>
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

            <Footer> LIGHT OF GILLA(길라의 빛) <br />한성대학교 컴퓨터공학부 캡스톤 디자인 Team Nova <br />©2025 LIGHT OF GILLA ALL RIGHTS RESERVED.  </Footer>

            {showModal && <AuthModalManager onCloseAll={() => setShowModal(false)} />} {/* ✅ 모달 렌더 */}
        </Main>
    );
}

export default MainScreen;
