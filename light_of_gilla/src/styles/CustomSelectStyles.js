import styled from 'styled-components';

// 모바일 기준 (갤럭시 S24)
const mobile = '@media screen and (max-width: 480px)';
// 태블릿 ~ 작은 데스크탑
const tablet = '@media screen and (max-width: 1024px)';

export const Container = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
${mobile} {
    
     margin:7px;
    }

`;

export const Label = styled.label`
  font-size: 16px;
  margin-right: 10px;
`;

export const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  width: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;

  option:hover {
    background-color: rgb(255, 234, 208); /* ✅ hover 시 배경색 */
  }

`;

export const Message = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: black;
`;