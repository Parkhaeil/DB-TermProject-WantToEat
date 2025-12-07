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

### 3. 기능

1. 요약
    - **DML** : SELECT, INSERT, UPDATE, DELETE
    - **DDL** : CREATE TABLE, CREATE VIEW, CREATE INDEX, CREATE FUNCTION
    - **JOIN** : INNER JOIN, LEFT JOIN
    - **집계** : GROUP BY, ORDER BY, LIMIT
    - **트랜잭션** : BEGIN, COMMIT, ROLLBACK
    - **RPC** : CREATE FUNCTION (PL/pgSQL)
    - **기타** : JSONB, LOOP, GREATEST, COALESCE, SEQUENCE
      
2. **로그인/회원가입**
    - 회원가입
        - 이메일, 비밀번호, 닉네임으로 신규 사용자 등록
            - **[SELECT]** : 이메일/닉네임 중복 체크 조회
            - **[INSERT]** : 신규 사용자 데이터 삽입
            - **[INDEX]** `idx_users_email` : 이메일 중복 체크 최적화
            - **[INDEX]** `idx_users_is_active` : 활성 사용자 조회 최적화
            - **[AUTHORIZATION]** 이메일/닉네임 중복 검증, 비밀번호 검증
            - **[SEQUENCE]** `users_user_id_seq` : 자동 증가 user_id 생성
              
    - 로그인
        - 이메일과 비밀번호로 인증
            - **[SELECT]** : 이메일로 사용자 조회, WHERE 절로 필터링
            - **[INDEX]** `idx_users_email` : 이메일 조회 최적화
            - **[AUTHORIZATION]** 활성 사용자(`is_active=true`)만 로그인 허용
              
