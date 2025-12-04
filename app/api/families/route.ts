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

    // user_families_view에서 해당 user_id만 조회
    const { data, error } = await supabaseAdmin
      .from("user_families_view")
      .select("family_id, family_name, role, member_count, today_menu")
      .eq("user_id", Number(userId));

    if (error) {
      console.error("GET /api/families supabase error:", error);
      return NextResponse.json(
        { error: "DB 조회 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
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
