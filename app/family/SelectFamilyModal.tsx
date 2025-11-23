// app/family/SelectFamilyModal.tsx
"use client";

import React from "react";
import { X, Users } from "lucide-react";

type Family = {
  family_id: number;
  family_name: string;
  role: "PARENT" | "CHILD" | "FOLLOWER";
  member_count: number;
};

interface SelectFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  families: Family[];
  onSelectFamily: (family: Family) => void;
}

function RoleBadge({ role }: { role: "PARENT" | "CHILD" | "FOLLOWER" }) {
  let label = "";
  let className =
    "rounded-2xl px-2.5 py-1 text-[10px] font-semibold flex items-center justify-center";

  if (role === "PARENT") {
    label = "부모";
    className += " bg-[#F2805A] text-white";
  } else if (role === "CHILD") {
    label = "군식구";
    className += " bg-[#86E0B3] text-[#32241B]";
  } else if (role === "FOLLOWER") {
    label = "팔로워";
    className += " bg-[#F5F0EC] text-[#847062]";
  }

  return <div className={className}>{label}</div>;
}

const SelectFamilyModal: React.FC<SelectFamilyModalProps> = ({
  isOpen,
  onClose,
  families,
  onSelectFamily,
}) => {
  if (!isOpen) return null;

  const handleSelect = (family: Family) => {
    onSelectFamily(family);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-[#32241B]">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* 모달 카드 */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-[#FFFEFB] border border-[#E7E1DA] px-7 py-6 shadow-2xl">
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col gap-1">
            <div className="text-[22px] font-bold">가족 선택</div>
            <div className="text-[13px] text-[#A28B78]">
              메뉴를 추가할 가족을 선택해주세요
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F5F0EC] transition transform active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* 가족 목록 */}
        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {families.length === 0 ? (
            <div className="text-center py-8 text-[#A28B78] text-[14px]">
              가족이 없습니다
            </div>
          ) : (
            families.map((family) => (
              <button
                key={family.family_id}
                type="button"
                onClick={() => handleSelect(family)}
                className="flex items-center justify-between p-4 rounded-2xl border border-[#E7E1DA] bg-white hover:bg-[#FCFAF8] transition text-left"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="font-bold text-[16px]">
                      {family.family_name}
                    </div>
                    <RoleBadge role={family.role} />
                  </div>
                  <div className="flex items-center gap-1 text-[12px] text-[#A28B78]">
                    <Users size={14} />
                    <span>멤버 {family.member_count}명</span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl border border-[#E7E1DA] bg-white text-[13px] font-semibold text-[#32241B] hover:bg-[#FCFAF8]"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectFamilyModal;

