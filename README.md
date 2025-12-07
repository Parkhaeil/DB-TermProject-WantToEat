📦 설치 및 실행 방법 (Supabase 사용 프로젝트 안내)

⚠️ 이 프로젝트는 Supabase를 사용하기 때문에, 개인 계정 기반의 데이터베이스에 연결되어 있습니다.
따라서 다른 사용자는 개발자의 Supabase DB에 직접 접근할 수 없으며,
프로젝트를 실행하려면 각자 Supabase 프로젝트를 생성하고 환경 변수를 직접 설정해야 합니다.

🚀 로컬 개발 환경 설정
1. 레포지토리 클론
git clone https://github.com/your-repo-url.git
cd your-repo-folder

2. 패키지 설치
npm install

3. Supabase 프로젝트 설정 (중요)

이 프로젝트는 Supabase Auth / DB / Storage를 사용합니다.
따라서 다른 개발자는 반드시 본인의 Supabase 프로젝트를 새로 생성해야 합니다.

✔️ 필요한 설정

Supabase에서 새 프로젝트 생성

.env.local 파일 생성 후 아래 값 입력

NEXT_PUBLIC_SUPABASE_URL=본인_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=본인_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=선택 (서버 기능 사용 시 필요)


Supabase SQL → 프로젝트에 포함된 schema.sql을 그대로 복사 실행
(테이블 구조를 동일하게 맞추기 위함)

❗ 주의: 이 프로젝트는 개인용 DB를 기반으로 제작되었기 때문에,
개발자의 실제 데이터는 공유되지 않습니다.

4. 개발 서버 실행
npm run dev


서버가 실행되면 아래 주소에서 확인할 수 있습니다:

http://localhost:3000





---
# Final Report

---

### ✅ 1. 프로젝트 개요



1. **사용한 언어 및 라이브러리**
    1. DB : PostgreSQL
    2. 백엔드 : Next.js, Supabase, TypeScript, 
    3. 프론트엔드 : Next.js, Tailwind CSS
       
2. **프로젝트 개요**
    1. **주제**
        1. **가족 다 함께 정하는 오늘의 메뉴: WantToEat**은 가족 단위로 오늘의 메뉴를 함께 정하고 관리할 수 있는 웹 애플리케이션이다. 
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
                - 각 사용자는 부모, 자녀, 팔로워, 타인이라는 역할에 따라 메뉴 관리·재료 등록·통계 조회 등 이용 가능한 기능이 달라진다.
                  
            5. 가족 생성·합류 기능
                - 사용자는 새 가족을 생성하거나 초대 코드를 통해 기존 가족에 합류할 수 있다.
                - 합류 시 기본 역할(팔로워)이 자동 적용되며, 이후 부모가 역할을 조정할 수 있어 유연한 가족 구성 관리가 가능하다.
                  
    4. **장점 및 차별성**
        1. 부모·자녀 간의 대결 구도로 재미 요소 강화
            - “얘들아, 이거 만들어줄게” vs “엄마아빠, 이거 먹고싶어요”처럼 자연스럽게 대결 구도를 형성하여 재미 요소를 추가시켰다.
              
        2. 가상 냉장고 + 장봐야 할 재료 기반 메뉴 제안 방식
            - 현재 보유한 재료와 필요한 재료를 조합해 메뉴를 제안하는 구조가 마치 요리 게임처럼 흥미롭고 참여도를 높인다.
              
        3. 팔로우한 다른 가족 메뉴를 따라하는 ‘메뉴 손민수’ 기능
            - 다른 가족이 등록한 메뉴를 내 가족 메뉴판으로 가져올 수 있어 식사 고민이 크게 줄고, Gen-Z의 릴스·틱톡 요리 레시피 따라 하기 문화와도 잘 맞는다.
              
        4. 가족 식습관을 한눈에 볼 수 있는 유익한 통계 제공
            - 집밥/외식 비율, 가장 많이 쓴·가장 적게 쓴 식재료 등 다양한 분석을 통해 가족의 식습관을 알아볼 수 있고, 불필요한 식재료 구매를 줄여 생활 효율이 높아진다.
              

