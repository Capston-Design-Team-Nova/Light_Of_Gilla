# 🧩 병원 및 약국 정보 API

API Gateway 엔드포인트

`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com`

---

## 1. 병원 정보 전체 불러오기 (최대 500개)
- **GET** `/api/hospitals`

요청 예시:
- `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/hospitals`


## 2. 병원 이름으로 검색하기 (최대 500개)
- **GET** `/api/hospitals/search`
- 파라미터 형식이므로 주의

요청 예시:
- `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/hospitals/search?name=강남`


---


# 📘 Hospital Review API 명세서

- Base URL: `https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews`

## 🟢 1. 리뷰 등록 (Create)

- **POST** `/api/reviews/{hospitalId}`

요청 예시:
`POST https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/1`
```json
{
  "author": "hyunseo",
  "rating": 5,
  "content": "정말 친절한 병원이었어요!"
}
```

응답 예시:
```json
{
    "id": 1,
    "author": "hyunseo",
    "rating": 5,
    "content": "정말 친절한 병원이었어요!",
    "likes": 0,
    "createdAt": "2025-04-13T23:20:14.4346615",
    "hospital": {
        "id": 1,
        "district": "노원구",
        "name": "노원을지대학교병원",
        "score": 2.1,
        "address": "노원구 한글비석로 68",
        "imgUrl": "//img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=https%3A%2F%2Fpostfiles.pstatic.net%2FMjAyMjA4MjJfMjY0%2FMDAxNjYxMTM0ODkzNjUz.CtiuHeME89IMdWq1GDva03MJc_eRwn7AutJp32lDfe4g.F_kRm5fCLC-AgL5-k3s3IJ4ARlc6s50-NY0wc7dkcz8g.JPEG.tkdal0614%2F1661134886627.jpg%3Ftype%3Dw966",
        "reviews": "[{'작성자': '..', '별점': '1.0', '날짜': '2025.03.16.', '내용': '와 간호사 ㄹㅇ 싹퉁바가지없더라\\n어떻게 그런 응대로 아직도 근무하는지 의문점이 들정도임 ㅋㅋㅋㅋㅋㅋ', '좋아요': '0'}, {'작성자': 'fyggu', '별점': '1.0', '날짜': '2025.01.07.', '내용': '정신과상담 진짜 가지마세요\\n사람 약으로 돈버느거밖에 몰라요\\n받고 약 처방받았는데\\n부작용 나서 가만히 못... 더보기', '좋아요': '7'}, {'작성자': '사용자', '별점': '1.0', '날짜': '2024.12.26.', '내용': '치료받다가 교수님 말투가 너무 버럭버럭, 혼내듯이 말해서 뭘 물어보지도못하겠고 진료를 너무 급하게 보는느낌이라 있던 병 더심해질까봐 옮겼습니다. 더 큰병원 가려고 소견서 부탁드렸는데 자기 못믿어서 그런거 아... 더보기', '좋아요': '4'}]",
        "openHour": "{'목': '08:30 ~ 17:30', '금': '08:30 ~ 17:30', '토': '휴무일', '일': '휴무일', '월': '08:30 ~ 17:30', '화': '08:30 ~ 17:30', '수': '08:30 ~ 17:30', '휴무일': '공휴일'}"
    }
}
```

## 🟡 2. 리뷰 수정 (Update)

- **PUT** `/api/reviews/{reviewId}`

요청 예시:
`PUT https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/1`
```json
{
  "author": "hyunseo",
  "rating": 5,
  "content": "정말 친절한 병원이었어요!"
}
```

