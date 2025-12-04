// app/api/fridge/route.tsx
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

type StorageType = "ROOM" | "FRIDGE" | "FREEZER" | "NEED";

async function assertFamilyMember(familyId: number, userId: number) {
  const { data: membership, error: memberError } = await supabaseAdmin
    .from("family_members")
    .select("family_id, user_id")
    .eq("family_id", familyId)
    .eq("user_id", userId)
    .maybeSingle();

  if (memberError) {
    console.error("가족 구성원 조회 에러:", memberError);
    return NextResponse.json(
      { error: `가족 구성원 조회 실패: ${memberError.message}` },
      { status: 500 }
    );
  }

  if (!membership) {
    return NextResponse.json(
      { error: "해당 가족에 대한 접근 권한이 없습니다." },
      { status: 403 }
    );
  }

  return null;
}

// 1. 냉장고 상태를 조회 : {freezer, fridge, room} 구조로 반환
async function getFridgeState(familyId: number) {
  const { data: ingredients, error: ingredientsError } = await supabaseAdmin
    .from("fridge_ingredients")
    .select("ingredient_id, ingredient_name, storage_type, is_active")
    .eq("family_id", familyId)
    .eq("is_active", true);

  if (ingredientsError) {
    console.error("냉장고 재료 조회 에러:", ingredientsError);
    return {
      error: NextResponse.json(
        { error: `냉장고 재료 조회 실패: ${ingredientsError.message}` },
        { status: 500 }
      ),
    };
  }

  const freezer: string[] = [];
  const fridge: string[] = [];
  const room: string[] = [];

  (ingredients ?? []).forEach((ing) => {
    if (ing.storage_type === "FREEZER") {
      freezer.push(ing.ingredient_name);
    } else if (ing.storage_type === "FRIDGE") {
      fridge.push(ing.ingredient_name);
    } else if (ing.storage_type === "ROOM") {
      room.push(ing.ingredient_name);
    }
  });

  return { freezer, fridge, room };
}

// 2. 냉장고 상태 조회 API
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const familyIdParam = searchParams.get("familyId");
    const userIdParam = searchParams.get("userId");

    if (!familyIdParam || !userIdParam) {
      return NextResponse.json(
        { error: "familyId와 userId가 필요합니다." },
        { status: 400 }
      );
    }

    const familyId = Number(familyIdParam);
    const userId = Number(userIdParam);

    if (Number.isNaN(familyId) || Number.isNaN(userId)) {
      return NextResponse.json(
        { error: "familyId와 userId는 숫자여야 합니다." },
        { status: 400 }
      );
    }

    const memberErrorResponse = await assertFamilyMember(familyId, userId);
    if (memberErrorResponse) return memberErrorResponse;

    const { error, ...rest } = await getFridgeState(familyId);
    if (error) return error;

    return NextResponse.json(rest);
  } catch (err) {
    console.error("GET /api/fridge error:", err);
    return NextResponse.json(
      { error: "냉장고 정보를 불러오는 중 서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 3. 재료 등록 API
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      familyId,
      userId,
      ingredientName,
      storageType,
    }: {
      familyId: number;
      userId: number;
      ingredientName: string;
      storageType: StorageType;
    } = body;

    if (!familyId || !userId || !ingredientName || !storageType) {
      return NextResponse.json(
        { error: "familyId, userId, ingredientName, storageType가 필요합니다." },
        { status: 400 }
      );
    }

    const memberErrorResponse = await assertFamilyMember(familyId, userId);
    if (memberErrorResponse) return memberErrorResponse;

    // 같은 이름 + 보관 위치 재료가 있는지 확인
    const { data: existing, error: selectError } = await supabaseAdmin
      .from("fridge_ingredients")
      .select("ingredient_id, is_active")
      .eq("family_id", familyId)
      .eq("ingredient_name", ingredientName)
      .eq("storage_type", storageType)
      .maybeSingle();

    if (selectError) {
      console.error("재료 조회 에러:", selectError);
      return NextResponse.json(
        { error: `재료 조회 실패: ${selectError.message}` },
        { status: 500 }
      );
    }

    if (existing) {
      // 이미 있는 재료면 is_active만 true로 변경
      if (existing.is_active === false) {
        const { error: updateError } = await supabaseAdmin
          .from("fridge_ingredients")
          .update({ is_active: true })
          .eq("ingredient_id", existing.ingredient_id);

        if (updateError) {
          console.error("재료 재활성화 에러:", updateError);
          return NextResponse.json(
            { error: `재료 재활성화 실패: ${updateError.message}` },
            { status: 500 }
          );
        }
      }
    } else {
      // 없으면 새로 추가
      const { error: insertError } = await supabaseAdmin
        .from("fridge_ingredients")
        .insert({
          family_id: familyId,
          ingredient_name: ingredientName,
          storage_type: storageType,
          created_by: userId,
        });

      if (insertError) {
        console.error("재료 추가 에러:", insertError);
        return NextResponse.json(
          { error: `재료 추가 실패: ${insertError.message}` },
          { status: 500 }
        );
      }
    }

    const { error, ...rest } = await getFridgeState(familyId);
    if (error) return error;

    return NextResponse.json(rest);
  } catch (err) {
    console.error("POST /api/fridge error:", err);
    return NextResponse.json(
      { error: "재료를 추가하는 중 서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 4. 재료 삭제 API
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const {
      familyId,
      userId,
      ingredientName,
      storageType,
    }: {
      familyId: number;
      userId: number;
      ingredientName: string;
      storageType: StorageType;
    } = body;

    if (!familyId || !userId || !ingredientName || !storageType) {
      return NextResponse.json(
        { error: "familyId, userId, ingredientName, storageType가 필요합니다." },
        { status: 400 }
      );
    }

    const memberErrorResponse = await assertFamilyMember(familyId, userId);
    if (memberErrorResponse) return memberErrorResponse;

    const { error: updateError } = await supabaseAdmin
      .from("fridge_ingredients")
      .update({ is_active: false })
      .eq("family_id", familyId)
      .eq("ingredient_name", ingredientName)
      .eq("storage_type", storageType)
      .eq("is_active", true);

    if (updateError) {
      console.error("재료 비활성화 에러:", updateError);
      return NextResponse.json(
        { error: `재료 삭제 실패: ${updateError.message}` },
        { status: 500 }
      );
    }

    const { error, ...rest } = await getFridgeState(familyId);
    if (error) return error;

    return NextResponse.json(rest);
  } catch (err) {
    console.error("DELETE /api/fridge error:", err);
    return NextResponse.json(
      { error: "재료를 삭제하는 중 서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}


