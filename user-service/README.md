📌 API 목록

1. 회원가입

Endpoint : POST /api/users/signup

요청 데이터 (JSON)

{
  "userId": "user123",
  "password": "securepassword",
  "email": "user@example.com",
  "phone": "010-1234-5678",
  "nickname": "nickname",
  "profileImage": "https://example.com/image.jpg"
}

응답 데이터 (성공 시)

{
  "userId": "user123",
  "email": "user@example.com",
  "nickname": "nickname",
  "profileImage": "https://example.com/image.jpg"
}

2. 로그인 (JWT 발급)

Endpoint : POST /api/users/login

요청 데이터 (JSON)

{
  "email": "user@example.com",
  "password": "securepassword"
}

응답 데이터 (성공 시)

{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}

추가 사항 : 이후 요청 시 Authorization 헤더에 "Bearer <토큰값>"을 포함해야 함

3. 로그아웃

Endpoint : POST /api/users/logout

요청 헤더

Authorization: Bearer <토큰값>

응답 데이터 (성공 시)

"로그아웃 성공"

4. JWT 토큰 재발급

Endpoint : POST /api/users/token/refresh

요청 헤더

Authorization: Bearer <리프레시 토큰>

응답 데이터 (성공 시)

{
  "token": "새로운 JWT 토큰"
}

5. 내 정보 조회

Endpoint : GET /api/users/me

요청 헤더

Authorization: Bearer <토큰값>

응답 데이터

{
  "userId": "user123",
  "email": "user@example.com",
  "nickname": "nickname",
  "profileImage": "https://example.com/image.jpg"
}

6. 유저 정보 수정

Endpoint : PUT /api/users/{userId}

요청 데이터

{
  "email": "newemail@example.com",
  "nickname": "newNickname",
  "phone": "010-9999-8888",
  "profileImage": "https://example.com/new_image.jpg"
}

응답 데이터

{
  "userId": "user123",
  "email": "newemail@example.com",
  "nickname": "newNickname",
  "profileImage": "https://example.com/new_image.jpg"
}

7. 유저 삭제

Endpoint : DELETE /api/users/{userId}

응답 데이터

"User deleted successfully"

8. 비밀번호 변경

Endpoint : PUT /api/users/{userId}/password

요청 데이터

{
  "password": "newpassword123"
}

응답 데이터

"비밀번호 변경 완료"

9. 닉네임 변경

Endpoint : PATCH /api/users/{userId}/nickname

요청 데이터

{
  "nickname": "새로운 닉네임"
}

응답 데이터

{
  "userId": "user123",
  "nickname": "새로운 닉네임"
}

10. 프로필 이미지 변경

Endpoint : PATCH /api/users/{userId}/profile-image

요청 데이터

{
  "profileImage": "https://example.com/new_image.jpg"
}

응답 데이터

{
  "userId": "user123",
  "profileImage": "https://example.com/new_image.jpg"
}

11. 유저 검색 (닉네임 기준)

Endpoint : GET /api/users/search?nickname=닉네임

응답 데이터

[
  {
    "userId": "user123",
    "email": "user@example.com",
    "nickname": "nickname"
  }
]

12. 등록된 유저 수 조회

Endpoint : GET /api/users/count

응답 데이터

{
  "count": 152
}
