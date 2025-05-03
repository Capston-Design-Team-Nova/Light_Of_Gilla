import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import {
  Main, Center, Title, ProfileImageWrapper, ProfileImage, UserEmail,
  FormGroup, Label, Input, Button, SaveButton, ErrorMessage,
  UserInfoWrapper, HiddenFileInput, SuccessMessage, Birthday
} from "../styles/MyPageStyles";

function MyPage() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImage, setProfileImage] = useState(require("../assets/images/ProfileImage.png"));

  const [birthday, setBirthday] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("token");

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
          console.log("👉 서버에서 받은 프로필 이미지:", data.profileImage);
          setProfileImage(data.profileImage && data.profileImage !== "null" ? data.profileImage : defaultProfileImage);
          if (data.residentNumber) {
            setBirthday(formatBirth(data.residentNumber));
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

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
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
    if (!isNicknameValid) {
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
        await axios.patch(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/${userId}/profile-image`,
          { profileImage: profileImage },
          config
        );
      }

      if (newPassword) {
        await axios.put(
          `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/${userId}/password`,
          { password: newPassword },
          config
        );
      }

      alert("회원 정보가 성공적으로 변경되었습니다!");
    } catch (err) {
      console.error("저장 실패", err);
      alert("회원 정보 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <Main>
      <Header />
      <Center>
        <Title>마이페이지</Title>

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
          <Input type="text" value={email.split("@")[0]} disabled />
        </FormGroup>

        <FormGroup>
          <Label>새 비밀번호</Label>
          <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label>새 비밀번호 확인</Label>
          <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>

        <SaveButton onClick={handleSave}>저장</SaveButton>
      </Center>
    </Main>
  );
}

export default MyPage;
