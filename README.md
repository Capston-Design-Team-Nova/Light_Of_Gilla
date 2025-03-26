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
