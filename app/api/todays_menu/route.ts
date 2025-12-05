// app/api/todaysmenu/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

// 1. 오늘의 메뉴 불러오기
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const familyIdParam = searchParams.get("familyId");
    const targetDateParam = searchParams.get("targetDate");

    if (!familyIdParam) {
      return NextResponse.json(
        { error: "familyId가 필요합니다." },
        { status: 400 }
      );
    }

    const familyId = Number(familyIdParam);
    if (Number.isNaN(familyId)) {
      return NextResponse.json(
        { error: "올바른 familyId가 아닙니다." },
        { status: 400 }
      );
    }

    const targetDate = targetDateParam || new Date().toISOString().split("T")[0];

    const { data: rows, error } = await supabaseAdmin
      .from("v_today_menu_cards")
      .select("*")
      .eq("family_id", familyId)
      .eq("target_date", targetDate);

    if (error) {
      console.error("오늘의 메뉴 조회 에러:", error);
      return NextResponse.json(
        { error: `오늘의 메뉴 조회 실패: ${error.message}` },
        { status: 500 }
      );
    }

    // 오늘의 메뉴가 없을 때
    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { message: "오늘의 메뉴가 선택되지 않았습니다.", data: null },
        { status: 200 }
      );
    }

    const firstRow = rows[0] as any;
    
    const ingredients: Array<{
      ingredient_id?: number;
      ingredient_name: string;
      storage_type: "FREEZER" | "FRIDGE" | "ROOM" | "NEED";
    }> = [];

    for (const row of rows) {
      const r = row as any;
      if (r.ingredient_name && !ingredients.find(ing => ing.ingredient_name === r.ingredient_name)) {
        ingredients.push({
          ingredient_name: r.ingredient_name,
          storage_type: r.is_need_ingredient ? "NEED" : (r.storage_type || "ROOM"),
        });
      }
    }

    let roleLabel = "팔로워";
    if (firstRow.creator_role === "PARENT") roleLabel = "부모";
    else if (firstRow.creator_role === "CHILD") roleLabel = "자식";
    else if (firstRow.creator_role === "FOLLOWER") roleLabel = "팔로워";

    const processedData = {
      today_id: firstRow.today_id,
      family_id: firstRow.family_id,
      menu_id: firstRow.menu_id,
      menu_name: firstRow.menu_name,
      status: firstRow.status || "POSSIBLE",
      target_date: firstRow.target_date,
      creator_nickname: firstRow.creator_nickname,
      creator_role: firstRow.creator_role,
      role_label: roleLabel,
      likes_count: firstRow.likes_count || 0,
      ingredients: ingredients,
    };

    return NextResponse.json(
      { data: processedData },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/todaysmenu error:", err);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 2. 오늘의 메뉴 등록하기
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { familyId, menuId, targetDate, userId } = body;

    if (!familyId || !menuId || !userId) {
      return NextResponse.json(
        { error: "familyId, menuId, userId는 필수입니다." },
        { status: 400 }
      );
    }

    const date = targetDate || new Date().toISOString().split("T")[0];


    return NextResponse.json({ message: "POST 구현 필요" });
  } catch (err) {
    console.error("POST /api/todaysmenu error:", err);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 3. 오늘의 메뉴 삭제하기
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const familyIdParam = searchParams.get("familyId");
    const targetDateParam = searchParams.get("targetDate");

    if (!familyIdParam) {
      return NextResponse.json(
        { error: "familyId가 필요합니다." },
        { status: 400 }
      );
    }

    const familyId = Number(familyIdParam);
    if (Number.isNaN(familyId)) {
      return NextResponse.json(
        { error: "올바른 familyId가 아닙니다." },
        { status: 400 }
      );
    }

    const targetDate = targetDateParam || new Date().toISOString().split("T")[0];

    // TODO: today_menus 테이블에서 DELETE
    // const { error } = await supabaseAdmin
    //   .from("today_menus")
    //   .delete()
    //   .eq("family_id", familyId)
    //   .eq("target_date", targetDate);

    return NextResponse.json({ message: "DELETE 구현 필요" });
  } catch (err) {
    console.error("DELETE /api/todaysmenu error:", err);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

