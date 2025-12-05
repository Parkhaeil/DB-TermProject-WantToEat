// app/family/FamilyLeftSection.tsx
"use client";

import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Filter,
  Plus,
  MoreVertical,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { ChangeEvent } from "react";
import AddMenuModal from "./AddMenuModal";
import SelectFamilyModal from "./SelectFamilyModal";

function formatKoreanDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatInputDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/* ===========================
   DB 스키마 기반 타입 & 더미 데이터
   =========================== */

type StorageType = "ROOM" | "FRIDGE" | "FREEZER" | "NEED";

type MenuIngredient = {
  ingredient_id: number;
  ingredient_name: string;
  storage_type: StorageType;
};

type MenuStatus = "POSSIBLE" | "WISH";

type MenuItem = {
  menu_id: number;
  menu_name: string;
  status: MenuStatus;
  author: string;
  roleLabel: string;
  ingredients: MenuIngredient[];
  likes: number;
  sourceType?: "HOME" | "EAT_OUT"; // 집밥/외식 정보
};


/* ===========================
   메뉴 카드 컴포넌트
   =========================== */

type MenuCardProps = MenuItem & {
  onEdit: () => void;
  onDelete: () => void;
  onCopy: () => void;
  onDecideToday: () => void;
};

function MenuCard({
  menu_id,
  menu_name,
  author,
  roleLabel,
  ingredients,
  likes,
  onEdit,
  onDelete,
  onCopy,
  onDecideToday,
}: MenuCardProps) {
  const stockedIngredients = ingredients.filter(
    (ing) => ing.storage_type !== "NEED"
  );
  const neededIngredients = ingredients.filter(
    (ing) => ing.storage_type === "NEED"
  );

  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
  };

  const displayLikeCount = likes + (isLiked ? 1 : 0);

  const handleClickMenuAction = (
    action: "edit" | "delete" | "copy" | "today",
  ) => {
    if (action === "edit") onEdit();
    if (action === "delete") onDelete();
    if (action === "copy") onCopy();
    if (action === "today") onDecideToday();
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full max-w-115 bg-[#FFFFFF] border border-[#E7E1DA] rounded-2xl px-4 py-4 flex flex-col gap-3">
      {/* 상단: 메뉴 이름 + 점3개 */}
      <div className="flex items-start justify-between relative">
        <div className="flex flex-col gap-1">
          <div className="text-[14px] font-bold text-[#32241B]">
            {menu_name}
          </div>
          <div className="text-[12px] text-[#A28B78]">
            {author} · {roleLabel}
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-1 rounded-full hover:bg-[#F5F0EC] transition"
          >
            <MoreVertical size={16} className="text-[#C2B5A8]" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white border border-[#E7E1DA] rounded-xl shadow-lg text-[12px] text-[#32241B] z-20 overflow-hidden">
              <button
                type="button"
                onClick={() => handleClickMenuAction("today")}
                className="w-full text-left px-3 py-2 hover:bg-[#FFF6E9]"
              >
                오늘의 메뉴로 결정
              </button>
              <button
                type="button"
                onClick={() => handleClickMenuAction("copy")}
                className="w-full text-left px-3 py-2 hover:bg-[#FCFAF8]"
              >
                내 가족 메뉴로 추가
              </button>
              <div className="border-t border-[#F0E6DD]" />
              <button
                type="button"
                onClick={() => handleClickMenuAction("edit")}
                className="w-full text-left px-3 py-2 hover:bg-[#FCFAF8]"
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => handleClickMenuAction("delete")}
                className="w-full text-left px-3 py-2 hover:bg-[#FFF3F0] text-[#C94F3D]"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 재료 태그 */}
      {stockedIngredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {stockedIngredients.map((ing) => (
            <span
              key={ing.ingredient_id}
              className="px-2 py-1 rounded-full border bg-[#FFFFFF] border-[#E7E1DA] text-[10px] font-semibold"
            >
              {ing.ingredient_name}
            </span>
          ))}
        </div>
      )}

      {/* 사야 할 재료 영역 */}
      {neededIngredients.length > 0 && (
        <div className="flex flex-col gap-1">
          <div className="text-[12px] text-[#B58A5A] font-semibold">
            사야 할 재료
          </div>
          <div className="flex flex-wrap gap-2">
            {neededIngredients.map((ing) => (
              <span
                key={ing.ingredient_id}
                className="px-2 py-1 rounded-full border border-dashed border-[#F2B8A3] bg-[#FFF5F0] text-[10px] text-[#C36037] font-semibold"
              >
                {ing.ingredient_name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 구분선 */}
      <div className="flex items-center gap-2">
        <div className="flex-1 border-t border-[#EFE6DD]" />
      </div>

      {/* 하트 좋아요 */}
      <button
        type="button"
        onClick={handleToggleLike}
        className="flex items-center gap-1 text-[14px] text-[#32241B] w-fit active:scale-95 transition-transform"
      >
        <Heart
          size={14}
          className={isLiked ? "text-[#E84848]" : "text-[#32241B]"}
          fill={isLiked ? "#E84848" : "none"}
        />
        <span>{displayLikeCount}</span>
      </button>
    </div>
  );
}

/* ===========================
   왼쪽 섹션 본문
   =========================== */

export default function FamilyLeftSection() {
  const params = useParams();
  const familyIdParam = params?.familyId;

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [sortType, setSortType] = useState<"latest" | "popular">("latest");
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [isSelectFamilyOpen, setIsSelectFamilyOpen] = useState(false);
  const [copyingMenu, setCopyingMenu] = useState<MenuItem | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<{
    family_id: number;
    family_name: string;
  } | null>(null);

  // ✅ 메뉴를 state로 관리
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoadingMenus, setIsLoadingMenus] = useState(true);

  // 메뉴 목록 조회 함수
  const fetchMenus = async () => {
    if (!familyIdParam) return;

    const familyIdNum = Number(familyIdParam);
    if (Number.isNaN(familyIdNum)) {
      console.error("유효하지 않은 가족 ID입니다.");
      setIsLoadingMenus(false);
      return;
    }

    try {
      setIsLoadingMenus(true);
      const res = await fetch(`/family/${familyIdNum}/menus`);
      const json = await res.json();

      if (!res.ok) {
        console.error("메뉴 조회 실패:", json);
        alert(json.error || "메뉴 조회 실패");
        setIsLoadingMenus(false);
        return;
      }

      setMenus(json || []);
    } catch (err) {
      console.error("메뉴 조회 요청 에러:", err);
      alert("서버 연결 실패");
    } finally {
      setIsLoadingMenus(false);
    }
  };

  // 컴포넌트 마운트 시 메뉴 목록 조회
  useEffect(() => {
    fetchMenus();
  }, [familyIdParam]);

  const handleAddMenuToServer = async (data: {
    menuName: string;
    sourceType: "HOME" | "EAT_OUT";
    status?: MenuStatus;
    selectedIngredients?: { storage: StorageType; name: string }[];
    toBuy?: string[];
  }) => {
    if (!familyIdParam) {
      alert("가족 ID를 찾을 수 없습니다. 상단 페이지에서 다시 진입해주세요.");
      return;
    }

    const storedUser =
      typeof window !== "undefined"
        ? localStorage.getItem("currentUser")
        : null;
    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn || !storedUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    let currentUser: { userId: number; email: string; nickname: string };
    try {
      currentUser = JSON.parse(storedUser);
    } catch (e) {
      console.error("currentUser 파싱 에러:", e);
      alert("로그인 정보를 불러오는 중 오류가 발생했습니다.");
      return;
    }

    const familyIdNum = Number(familyIdParam);
    if (Number.isNaN(familyIdNum)) {
      alert("유효하지 않은 가족 ID입니다.");
      return;
    }

    try {
      // 실제 라우트 위치: app/family/[familyId]/menus/route.ts -> /family/[familyId]/menus
      const res = await fetch(`/family/${familyIdNum}/menus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.userId,
          menuName: data.menuName,
          sourceType: data.sourceType,
          status: data.status ?? "POSSIBLE",
          selectedIngredients: data.selectedIngredients ?? [],
          toBuy: data.toBuy ?? [],
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("메뉴 추가 실패:", json);
        alert(json.error || "메뉴 추가 실패");
        return;
      }

      console.log("메뉴 추가 성공:", json);

      // 메뉴 추가 후 목록 새로고침
      await fetchMenus();
    } catch (err) {
      console.error("메뉴 추가 요청 에러:", err);
      alert("서버 연결 실패");
    }
  };

  // 더미 가족 목록 (나중에 실제 데이터로 교체)
  const dummyFamilies = [
    {
      family_id: 101,
      family_name: "이유민네 메뉴판",
      role: "PARENT" as const,
      member_count: 4,
    },
    {
      family_id: 102,
      family_name: "서혜민네 메뉴판",
      role: "FOLLOWER" as const,
      member_count: 3,
    },
  ];

  const handlePrevDay = () => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d;
    });
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [year, month, day] = e.target.value.split("-").map(Number);
    const d = new Date();
    d.setFullYear(year, month - 1, day);
    d.setHours(0, 0, 0, 0);
    setSelectedDate(d);
    setIsCalendarOpen(false);
  };

  const today = new Date();

  const getDateLabel = (target: Date) => {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (isSameDate(target, today)) return "오늘";
    if (isSameDate(target, yesterday)) return "어제";
    if (isSameDate(target, tomorrow)) return "내일";
    return `${target.getDate()}일`;
  };

  const sortMenus = (list: MenuItem[]) => {
    if (sortType === "latest") {
      return [...list].sort((a, b) => b.menu_id - a.menu_id);
    }
    if (sortType === "popular") {
      return [...list].sort((a, b) => b.likes - a.likes);
    }
    return list;
  };

  const possibleMenus = sortMenus(
    menus.filter((m) => m.status === "POSSIBLE"),
  );
  const wishMenus = sortMenus(menus.filter((m) => m.status === "WISH"));

  // 오늘의 메뉴로 결정 (지금은 콘솔 + alert만, 나중에 오른쪽 섹션이랑 연동 가능)
  const handleDecideToday = (menu: MenuItem) => {
    console.log("[오늘의 메뉴로 결정]", menu);
    alert(`‘${menu.menu_name}’을(를) 오늘의 메뉴로 결정했어요! (우측 패널 연동 예정)`);
  };

  // 메뉴 삭제
  const handleDeleteMenu = async (menuId: number) => {
    // TODO: 삭제 API 연동 필요
    // 현재는 로컬 state만 업데이트
    setMenus((prev) => prev.filter((m) => m.menu_id !== menuId));
    // 삭제 후 목록 새로고침
    await fetchMenus();
  };

  // 메뉴 복사 - 가족 선택 모달 먼저 띄우기
  const handleCopyMenu = (menu: MenuItem) => {
    setCopyingMenu(menu);
    setIsSelectFamilyOpen(true);
  };

  // 가족 선택 후 AddMenuModal 띄우기
  const handleSelectFamily = (family: {
    family_id: number;
    family_name: string;
    role: "PARENT" | "CHILD" | "FOLLOWER";
    member_count: number;
  }) => {
    setSelectedFamily(family);
    setIsSelectFamilyOpen(false);
    setIsAddMenuOpen(true);
  };

  // 메뉴 수정
  const handleEditMenu = (menu: MenuItem) => {
    setEditingMenu(menu);
    setIsAddMenuOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddMenuOpen(false);
    setEditingMenu(null);
    setCopyingMenu(null);
    setSelectedFamily(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 날짜 박스 */}
      <div className="flex justify-between items-center w-230 px-8 py-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E1DA]">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handlePrevDay}
            className="p-1 rounded-full hover:bg-[#F5F0EC] transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex flex-col justify-center items-center leading-6">
            <div className="text-[20px] font-bold">
              {getDateLabel(selectedDate)}
            </div>
            <div className="text-[12px]">
              {formatKoreanDate(selectedDate)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleNextDay}
            className="p-1 rounded-full hover:bg-[#F5F0EC] transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex gap-2 items-center relative">
          <button
            type="button"
            onClick={handleToday}
            className="flex gap-1 items-center bg-[#FCFAF8] border border-[#E9E4DE] px-3 py-3 rounded-xl 
                        text-[12px] font-semibold transition-all duration-150 transform active:scale-95"
          >
            오늘
          </button>

          <button
            type="button"
            onClick={() => setIsCalendarOpen((prev) => !prev)}
            className="flex gap-1 items-center bg-[#FCFAF8] border border-[#E9E4DE] px-3 py-3 rounded-xl 
                        text-[12px] font-semibold transition-all duration-150 transform active:scale-95"
          >
            <Calendar size={20} />
          </button>

          {isCalendarOpen && (
            <div className="absolute top-full right-0 mt-2 z-50 bg-white border border-[#E7E1DA] rounded-xl shadow-lg p-3">
              <input
                type="date"
                value={formatInputDate(selectedDate)}
                onChange={handleDateChange}
                className="p-2 border border-[#E7E1DA] rounded-lg text-[12px]"
              />
            </div>
          )}
        </div>
      </div>

      {/* 필터 박스 */}
      <div className="flex justify-between items-center w-230 px-8 py-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E1DA]">
        <div className="flex items-center gap-6 text-[14px]">
          <Filter size={20} />
          <button
            type="button"
            onClick={() => setSortType("latest")}
            className={
              sortType === "latest"
                ? "text-[#F2805A] font-bold"
                : "text-[#32241B] hover:opacity-60"
            }
          >
            최신순
          </button>
          <button
            type="button"
            onClick={() => setSortType("popular")}
            className={
              sortType === "popular"
                ? "text-[#F2805A] font-bold"
                : "text-[#32241B] hover:opacity-60"
            }
          >
            인기순
          </button>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setEditingMenu(null);
              setIsAddMenuOpen(true);
            }}
            className="flex gap-1 items-center bg-[#F2805A] text-white px-3 py-3 rounded-xl 
                          text-[12px] font-semibold transition-all duration-150 transform active:scale-95"
          >
            <div className="flex gap-1 items-center">
              <Plus size={20} />
              <div>메뉴 추가</div>
            </div>
          </button>
        </div>
      </div>

      {/* 상태 요약 */}
      <div className="grid grid-cols-2 w-230">
        <div className="flex gap-2 items-center">
          <div className="text-[24px]">🍳</div>
          <div className="text-[16px] font-semibold">가능해요</div>
          <div className="text-[12px] text-[#7B1E3D] bg-[#F9DDE6] rounded-2xl px-3 py-0.5">
            {possibleMenus.length}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="text-[24px]">🙏</div>
          <div className="text-[16px] font-semibold">먹고싶어요</div>
          <div className="text-[12px] text-[#7B1E3D] bg-[#F9DDE6] rounded-2xl px-3 py-0.5">
            {wishMenus.length}
          </div>
        </div>
      </div>

      {/* 상태별 열 정렬 */}
      {isLoadingMenus ? (
        <div className="flex justify-center items-center py-10 text-[14px] text-[#A28B78]">
          메뉴를 불러오는 중...
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 w-230">
          <div className="flex flex-col gap-5">
            {possibleMenus.length === 0 ? (
              <div className="text-[12px] text-[#A28B78] text-center py-4">
                가능한 메뉴가 없습니다
              </div>
            ) : (
              possibleMenus.map((m) => (
                <MenuCard
                  key={m.menu_id}
                  {...m}
                  onEdit={() => handleEditMenu(m)}
                  onDelete={() => handleDeleteMenu(m.menu_id)}
                  onCopy={() => handleCopyMenu(m)}
                  onDecideToday={() => handleDecideToday(m)}
                />
              ))
            )}
          </div>

          <div className="flex flex-col gap-5">
            {wishMenus.length === 0 ? (
              <div className="text-[12px] text-[#A28B78] text-center py-4">
                먹고 싶은 메뉴가 없습니다
              </div>
            ) : (
              wishMenus.map((m) => (
                <MenuCard
                  key={m.menu_id}
                  {...m}
                  onEdit={() => handleEditMenu(m)}
                  onDelete={() => handleDeleteMenu(m.menu_id)}
                  onCopy={() => handleCopyMenu(m)}
                  onDecideToday={() => handleDecideToday(m)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* 가족 선택 모달 */}
      <SelectFamilyModal
        isOpen={isSelectFamilyOpen}
        onClose={() => {
          setIsSelectFamilyOpen(false);
          setCopyingMenu(null);
        }}
        families={dummyFamilies}
        onSelectFamily={handleSelectFamily}
      />

      {/* 메뉴 추가/수정 모달 */}
      <AddMenuModal
        isOpen={isAddMenuOpen}
        onClose={handleCloseModal}
        familyName={selectedFamily?.family_name || "이유민네 메뉴판"}
        editingMenu={editingMenu}
        simpleMode={!!copyingMenu}
        sourceMenuName={copyingMenu?.menu_name || ""}
        sourceMenuType={copyingMenu?.sourceType || "HOME"}
        onSubmit={async (data) => {
          if (editingMenu) {
            // TODO: 수정 모드도 나중에 서버 API와 연동
            // 현재는 추가 API를 사용하여 처리
            await handleAddMenuToServer(data);
          } else {
            // 추가 모드 및 복사 모드는 공통으로 서버에 메뉴 생성
            await handleAddMenuToServer(data);
          }

          handleCloseModal();
        }}
      />
    </div>
  );
}