# DB TermProject : WantToEat

## **1. 프로젝트 개요**
### **1.1. 주제**
- **가족 다 함께 정하는 오늘의 메뉴: WantToEat**은 가족 단위로 오늘의 메뉴를 함께 정하고 관리할 수 있는 웹 애플리케이션이다. 
- 이 서비스를 통해 가족 구성원들은 메뉴를 제안하고, 재료를 관리하며, 최종적으로 오늘의 메뉴를 결정할 수 있다.
           
### **1.2. 개발 배경 및 필요성**
>가족끼리 ‘오늘 뭐 먹지?’하며 고민해본 적 있을 것이다. 이때 가족 구성원들은 저마다의 의견을 내며 오늘의 메뉴를 정하는데 고심한다. 엄마는 냉장고 속 재료 털이를 해야한다 주장하고, 아빠는 오랜만에 아빠표 김치볶음밥을, 아들은 치킨을 먹고 싶어하는 식이다. 우리 프로젝트는 이와 같이 매일매일 일어나는 ‘오늘의 메뉴’ 결정을 웹 애플리케이션으로 구현해보면 어떨까 하여 시작하게 되었다.
           
### **1.3. 개발 목표 및 주요 내용**
> 이 서비스는 가족이 함께 ‘오늘의 메뉴’를 결정하는 과정을 더 쉽고, 효율적이며, 즐거운 경험으로 만드는 것을 목표로 한다.

#### **주요 내용**
1. 가족 참여 기반 메뉴 결정
    - 가족 구성원이 함께 메뉴를 제안하고, 좋아요로 의견을 표현하며, 최종 결정권자인 부모가 ‘오늘의 메뉴’를 확정하는 흐름을 제공한다.

3. 가상 냉장고를 통한 식재료 관리
    - 현실 냉장고 속 식재료를 등록하고 관리할 수 있는 ‘가상 냉장고’를 제공한다.
    - 가상 냉장고 속 재료를 선택하여 메뉴를 제안할 수 있다.
    - 가상 냉장고에 없는 재료는 ‘장 봐야 할 재료’로 추가하여 메뉴를 제안할 수 있다.
      
4. 데이터 기반 식습관 통계 및 분석 기능
    - 다양한 데이터(좋아요 수, 외식/집밥 비율, 재료 사용량)를 기반으로 가족의 식습관을 시각적으로 보여준다.
    - 자주 먹는 메뉴나 잘 사용하지 않는 재료를 파악해 향후 식단 계획에 참고할 수 있다.
      
5. 역할 기반 권한 관리 체계
    - 각 사용자는 부모, 자녀, 팔로워, 타인이라는 역할에 따라 메뉴 관리·재료 등록·통계 조회 등 이용 가능한 기능이 달라진다.
      
6. 가족 생성·합류 기능
    - 사용자는 새 가족을 생성하거나 초대 코드를 통해 기존 가족에 합류할 수 있다.
    - 합류 시 기본 역할(팔로워)이 자동 적용되며, 이후 부모가 역할을 조정할 수 있어 유연한 가족 구성 관리가 가능하다.
              
### **1.4. 장점 및 차별성**
1. 부모·자녀 간의 대결 구도로 재미 요소 강화
    - “얘들아, 이거 만들어줄게” vs “엄마아빠, 이거 먹고싶어요”처럼 자연스럽게 대결 구도를 형성하여 재미 요소를 추가시켰다.
      
2. 가상 냉장고 + 장봐야 할 재료 기반 메뉴 제안 방식
    - 현재 보유한 재료와 필요한 재료를 조합해 메뉴를 제안하는 구조가 마치 요리 게임처럼 흥미롭고 참여도를 높인다.
      
3. 팔로우한 다른 가족 메뉴를 따라하는 ‘메뉴 손민수’ 기능
    - 다른 가족이 등록한 메뉴를 내 가족 메뉴판으로 가져올 수 있어 식사 고민이 크게 줄고, Gen-Z의 릴스·틱톡 요리 레시피 따라 하기 문화와도 잘 맞는다.
      
