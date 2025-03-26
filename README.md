✅ 기본적인 사용자 관련 기능
1. 회원가입
Endpoint : POST /api/users/signup

요청 데이터 (JSON)

json
복사
편집
{
  "userId": "user123",
  "password": "securepassword",
  "email": "user@example.com",
  "phone": "010-1234-5678",
  "nickname": "nickname",
  "profileImage": "https://example.com/image.jpg"
}
응답 데이터 (성공 시)

json
복사
편집
{
  "userId": "user123",
  "email": "user@example.com",
  "nickname": "nickname",
  "profileImage": "https://example.com/image.jpg"
}
2. 로그인 (JWT 발급)
Endpoint : POST /api/users/login

요청 데이터 (JSON)

json
복사
편집
{
  "email": "user@example.com",
  "password": "securepassword"
}
응답 데이터 (성공 시)

json
복사
편집
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
추가 사항 : 이후 요청 시 Authorization 헤더에 "Bearer <토큰값>"을 포함해야 함

3. 로그아웃
Endpoint : POST /api/users/logout

요청 헤더

http
복사
편집
Authorization: Bearer <토큰값>
응답 데이터 (성공 시)

json
복사
편집
"로그아웃 성공"
4. JWT 토큰 재발급
Endpoint : POST /api/users/token/refresh

요청 헤더

http
복사
편집
Authorization: Bearer <리프레시 토큰>
응답 데이터 (성공 시)

json
복사
편집
{
  "token": "새로운 JWT 토큰"
}
✅ 유저 정보 조회 관련 API
5. 모든 유저 조회
Endpoint : GET /api/users

요청 헤더

http
복사
편집
Authorization: Bearer <토큰값>
응답 데이터

json
복사
편집
[
  {
    "userId": "user123",
    "email": "user@example.com",
    "nickname": "nickname",
    "profileImage": "https://example.com/image.jpg"
  },
  {
    "userId": "user456",
    "email": "user2@example.com",
    "nickname": "nickname2",
    "profileImage": "https://example.com/image2.jpg"
  }
]
6. 특정 유저 조회 (이메일)
Endpoint : GET /api/users/email/{email}

응답 데이터

json
복사
편집
{
  "userId": "user123",
  "email": "user@example.com",
  "nickname": "nickname",
  "profileImage": "https://example.com/image.jpg"
}
7. 특정 유저 조회 (userId)
Endpoint : GET /api/users/{userId}

응답 데이터

json
복사
편집
{
  "userId": "user123",
  "email": "user@example.com",
  "nickname": "nickname",
  "profileImage": "https://example.com/image.jpg"
}
8. 내 정보 조회
Endpoint : GET /api/users/me

요청 헤더

http
복사
편집
Authorization: Bearer <토큰값>
응답 데이터

json
복사
편집
{
  "userId": "user123",
  "email": "user@example.com",
  "nickname": "nickname",
  "profileImage": "https://example.com/image.jpg"
}
9. 특정 닉네임으로 유저 검색
Endpoint : GET /api/users/search?nickname=닉네임

응답 데이터

json
복사
편집
[
  {
    "userId": "user123",
    "email": "user@example.com",
    "nickname": "nickname"
  }
]
10. 등록된 유저 수 조회
Endpoint : GET /api/users/count

응답 데이터

json
복사
편집
{
  "count": 152
}
✅ 유저 정보 수정 관련 API
11. 유저 정보 수정
Endpoint : PUT /api/users/{userId}

요청 데이터

json
복사
편집
{
  "email": "newemail@example.com",
  "nickname": "newNickname",
  "phone": "010-9999-8888",
  "profileImage": "https://example.com/new_image.jpg"
}
응답 데이터

json
복사
편집
{
  "userId": "user123",
  "email": "newemail@example.com",
  "nickname": "newNickname",
  "profileImage": "https://example.com/new_image.jpg"
}
12. 닉네임 변경
Endpoint : PATCH /api/users/{userId}/nickname

요청 데이터

json
복사
편집
{
  "nickname": "새로운 닉네임"
}
응답 데이터

json
복사
편집
{
  "userId": "user123",
  "nickname": "새로운 닉네임"
}
13. 프로필 이미지 변경
Endpoint : PATCH /api/users/{userId}/profile-image

요청 데이터

json
복사
편집
{
  "profileImage": "https://example.com/new_image.jpg"
}
응답 데이터

json
복사
편집
{
  "userId": "user123",
  "profileImage": "https://example.com/new_image.jpg"
}
14. 비밀번호 변경
Endpoint : PUT /api/users/{userId}/password

요청 데이터

json
복사
편집
{
  "password": "newpassword123"
}
응답 데이터

json
복사
편집
"비밀번호 변경 완료"
✅ 유저 계정 삭제 관련 API
15. 특정 유저 삭제
Endpoint : DELETE /api/users/{userId}

응답 데이터

json
복사
편집
"User deleted successfully"