3. **부모 (PARENT)**
    - 메뉴 관리
        - POSSIBLE 태그 메뉴 등록/수정/삭제
            - **[INSERT]** : 메뉴 정보 삽입 (RPC 함수 내부)
            - **[SELECT]** : 재료 조회 및 중복 체크
            - **[UPDATE]** : 메뉴 정보 수정
            - **[DELETE]** : 메뉴 정보 삭제
            - **[RPC]** `add_menu_with_ingredients` : 메뉴 및 재료 일괄 등록
            - **[INDEX]** `idx_menus_family`, `idx_menus_created_by`, `idx_menus_family_status`, `idx_menus_created_at` : 조회/필터링 최적화
            - **[INDEX]** `idx_menu_ingredients_menu`, `idx_menu_ingredients_ingredient` : 메뉴-재료 관계 조회 최적화
            - **[AUTHORIZATION]** `assertParentRole` : 부모 권한 검증, `status='POSSIBLE'` 자동 설정
              
        - 메뉴에 가상 냉장고 재료 등록 & 사야 할 재료(NEED) 추가
            - **[SELECT]** : 재료 중복 체크 (WHERE 절로 `family_id`, `ingredient_name`, `storage_type` 조건)
            - **[INSERT]** : 새 재료 추가 또는 `menu_ingredients` 매핑 테이블 삽입
            - **[LOOP]** : JSONB 배열 순회 처리 (PL/pgSQL)
            - **[RPC]** `add_menu_with_ingredients` : JSONB 배열로 재료 일괄 처리
            - **[INDEX]** `idx_fridge_ingredients_family`, `idx_fridge_ingredients_family_active` : 재료 조회 최적화
              
    - 다른 사람 메뉴에 좋아요
        - **[SELECT]** : 좋아요 조회
        - **[INSERT]** : 좋아요 추가
        - **[DELETE]** : 좋아요 삭제
        - **[INDEX]** `idx_menu_likes_user` : 좋아요 조회 최적화
          
    - 오늘의 메뉴 관리
        - 오늘의 메뉴 선택
            - **[SELECT]** : VIEW 조회로 메뉴, 작성자, 재료 정보 JOIN
            - **[INSERT]** : `today_menus` 테이블에 오늘의 메뉴 등록
            - **[SELECT]** : 메뉴에 포함된 재료 목록 조회 (`menu_ingredients`)
            - **[UPDATE]** : 재료 사용 횟수 증가 (RPC 함수 내부)
            - **[VIEW]** `v_today_menu_cards` : 메뉴·작성자·재료 JOIN 조회
            - **[RPC]** `increment_usage_count` : 재료 사용 횟수 증가
            - **[INDEX]** `idx_today_menus_family_date` : 날짜별 조회 최적화
            - **[INDEX]** `idx_today_menus_menu`, `idx_today_menus_selected_by` : 메뉴/선택자 조회 최적화
            - **[AUTHORIZATION]** `assertParentRole` : 부모만 선택 가능  
      
        - 오늘의 메뉴 삭제
            - **[SELECT]** : 삭제 전 메뉴 ID 조회
            - **[SELECT]** : 메뉴에 포함된 재료 목록 조회
            - **[UPDATE]** : 재료 사용 횟수 감소, GREATEST 함수로 0 이하 방지 (RPC 함수 내부)
            - **[DELETE]** : `today_menus` 테이블에서 오늘의 메뉴 삭제
            - **[RPC]** `decrement_usage_count` : 재료 사용 횟수 감소(0 이하 방지)
            - **[AUTHORIZATION]** `assertParentRole` : 부모만 삭제 가능
              
    - 냉장고 관리
        - 가상 냉장고 재료 등록/수정/삭제
            - **[SELECT]** : 재료 중복 체크 (WHERE 절로 `family_id`, `ingredient_name`, `storage_type` 조건)
            - **[INSERT]** : 새 재료 추가
            - **[UPDATE]** : 재료 정보 수정 (`ingredient_name`, `storage_type`) 또는 `is_active` 재활성화
            - **[UPDATE]** : 재료 삭제 (`is_active=false`로 업데이트)
            - **[INDEX]** `idx_fridge_ingredients_family`, `idx_fridge_ingredients_family_active`, `idx_fridge_ingredients_storage_type` : 재료 조회 최적화
            - **[AUTHORIZATION]** `assertParentRole` : 부모만 가능
              
    - 통계 및 분석
        - 이번 달 가장 많이 먹은 메뉴 top3
            - **[SELECT]** : `today_menus`와 `menus` JOIN하여 월별 데이터 조회
            - **[WHERE]** : `family_id`, `target_date` 범위 조건 (`>=`, `<`)
            - **[INDEX]** `idx_today_menus_family_date`, `idx_menus_family`, `idx_today_menus_menu`
              
        - 배달음식/집밥 비율
            - **[SELECT]** : `today_menus`와 `menus` JOIN하여 `source_type` 집계
            - **[WHERE]** : `family_id`, `target_date` 범위 조건
            - **[INDEX]** `idx_today_menus_family_date`, `idx_menus_family`, `idx_menus_created_at`
              
        - 식재료 선호도 분석(가장 많이/적게 쓴 재료 top5)
            - **[SELECT]** : `usage_count` 기준 조회
            - **[ORDER BY]** : `usage_count` ASC/DESC 정렬
            - **[LIMIT]** : 상위 5개만 조회
            - **[INDEX]** `idx_fridge_ingredients_family_active` : `usage_count` 정렬 최적화
              
    - 가족 관리
        - 다른 사용자 역할 변경(PARENT/CHILD/FOLLOWER)
            - **[SELECT]** : 부모 권한 확인
            - **[UPDATE]** : `family_members` 테이블의 `role` 컬럼 업데이트
            - **[INDEX]** `idx_family_members_family_role_active` : 역할별 조회 최적화
            - **[AUTHORIZATION]** `assertParentRole` : 부모만 가능, 본인 변경 불가
              
        - 가족 멤버 탈퇴 처리(is_active=false)
            - **[SELECT]** : 활성 멤버 조회
            - **[UPDATE]** : `is_active=false`로 업데이트 (소프트 삭제)
            - **[INDEX]** `idx_family_members_family_active`, `idx_family_members_user_active` : 활성 멤버 조회 최적화
            - **[AUTHORIZATION]** `assertParentRole` : 부모만 가능
              
        - 초대 코드 열람
            - **[SELECT]** : `invitation_codes` 테이블에서 `family_id`로 조회
            - **[INDEX]** `idx_invitation_codes_family`, `idx_invitation_codes_family_active` : 초대 코드 조회 최적화
            - **[AUTHORIZATION]** `assertFamilyMember` : 가족만 확인 가능
              
    - 가족 탈퇴
        - 일반 탈퇴: is_active=false 처리
            - **[SELECT]** : 활성 부모 수 확인 (WHERE `role='PARENT'`, `is_active=true`)
            - **[UPDATE]** : `is_active=false`로 업데이트
            - **[INDEX]** `idx_family_members_family_role_active` : 마지막 부모 확인
              
        - 마지막 부모일 경우: 가족 및 전체 데이터 삭제
            - **[DELETE]** : 8개 테이블 순차 삭제
                - `today_menus` → `menu_likes` → `menu_ingredients` → `menus` → `fridge_ingredients` → `invitation_codes` → `family_members` → `families`
            - **[BEGIN/COMMIT/ROLLBACK]** : 트랜잭션으로 원자성 보장
            - **[SELECT]** : 서브쿼리로 `menu_id` 조회 (WHERE 절 `IN` 사용)
            - **[TRANSACTION]** `delete_family_transaction` : 8개 테이블 삭제(원자성 보장)
            - **[RPC]** `delete_family_transaction` : 삭제 로직 캡슐화
            - **[AUTHORIZATION]** 마지막 부모 확인 + 재확인(confirm)
              
4. **자녀 (CHILD)**
    - 메뉴 관리
        - WISH 태그 메뉴 등록/수정/삭제
            - **[INSERT]** : 메뉴 정보 삽입
            - **[SELECT]** : 재료 조회
            - **[UPDATE]** : 메뉴 정보 수정
            - **[DELETE]** : 메뉴 정보 삭제
            - **[RPC]** `add_menu_with_ingredients` : 메뉴 및 재료 일괄 등록
            - **[INDEX]** `idx_menus_family`, `idx_menus_created_by`, `idx_menus_family_status` : 조회 최적화
            - **[AUTHORIZATION]** 자동 `status='WISH'`, FOLLOWER는 추가 불가
              
        - 냉장고 재료 선택, NEED 재료 추가
            - **[SELECT]** : 재료 조회
            - **[INSERT]** : 재료 및 메뉴-재료 매핑 삽입
            - **[RPC]** `add_menu_with_ingredients`
              
    - 다른 사람 메뉴에 좋아요
        - **[SELECT]** : 좋아요 조회
        - **[INSERT/DELETE]** : 좋아요 추가/삭제
        - **[INDEX]** `idx_menu_likes_user`
          
    - 오늘의 메뉴 관리
        - 등록/삭제 불가
            - **[AUTHORIZATION]** `assertParentRole` 제한
              
    - 냉장고 조회
        - 등록/수정/삭제 불가, 조회만 가능
            - **[SELECT]** : 재료 목록 조회 (WHERE `family_id`, `is_active=true`)
            - **[INDEX]** `idx_fridge_ingredients_family`, `idx_fridge_ingredients_family_active`, `idx_fridge_ingredients_storage_type`
            - **[AUTHORIZATION]** `assertParentRole` 제한
              
    - 통계 조회
        - 최다 메뉴 top3, 집밥/외식 비율, 재료 top5
            - **[SELECT]** : 통계 데이터 조회
            - **[JOIN]** : `today_menus`와 `menus` JOIN
            - **[ORDER BY]** : 정렬
            - **[LIMIT]** : 상위 N개 제한
            - **[INDEX]** `idx_today_menus_family_date`, `idx_menus_family`, `idx_fridge_ingredients_family_active`  
   
    - 가족 관리
        - 초대 코드 열람 가능
            - **[SELECT]** : `invitation_codes` 조회
            - **[INDEX]** `idx_invitation_codes_family`, `idx_invitation_codes_family_active`
            - **[AUTHORIZATION]** `assertFamilyMember`
              
        - 역할 변경/탈퇴 처리 불가
            - **[AUTHORIZATION]** `assertParentRole` 제한
              
    - 가족 탈퇴
        - is_active=false 처리
            - **[SELECT]** : 활성 부모 수 확인
            - **[UPDATE]** : `is_active=false`로 업데이트
            - **[INDEX]** `idx_family_members_family_role_active`
              
5. **팔로워 (FOLLOWER)**
    - 메뉴 관리
        - 메뉴 등록/수정/삭제 불가
            - **[AUTHORIZATION]** 역할 제한
              
        - 좋아요 가능
            - **[SELECT]** : 좋아요 조회
            - **[INSERT/DELETE]** : 좋아요 추가/삭제
            - **[INDEX]** `idx_menu_likes_user`
              
        - 다른 가족 메뉴 가져오기
            - 부모인 경우: status='POSSIBLE'
                - **[INSERT]** : 메뉴 및 재료 삽입
                - **[RPC]** `add_menu_with_ingredients`
                  
            - 자녀인 경우: status='WISH'
                - **[INSERT]** : 메뉴 및 재료 삽입
                - **[RPC]** `add_menu_with_ingredients`
                  
    - 오늘의 메뉴 관리
        - 등록/삭제 불가
            - **[AUTHORIZATION]** `assertParentRole`
              
    - 냉장고 관리
        - 조회만 가능
            - **[SELECT]** : 재료 목록 조회
            - **[INDEX]** `idx_fridge_ingredients_family`, `idx_fridge_ingredients_family_active`
              
    - 다른 사람 메뉴에 좋아요
        - **[SELECT]** : 좋아요 조회
        - **[INSERT]** : 좋아요 추가
        - **[DELETE]** : 좋아요 삭제
        - **[INDEX]** `idx_menu_likes_user` : 좋아요 조회 최적화
          
    - 통계 조회
        - 최다 메뉴 top3, 집밥/외식 비율, 재료 top5
            - **[SELECT]** : 통계 데이터 조회
            - **[JOIN]** : `today_menus`와 `menus` JOIN
            - **[ORDER BY]** : 정렬
            - **[LIMIT]** : 상위 N개 제한
            - **[INDEX]** `idx_today_menus_family_date`, `idx_menus_family`, `idx_fridge_ingredients_family_active`
              
    - 가족 관리
        - 초대 코드 열람 불가
            - **[AUTHORIZATION]** UI에서 숨김 처리
              
        - 역할 변경/탈퇴 처리 불가
            - **[AUTHORIZATION]** `assertParentRole` 제한
              
    - 통계 조회
        - 메뉴 top3, 재료 top5, 집밥/외식 비율 조회 가능
            - **[SELECT]** : 통계 데이터 조회
            - **[JOIN]** : 테이블 JOIN
            - **[ORDER BY]** : 정렬
            - **[LIMIT]** : 상위 N개 제한
            - **[INDEX]** `idx_today_menus_family_date`, `idx_menus_family`, `idx_fridge_ingredients_family_active`
              
6. **타인 (미소속 사용자)**
    - 가족 참여
        - 초대 코드로 가족 참여(FOLLOWER 부여)
            - **[SELECT]** : `invitation_codes` 조회 (WHERE `code`, `is_active=true`)
            - **[SELECT]** : `families` 조회 (WHERE `family_id`, `is_active=true`)
            - **[SELECT]** : 기존 멤버 확인 (WHERE `family_id`, `user_id`)
            - **[UPDATE]** : `is_active=false`인 경우 재활성화 (`is_active=true`로 업데이트)
            - **[INSERT]** : 새 멤버 추가 (`role='FOLLOWER'`, `is_active=true`)
            - **[INDEX]** `idx_invitation_codes_family_active`
            - **[INDEX]** `idx_family_members_family_active`
            - **[AUTHORIZATION]** `is_active=false`인 경우 재가입 허용
              
    - 가족 생성
        - 새 가족 생성 시 자동 PARENT 부여
            - **[INSERT]** : `families` 테이블에 가족 정보 삽입 (`RETURNING`으로 `family_id` 반환)
            - **[INSERT]** : `family_members` 테이블에 멤버 정보 삽입 (`role='PARENT'`)
            - **[SELECT]** : 초대 코드 중복 체크
            - **[INSERT]** : `invitation_codes` 테이블에 초대 코드 삽입
            - **[DELETE]** : 실패 시 롤백용 삭제
            - **[INDEX]** `idx_families_created_by`, `idx_families_is_active`
            - **[INDEX]** `idx_family_members_family_role_active`
            - **[AUTHORIZATION]** 자동 `role='PARENT'`
              
    - 초대코드 검증
        - 초대 코드 유효성 검증
            - **[SELECT]** : invitation_codes 테이블에서 초대 코드 조회 (WHERE code, is_active=true)
            - **[SELECT]** : families 테이블에서 가족 정보 조회 (WHERE family_id, is_active=true)
            - **[INDEX]** idx_invitation_codes_family_active : 초대 코드 조회 최적화
            - **[INDEX]** idx_families_is_active : 활성 가족 조회 최적화
            - **[AUTHORIZATION]** 활성 초대 코드 및 활성 가족만 허용
              

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


