# 🧩 User API 명세서

Spring Boot 기반의 User 서비스 API 문서입니다.  
토큰이 필요한 API는 요청 헤더에 다음과 같이 JWT를 포함시켜야 합니다.


---

## 1. 회원가입 API

- **POST** `/api/users/signup`

요청 예시:
```json
{
  "userId": "user123",
  "password": "password123",
  "email": "test@example.com",
  "phone": "01012345678",
  "nickname": "테스터",
  "profileImage": "https://example.com/profile.jpg",
  "residentNumber": "010101"
}
```

## 2. 로그인 (JWT 발급)
- **POST** `/api/users/login`
요청 예시:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
응답 예시:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
## 3. 로그아웃
- **POST** `/api/users/logout`
요청 헤더:
```
Authorization: Bearer {토큰값}
```

## 4. 액세스 토큰 재발급
- **POST** `/api/users/token/refresh`

요청 헤더:
```
Authorization: Bearer {리프레시 토큰값}
```
응답 예시:

```json
{
  "token": "새로운 JWT 토큰"
}
```

## 5. 내 정보 조회
- **GET** `/api/users/me`

요청 헤더:
```
Authorization: Bearer {토큰값}
```
응답 예시:

```json
{
  "userId": "user123",
  "email": "test@example.com",
  "nickname": "테스터"
}
```

## 6. 회원 목록 전체 조회
- **GET** `/api/users`

응답 예시:

```json
[
  {
    "userId": "user123",
    "email": "test@example.com",
    "phone": "01012345678",
    "nickname": "테스터",
    "profileImage": "https://example.com/profile.jpg",
    "createdAt": "2025-03-08T14:45:05.000",
    "residentNumber": "010101"
  },
  {
    "userId": "user456",
    "email": "hello@example.com",
    "phone": "01087654321",
    "nickname": "테스트2",
    "profileImage": "https://example.com/image.jpg",
    "createdAt": "2025-03-08T15:00:00.000",
    "residentNumber": "020202"
  }
]
```

## 7. 이메일로 유저 정보 조회
- **GET** `/api/users/email/{email}`

응답 예시:

```json
{
  "userId": "user123",
  "email": "test@example.com",
  "phone": "01012345678",
  "nickname": "테스터",
  "profileImage": "https://example.com/profile.jpg",
  "createdAt": "2025-03-08T14:45:05.000",
  "residentNumber": "010101"
}
```

## 8. userId로 유저 조회
- **GET** `/api/users/{userId}`

## 9. 회원 정보 수정
- **PUT** `/api/users/{userId}`

요청 예시:

```json
{
  "nickname": "새로운닉네임",
  "phone": "01087654321",
  "profileImage": "https://example.com/new-profile.jpg"
}
```

## 10. 회원 탈퇴
- **DELETE** `/api/users/{userId}`

## 11. 비밀번호 변경
- **PUT** `/api/users/{userId}/password`

요청 예시:

```json
{
  "password": "newPassword123"
}
```

## 12. 닉네임 변경
- **PATCH** `/api/users/{userId}/nickname`

요청 예시:

```json
{
  "nickname": "새로운닉네임"
}
```

## 13. 프로필 이미지 변경
- **PATCH** `/api/users/{userId}/profile-image`

요청 예시:

```json
{
  "profileImage": "https://example.com/new-profile.jpg"
}
```

## 14. 닉네임으로 유저 검색
- **GET** `/api/users/search?nickname=닉네임`

## 15. 전체 유저 수 조회
- **GET** `/api/users/count`
