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

// GET API 응답 타입
type MenuIngredientResponse = {
  ingredient_id: number;
  ingredient_name: string;
  storage_type: "ROOM" | "FRIDGE" | "FREEZER" | "NEED";
};

type MenuResponse = {
  menu_id: number;
  menu_name: string;
  status: MenuStatus;
  author: string;
  roleLabel: string;
  ingredients: MenuIngredientResponse[];
  likes: number;
  sourceType: SourceType;
};

export async function GET(
  req: Request,
  context: { params: Promise<{ familyId: string }> }
) {
  try {
    const { familyId: familyIdStr } = await context.params;
    const familyId = Number(familyIdStr);

    if (Number.isNaN(familyId)) {
      return NextResponse.json(
        { error: "올바른 familyId가 아닙니다." },
        { status: 400 }
      );
    }

    // 1) 메뉴 목록 조회
    const { data: menus, error: menusError } = await supabaseAdmin
      .from("menus")
      .select("menu_id, menu_name, status, source_type, created_by, created_at")
      .eq("family_id", familyId)
      .order("created_at", { ascending: false });

    if (menusError) {
      console.error("menus select error:", menusError);
      return NextResponse.json(
        { error: "메뉴 조회 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    if (!menus || menus.length === 0) {
      return NextResponse.json([]);
    }

    // 2) 각 메뉴에 대한 상세 정보 조회
    const menuResponses: MenuResponse[] = await Promise.all(
      menus.map(async (menu) => {
        const menuId = menu.menu_id as number;
        const createdBy = menu.created_by as number;

        // 2-1) 사용자 정보 조회 (nickname)
        const { data: user, error: userError } = await supabaseAdmin
          .from("users")
          .select("nickname")
          .eq("user_id", createdBy)
          .single();

        const author = user?.nickname || "알 수 없음";

        // 2-2) 가족 멤버 역할 조회
        const { data: member, error: memberError } = await supabaseAdmin
          .from("family_members")
          .select("role")
          .eq("family_id", familyId)
          .eq("user_id", createdBy)
          .single();

        let roleLabel = "멤버";
        if (member?.role === "PARENT") roleLabel = "부모";
        else if (member?.role === "CHILD") roleLabel = "자녀";
        else if (member?.role === "FOLLOWER") roleLabel = "군식구";

        // 2-3) 재료 정보 조회
        const { data: menuIngredients, error: ingredientsError } =
          await supabaseAdmin
            .from("menu_ingredients")
            .select("ingredient_id")
            .eq("menu_id", menuId);

        const ingredients: MenuIngredientResponse[] = [];
        if (menuIngredients && !ingredientsError && menuIngredients.length > 0) {
          // ingredient_id 목록 추출
          const ingredientIds = menuIngredients.map(
            (mi) => mi.ingredient_id as number
          );

          // fridge_ingredients 조회
          const { data: fridgeIngredients, error: fridgeError } =
            await supabaseAdmin
              .from("fridge_ingredients")
              .select("ingredient_id, ingredient_name, storage_type")
              .in("ingredient_id", ingredientIds);

          if (fridgeIngredients && !fridgeError) {
            ingredients.push(
              ...fridgeIngredients.map((fi) => ({
                ingredient_id: fi.ingredient_id as number,
                ingredient_name: fi.ingredient_name as string,
                storage_type: fi.storage_type as
                  | "ROOM"
                  | "FRIDGE"
                  | "FREEZER"
                  | "NEED",
              }))
            );
          }
        }

        // 2-4) 좋아요 수 조회 (menu_likes 테이블이 있는 경우)
        let likes = 0;
        try {
          const { count: likesCount, error: likesError } = await supabaseAdmin
            .from("menu_likes")
            .select("*", { count: "exact", head: true })
            .eq("menu_id", menuId);

          if (!likesError) {
            likes = likesCount || 0;
          }
        } catch (err) {
          // menu_likes 테이블이 없을 수 있으므로 에러 무시
          console.log("menu_likes 조회 실패 (테이블이 없을 수 있음):", err);
        }

        return {
          menu_id: menuId,
          menu_name: menu.menu_name as string,
          status: menu.status as MenuStatus,
          author,
          roleLabel,
          ingredients,
          likes,
          sourceType: menu.source_type as SourceType,
        };
      })
    );

    return NextResponse.json(menuResponses);
  } catch (err) {
    console.error("GET /family/[familyId]/menus error:", err);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

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

export async function DELETE(
  req: Request,
  context: { params: Promise<{ familyId: string }> }
) {
  try {
    const { familyId: familyIdStr } = await context.params;
    const familyId = Number(familyIdStr);

    if (Number.isNaN(familyId)) {
      return NextResponse.json(
        { error: "올바른 familyId가 아닙니다." },
        { status: 400 }
      );
    }

    // URL에서 menuId 추출 (예: /family/1/menus?menuId=123)
    const url = new URL(req.url);
    const menuIdStr = url.searchParams.get("menuId");
    const menuId = menuIdStr ? Number(menuIdStr) : null;

    if (!menuId || Number.isNaN(menuId)) {
      return NextResponse.json(
        { error: "올바른 menuId가 필요합니다." },
        { status: 400 }
      );
    }

    // 메뉴가 해당 가족에 속하는지 확인
    const { data: menu, error: menuCheckError } = await supabaseAdmin
      .from("menus")
      .select("menu_id, family_id")
      .eq("menu_id", menuId)
      .eq("family_id", familyId)
      .single();

    if (menuCheckError || !menu) {
      return NextResponse.json(
        { error: "메뉴를 찾을 수 없거나 권한이 없습니다." },
        { status: 404 }
      );
    }

    // 연쇄 삭제 시작
    // 중요: 외래키 제약조건 때문에 today_menus를 먼저 처리해야 함
    // 1) today_menus에서 해당 메뉴가 오늘의 메뉴로 설정되어 있는지 확인 및 처리
    try {
      // 먼저 today_menus 테이블에 해당 menu_id가 있는지 확인
      // 컬럼명을 정확히 모르므로 * 로 조회하거나 menu_id, family_id만 조회
      const { data: todayMenus, error: todayMenuCheckError } = await supabaseAdmin
        .from("today_menus")
        .select("*")
        .eq("menu_id", menuId)
        .eq("family_id", familyId);

      if (todayMenuCheckError) {
        console.error("today_menus 조회 에러:", todayMenuCheckError);
        // 테이블이 없거나 조회 실패해도 계속 진행
      } else if (todayMenus && todayMenus.length > 0) {
        console.log("오늘의 메뉴로 설정된 메뉴 발견, 처리 시작...");
        console.log("찾은 레코드 수:", todayMenus.length);
        
        // menu_id를 NULL로 설정 시도 (미정 상태로 변경)
        const { error: todayMenuUpdateError } = await supabaseAdmin
          .from("today_menus")
          .update({ menu_id: null })
          .eq("menu_id", menuId)
          .eq("family_id", familyId);

        if (todayMenuUpdateError) {
          console.error("today_menus menu_id NULL 설정 실패:", todayMenuUpdateError);
          console.error("에러 코드:", todayMenuUpdateError.code);
          console.error("에러 메시지:", todayMenuUpdateError.message);
          
          // menu_id를 NULL로 설정할 수 없으면 레코드를 삭제
          console.log("레코드 삭제 시도...");
          const { error: todayMenuDeleteError } = await supabaseAdmin
            .from("today_menus")
            .delete()
            .eq("menu_id", menuId)
            .eq("family_id", familyId);

          if (todayMenuDeleteError) {
            console.error("today_menus 삭제 실패:", todayMenuDeleteError);
            console.error("삭제 에러 코드:", todayMenuDeleteError.code);
            console.error("삭제 에러 메시지:", todayMenuDeleteError.message);
            
            // today_menus 삭제 실패 시 에러 반환
            return NextResponse.json(
              { 
                error: "오늘의 메뉴에서 메뉴를 제거하는 중 오류가 발생했습니다.",
                details: todayMenuDeleteError.message,
                code: todayMenuDeleteError.code
              },
              { status: 500 }
            );
          } else {
            console.log("today_menus 레코드 삭제 성공 (메뉴 삭제 후 미정 상태로 처리됨)");
          }
        } else {
          console.log("today_menus menu_id를 NULL로 설정 성공 (미정 상태로 변경)");
        }
      }
    } catch (err) {
      console.error("today_menus 처리 중 예외 발생:", err);
      console.error("예외 상세:", err instanceof Error ? err.stack : String(err));
      return NextResponse.json(
        { 
          error: "오늘의 메뉴 처리 중 예외가 발생했습니다.",
          details: err instanceof Error ? err.message : String(err)
        },
        { status: 500 }
      );
    }

    // 2) menu_likes 삭제 (있는 경우)
    try {
      const { error: likesError } = await supabaseAdmin
        .from("menu_likes")
        .delete()
        .eq("menu_id", menuId);

      if (likesError) {
        console.log("menu_likes 삭제 실패 (테이블이 없을 수 있음):", likesError);
        // menu_likes 테이블이 없을 수 있으므로 에러를 무시하고 계속 진행
      }
    } catch (err) {
      console.log("menu_likes 삭제 중 예외 발생 (무시):", err);
    }

    // 3) menu_ingredients 삭제 (메뉴-재료 연결 테이블)
    const { error: ingredientsError } = await supabaseAdmin
      .from("menu_ingredients")
      .delete()
      .eq("menu_id", menuId);

    if (ingredientsError) {
      console.error("menu_ingredients 삭제 실패:", ingredientsError);
      return NextResponse.json(
        { error: "메뉴 재료 삭제 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // 4) menus 삭제 (메뉴 자체)
    const { error: menuDeleteError } = await supabaseAdmin
      .from("menus")
      .delete()
      .eq("menu_id", menuId)
      .eq("family_id", familyId);

    if (menuDeleteError) {
      console.error("menus 삭제 실패:", menuDeleteError);
      return NextResponse.json(
        { error: "메뉴 삭제 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "메뉴가 성공적으로 삭제되었습니다.",
        menuId,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /family/[familyId]/menus error:", err);
    console.error("에러 상세:", err instanceof Error ? err.stack : String(err));
    return NextResponse.json(
      { 
        error: "서버 에러가 발생했습니다.",
        details: err instanceof Error ? err.message : String(err)
      },
      { status: 500 }
    );
  }
}
