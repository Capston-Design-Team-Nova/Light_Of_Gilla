import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "../pages/MainScreen";
import HospitalMap from "../pages/HospitalMap";

import Community from "../pages/CommunityPage/Community";
import Write from "../pages/CommunityPage/CommunityWS";
import MyArticles from "../pages/CommunityPage/MyArticles";
import MyComments from "../pages/CommunityPage/MyComments";
import MyLikes from "../pages/CommunityPage/MyLikes";
import CommunityView from "../pages/CommunityPage/CommunityView";
import FAQ from "../pages/CommunityPage/FAQ";

//React Router는 SPA(Single Page Application)의 화면 렌더링을 구현하는 데 도움을 주는 라이브러리.
//즉, 페이지 전체를 새로고침하지 않고 url의 변경에 따라 컴포넌트를 동적으로 렌더링하여 SPA의 핵심적인 기능을 제공.

//아래의 Router컴포넌트: 애플리케이션의 라우팅을 관리하며, 정의된 경로에 따라 적절한 컴포넌트를 렌더링해주는 컴포넌트
function Router() {
  return (
    <BrowserRouter>
      {/* BrowserRouter는 리액트 애플리케이션에서 클라이언트 측 라우팅을 관리하는 최상위 컴포넌트. a 태그와는 달리 url의 변화에  따른 페이지의 새로고침 과정이 없기때문에 사용자가 쉽고 부드럽게 웹앱을 사용할 수 있도록 도움. 그 하위에 있는 모든 라우팅 관련 컴포넌트(Routes, Route 등)를 감싸줌. 브라우저의 History API를 사용하여 URL을 관리하고 URL 변경을 감지하는 컴포넌트.*/}

      {/* Routes 컴포넌트는 여러 Route 컴포넌트를 감싸는 형태.
             Link URL이 변경될 때 Routes는 하위에 정의된 Route들 중에서 현재 URL과 일치하는 첫 번째 경로를 찾아 해당 컴포넌트를 App.js의 <div className='div-App'> 안에 렌더링*/}

      {/* path 속성으로 URL 경로를 설정하고, component 속성으로 해당 경로에서 렌더링할 컴포넌트를 지정.
            "/"는 애플리케이션의 루트 경로.*/}

      {/*  전체적인 workflow=> BrowserRouter 컴포넌트는 URL 변경을 감지하고 -> Routes컴포넌트는 변경된 url에 맞는 Route컴포넌트를 찾아서 해당 Route컴포넌트의 element 속성값인 컴포넌트를 렌더링 시켜줌*/}
      {/*<BodyStyleUpdater /> */}

      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/HospitalMap" element={<HospitalMap />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/Write" element={<Write />} />
        <Route path="/MyArticles" element={<MyArticles />} />
        <Route path="/MyComments" element={<MyComments />} />
        <Route path="/MyLikes" element={<MyLikes />} />
        <Route path="/FAQ" element={<FAQ />} />
        {/*<Route path="/View" element={<View />}/>*/}
        <Route path="/post/:id" element={<CommunityView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
