// app/api/families/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

// GET /api/families?userId=1
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId가 필요합니다." },
        { status: 400 }
      );
    }

    const numericUserId = Number(userId);

    // user_families_view에서 해당 user_id만 조회
    const { data, error } = await supabaseAdmin
      .from("user_families_view")
      .select("family_id, family_name, role, member_count, today_menu")
      .eq("user_id", numericUserId);

    if (error) {
      console.error("GET /api/families supabase error:", error);
      return NextResponse.json(
        { error: "DB 조회 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    const familyIds = data.map((f: any) => f.family_id);

    const { data: activeMembers, error: activeMembersError } =
      await supabaseAdmin
        .from("family_members")
        .select("family_id")
        .in("family_id", familyIds)
        .eq("is_active", true);

    if (activeMembersError) {
      console.error(
        "GET /api/families active member count error:",
        activeMembersError
      );
      // 에러가 나도 전체 API가 죽지는 않게, 기존 member_count 그대로 반환
      return NextResponse.json(data);
    }

    const activeCountByFamily: Record<number, number> = {};
    if (activeMembers) {
      for (const row of activeMembers as any[]) {
        const fid = row.family_id as number;
        activeCountByFamily[fid] = (activeCountByFamily[fid] ?? 0) + 1;
      }
    }

    const result = data.map((f: any) => ({
      ...f,
      member_count:
        activeCountByFamily[f.family_id] ?? 0, // 활성 멤버가 없으면 0명
    }));

    return NextResponse.json(result);
    } catch (err) {
      // err가 Error 타입일 때 message까지 찍기
      if (err instanceof Error) {
        console.error("GET /api/families error:", err.message);
      } else {
        console.error("GET /api/families unknown error:", err);
      }

      return NextResponse.json(
        { error: "서버 에러가 발생했습니다." },
        { status: 500 }
      );
  }
}
