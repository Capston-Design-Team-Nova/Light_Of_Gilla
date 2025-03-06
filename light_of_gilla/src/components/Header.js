import { PageHeader, Nav, NavRight, Button, ImageButton1, ImageButton2  } from '../styles/HeaderStyles';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <PageHeader>
      <Nav>
        {/* 버튼 클릭시 url 이 /~~ 으로 변경됨. 이후 이 url 변경을 Router.js 모듈의 BrowserRouter 컴포넌트가 감지하여 url에 따른 컴포넌트를 화면에 렌더링시켜줌*/}
        <Link to="/">
          <ImageButton1> {/* 버튼을 이미지 버튼으로 대체 */}
            <img src={require('../assets/images/길라로고3.png')} alt=" " />
          </ImageButton1>
        </Link>
        <NavRight>
        <Link to="/HospitalMap">
          <Button>병원&약국 찾기</Button>
        </Link>
        <Link to="/Community">
          <Button>Q&A</Button>
        </Link>
        <Link to="/Login">
          <ImageButton2>
            <img src={require('../assets/images/login2.png')} alt=" " />
          </ImageButton2>
        </Link>        
        </NavRight>
      </Nav>
    </PageHeader>
  );
}

export default Header;