응답 예시:
```json
{
    "id": 1,
    "author": "hyunseo",
    "rating": 4,
    "content": "의사 선생님이 더 친절하셨습니다!",
    "likes": 0,
    "createdAt": "2025-04-13T23:20:14",
    "hospital": {
        "id": 1,
        "district": "노원구",
        "name": "노원을지대학교병원",
        "score": 2.1,
        "address": "노원구 한글비석로 68",
        "imgUrl": "//img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=https%3A%2F%2Fpostfiles.pstatic.net%2FMjAyMjA4MjJfMjY0%2FMDAxNjYxMTM0ODkzNjUz.CtiuHeME89IMdWq1GDva03MJc_eRwn7AutJp32lDfe4g.F_kRm5fCLC-AgL5-k3s3IJ4ARlc6s50-NY0wc7dkcz8g.JPEG.tkdal0614%2F1661134886627.jpg%3Ftype%3Dw966",
        "reviews": "[{'작성자': '..', '별점': '1.0', '날짜': '2025.03.16.', '내용': '와 간호사 ㄹㅇ 싹퉁바가지없더라\\n어떻게 그런 응대로 아직도 근무하는지 의문점이 들정도임 ㅋㅋㅋㅋㅋㅋ', '좋아요': '0'}, {'작성자': 'fyggu', '별점': '1.0', '날짜': '2025.01.07.', '내용': '정신과상담 진짜 가지마세요\\n사람 약으로 돈버느거밖에 몰라요\\n받고 약 처방받았는데\\n부작용 나서 가만히 못... 더보기', '좋아요': '7'}, {'작성자': '사용자', '별점': '1.0', '날짜': '2024.12.26.', '내용': '치료받다가 교수님 말투가 너무 버럭버럭, 혼내듯이 말해서 뭘 물어보지도못하겠고 진료를 너무 급하게 보는느낌이라 있던 병 더심해질까봐 옮겼습니다. 더 큰병원 가려고 소견서 부탁드렸는데 자기 못믿어서 그런거 아... 더보기', '좋아요': '4'}]",
        "openHour": "{'목': '08:30 ~ 17:30', '금': '08:30 ~ 17:30', '토': '휴무일', '일': '휴무일', '월': '08:30 ~ 17:30', '화': '08:30 ~ 17:30', '수': '08:30 ~ 17:30', '휴무일': '공휴일'}"
    }
}
```

## 🔴 3. 리뷰 삭제 (Delete)

- **DELETE** `/api/reviews/{reviewId}`

요청 예시:
`DELETE https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/1`

## 🔵 4. 병원 리뷰 목록 조회

- **GET** `/api/reviews/hospital/{hospitalId}`

요청 예시:
`GET https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/hospital/1`

응답 예시:
```json
[
    {
        "id": 580435,
        "author": "hyunseo",
        "content": "정말 친절한 병원이었어요!",
        "likes": 0,
        "rating": 5,
        "likedByCurrentUser": false
    },
    {
        "id": 2,
        "author": "..",
        "content": "와 간호사 ㄹㅇ 싹퉁바가지없더라\n어떻게 그런 응대로 아직도 근무하는지 의문점이 들정도임 ㅋㅋㅋㅋㅋㅋ",
        "likes": 1,
        "rating": 1,
        "likedByCurrentUser": true // 변경된 부분. X-User-Name의 like 여부를 저장함.
    },
    {
        "id": 3,
        "author": "fyggu",
        "content": "정신과상담 진짜 가지마세요\n사람 약으로 돈버느거밖에 몰라요\n받고 약 처방받았는데\n부작용 나서 가만히 못... 더보기",
        "likes": 7,
        "rating": 1,
        "likedByCurrentUser": false
    },
    {
        "id": 4,
        "author": "사용자",
        "content": "치료받다가 교수님 말투가 너무 버럭버럭, 혼내듯이 말해서 뭘 물어보지도못하겠고 진료를 너무 급하게 보는느낌이라 있던 병 더심해질까봐 옮겼습니다. 더 큰병원 가려고 소견서 부탁드렸는데 자기 못믿어서 그런거 아... 더보기",
        "likes": 4,
        "rating": 1,
        "likedByCurrentUser": false
    }
]
```

