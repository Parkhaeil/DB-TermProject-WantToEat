// app/family/StatsModal.tsx
"use client";

import React from "react";
import { X, BarChart3 } from "lucide-react";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 더미 데이터 (나중에 실제 API/쿼리 결과로 교체)
const mockTopLikedMenus = [
  { rank: 1, name: "김치찌개", likes: 15 },
  { rank: 2, name: "연어덮밥", likes: 12 },
  { rank: 3, name: "된장찌개", likes: 9 },
];

const mockMostEatenMenu = {
  name: "된장찌개",
  times: 7,
};

// 집밥 / 배달 비율
const homePercent = 68;
const eatOutPercent = 32;

// 식재료 사용량 더미
const topUsedIngredients = [
  { name: "양파", count: 12 },
  { name: "대파", count: 10 },
  { name: "계란", count: 9 },
  { name: "두부", count: 7 },
  { name: "김치", count: 6 },
];

const leastUsedIngredients = [
  { name: "파프리카", count: 1 },
  { name: "브로콜리", count: 1 },
  { name: "슬라이스 치즈", count: 2 },
  { name: "베이컨", count: 2 },
  { name: "버터", count: 3 },
];

const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-[#32241B]">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* 모달 카드 */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-[#FFFEFB] border border-[#E7E1DA] px-6 py-5 shadow-lg">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-[#F2805A]" />
            <div className="flex flex-col">
              <div className="font-bold text-[18px]">우리 가족 메뉴 통계</div>
              <div className="text-[12px] text-[#847062]">
                좋아요, 식사 기록, 냉장고 재료까지 한눈에 볼 수 있어요.
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#F5F0EC] transition-all duration-150 transform active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* 내용 */}
        <div className="flex flex-col gap-4 text-[12px] text-[#5B4636]">
          {/* 좋아요 통계 */}
          <div className="rounded-2xl bg-[#FFF7E0] px-4 py-3">
            <div className="font-bold mb-1.5">🍽️ 가족들이 제일 좋아하는 메뉴</div>
            <div className="text-[12px] mb-2">
              <span className="font-semibold">좋아요 개수</span>를 기준으로
              가장 사랑받은 메뉴를 보여줘요.
            </div>
            <ul className="space-y-1.5">
              {mockTopLikedMenus.map((m) => (
                <li
                  key={m.rank}
                  className="flex items-center justify-between text-[12px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#F2805A]/10 text-[#F2805A] text-[11px] flex items-center justify-center font-bold">
                      {m.rank}
                    </span>
                    <span>{m.name}</span>
                  </div>
                  <span className="text-[11px] text-[#A26A4F]">
                    ♥ {m.likes}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 이번달 최다 메뉴 + 배달/집밥 비율 */}
          <div className="rounded-2xl bg-[#FCFAF8] px-4 py-3 flex flex-col gap-3">
            {/* 이번 달 최다 메뉴 */}
            <div>
              <div className="font-bold mb-1">📅 이번 달에 제일 많이 먹은 메뉴</div>
              <div className="text-[12px] mb-1">
                이번 달 식사 기록 기준,{" "}
                <span className="font-semibold">{mockMostEatenMenu.name}</span>을
                {` 총 ${mockMostEatenMenu.times}번`} 먹었어요.
              </div>
            </div>

            <div className="h-[1px] w-full bg-[#F0E6DD]" />

            {/* 배달/집밥 비율 - 한 줄 + 양 끝 수치 + 두 바 */}
            <div>
              <div className="font-bold mb-1">🏠 배달음식 / 집밥 비율</div>
              <div className="text-[11px] text-[#8A6A4D] mb-2">
                이번 달 식사 기록 기준, 집밥 {homePercent}%, 배달 {eatOutPercent}%예요.
              </div>

              <div className="w-full flex items-center gap-3">
                {/* 집밥 퍼센트 (왼쪽) */}
                <span className="text-[11px] font-semibold text-[#C45A2A] whitespace-nowrap">
                  {homePercent}%
                </span>

                {/* 두 색상이 이어지는 바 */}
                <div className="flex-1 h-3 rounded-full bg-[#F0E6DD] overflow-hidden flex">
                  {/* 집밥 오렌지 부분 */}
                  <div
                    className="h-full bg-[#F2805A]"
                    style={{ width: `${homePercent}%` }}
                  />
                  {/* 배달 블루 부분 */}
                  <div
                    className="h-full bg-[#86C5F0]"
                    style={{ width: `${eatOutPercent}%` }}
                  />
                </div>

                {/* 배달 퍼센트 (오른쪽) */}
                <span className="text-[11px] font-semibold text-[#2F7A9F] whitespace-nowrap">
                  {eatOutPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* 재료 선호도 */}
          <div className="rounded-2xl bg-[#F5F0EC] px-4 py-3 flex flex-col gap-3">
            <div className="font-bold">🧊 식재료 선호도 (냉장고 기준)</div>
            <div className="text-[12px]">
              냉장고에 넣어 둔 재료와 메뉴에 기록된 사용 내역을 기반으로{" "}
              <span className="font-semibold">사용 횟수</span>를 계산해요.
            </div>
            <div className="grid grid-cols-2 gap-3 mt-1">
              {/* TOP 5 */}
              <div>
                <div className="text-[11px] font-semibold mb-1">
                  가장 많이 쓴 재료 TOP 5
                </div>
                <ul className="space-y-1">
                  {topUsedIngredients.map((ing, idx) => (
                    <li
                      key={ing.name}
                      className="flex items-center justify-between text-[11px]"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-[#86E0B3]/20 text-[#2E6F51] text-[10px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>{ing.name}</span>
                      </div>
                      <span className="text-[#8A6A4D]">x{ing.count}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BOTTOM 5 */}
              <div>
                <div className="text-[11px] font-semibold mb-1">
                  거의 안 쓴 재료 TOP 5
                </div>
                <ul className="space-y-1">
                  {leastUsedIngredients.map((ing, idx) => (
                    <li
                      key={ing.name}
                      className="flex items-center justify-between text-[11px]"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-[#F2E1D2] text-[#8A6A4D] text-[10px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>{ing.name}</span>
                      </div>
                      <span className="text-[#8A6A4D]">x{ing.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-[12px] border border-[#E7E1DA] bg-[#FFFFFF]
                       transition-all duration-150 transform active:scale-95"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;