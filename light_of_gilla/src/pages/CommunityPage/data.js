// data.js
export const posts = [
    {
      id: 1,
      title: "소화가 잘 안 되네요",
      author: "까스활명수134",
      authorImg: "../../images/author1.png",  // 작성자 프로필 사진
      createdAt: "2025-03-22 10:00",
      comments: [
        { id: 1, writer: "내과의사 철수", profileImg: "../../images/user1.png", text: "아 그럴때는 일단 맨발로 한시간동안 걸어보고 물을 충분히 섭취하세요. 계속 해결이 안된다면 병원을 찾아주십시오." },
        { id: 2, writer: "영희", profileImg: "../../images/user2.png", text: "러닝을 해보세요!" },
      ],
      likes: 5,
      content: "아 활명수 먹는데도 소화가 잘 안되네요 어떻게 하죠?",
      category: "소화불량",
    },
    {
      id: 2,
      title: "우리 아이가 열이 나고 계속 토해요",
      author: "하율맘",
      authorImg: "../../images/author2.png",  // 작성자 프로필 사진
      createdAt: "2025-03-21 14:20",
      comments: [{ id: 1, writer: "이준맘", profileImg: "../../images/user3.png", text: "아이구..얼른 소아과나 응급실 가보셔요" }],
      likes: 8,
      content: "새벽부터 열이 39도에서 떨어지질 않네요 병원 문도 다 닫았는데 ㅠㅠ 열이 심한지 해열제도 잘 안듣고 토하네요 어쩌죠 ㅠㅠㅠ",
      category: "발열,구토",
    },
  ];
  