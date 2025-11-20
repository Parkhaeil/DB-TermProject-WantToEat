"use client";

import { X } from "lucide-react";
import React from "react";

interface CreateFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateFamilyModal: React.FC<CreateFamilyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-[#32241B]">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* 모달 카드 */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#FFFEFB] border border-[#E7E1DA] px-6 py-5">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-1">
          <div className="font-bold text-[18px]">새 가족 만들기</div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#F5F0EC] transition-all duration-150 transform active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* 설명 */}
        <p className="text-[12px] text-[#847062] font-semibold mb-4">
          우리 가족만의 메뉴판을 시작하세요.
        </p>

        {/* 폼 (틀만) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: 실제 생성 로직 연결 예정
            onClose();
          }}
          className="flex flex-col gap-3"
        >
          {/* 가족 이름 */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-semibold text-[#32241B]">
              가족 이름
            </label>
            <input
              type="text"
              placeholder="예) 이유민네 메뉴판"
              className="w-full rounded-xl border border-[#E7E1DA] bg-[#FFFFFF] px-3 py-2 text-[12px] focus:outline-none focus:border-[#F2805A]"
            />
          </div>

          <p className="text-[12px] text-[#847062] font-semibold mb-2">
            가족 구성원들이 볼 수 있는 이름이에요
          </p>

          {/* 설명 박스들 */}
          <div className="bg-[#F5F0EC] p-4 rounded-2xl">
            <div className="text-[14px] font-bold mb-2">내 역할</div>
            <div className="text-[12px]">가족을 만들면 자동으로 부모 역할이 부여됩니다.</div>
            <div className="text-[12px]">부모는 메뉴를 관리하고 최종 결정을 할 수 있어요.</div>
          </div>
          <div className="bg-[#FDF3D6] p-4 rounded-2xl mb-10">
            <div className="text-[14px] font-bold mb-2">💡 초대 코드</div>
            <div className="text-[12px]">가족 생성 후 초대 코드가 자동으로 생성됩니다.</div>
            <div className="text-[12px]">초대를 공유하여 가족 구성원을 초대하세요!</div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[12px] border border-[#E7E1DA] bg-[#FFFFFF]
                         transition-all duration-150 transform active:scale-95"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-[12px] font-bold bg-[#F2805A] text-white
                         transition-all duration-150 transform active:scale-95"
            >
              가족 생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFamilyModal;