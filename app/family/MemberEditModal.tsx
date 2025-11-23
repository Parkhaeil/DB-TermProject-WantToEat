"use client";

import React, { useState } from "react";
import {
  X,
  ChevronDown,
  UserMinus,
  Check,
} from "lucide-react";

type Role = "PARENT" | "CHILD" | "FOLLOWER";

export interface FamilyMember {
  id: number;
  name: string;
  joinedAt: string; // 예: "2024.01.01"
  role: Role;
}

interface MemberEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyName: string;
  members: FamilyMember[];

  onChangeRole?: (id: number, newRole: Role) => void;
  onKick?: (id: number) => void;
}

function roleLabel(role: Role) {
  if (role === "PARENT") return "부모";
  if (role === "CHILD") return "자식";
  return "팔로워";
}

function roleBadgeClass(role: Role) {
  if (role === "PARENT") return "bg-[#F2805A] text-white";
  if (role === "CHILD") return "bg-[#86E0B3] text-[#32241B]";
  return "bg-[#F5F0EC] text-[#847062]";
}

const MemberEditModal: React.FC<MemberEditModalProps> = ({
  isOpen,
  onClose,
  familyName,
  members,
  onChangeRole,
  onKick,
}) => {
  const [openRoleMemberId, setOpenRoleMemberId] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSelectRole = (memberId: number, newRole: Role) => {
    setOpenRoleMemberId(null);
    onChangeRole?.(memberId, newRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-[#32241B]">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* 모달 카드 */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-[#FFFEFB] border border-[#E7E1DA] px-6 py-5 shadow-lg">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex flex-col gap-1">
            <div className="font-bold text-[18px]">가족 구성원 관리</div>
            <div className="text-[12px] text-[#847062]">{familyName}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#F5F0EC] transition-all duration-150 transform active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* 설명 */}
        <div className="mt-3 mb-4">
          <div className="text-[12px] font-semibold">총 {members.length}명</div>
          <div className="text-[12px] text-[#847062]">
            구성원의 역할을 변경하거나 내보낼 수 있습니다.
          </div>
        </div>

        {/* 구성원 리스트 */}
        <div className="flex flex-col gap-3 mb-5 max-h-80 overflow-y-auto">
          {members.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl bg-white border border-[#F0E6DD] px-4 py-3 flex items-center justify-between"
            >
              {/* 왼쪽: 아바타 + 이름/가입일 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFF7DD] flex items-center justify-center text-xl">
                  🧑‍🍳
                </div>
                <div className="flex flex-col">
                  <div className="text-[13px] font-semibold">{m.name}</div>
                  <div className="text-[11px] text-[#A28B78]">
                    가입일: {m.joinedAt}
                  </div>
                </div>
              </div>

              {/* 오른쪽: 역할 토글 + 액션들 */}
              <div className="flex items-center gap-2">
                {/* 역할 선택 토글 */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenRoleMemberId(
                        openRoleMemberId === m.id ? null : m.id
                      )
                    }
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold ${roleBadgeClass(
                      m.role
                    )}`}
                  >
                    {roleLabel(m.role)}
                    <ChevronDown size={14} />
                  </button>

                  {openRoleMemberId === m.id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border border-[#E7E1DA] rounded-xl shadow-lg text-[12px] z-30">
                      {/* 부모 */}
                      <button
                        type="button"
                        onClick={() => handleSelectRole(m.id, "PARENT")}
                        className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-[#FFF6F4]"
                      >
                        <span className="inline-block mr-1 rounded-full px-1.5 py-0.5 text-[10px] bg-[#F2805A] text-white">
                          부모
                        </span>
                        {m.role === "PARENT" && (
                          <Check size={14} className="text-[#F2805A]" />
                        )}
                      </button>

                      {/* 자식 */}
                      <button
                        type="button"
                        onClick={() => handleSelectRole(m.id, "CHILD")}
                        className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-[#F4FFF8]"
                      >
                        <span className="inline-block mr-1 rounded-full px-1.5 py-0.5 text-[10px] bg-[#86E0B3] text-[#32241B]">
                          자식
                        </span>
                        {m.role === "CHILD" && (
                          <Check size={14} className="text-[#3E7358]" />
                        )}
                      </button>

                      {/* 팔로워 */}
                      <button
                        type="button"
                        onClick={() => handleSelectRole(m.id, "FOLLOWER")}
                        className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-[#FCFAF8]"
                      >
                        <span className="inline-block mr-1 rounded-full px-1.5 py-0.5 text-[10px] bg-[#F5F0EC] text-[#847062]">
                          팔로워
                        </span>
                        {m.role === "FOLLOWER" && (
                          <Check size={14} className="text-[#847062]" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onKick?.(m.id)}
                  className="p-1 rounded-full hover:bg-[#FFF0EE] transition"
                >
                  <UserMinus size={16} className="text-[#D0675B]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 역할별 권한 박스 */}
        <div className="rounded-2xl bg-[#FFF7E0] px-4 py-4">
          <div className="text-[12px] font-bold mb-2">💡 역할별 권한</div>
          <div className="flex flex-col gap-2 text-[11px] text-[#5B4636]">
            <div>
              <span className="inline-block mr-1 rounded-full px-2 py-0.5 text-[10px] bg-[#F2805A] text-white font-semibold">
                부모
              </span>
              가능한 상태의 메뉴 관리, 오늘의 메뉴 선택, 냉장고 관리, 역할 변경 가능
            </div>
            <div>
              <span className="inline-block mr-1 rounded-full px-2 py-0.5 text-[10px] bg-[#86E0B3] text-[#32241B] font-semibold">
                자식
              </span>
              먹고싶어요 메뉴 작성, 좋아요, 메뉴 조회 가능
            </div>
            <div>
              <span className="inline-block mr-1 rounded-full px-2 py-0.5 text-[10px] bg-[#F5F0EC] text-[#847062] font-semibold">
                팔로워
              </span>
              메뉴 조회만 가능, 내 가족으로 메뉴 가져오기 가능
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberEditModal;