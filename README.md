This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### 1. 프로젝트 개요

<aside>
💡

※ 프로젝트 주제, 목표와 본인 프로젝트의 차별성, 장점 등에 대해 상세히 언급해주세요.
※ 만약 Github 프로젝트로 관리가 되고 있고 README에 설명이 충분히 되어있다면 Github Repository 링크를 적어도 좋습니다.

사용한 언어 및 라이브러리:
프로젝트 개요:

</aside>

1. **사용한 언어 및 라이브러리**
    1. DB : PostgreSQL
    2. 백엔드 : Next.js, Supabase, TypeScript, 
    3. 프론트엔드 : Next.js, Tailwind CSS
2. **프로젝트 개요**
    1. **주제**
        1. **가족 다함께 정하는 오늘의 메뉴: WantToEat**은 가족 단위로 오늘의 메뉴를 함께 정하고 관리할 수 있는 웹 애플리케이션이다. 
        2. 이 서비스를 통해 가족 구성원들은 메뉴를 제안하고, 재료를 관리하며, 최종적으로 오늘의 메뉴를 결정할 수 있다.
    2. **개발 배경 및 필요성**
        1. 가족끼리 ‘오늘 뭐 먹지?’하며 고민해본 적 있을 것이다. 이때 가족 구성원들은 저마다의 의견을 내며 오늘의 메뉴를 정하는데 고심한다. 엄마는 냉장고 속 재료 털이를 해야한다 주장하고, 아빠는 오랜만에 아빠표 김치볶음밥을, 아들은 치킨을 먹고 싶어하는 식이다. 우리 프로젝트는 이와 같이 매일매일 일어나는 ‘오늘의 메뉴’ 결정을 웹 애플리케이션으로 구현해보면 어떨까 하여 시작하게 되었다.
    3. **개발 목표 및 주요 내용**
        1. 이 서비스는 가족이 함께 ‘오늘의 메뉴’를 결정하는 과정을 더 쉽고, 효율적이며, 즐거운 경험으로 만드는 것을 목표로 한다.
        2. **주요 내용**
            1. 가족 참여 기반 메뉴 결정
                - 가족 구성원이 함께 메뉴를 제안하고, 좋아요로 의견을 표현하며, 최종 결정권자인 부모가 ‘오늘의 메뉴’를 확정하는 흐름을 제공한다.
            2. 가상 냉장고를 통한 식재료 관리
                - 현실 냉장고 속 식재료를 등록하고 관리할 수 있는 ‘가상 냉장고’를 제공한다.
                - 가상 냉장고 속 재료를 선택하여 메뉴를 제안할 수 있다.
                - 가상 냉장고에 없는 재료는 ‘장 봐야 할 재료’로 추가하여 메뉴를 제안할 수 있다.
            3. 데이터 기반 식습관 통계 및 분석 기능
                - 다양한 데이터(좋아요 수, 외식/집밥 비율, 재료 사용량)를 기반으로 가족의 식습관을 시각적으로 보여준다.
                - 자주 먹는 메뉴나 잘 사용하지 않는 재료를 파악해 향후 식단 계획에 참고할 수 있다.
            4. 역할 기반 권한 관리 체계
                - 각 사용자는 부모, 자식, 팔로워, 타인이라는 역할에 따라 메뉴 관리·재료 등록·통계 조회 등 이용 가능한 기능이 달라진다.
            5. 가족 생성·합류 기능
                - 사용자는 새 가족을 생성하거나 초대 코드를 통해 기존 가족에 합류할 수 있다.
                - 합류 시 기본 역할(팔로워)이 자동 적용되며, 이후 부모가 역할을 조정할 수 있어 유연한 가족 구성 관리가 가능하다.
    4. 장점 및 차별성
        1. 부모·자식 간의 대결 구도로 재미 요소 강화
            - “얘들아, 이거 만들어줄게” vs “엄마아빠, 이거 먹고싶어요”처럼 자연스럽게 대결 구도를 형성하여 재미 요소를 추가시켰다.
        2. 가상 냉장고 + 장봐야 할 재료 기반 메뉴 제안 방식
            - 현재 보유한 재료와 필요한 재료를 조합해 메뉴를 제안하는 구조가 마치 요리 게임처럼 흥미롭고 참여도를 높인다.
        3. 팔로우한 다른 가족 메뉴를 따라하는 ‘메뉴 손민수’ 기능
            - 다른 가족이 등록한 메뉴를 내 가족 메뉴판으로 가져올 수 있어 식사 고민이 크게 줄고, Gen Z의 릴스·틱톡 요리 레시피 따라 하기 문화와도 잘 맞는다.
        4. 가족 식습관을 한눈에 볼 수 있는 유익한 통계 제공
            - 집밥/외식 비율, 가장 많이 쓴·가장 적게 쓴 식재료 등 다양한 분석을 통해 가족의 식습관을 알아볼 수 있고, 불필요한 식재료 구매를 줄여 생활 효율이 높아진다.
