import React from 'react';
import { Main, Center, P } from '../styles/MainScreenStyles';
import Header from '../components/Header';

function MainScreen() {

    return (
        <Main>
            <Header />
            <Center>
                <P>GILLA</P>
                
            </Center>
        </Main>
    );
}

export default MainScreen;