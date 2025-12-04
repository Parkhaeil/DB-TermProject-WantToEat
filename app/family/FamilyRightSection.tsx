// app/family/FamilyRightSection.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  BarChart3,
  ChevronRight,
  Utensils,
  MoreVertical,
  Heart,
  Snowflake,
  Thermometer,
  Plus,
  Refrigerator,
  Check,
} from "lucide-react";
import StatsModal from "./StatsModal";

type StorageType = "ROOM" | "FRIDGE" | "FREEZER" | "NEED";

type MenuIngredient = {
  ingredient_id: number;
  ingredient_name: string;
  storage_type: StorageType;
};

type MenuStatus = "POSSIBLE" | "WISH";

type TodayMenu = {
  menu_id: number;
  menu_name: string;
  status: MenuStatus;
  author: string;
  roleLabel: string;
  ingredients: MenuIngredient[];
  likes: number;
};

// 오늘의 메뉴 더미
const todayMenuDummy: TodayMenu = {
  menu_id: 1,
  menu_name: "김치찌개",
  status: "POSSIBLE",
  author: "이유민",
  roleLabel: "부모",
  ingredients: [
    { ingredient_id: 1, ingredient_name: "김치", storage_type: "FRIDGE" },
    { ingredient_id: 2, ingredient_name: "양파", storage_type: "ROOM" },
    { ingredient_id: 3, ingredient_name: "두부", storage_type: "FRIDGE" },
    { ingredient_id: 4, ingredient_name: "대파", storage_type: "NEED" },
  ],
  likes: 5,
};

