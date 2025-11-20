"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface InviteCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteCodeModal: React.FC<InviteCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [code, setCode] = useState("");

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
          <div className="font-bold text-[18px]">가족 참여하기</div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#F5F0EC] transition-all duration-150 transform active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* 설명 */}
        <p className="text-[12px] text-[#847062] font-semibold mb-4">
          초대코드를 입력하여 가족 메뉴판에 참여하세요.
        </p>

        {/* 폼 (틀만) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: 초대 코드 검증/참여 로직 연결
            onClose();
          }}
          className="flex flex-col gap-3"
        >
          {/* 초대 코드 입력 */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-semibold text-[#32241B]">
              초대 코드
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="예) FAM2024XYZ"
                className="w-6/7 rounded-xl border border-[#E7E1DA] bg-[#FFFFFF] px-3 py-2 text-[12px] focus:outline-none focus:border-[#F2805A]"
              />
              <button
                type="button"
                className="w-1/7 px-4 py-2 rounded-xl text-[12px] font-bold bg-[#F2805A] text-white
                          transition-all duration-150 transform active:scale-95"
              >
                확인
              </button>
            </div>
          </div>

          {/* 안내 박스 – CreateFamilyModal 스타일 맞춤 (텍스트는 네가 쓴 그대로) */}
          <div className="bg-[#F5F0EC] p-4 rounded-2xl mb-10">
            <div className="text-[14px] font-bold mb-2">💡 초대코드</div>
            <div className="text-[12px]">
              가족 메뉴판의 구성원이 공유한 초대코드를 입력하세요.
            </div>
            <div className="text-[12px]">
              초대코드는 가족 메뉴판 내에서 확인할 수 있어요.
            </div>
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
              참여하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteCodeModal;