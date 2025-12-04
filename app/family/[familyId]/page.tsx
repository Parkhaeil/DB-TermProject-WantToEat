// app/family/[familyId]/page.tsx
"use client";

import InviteCodeModal from "../InviteCodeModal";
import MemberEditModal, { FamilyMember } from "../MemberEditModal";
import FamilyLeftSection from "../FamilyLeftSection";
import FamilyRightSection from "../FamilyRightSection";

import { useRouter, useParams } from "next/navigation";
import { Users, ArrowLeft, Key, Settings } from "lucide-react";
import { useEffect, useState } from "react";

type Role = "PARENT" | "CHILD" | "FOLLOWER";

interface FamilyHeaderInfo {
  family_id: number;
  family_name: string;
  role: Role;
  member_count: number;
}

function RoleBadge({ role }: { role: Role }) {
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

export default function FamilyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const familyIdParam = params?.familyId;

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const [familyInfo, setFamilyInfo] = useState<FamilyHeaderInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 임시 더미 구성원 (나중에 실제 API 연결)
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: 1, name: "엄마", joinedAt: "2024.01.01", role: "PARENT" },
    { id: 2, name: "아빠", joinedAt: "2024.01.01", role: "PARENT" },
    { id: 3, name: "이유민", joinedAt: "2024.01.01", role: "CHILD" },
    { id: 4, name: "서혜민", joinedAt: "2024.01.01", role: "FOLLOWER" },
  ]);

  useEffect(() => {
    if (!familyIdParam) return;
    if (typeof window === "undefined") return;

    const fetchFamilyInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        const storedUser = localStorage.getItem("currentUser");
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (!isLoggedIn || !storedUser) {
          setError("로그인이 필요합니다.");
          router.push("/login");
          return;
        }

        const currentUser = JSON.parse(storedUser);
        const userId = currentUser.userId;

        const res = await fetch(`/api/families?userId=${userId}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (!res.ok) {
          console.error("가족 목록 조회 에러:", data);
          setError(data.error || "가족 정보를 불러오지 못했습니다.");
          return;
        }

        const familyIdNum = Number(familyIdParam);
        const found: FamilyHeaderInfo | undefined = data.find(
          (f: any) => f.family_id === familyIdNum
        );

        if (!found) {
          setError("해당 가족에 대한 접근 권한이 없거나 존재하지 않습니다.");
          return;
        }

        setFamilyInfo(found);
      } catch (err) {
        console.error("가족 정보 조회 오류:", err);
        setError("가족 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyInfo();
  }, [familyIdParam, router]);

  const familyName = familyInfo?.family_name ?? "가족 메뉴판";
  const currentFamilyRole: Role = familyInfo?.role ?? "FOLLOWER";
  const memberCount = familyInfo?.member_count ?? members.length;

  return (
    <div className="flex flex-col w-screen min-h-screen bg-[#FCFAF8] text-[#32241B]">
      {/* 헤더 */}
      <div className="flex items-center justify-between w-full h-[72px] gap-4 px-10 bg-[#FFFFFF] border-b border-[#E7E1DA]">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="p-1 rounded-full hover:bg-[#F5F0EC] transition"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex flex-col justify-center">
            <div className="font-bold text-[20px] leading-tight">
              {loading ? "가족 불러오는 중..." : familyName}
            </div>

            <div className="flex items-center gap-2 text-[#847062] mt-1">
              <RoleBadge role={currentFamilyRole} />
              <Users size={15} />
              <div className="text-[12px] font-semibold">
                {memberCount}명
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex gap-1 items-center bg-[#FCFAF8] border border-[#E9E4DE] px-4 py-2 rounded-xl 
                        text-[12px] font-semibold transition-all duration-150 transform active:scale-95"
          >
            <Key size={15} />
            초대코드
          </button>
          {currentFamilyRole === "PARENT" && (
            <button
              onClick={() => setIsMemberModalOpen(true)}
              className="flex gap-1 items-center bg-[#FCFAF8] border border-[#E9E4DE] px-4 py-2 rounded-xl 
                          text-[12px] font-semibold transition-all duration-150 transform active:scale-95"
            >
              <Settings size={15} />
              가족 관리
            </button>
          )}
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="w-full px-10 mt-4">
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[12px]">
            {error}
          </div>
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <div className="flex flex-1 justify-center items-start w-full px-60 pt-10 pb-20 gap-8">
        <FamilyLeftSection />
        <FamilyRightSection />
      </div>

      {/* 초대코드 모달 */}
      <InviteCodeModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        familyName={familyName}
        familyId={Number(familyIdParam)}
      />

      {/* 가족 구성원 관리 모달 */}
      <MemberEditModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        familyName={familyName}
        members={members}
        onChangeRole={(id, newRole) =>
          setMembers((prev) =>
            prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
          )
        }
        onKick={(id) =>
          setMembers((prev) => prev.filter((m) => m.id !== id))
        }
      />
    </div>
  );
}


