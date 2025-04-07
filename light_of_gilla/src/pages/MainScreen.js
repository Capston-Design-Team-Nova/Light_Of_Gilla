import React,{useEffect} from 'react';
import { Main, Center, P, P3,P4, FeaturesSection, FeatureImage, FeatureBox, FeatureBox2, FeaturesContainer, Footer,LastSection, P2 } from '../styles/MainScreenStyles';
import Header from '../components/Header';
import featureImage1 from '../assets/images/featureImage1.png';
import featureImage2 from '../assets/images/featureImage2.png';
//import AnimatedFeatureBox from '../components/AnimatedFeatureBox';


function MainScreen() {
    useEffect(() => {
        document.body.className = 'body-MainScreen';
        return () => {
            document.body.className = '';
        };
    }, []);

    return (
        <Main>
            <Header />
            <Center>                                
                
            </Center>
            <FeaturesSection>
                {/*<h2>GILLA 소개</h2>*/}
                <FeaturesContainer>
                    <FeatureBox>
                        <FeatureImage src={featureImage1} alt="기능1" />
                        <P4>무슨 병원을 가야할지 모르겠다면? 챗봇에게 물어보세요</P4>
                    </FeatureBox>
                    <FeatureBox>
                        <FeatureImage src={featureImage2} alt="기능2" />
                        <P4>언제 어디서나 다른 사람들과 함께 증상에 대한 지식을 공유해보세요.</P4>
                    </FeatureBox>
                    
                </FeaturesContainer>
            </FeaturesSection>
            <LastSection>
                <P>GILLA의 모든 서비스를 이용하고 싶다면?</P>
                <P2>로그인하세요</P2>
                <P3>로그인 & 회원가입 하러가기 {'>'}</P3>
                
            </LastSection>
            <Footer>{/* TEAM NOVA FROM HANSUNG UNIVERSITY, SEOUL, REPUBLIC OF KOREA \n */}  ©2025 LIGHT OF GILLA ALL RIGHTS RESERVED. </Footer>
        </Main>
    );
}

export default MainScreen;