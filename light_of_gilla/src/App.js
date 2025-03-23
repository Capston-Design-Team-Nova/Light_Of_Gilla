import React from 'react';
import Router from './routes/Router';


const App = () => {
  return (
    <>
      {/* Router 컴포넌트를 호출하여 라우팅 기능을 포함시킴. 
      따라서 사용자가 애플리케이션 내에서 경로를 탐색할 때, Router에 정의된 대로 적절한 컴포넌트가 화면에 표시됨*/}
      <Router />
    </>
  );
};

export default App;