import React, { useEffect, useState } from "react";
import axios from "axios";
//import axios from "../api/axiosInstance";
import Header from "../components/Header";
import {
  Main, Center, Title, ProfileImageWrapper, ProfileImage, UserEmail,PhoneNumber,
  FormGroup, Label, Input, Button, SaveButton, ErrorMessage,TitleRow,
  UserInfoWrapper, HiddenFileInput, SuccessMessage, Birthday,WithdrawButton, 
  ReviewButton,ReviewButtonRow
} from "../styles/MyPageStyles";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImage, setProfileImage] = useState(require("../assets/images/ProfileImage.png"));

  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("token");

  const [originalNickname, setOriginalNickname] = useState("");
  
  const handleProfileClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
  const defaultProfileImage = require("../assets/images/ProfileImage.png");
  useEffect(() => {
    if (token) {
      axios
        .get("https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setUserId(data.userId);
          setEmail(data.email);
          setNickname(data.nickname);
          setPhoneNumber(data.phone);
          setOriginalNickname(data.nickname); // 원본 닉네임 저장
          
          console.log("👉 서버에서 받은 프로필 이미지:", data.profileImage);
          const baseImageUrl = "http://3.37.188.91:8080";

          setProfileImage(
          data.profileImage && data.profileImage !== "null"
          ? `${baseImageUrl}${data.profileImage}`
          : defaultProfileImage
          );
        if (data.residentNumber) {
            setBirthday(formatBirth(data.residentNumber));
          }
        if(data.phone){
          setPhoneNumber(formatPhoneNumber(data.phone));
        }
        })
        .catch((err) => {
          console.error("유저 정보 불러오기 실패", err);
        });
    }
  }, []);

  const formatBirth = (residentNumber) => {
    return `${residentNumber.slice(0, 2)}.${residentNumber.slice(2, 4)}.${residentNumber.slice(4, 6)}`;
  };

  const formatPhoneNumber = (phone) => {
    return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
  };

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    // 닉네임이 바뀌면 중복 확인 상태 초기화
    if (newNickname !== originalNickname) {
      setIsNicknameValid(false);
      setNicknameMessage("");
    }

  };

  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      setIsNicknameValid(false);
      setNicknameMessage("닉네임을 입력해주세요.");
      return;
    }
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const res = await axios.get("https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users", config);
      const userList = res.data;
  
      // 현재 내 userId는 제외하고 닉네임 중복 체크
      const isDuplicated = userList.some(
        (user) => user.nickname === nickname && user.userId !== userId
      );
  
      if (isDuplicated) {
        setIsNicknameValid(false);
        setNicknameMessage("이미 사용 중인 닉네임입니다.");
      } else {
        setIsNicknameValid(true);
        setNicknameMessage("사용 가능한 닉네임입니다!");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
      setIsNicknameValid(false);
      setNicknameMessage("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  };
  

  const handleSave = async () => {
    if (nickname !== "" && nickname !== originalNickname && !isNicknameValid) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (nickname) {
        await axios.patch(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/${userId}/nickname`,
          { nickname },
          config
        );
      }

      if (profileImageFile) {
        const formData = new FormData();
        formData.append("profileImage", profileImageFile);
      
        await axios.patch(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/${userId}/profile-image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // Content-Type 생략 (자동 설정)
            },
          }
        );
      }

      if (newPassword) {
        await axios.put(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/${userId}/password`,
          { password: newPassword },
          config
        );
      }
      // ✅ 유저 정보 다시 가져오기
      const res = await axios.get(
        "https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/me",
        config
      );
      const data = res.data;
      const baseImageUrl = "http://3.37.188.91:8080";
      
      setProfileImage(
        data.profileImage && data.profileImage !== "null"
          ? `${baseImageUrl}${data.profileImage}`
          : defaultProfileImage
      );
      
      alert("회원 정보가 성공적으로 변경되었습니다!");
    } catch (err) {
      console.error("저장 실패", err);
      alert("회원 정보 변경 중 오류가 발생했습니다.");
    }
  };
  const handleWithdraw = async () => {
    const confirmWithdraw = window.confirm(
      "탈퇴하시겠습니까?\n\n탈퇴 시 회원정보는 모두 삭제되며, 서비스를 이용하실 수 없습니다.\n\n탈퇴 후 서비스 이용을 원할 시 다시 가입하시기 바랍니다."
    );
  
    if (!confirmWithdraw) return;
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      await axios.delete(
        `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/${userId}`,
        config
      );
  
      alert("회원 탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다 🥲");
  
      // 로컬 스토리지 정리 후 홈으로 이동
      localStorage.removeItem("token");
      localStorage.removeItem("nickname");
      navigate("/");
    } catch (err) {
      console.error("회원 탈퇴 실패:", err);
      alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  
  
  
  return (
    <Main>
      <Header />
      <Center>
        <TitleRow>
          <Title>마이페이지</Title>
        </TitleRow>       
        <ReviewButtonRow>
          <ReviewButton onClick={() => navigate("/mypagereview")}>나의 리뷰</ReviewButton>
        </ReviewButtonRow>
        
        <ProfileImageWrapper onClick={handleProfileClick}>
          <ProfileImage src={profileImage} onError={(e) => { e.target.src = defaultProfileImage; }} alt="프로필사진" />
        </ProfileImageWrapper>

        <HiddenFileInput
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <UserInfoWrapper>
          <UserEmail>{email}</UserEmail>
          <PhoneNumber>{phoneNumber}</PhoneNumber>
          <Birthday>{birthday}</Birthday>
        </UserInfoWrapper>

        <FormGroup>
          <Label>이름(닉네임)</Label>
          <Input type="text" value={nickname} onChange={handleNicknameChange} />
          <Button onClick={handleCheckNickname}>변경</Button>
        </FormGroup>

        {nicknameMessage && (
          isNicknameValid ? (
            <SuccessMessage>{nicknameMessage}</SuccessMessage>
          ) : (
            <ErrorMessage>{nicknameMessage}</ErrorMessage>
          )
        )}

        <FormGroup>
          <Label>아이디</Label>
          <Input type="text" value={userId} disabled />
        </FormGroup>

        <FormGroup>
          <Label>새 비밀번호</Label>
          <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label>새 비밀번호 확인</Label>
          <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />  
          {/*style={{ height: "36px" }} // ✅ 직접 높이 지정 (선택 사항)*/}
          
        </FormGroup>

        <SaveButton onClick={handleSave}>저장</SaveButton>
        <WithdrawButton onClick={handleWithdraw}>회원탈퇴</WithdrawButton>
        
      </Center>
    </Main>
  );
}

export default MyPage;
{/*        <FormGroup>
          <Label>연락처</Label>
          <Input type="text" value={phoneNumber} disabled />
        </FormGroup>*/}