### ☑️ 2. 사용자 (역할) (Users/ Roles)

1. **부모**
    - 가족 메뉴판의 관리자/최종 결정권자이자 메뉴 제안자이다.
    - 가상 냉장고에 실제 냉장고에 있는 재료를 등록할 수 있다.
    - POSSIBLE 태그의 메뉴 등록/수정/삭제가 가능하다.
        - POSSIBLE 태그는 “이건 내가 만들어 줄 수 있어!”라는 의미로, 부모가 실제로 조리할 수 있는 메뉴를 표시하는 태그이다.
        - 메뉴의 재료에 가상 냉장고에 있는 재료를 등록할 수 있다.
        - 메뉴에 사야할 재료를 등록할 수 있다.
    - 다른 사람이 올린 메뉴에 좋아요를 누를 수 있다.
    - 메뉴에 달린 좋아요 추세를 참고해 오늘의 메뉴를 선택하여 가족들에게 공지할 수 있다.
    - 통계 및 분석을 확인할 수 있다.
        - 이번 달 가족들이 제일 많이 먹은 메뉴 top 3
        - 배달음식/집밥 비율
        - 냉장고에 있는 식재료에 대한 선호도
            - 가장 많이 쓴 식재료 top 5
            - 가장 안 쓴 식재료 top 5
    - 다른 사용자의 역할(부모/자식/팔로워)을 관리할 수 있다.
    - 초대 코드를 열람할 수 있다.
    ****
3. **자녀**
    - 가족 메뉴판의 메뉴 제안자이다.
    - WISH 태그의 메뉴 등록/수정/삭제가 가능하다.
        - WISH 태그는 “이거 먹고싶어요!”라는 의미로, 자녀가 부모에게 원하는 메뉴를 전달하기 위해 사용하는 태그이다.
        - 메뉴의 재료에 가상 냉장고에 있는 재료를 등록할 수 있다.
        - 메뉴에 사야할 재료를 등록할 수 있다.
    - 다른 사람이 올린 메뉴에 좋아요를 누를 수 있다.
    - 통계 및 분석을 확인할 수 있다. (부모랑 세부사항 동일)
    - 초대 코드를 열람할 수 있다.
    ****
5. **팔로워**
    - 조회 전용 사용자이다.
    - 가족 내 메뉴 목록, 오늘의 메뉴, 냉장고, 통계를 열람만 할 수 있다.
    - 다른 사람이 올린 메뉴에 좋아요를 누를 수 있다.
    - 통계 및 분석을 확인할 수 있다. (부모랑 세부사항 동일)
    - 다른 사용자가 등록한 메뉴를 내가 부모/자녀으로 소속되어있는 가족의 메뉴로 추가할 수 있다.
        - 부모라면 POSSIBLE 태그 메뉴로 등록된다.
        - 자녀이라면 WISH 태그 메뉴로 등록된다.
        ****  
6. **타인**
    - 가족 미소속 사용자이다. (가입 직후 상태)
    - 초대 코드로 가족에 참가하거나 새 가족을 생성할 수 있다.
    - 초대 코드로 합류시 기본 역할은 팔로워로 부여되며, 이후 해당 가족의 부모가 역할을 조정할 수 있다.
    - 가족 생성자는 자동으로 부모 역할을 부여받는다.
    - 사용자가 어떤 가족에 속해 있더라도, 다른 가족 기준에서는 여전히 타인으로 간주된다.

### 3. 사용한 SQL


    - **DML** : SELECT, INSERT, UPDATE, DELETE
    - **DDL** : CREATE TABLE, CREATE VIEW, CREATE INDEX, CREATE FUNCTION
    - **JOIN** : INNER JOIN, LEFT JOIN
    - **집계** : GROUP BY, ORDER BY, LIMIT
    - **트랜잭션** : BEGIN, COMMIT, ROLLBACK
    - **RPC** : CREATE FUNCTION (PL/pgSQL)
    - **기타** : JSONB, LOOP, GREATEST, COALESCE, SEQUENCE
      

              

### ✅ 4. 데이터베이스스키마 및 다이어그램 (Database schema / Schema diagram)

```sql
-- 기존 테이블 삭제
DROP TABLE IF EXISTS today_menus CASCADE;
DROP TABLE IF EXISTS menu_likes CASCADE;
DROP TABLE IF EXISTS menu_ingredients CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS fridge_ingredients CASCADE;
DROP TABLE IF EXISTS invitation_codes CASCADE;
DROP TABLE IF EXISTS family_members CASCADE;
DROP TABLE IF EXISTS families CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- USERS : 전체 사용자
CREATE TABLE users (
    user_id        BIGSERIAL PRIMARY KEY,
    email          VARCHAR(255) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    nickname       VARCHAR(50)  NOT NULL,
    created_at     TIMESTAMP    NOT NULL DEFAULT NOW(),
    is_active      BOOLEAN      NOT NULL DEFAULT TRUE
);

-- FAMILIES : 가족 그룹
CREATE TABLE families (
    family_id    BIGSERIAL PRIMARY KEY,
    family_name  VARCHAR(100) NOT NULL,
    created_by   BIGINT REFERENCES users(user_id),
    created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    is_active    BOOLEAN   NOT NULL DEFAULT TRUE
);

-- FAMILY_MEMBERS : 가족 구성원 & 역할
CREATE TABLE family_members (
    family_id  BIGINT NOT NULL REFERENCES families(family_id),
    user_id    BIGINT NOT NULL REFERENCES users(user_id),
    role       VARCHAR(20) NOT NULL
        CHECK (role IN ('PARENT', 'CHILD', 'FOLLOWER')),
    joined_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    is_active  BOOLEAN   NOT NULL DEFAULT TRUE,
    PRIMARY KEY (family_id, user_id)
);

-- INVITATION_CODES : 가족 초대 코드
CREATE TABLE invitation_codes (
    invite_id   BIGSERIAL PRIMARY KEY,
    family_id   BIGINT NOT NULL REFERENCES families(family_id),
    code        VARCHAR(20) NOT NULL UNIQUE,
    created_by  BIGINT REFERENCES users(user_id),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    is_active   BOOLEAN NOT NULL DEFAULT TRUE
);

-- FRIDGE_INGREDIENTS : 가상 냉장고 재료
CREATE TABLE fridge_ingredients (
    ingredient_id    BIGSERIAL PRIMARY KEY,
    family_id        BIGINT NOT NULL REFERENCES families(family_id),
    ingredient_name  VARCHAR(100) NOT NULL,
    storage_type     VARCHAR(20)  NOT NULL
        CHECK (storage_type IN ('ROOM', 'FRIDGE', 'FREEZER', 'NEED')),
    usage_count      INT           NOT NULL DEFAULT 0,
    created_by       BIGINT REFERENCES users(user_id),
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    is_active        BOOLEAN   NOT NULL DEFAULT TRUE
);

-- MENUS : 가족 메뉴 (WISH/POSSIBLE, 집밥/외식)
CREATE TABLE menus (
    menu_id      BIGSERIAL PRIMARY KEY,
    family_id    BIGINT NOT NULL REFERENCES families(family_id),
    created_by   BIGINT REFERENCES users(user_id),
    menu_name    VARCHAR(100) NOT NULL,
    status       VARCHAR(20)  NOT NULL
        CHECK (status IN ('WISH', 'POSSIBLE')),
    source_type  VARCHAR(20)  NOT NULL
        CHECK (source_type IN ('HOME', 'EAT_OUT')),
    created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

-- MENU_INGREDIENTS : 메뉴에 쓰인 재료
CREATE TABLE menu_ingredients (
    menu_ingredient_id  BIGSERIAL PRIMARY KEY,
    menu_id             BIGINT NOT NULL REFERENCES menus(menu_id),
    ingredient_id       BIGINT REFERENCES fridge_ingredients(ingredient_id)
);

-- MENU_LIKES : 메뉴 좋아요
CREATE TABLE menu_likes (
    menu_id     BIGINT NOT NULL REFERENCES menus(menu_id),
    user_id     BIGINT NOT NULL REFERENCES users(user_id),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (menu_id, user_id)
);

-- TODAY_MENUS : 오늘의 최종 메뉴
CREATE TABLE today_menus (
    today_id     BIGSERIAL PRIMARY KEY,
    family_id    BIGINT NOT NULL REFERENCES families(family_id),
    menu_id      BIGINT NOT NULL REFERENCES menus(menu_id),
    target_date  DATE   NOT NULL,
    selected_by  BIGINT REFERENCES users(user_id),
    created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_today_menu UNIQUE (family_id, target_date)
);
```

![스키마.png](%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B5%E1%84%86%E1%85%A1.png)

### 5. (팀 프로젝트인 경우만 해당) 팀원의 역할 배분

1. 인증/인가
    
    
    | 기능 | 주요 내용 | 담당자 |
    | --- | --- | --- |
    | 회원가입·로그인 | 이메일/비번 기반 가입, 로그인, 활성 사용자 체크 | 이유민 |

3. 가족 & 역할 관리
    
    
    | 기능 | 주요 내용 | 담당자 |
    | --- | --- | --- |
    | 가족 생성·참여 | 초대 코드 검증, 가족 합류 | 서혜민 |
    | 역할 관리 | PARENT/CHILD/FOLLOWER 변경, 멤버 탈퇴(소프트 삭제) | 이유민 |
    | 가족 삭제 | 8개 테이블 삭제 트랜잭션 | 이유민 |
    | 초대 코드 관리 | 생성·조회 | 서혜민 |

5. 메뉴 & 오늘의 메뉴 & 좋아요
    
    
    | 기능 | 주요 내용 | 담당자 |
    | --- | --- | --- |
    | 메뉴 관리(POSSIBLE/WISH) | 부모:POSSIBLE, 자녀:WISH 메뉴 CRUD, 재료 매핑 | 서혜민 |
    | 오늘의 메뉴 | 선택/삭제, usage_count 증가·감소 | 서혜민 |
    | 좋아요 | 메뉴 좋아요/취소 | 서혜민 |
   
7. 냉장고 & 재료 관리
    
    
    | 기능 | 주요 내용 | 담당자 |
    | --- | --- | --- |
    | 냉장고 재료 CRUD | ROOM/FRIDGE/FREEZER/NEED 재료 관리 | 이유민 |
    | 재료 조회(읽기 전용) | 자녀·팔로워 조회 | 이유민 |
   
9. 통계 & 분석
    
    
    | 기능 | 주요 내용 | 담당자 |
    | --- | --- | --- |
    | 메뉴/식습관 통계 | 메뉴 Top3, 집밥/외식 비율, 재료 Top5/Bottom5 | 이유민 |
    | 사용자별 가족 요약 뷰 | 멤버 수·오늘의 메뉴 등 집계 | 서혜민 |
   
11. 프론트엔드
    
    
    | 범주 | 주요 내용 | 담당자 |
    | --- | --- | --- |
    | 페이지 | 홈, 로그인/회원가입, 가족 상세 | 이유민 |
    | 모달 | 가족 생성, 초대 코드 입력/표시, 멤버 관리, 메뉴 추가, 통계 | 서혜민 |
    
13. 기타
    
    
    | 항목 | 주요 내용 | 담당자 |
    | --- | --- | --- |
    | DB 연결 | Supabase 클라이언트 관리 | 이유민 |
    | 마이그레이션 | SQL/RPC 마이그레이션 스크립트 | 서혜민 |
    | API 라우트 | `/api/*` 각 기능 엔드포인트 개발 | 이유민, 서혜민 |

---

## 영상 찍기


