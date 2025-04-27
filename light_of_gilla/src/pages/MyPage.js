import React, {useState} from "react";
import Header from "../components/Header";
import { 
    Main, Center, Title, ProfileImageWrapper, 
    ProfileImage, UserEmail, Birthday, FormGroup, 
    Label, Input, Button, SaveButton, ErrorMessage, UserInfoWrapper, HiddenFileInput, SuccessMessage 
} from "../styles/MyPageStyles";

function MyPage() {
    const [nickname, setNickname] = useState(""); // 닉네임 입력값
  const [nicknameMessage, setNicknameMessage] = useState(""); // 결과 메시지
  const [isNicknameValid, setIsNicknameValid] = useState(false); // 성공/실패 여부
  
    const [profileImage, setProfileImage] = useState(require("../assets/images/ProfileImage.png")); // 기본 프로필

  const handleProfileClick = () => {
    document.getElementById('fileInput').click(); // 파일 선택창 열기
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const existingNicknames = ["user1", "abcd1234", "tester"]; // 가짜로 이미 존재하는 닉네임 리스트


  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleCheckNickname = () => {
    if (existingNicknames.includes(nickname)) {
      setIsNicknameValid(false);
      setNicknameMessage("이미 사용 중인 닉네임입니다.");
    } else if (nickname.trim() === "") {
      setIsNicknameValid(false);
      setNicknameMessage("닉네임을 입력해주세요.");
    } else {
      setIsNicknameValid(true);
      setNicknameMessage("사용 가능한 닉네임입니다!");
    }
  };


  return (
    <Main>
      <Header />
      <Center>
        <Title>마이페이지</Title>
        
        <ProfileImageWrapper onClick={handleProfileClick}>
          <ProfileImage src={profileImage} alt="프로필사진" />
        </ProfileImageWrapper>
        
        {/* ✅ 숨겨진 파일 인풋 */}
        <HiddenFileInput 
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />


        <UserInfoWrapper>
          <UserEmail>abcd1234@naver.com</UserEmail>
          <Birthday>1999.09.09</Birthday>
        </UserInfoWrapper>

        <FormGroup>
          <Label>이름(닉네임)</Label>
          <Input type="text" placeholder="이름을 입력하세요" />
          <Button>변경</Button>
        </FormGroup>
        
        {/* ✅ 성공/에러에 따라 메시지 다르게 띄우기 */}
        {nicknameMessage && (
          isNicknameValid ? (
            <SuccessMessage>{nicknameMessage}</SuccessMessage>
          ) : (
            <ErrorMessage>{nicknameMessage}</ErrorMessage>
          )
        )}
        

        <FormGroup>
          <Label>아이디</Label>
          <Input type="text" value="abcd1234" disabled />
        </FormGroup>

        <FormGroup>
          <Label>새 비밀번호</Label>
          <Input type="password" placeholder="새 비밀번호" />
        </FormGroup>

        <FormGroup>
          <Label>새 비밀번호 확인</Label>
          <Input type="password" placeholder="새 비밀번호 확인" />
        </FormGroup>

        <SaveButton>저장</SaveButton>
      </Center>
    </Main>
  );
}

export default MyPage;
