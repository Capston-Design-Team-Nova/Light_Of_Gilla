import React,{useEffect} from 'react';
import { Main, Center, P, FeaturesSection, Feature, FeaturesContainer, Footer } from '../styles/MainScreenStyles';
import Header from '../components/Header';

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
                <h2>GILLA 소개</h2>
                <FeaturesContainer>
                <Feature>
                    <h3>기능 1</h3>
                    <P>이곳에서 첫 번째 기능을 설명합니다.</P>
                </Feature>
                <Feature>
                    <h3>기능 2</h3>
                    <p>이곳에서 두 번째 기능을 설명합니다.</p>
                </Feature>
                <Feature>
                    <h3>기능 3</h3>
                    <p>이곳에서 세 번째 기능을 설명합니다.</p>
                </Feature>
                </FeaturesContainer>
            </FeaturesSection>
            <Footer>{/* TEAM NOVA FROM HANSUNG UNIVERSITY, SEOUL, REPUBLIC OF KOREA \n */}  ©2025 LIGHT OF GILLA ALL RIGHTS RESERVED. </Footer>
        </Main>
    );
}

export default MainScreen;