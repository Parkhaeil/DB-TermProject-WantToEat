// app/api/families/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";

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

    // 이 SQL은: 해당 user가 속한 가족 + 그 가족에서의 역할 + 가족 인원수 + 오늘의 메뉴
    const result = await pool.query(
      `
      SELECT
        f.family_id,
        f.family_name,
        fm.role,
        COUNT(DISTINCT fm2.user_id) AS member_count,
        COALESCE(m.menu_name, NULL) AS today_menu
      FROM family_members fm
      JOIN families f ON f.family_id = fm.family_id
      LEFT JOIN family_members fm2 ON fm2.family_id = f.family_id
      LEFT JOIN today_menus tm
        ON tm.family_id = f.family_id
        AND tm.target_date = CURRENT_DATE
      LEFT JOIN menus m
        ON m.menu_id = tm.menu_id
      WHERE fm.user_id = $1
      GROUP BY f.family_id, f.family_name, fm.role, m.menu_name
      ORDER BY f.family_id;
      `,
      [userId]
    );

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("GET /api/families error:", err);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
