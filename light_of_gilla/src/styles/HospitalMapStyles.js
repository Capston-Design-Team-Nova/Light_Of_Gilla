import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 300px; /* PageHeader의 높이에 맞는 여백 추가 */
`;

export const MapContainer = styled.div`
  width: 600px;
  height: 500px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;
