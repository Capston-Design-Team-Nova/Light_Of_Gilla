import React,{useEffect} from 'react';
import { Main, Center, P, P3,P4, FeaturesSection, FeatureImage, FeatureBox1, FeatureBox2, FeaturesContainer, Footer,LastSection,MobileOnlyBr, P2 } from '../styles/MainScreenStyles';
import Header from '../components/Header';
import featureImage1 from '../assets/images/featureImage1.png';
import featureImage2 from '../assets/images/featureImage2.png';
//import AnimatedFeatureBox from '../components/AnimatedFeatureBox';
import AOS from "aos";
import "aos/dist/aos.css";


function MainScreen() {
    useEffect(() => {
        document.body.className = 'body-MainScreen';
        AOS.init({
            duration: 800, // 애니메이션 지속 시간 (ms)
            once: false     // 여러번 실행되게
          });
      
        return () => {
            document.body.className = '';
        };
    }, []);

    return (
        <Main>
            <Header />
            <Center>                                
                
            </Center>
            <FeaturesSection data-aos="fade-up">
                {/*<h2>GILLA 소개</h2>*/}
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
                <P3 data-aos="fade-up" data-aos-delay="800">로그인 & 회원가입 하러가기 {'>'}</P3>
            </LastSection>

            <Footer>{/* TEAM NOVA FROM HANSUNG UNIVERSITY, SEOUL, REPUBLIC OF KOREA \n */}  ©2025 LIGHT OF GILLA ALL RIGHTS RESERVED. </Footer>
        </Main>
    );
}

export default MainScreen;