## 💖 5. 좋아요 토글

- **POST** `/api/reviews/{reviewId}/like`
- 요청 헤더 주의. User-name을 보내야함.

요청 예시:
`POST https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/reviews/101/like`
`X-User-Name: hyunseo`

## 🟢 6. 즐겨찾기 등록

- **POST** `/api/favorites/{hospitalId}`
- 요청 헤더 주의. User-name을 보내야함. User테이블의 nickname에 해당.

요청 예시:
`POST https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/favorites/1`
`X-User-Name: hyunseo`

## 🟡 7. 즐겨찾기 삭제

- **DELETE** `/api/favorites/{hospitalId}`
- 요청 헤더 주의. User-name을 보내야함. User테이블의 nickname에 해당.

요청 예시:
`DEELTE https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/favorites/1`
`X-User-Name: hyunseo`

## 🔵 8. 즐겨찾기 목록 조회

- **GET** `/api/favorites`
- 요청 헤더 주의. User-name을 보내야함. User테이블의 nickname에 해당.

요청 예시:
`GET https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/favorites`
`X-User-Name: hyunseo`

---

# 🧩 유저 서비스 API 명세서

API Gateway 엔드포인트

`https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com`

---

## 1. 회원가입 API

- **POST** `/api/users/signup`

요청 예시: `POST https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/signup`
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
- 이메일, 아이디 둘 다 가능

요청 예시: `POST https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/login`
```json
{
  "emailOrUserId": "test@example.com",
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

요청 예시: `POST https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/logout`

요청 헤더:
```
Authorization: Bearer {토큰값}
```

## 4. 액세스 토큰 재발급
- **POST** `/api/users/token/refresh`

요청 예시: `POST https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/token/refresh`

요청 헤더:
```
Authorization: Bearer {리프레시 토큰값}
```
응답 예시:

```json
{
  "새로운 JWT 토큰"
}
```

## 5. 내 정보 조회
- **GET** `/api/users/me`

요청 예시: `GET https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/me`

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

요청 예시: `GET https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users`

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

요청 예시: `GET https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/email/test@example.com`

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
  
요청 예시: `GET https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/{userId}`

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
  
요청 예시: `DELETE https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/user123`

## 11. 비밀번호 변경
- **PUT** `/api/users/{userId}/password`
  
요청 예시: `PUT https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/user123/password`
- http://3.37.188.91:8080/images/파일이름.png

## 14. 닉네임으로 유저 검색
- **GET** `/api/users/search?nickname=닉네임`
  
요청 예시: `GET https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/search?nickname=새로운닉네임`

## 15. 전체 유저 수 조회
- **GET** `/api/users/count`
  
요청 예시: `GET https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/count`

## 16. 비밀번호 리셋 (메일 보내기)
- **POST** `/api/users/reset-password`
- 발신자: vmffotlka1@gmail.com
- 스팸으로 분류되어 있을 수 있으니 주의
  
요청 예시: `POST https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/reset-password`

```json
{
  "email": "testuser@example.com"
}
```

성공 시:
```json
{
  "message": "임시 비밀번호가 이메일로 전송되었습니다."
}
```

실패 시:
```json
{
  "message": "등록되지 않은 이메일입니다."
}
```

## 17. 이메일 인증 (메일 보내기)
- **POST** `/api/users/send-verification-email`
- 발신자: vmffotlka1@gmail.com
- 스팸으로 분류되어 있을 수 있으니 주의

요청 예시: `POST https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/send-verification-email`

```json
{
  "email": "example@domain.com"
}
```

## 18. 이메일 인증코드 검증
- **POST** `/api/users/verify-email`

요청 예시: `POST https://qbvq3zqekb.execute-api.ap-northeast-2.amazonaws.com/api/users/verify-email`

```json
{
  "email": "example@domain.com",
  "code": "123456"  // 받은 인증 코드 입력
}
```