// 재료 태그 컴포넌트
function FridgeTag({
  label,
  deletable,
  onDelete,
}: {
  label: string;
  deletable?: boolean;
  onDelete?: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border border-[#E7E1DA] text-[10px] font-semibold">
      <span>{label}</span>
      {deletable && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-0.5 text-[9px] text-[#C2B5A8] hover:text-[#A0615A]"
        >
          ×
        </button>
      )}
    </span>
  );
}

function TodayMenuCard({
  menu_id,
  menu_name,
  author,
  roleLabel,
  ingredients,
  likes,
}: TodayMenu) {
  const stockedIngredients = ingredients.filter(
    (ing) => ing.storage_type !== "NEED"
  );
  const neededIngredients = ingredients.filter(
    (ing) => ing.storage_type === "NEED"
  );

  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const displayLikeCount = likes + (isLiked ? 1 : 0);

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E7E1DA] rounded-2xl px-4 py-4 flex flex-col gap-3">
      {/* 상단 */}
      <div className="flex items-start justify-between relative">
        <div className="flex flex-col gap-1">
          <div className="text-[14px] font-bold text-[#32241B]">
            {menu_name}
          </div>
          <div className="text-[12px] text-[#A28B78]">
            {author} · {roleLabel}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((p) => !p)}
          className="p-1 rounded-full hover:bg-[#F5F0EC]"
        >
          <MoreVertical size={16} className="text-[#C2B5A8]" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-1 w-40 bg-white border border-[#E7E1DA] rounded-xl shadow-lg text-[12px] z-20">
            <button className="w-full text-left px-3 py-2 hover:bg-[#FCFAF8]">
              수정
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-[#FFF3F0] text-[#C94F3D]">
              삭제
            </button>
            <div className="border-t border-[#F0E6DD]" />
            <button className="w-full text-left px-3 py-2 hover:bg-[#FCFAF8]">
              내 가족 메뉴로 추가
            </button>
          </div>
        )}
      </div>

      {/* 재료 */}
      {stockedIngredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {stockedIngredients.map((i) => (
            <FridgeTag key={i.ingredient_id} label={i.ingredient_name} />
          ))}
        </div>
      )}

      {/* 사야할 재료 */}
      {neededIngredients.length > 0 && (
        <div>
          <div className="text-[12px] text-[#B58A5A] font-semibold">
            사야 할 재료
          </div>
          <div className="flex flex-wrap gap-2">
            {neededIngredients.map((i) => (
              <span
                key={i.ingredient_id}
                className="px-2 py-1 rounded-full bg-[#FFF5F0] border border-dashed border-[#F2B8A3] text-[10px] text-[#C36037]"
              >
                {i.ingredient_name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 좋아요 */}
      <button
        onClick={() => setIsLiked((p) => !p)}
        className="flex items-center gap-1 text-[14px] w-fit"
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

type SimpleStorage = "FREEZER" | "FRIDGE" | "ROOM";

const storageMeta: Record<
  SimpleStorage,
  { label: string; icon: JSX.Element; colorClass: string }
> = {
  FREEZER: {
    label: "냉동실",
    icon: <Snowflake size={16} className="text-[#4DA3FF]" />,
    colorClass: "text-[#324055]",
  },
  FRIDGE: {
    label: "냉장실",
    icon: <Refrigerator size={16} className="text-[#40C2A7]" />,
    colorClass: "text-[#324055]",
  },
  ROOM: {
    label: "실온",
    icon: <Thermometer size={16} className="text-[#F07A5A]" />,
    colorClass: "text-[#5A3A29]",
  },
};

export default function FamilyRightSection() {
  const params = useParams();
  const familyIdParam = params?.familyId;

  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  // 냉장고 아이템 (서버 + 클라이언트 추가)
  const [freezerItems, setFreezerItems] = useState<string[]>([]);
  const [fridgeItems, setFridgeItems] = useState<string[]>([]);
  const [roomItems, setRoomItems] = useState<string[]>([]);

  // 재료 추가 팝오버 상태
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [selectedStorage, setSelectedStorage] =
    useState<SimpleStorage>("FREEZER");
  const [isStorageDropdownOpen, setIsStorageDropdownOpen] = useState(false);

  const reloadFridge = async () => {
    if (!familyIdParam) return;
    if (typeof window === "undefined") return;

    try {
      const storedUser = localStorage.getItem("currentUser");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (!isLoggedIn || !storedUser) {
        console.warn("로그인 정보가 없어 냉장고를 불러올 수 없습니다.");
        return;
      }

      const currentUser = JSON.parse(storedUser);
      const userId = currentUser.userId;
      const familyIdNum = Number(familyIdParam);

      const res = await fetch(
        `/api/fridge?familyId=${familyIdNum}&userId=${userId}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("냉장고 조회 에러:", data);
        return;
      }

      setFreezerItems(data.freezer ?? []);
      setFridgeItems(data.fridge ?? []);
      setRoomItems(data.room ?? []);
    } catch (err) {
      console.error("냉장고 정보를 불러오는 중 오류:", err);
    }
  };

  // 초기 냉장고 데이터 로딩
  useEffect(() => {
    reloadFridge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [familyIdParam]);

  const handleAddIngredient = async () => {
    const name = newName.trim();
    if (!name) return;

    if (!familyIdParam) return;
    if (typeof window === "undefined") return;

    try {
      const storedUser = localStorage.getItem("currentUser");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (!isLoggedIn || !storedUser) {
        console.warn("로그인 정보가 없어 재료를 추가할 수 없습니다.");
        return;
      }

      const currentUser = JSON.parse(storedUser);
      const userId = currentUser.userId;
      const familyIdNum = Number(familyIdParam);

      const res = await fetch("/api/fridge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          familyId: familyIdNum,
          userId,
          ingredientName: name,
          storageType: selectedStorage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("재료 추가 에러:", data);
        return;
      }

      setFreezerItems(data.freezer ?? []);
      setFridgeItems(data.fridge ?? []);
      setRoomItems(data.room ?? []);
    } catch (err) {
      console.error("재료 추가 중 오류:", err);
    }

    setNewName("");
    setSelectedStorage("FREEZER");
    setIsStorageDropdownOpen(false);
    setIsAddOpen(false);
  };

  const handleDeleteIngredient = async (
    storage: SimpleStorage,
    name: string
  ) => {
    if (!familyIdParam) return;
    if (typeof window === "undefined") return;

    try {
      const storedUser = localStorage.getItem("currentUser");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (!isLoggedIn || !storedUser) {
        console.warn("로그인 정보가 없어 재료를 삭제할 수 없습니다.");
        return;
      }

      const currentUser = JSON.parse(storedUser);
      const userId = currentUser.userId;
      const familyIdNum = Number(familyIdParam);

      const res = await fetch("/api/fridge", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          familyId: familyIdNum,
          userId,
          ingredientName: name,
          storageType: storage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("재료 삭제 에러:", data);
        return;
      }

      setFreezerItems(data.freezer ?? []);
      setFridgeItems(data.fridge ?? []);
      setRoomItems(data.room ?? []);
    } catch (err) {
      console.error("재료 삭제 중 오류:", err);
    }
  };

  const currentMeta = storageMeta[selectedStorage];
  const isAddValid = newName.trim().length > 0;

  return (
    <div className="flex flex-col gap-4">
      {/* 통계 박스 */}
      <div className="w-[320px] p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E1DA] flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-[#F2805A]" />
            <div className="text-[14px] font-bold text-[#32241B]">
              통계 보러가기
            </div>
          </div>

          <div className="text-[10px] text-[#847062]">
            여러가지 통계 정보를 확인할 수 있어요.
          </div>
        </div>

        <button
          onClick={() => setIsStatsModalOpen(true)}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#F2805A] text-white text-[12px] font-semibold"
        >
          통계 열기
          <ChevronRight size={16} />
        </button>
      </div>

      {/* 오늘의 메뉴 */}
      <div className="w-[320px] p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E1DA] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Utensils size={18} className="text-[#F2805A]" />
          <div className="text-[14px] font-bold">오늘의 메뉴</div>
        </div>

        <TodayMenuCard {...todayMenuDummy} />
      </div>

      {/* 냉장고 박스 + 재료 추가 팝오버 */}
      <div className="relative w-[320px]">
        {/* 실제 카드 (모서리 클리핑용 overflow-hidden) */}
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E1DA] flex flex-col overflow-hidden">
          <div className="px-5 pt-5 pb-3 text-[13px] font-semibold text-[#32241B]">
            냉장고
          </div>

          {/* 냉동 + 냉장 */}
          <div className="mx-4 mb-3 rounded-2xl bg-[#F7FBFF] border border-[#E2ECF8] overflow-hidden">
            {/* 냉동실 */}
            <div className="flex items-start justify-between px-4 pt-3 pb-2 relative">
              <div className="flex items-center gap-2">
                <Snowflake size={16} className="text-[#4DA3FF]" />
                <div className="text-[12px] font-semibold text-[#324055]">
                  냉동실
                </div>
              </div>

              {/* 파란 세로선 */}
              <div className="absolute right-4 top-7 w-[3px] h-8 rounded-full bg-[#7EB4FF]" />
            </div>

            <div className="px-4 pb-3 flex flex-wrap gap-1.5">
              {freezerItems.length === 0 ? (
                <span className="text-[11px] text-[#8493A8]">
                  아직 등록된 재료가 없어요.
                </span>
              ) : (
                freezerItems.map((name) => (
                  <FridgeTag
                    key={name}
                    label={name}
                    deletable
                    onDelete={() => handleDeleteIngredient("FREEZER", name)}
                  />
                ))
              )}
            </div>

            <div className="h-[1px] w-full bg-[#E3EFFB]" />

            {/* 냉장실 */}
            <div className="flex items-start justify-between px-4 pt-3 pb-2 relative">
              <div className="flex items-center gap-2">
                <Refrigerator size={16} className="text-[#40C2A7]" />
                <div className="text-[12px] font-semibold text-[#324055]">
                  냉장실
                </div>
              </div>

              {/* 파란 세로선 */}
              <div className="absolute right-4 top-3 w-[3px] h-12 rounded-full bg-[#7EB4FF]" />
            </div>

            <div className="px-4 pb-4 flex flex-wrap gap-1.5">
              {fridgeItems.length === 0 ? (
                <span className="text-[11px] text-[#8493A8]">
                  아직 등록된 재료가 없어요.
                </span>
              ) : (
                fridgeItems.map((name) => (
                  <FridgeTag
                    key={name}
                    label={name}
                    deletable
                    onDelete={() => handleDeleteIngredient("FRIDGE", name)}
                  />
                ))
              )}
            </div>
          </div>

          {/* 실온 (세로선 없음) */}
          <div className="mx-4 mb-2 rounded-2xl bg-[#FFFBF7] border border-[#F1E0CC]">
            <div className="flex items-start justify-between px-4 pt-3 pb-2">
              <div className="flex items-center gap-2">
                <Thermometer size={16} className="text-[#F07A5A]" />
                <div className="text-[12px] font-semibold text-[#5A3A29]">
                  실온
                </div>
              </div>
            </div>

            <div className="px-4 pb-4 flex flex-wrap gap-1.5">
              {roomItems.length === 0 ? (
                <span className="text-[11px] text-[#B29B82]">
                  아직 등록된 재료가 없어요.
                </span>
              ) : (
                roomItems.map((name) => (
                  <FridgeTag
                    key={name}
                    label={name}
                    deletable
                    onDelete={() => handleDeleteIngredient("ROOM", name)}
                  />
                ))
              )}
            </div>
          </div>

          {/* 재료 추가 버튼 */}
          <button
            className="flex items-center justify-center gap-1 border-t border-[#E7E1DA] py-3 text-[12px] hover:bg-[#FCFAF8]"
            type="button"
            onClick={() => setIsAddOpen((p) => !p)}
          >
            <Plus size={16} className="text-[#32241B]" />
            재료 추가
          </button>
        </div>

        {/* 재료 추가 팝오버 - 카드 왼쪽에 표시 */}
        {isAddOpen && (
          <div className="absolute top-4/5 right-full -translate-y-1/2 mr-4 w-[260px] rounded-2xl bg-[#FFFFFF] border border-[#E7E1DA] shadow-xl px-5 py-4 z-30">
            {/* 입력 필드 */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 rounded-full border border-[#E7E1DA] bg-white px-4 py-2 text-[12px] text-[#32241B]">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="재료 이름"
                  className="w-full outline-none text-[12px] text-[#32241B] placeholder:text-[#C2B5A8] bg-transparent"
                />
              </div>

              {/* 저장 위치 드롭다운 */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setIsStorageDropdownOpen((prev) => !prev)
                  }
                  className="flex items-center gap-2 rounded-full border border-[#E7E1DA] bg-[#FFF9F0] px-3 py-2 text-[11px] font-semibold text-[#32241B]"
                >
                  {currentMeta.icon}
                  <span className={currentMeta.colorClass}>
                    {currentMeta.label}
                  </span>
                </button>

                {isStorageDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-32 rounded-2xl bg-white border border-[#E7E1DA] shadow-lg py-1 text-[12px]">
                    {(["FREEZER", "FRIDGE", "ROOM"] as SimpleStorage[]).map(
                      (key) => {
                        const meta = storageMeta[key];
                        const isActive = key === selectedStorage;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              setSelectedStorage(key);
                              setIsStorageDropdownOpen(false);
                            }}
                            className={`flex w-full items-center justify-between px-3 py-2 ${
                              isActive
                                ? "bg-[#FFF2D9]"
                                : "bg-white hover:bg-[#FCFAF8]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {meta.icon}
                              <span className={meta.colorClass}>
                                {meta.label}
                              </span>
                            </div>
                            {isActive && (
                              <Check size={14} className="text-[#E0A85A]" />
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 버튼들 */}
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAddOpen(false);
                  setNewName("");
                  setSelectedStorage("FREEZER");
                  setIsStorageDropdownOpen(false);
                }}
                className="flex-1 rounded-2xl border border-[#E7E1DA] bg-[#FFFFFF] py-2 text-[12px] font-semibold text-[#32241B] hover:bg-[#FCFAF8]"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleAddIngredient}
                disabled={!isAddValid}
                className={`flex-1 rounded-2xl py-2 text-[12px] font-semibold text-white transition
                  ${
                    isAddValid
                      ? "bg-[#F2805A] hover:brightness-95 cursor-pointer"
                      : "bg-[#F8BEAA] cursor-not-allowed"
                  }`}
              >
                추가
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 통계 모달 */}
      <StatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
      />
    </div>
  );
}