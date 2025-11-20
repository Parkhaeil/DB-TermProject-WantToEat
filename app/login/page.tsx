// app/login/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupNickname, setSignupNickname] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: 실제 로그인 API 붙이면 여기에서 검증 후 성공 처리
    console.log("login", { loginEmail, loginPassword });

    // ✅ 로그인 성공했다고 가정하고 로그인 상태 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true");
      // 필요하면 유저 정보도 저장 가능
      // localStorage.setItem("userNickname", "유민");
    }

    router.push("/");
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("signup", {
      signupNickname,
      signupEmail,
      signupPassword,
      signupPasswordConfirm,
    });

    // TODO: 회원가입 API 붙이고 성공 시에만 아래 실행
    // ✅ 회원가입 완료 → 로그인 탭으로 전환
    setAuthMode("login");
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-[#FCFAF8] text-[#32241B]">
      {/* 헤더 */}
      <div className="flex items-center justify-start w-full h-18 gap-4 px-10 bg-[#FFFFFF] border-b border-[#E7E1DA]">
        <div className="flex gap-3 items-center">
          <UtensilsCrossed className="scale-130 text-[#F2805A]" />
          <div className="font-bold text-[24px]">WantToEat</div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-1 justify-between items-start w-full px-60 pt-55 gap-8">
        {/* 왼쪽 설명 영역 */}
        <div className="flex flex-col items-start gap-3">
          <UtensilsCrossed size={60} className="text-[#F2805A]" />
          <div className="font-bold text-[24px]">WantToEat</div>
          <div className="text-[14px]">가족끼리 같이 정하는 오늘의 메뉴</div>

          <div className="leading-8">
            <div className="flex items-center gap-2">
              <div className="text-[26px]">🍽️</div>
              <div className="text-[14px]">메뉴를 제안하고 좋아요로 투표하세요</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[26px]">❤️</div>
              <div className="text-[14px]">가족 모두가 함께 결정해요</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[26px]">📱</div>
              <div className="text-[14px]">냉장고 재료도 함께 관리할 수 있어요</div>
            </div>
          </div>
        </div>

        {/* 오른쪽 로그인/회원가입 카드 */}
        <div
          className={`w-[450px] transition-all duration-200 ${
            authMode === "signup" ? "-mt-18" : "-mt-10"
          }`}
        >
          <div className="w-full rounded-2xl bg-[#FFFFFF] border border-[#DDDDDD] px-6 py-5">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-[18px]">
                {authMode === "login" ? "로그인" : "회원가입"}
              </div>
            </div>

            {/* 애니메이션 탭 */}
            <div className="relative flex bg-[#F5F0EC] py-1.5 px-1.5 rounded-xl mb-4 overflow-hidden">
              <div
                className={`
                  absolute top-1.5 bottom-1.5 left-1.5 
                  w-1/2 rounded-xl bg-[#FCFAF8] 
                  transition-transform duration-200
                  ${authMode === "signup" ? "translate-x-47" : ""}
                `}
              />
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`relative z-10 flex-1 py-2 text-[12px] font-semibold transition-all ${
                  authMode === "login" ? "text-[#32241B]" : "text-[#847062]"
                }`}
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`relative z-10 flex-1 py-2 text-[12px] font-semibold transition-all ${
                  authMode === "signup" ? "text-[#32241B]" : "text-[#847062]"
                }`}
              >
                회원가입
              </button>
            </div>

            {/* 로그인 폼 */}
            {authMode === "login" ? (
              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-semibold">이메일</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="예) your@email.com"
                    className="w-full rounded-xl border border-[#E7E1DA] px-3 py-2 text-[12px]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-semibold">비밀번호</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full rounded-xl border border-[#E7E1DA] px-3 py-2 text-[12px]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full px-4 py-2 rounded-xl text-[12px] font-bold bg-[#F2805A] text-white"
                >
                  로그인
                </button>
              </form>
            ) : (
              /* 회원가입 폼 */
              <form onSubmit={handleSignupSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-semibold">닉네임</label>
                  <input
                    type="text"
                    value={signupNickname}
                    onChange={(e) => setSignupNickname(e.target.value)}
                    placeholder="가족 내에서 사용할 이름"
                    className="w-full rounded-xl border border-[#E7E1DA] px-3 py-2 text-[12px]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-semibold">이메일</label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="예) your@email.com"
                    className="w-full rounded-xl border border-[#E7E1DA] px-3 py-2 text-[12px]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-semibold">비밀번호</label>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full rounded-xl border border-[#E7E1DA] px-3 py-2 text-[12px]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-semibold">비밀번호 확인</label>
                  <input
                    type="password"
                    value={signupPasswordConfirm}
                    onChange={(e) => setSignupPasswordConfirm(e.target.value)}
                    placeholder="비밀번호를 한 번 더 입력하세요"
                    className="w-full rounded-xl border border-[#E7E1DA] px-3 py-2 text-[12px]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full px-4 py-2 rounded-xl text-[12px] font-bold bg-[#F2805A] text-white"
                >
                  회원가입
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}