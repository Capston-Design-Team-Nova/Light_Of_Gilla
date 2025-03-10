import React, { useEffect } from "react";
import Header from "../components/Header";
import { Main, MapContainer } from "../styles/HospitalMapStyles";

const { kakao } = window;

function HospitalMap() {
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 초기 좌표
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  return (
    <Main>
      <Header />
      <MapContainer id="map" />
    </Main>
  );
}

export default HospitalMap;
