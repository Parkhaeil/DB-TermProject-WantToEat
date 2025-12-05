import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

type SourceType = "HOME" | "EAT_OUT";
type MenuStatus = "POSSIBLE" | "WISH";

type SelectedIngredient = {
  storage: "FREEZER" | "FRIDGE" | "ROOM";
  name: string;
};

type AddMenuBody = {
  menuName: string;
  sourceType: SourceType;
  status?: MenuStatus;
  selectedIngredients?: SelectedIngredient[];
  toBuy?: string[];
  userId: number;
};

export async function POST(
  req: Request,
  context: { params: Promise<{ familyId: string }> }
) {
  try {
    // 🔹 Next 15 이후 params가 Promise로 전달되므로 await로 한 번 풀어준다
    const { familyId: familyIdStr } = await context.params;
    const familyId = Number(familyIdStr);

    if (Number.isNaN(familyId)) {
      return NextResponse.json(
        { error: "올바른 familyId가 아닙니다." },
        { status: 400 }
      );
    }

    const body = (await req.json()) as AddMenuBody;
    const {
      menuName,
      sourceType,
      status = "POSSIBLE",
      selectedIngredients = [],
      toBuy = [],
      userId,
    } = body;

    if (!userId || !menuName || !sourceType) {
      return NextResponse.json(
        { error: "userId, menuName, sourceType는 필수입니다." },
        { status: 400 }
      );
    }

    // 1) MENUS에 메뉴 추가
    const { data: menuInsert, error: menuError } = await supabaseAdmin
      .from("menus")
      .insert({
        family_id: familyId,
        created_by: userId,
        menu_name: menuName,
        status,
        source_type: sourceType,
      })
      .select("menu_id")
      .single();

    if (menuError || !menuInsert) {
      console.error("menus insert error:", menuError);
      return NextResponse.json(
        { error: "메뉴 추가에 실패했습니다." },
        { status: 500 }
      );
    }

    const menuId = menuInsert.menu_id as number;

    // 2) 재료 통합
    type FullIngredient = {
      name: string;
      storage_type: "FREEZER" | "FRIDGE" | "ROOM" | "NEED";
    };

    const fullIngredients: FullIngredient[] = [
      ...selectedIngredients.map((ing) => ({
        name: ing.name,
        storage_type: ing.storage,
      })),
      ...toBuy.map((name) => ({
        name,
        storage_type: "NEED" as const,
      })),
    ];

    // 3) 각 재료 처리
    for (const ing of fullIngredients) {
      // 3-1) fridge_ingredients에 이미 있는지 확인
      const { data: existing, error: existError } = await supabaseAdmin
        .from("fridge_ingredients")
        .select("ingredient_id")
        .eq("family_id", familyId)
        .eq("ingredient_name", ing.name)
        .eq("storage_type", ing.storage_type)
        .maybeSingle();

      if (existError) {
        console.error("fridge_ingredients select error:", existError);
        return NextResponse.json(
          { error: "재료 조회 중 오류가 발생했습니다." },
          { status: 500 }
        );
      }

      let ingredientId: number;

      if (existing) {
        ingredientId = existing.ingredient_id as number;
      } else {
        // 3-2) 없으면 새로 INSERT
        const { data: insertedIng, error: insertIngError } = await supabaseAdmin
          .from("fridge_ingredients")
          .insert({
            family_id: familyId,
            ingredient_name: ing.name,
            storage_type: ing.storage_type,
            created_by: userId,
          })
          .select("ingredient_id")
          .single();

        if (insertIngError || !insertedIng) {
          console.error("fridge_ingredients insert error:", insertIngError);
          return NextResponse.json(
            { error: "재료 추가 중 오류가 발생했습니다." },
            { status: 500 }
          );
        }

        ingredientId = insertedIng.ingredient_id as number;
      }

      // 3-3) menu_ingredients 연결
      const { error: linkErr } = await supabaseAdmin
        .from("menu_ingredients")
        .insert({
          menu_id: menuId,
          ingredient_id: ingredientId,
        });

      if (linkErr) {
        console.error("menu_ingredients insert error:", linkErr);
        return NextResponse.json(
          { error: "메뉴-재료 연결 중 오류가 발생했습니다." },
          { status: 500 }
        );
      }
    }


    return NextResponse.json(
      {
        menuId,
        message: "메뉴가 성공적으로 추가되었습니다.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/families/[familyId]/menus error:", err);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