4. 가족 식습관을 한눈에 볼 수 있는 유익한 통계 제공
    - 집밥/외식 비율, 가장 많이 쓴·가장 적게 쓴 식재료 등 다양한 분석을 통해 가족의 식습관을 알아볼 수 있고, 불필요한 식재료 구매를 줄여 생활 효율이 높아진다.
              

## 2. 사용자 (역할) (Users/ Roles)

### **2.1. 부모**
- 가족 메뉴판의 **관리자/최종 결정권자**이자 **메뉴 제안자**이다.
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
  
### **2.2. 자녀**
- 가족 메뉴판의 **메뉴 제안자**이다.
- WISH 태그의 메뉴 등록/수정/삭제가 가능하다.
    - WISH 태그는 “이거 먹고싶어요!”라는 의미로, 자녀가 부모에게 원하는 메뉴를 전달하기 위해 사용하는 태그이다.
    - 메뉴의 재료에 가상 냉장고에 있는 재료를 등록할 수 있다.
    - 메뉴에 사야할 재료를 등록할 수 있다.
- 다른 사람이 올린 메뉴에 좋아요를 누를 수 있다.
- 통계 및 분석을 확인할 수 있다. (부모랑 세부사항 동일)
- 초대 코드를 열람할 수 있다.

### **2.3. 팔로워**
- **조회 전용** 사용자이다.
- 가족 내 메뉴 목록, 오늘의 메뉴, 냉장고, 통계를 열람만 할 수 있다.
- 다른 사람이 올린 메뉴에 좋아요를 누를 수 있다.
- 통계 및 분석을 확인할 수 있다. (부모랑 세부사항 동일)
- 다른 사용자가 등록한 메뉴를 내가 부모/자녀으로 소속되어있는 가족의 메뉴로 추가할 수 있다.
    - 부모라면 POSSIBLE 태그 메뉴로 등록된다.
    - 자녀이라면 WISH 태그 메뉴로 등록된다.
 
### **2.4. 타인**
- 가족 미소속 사용자이다. (가입 직후 상태)
- 초대 코드로 가족에 참가하거나 새 가족을 생성할 수 있다.
- 초대 코드로 합류시 기본 역할은 팔로워로 부여되며, 이후 해당 가족의 부모가 역할을 조정할 수 있다.
- 가족 생성자는 자동으로 부모 역할을 부여받는다.
- 사용자가 어떤 가족에 속해 있더라도, 다른 가족 기준에서는 여전히 타인으로 간주된다.

## 3. 기능

### 3.1. 로그인/회원가입
- **회원가입**
  - 이메일·비밀번호·닉네임으로 사용자 생성
  - 이메일·닉네임 중복 검증
  - 비활성 계정 여부 체크 후 재활성화 처리

- **로그인**
  - 이메일 기반 사용자 조회
  - 활성 사용자만 로그인 가능

### 3.2. 부모 (PARENT)
- **메뉴 관리 (POSSIBLE)**
  - 부모가 실제로 만들어줄 수 있는 메뉴 등록/수정/삭제
  - POSSIBLE 메뉴에 재료 추가, NEED 재료(사야 할 재료) 설정
  - 메뉴·재료 일괄 등록 가능

- **오늘의 메뉴 관리**
  - 오늘의 메뉴 선택 (부모만 가능)
  - 선택 시 재료 사용량 자동 증가
  - 취소 시 사용량 감소(0 이하 방지)

- **냉장고 관리**
  - ROOM/FRIDGE/FREEZER 재료 등록·수정·삭제
  - 중복 이름·보관 위치 검증
  - 소프트 삭제 방식(`is_active=false`)

- **좋아요 기능**
  - 다른 가족 구성원의 메뉴에 좋아요/취소 가능

- **통계 및 분석**
  - 이번 달 가장 많이 먹은 메뉴 Top3
  - 집밥/배달음식 비율
  - 가장 많이/적게 쓴 재료 Top5
  - 가족 식습관 시각화

- **가족 관리**
  - 역할 변경(PARENT/CHILD/FOLLOWER)
  - 특정 가족 구성원 탈퇴 처리
  - 초대 코드 조회
  - 마지막 부모 탈퇴 시 가족 전체 데이터 삭제


### 3.3. 자녀 (CHILD)
- **메뉴 관리 (WISH)**
  - 자녀가 먹고 싶은 메뉴 등록/수정/삭제
  - 자동으로 WISH 상태로 등록됨

- **재료 선택 & NEED 설정**
  - 냉장고 재료 선택 가능
  - 현재 없는 재료는 NEED(사야 할 재료)로 추가 가능

- **좋아요**
  - 다른 구성원 메뉴 좋아요/취소 가능

- **조회 기능**
  - 냉장고 조회 가능(수정·삭제 불가)
  - 통계 정보 조회 가능
  - 초대 코드 조회 가능

- **가족 탈퇴**
  - 본인 탈퇴 가능 (부모 수 제한 있음)

### 3.4. 팔로워 (FOLLOWER)
- **메뉴 기능**
  - 메뉴 직접 작성/수정/삭제는 불가
  - 좋아요 가능

- **메뉴 가져오기(import)**
  - 팔로우 중인 다른 가족의 메뉴를 가져와 내 가족 메뉴로 등록 가능
    - 본인이 부모라면 POSSIBLE로
    - 본인이 자녀라면 WISH로

- **조회 기능**
  - 냉장고/통계 조회 가능

- **제한 기능**
  - 초대 코드 열람 불가
  - 역할 변경·가족 관리 기능 불가
  - 오늘의 메뉴 등록 불가

### 3.5. 타인 (미소속 사용자)
- **가족 참여**
  - 초대 코드 입력 시 해당 가족에 FOLLOWER로 합류
  - 기존 기록이 있으면 재활성화

- **가족 생성**
  - 새 가족 생성 시 자동으로 PARENT 역할 부여
  - 초대 코드 자동 생성

- **초대 코드 검증**
  - 코드가 존재하고 활성 상태일 때만 참여 허용
          

## 4. 데이터베이스스키마 및 다이어그램 (Database schema / Schema diagram)
<img width="1327" height="1020" alt="스키마" src="https://github.com/user-attachments/assets/21039867-3971-4bc6-a1f3-135a8b1a1a05" />

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

## **5. 사용한 언어 및 라이브러리**
1. DB : PostgreSQL
2. 백엔드 : Next.js, Supabase, TypeScript, 
3. 프론트엔드 : Next.js, Tailwind CSS
       
## 6. 설치 및 실행 방법 (Supabase 기반)

본 프로젝트는 **Supabase Auth / Database / Storage**를 사용하므로  
실행 전 반드시 **개인 Supabase 프로젝트를 생성 → 환경 변수 설정**이 필요합니다.


### 6.1 레포지토리 클론
```bash
git clone https://github.com/your-repo-url.git
cd your-repo-folder
```


### 6.2 패키지 설치
```bash
npm install
```


### 6.3 Supabase 프로젝트 생성 및 설정 (중요)

1. Supabase에서 **새 프로젝트 생성**
2. 프로젝트 루트에 `.env.local` 파일을 만들고 다음 값 입력:

```env
NEXT_PUBLIC_SUPABASE_URL=본인_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=본인_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=본인_service_role_key   # 선택 (서버 기능 시 필요)
```

3. Supabase Dashboard → **SQL Editor**에서  
   레포지토리에 포함된 `schema.sql` 전체를 복사하여 실행  
   → 동일한 테이블/관계 구조 생성

> ⚠️ 주의  
> 이 프로젝트는 **개인 Supabase DB** 기반입니다.  
> 개발자의 실제 데이터는 공유되지 않으며,  
> 실행하려면 반드시 *본인 프로젝트에서 DB 구조를 직접 구성*해야 합니다.


### 6.4 개발 서버 실행
```bash
npm run dev
```


### 3.5 접속
```
http://localhost:3000
```
