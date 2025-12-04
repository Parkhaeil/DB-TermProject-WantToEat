// app/api/stats/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

// 모든 통계는 한 달 기준으로 조회
type StatsResponse = {
  // 1. 이번 달에 제일 많이 먹은 메뉴 top 3
  topMenus: {
    menuName: string;
  }[];

  // 2. 배달음식 / 집밥 비율
  homePercent: number;
  eatOutPercent: number;

  // 3-1. 식재료 선호도 : 가장 많이 쓴 재료 top 5
  topIngredients: {
    ingredientName: string;
  }[];

  // 3-2. 식재료 선호도 : 가장 적게 쓴 재료 top 5
  leastIngredients: {
    ingredientName: string;
  }[];
};

type StatsQuery = {
  familyId: number;
  userId: number;
};

// 0. 권한 체크
async function assertFamilyMember({ familyId, userId }: StatsQuery) {
  const { data, error } = await supabaseAdmin
    .from("family_members")
    .select("family_id, user_id")
    .eq("family_id", familyId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("[STATS] 가족 구성원 조회 에러:", error);
    return NextResponse.json(
      { error: `가족 구성원 조회 실패: ${error.message}` },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: "해당 가족에 대한 접근 권한이 없습니다." },
      { status: 403 }
    );
  }

  return null;
}

// 1. 이번 달에 제일 많이 먹은 메뉴 top 3
async function getTopMenus({ familyId }: StatsQuery) {



  return {
    totalMenus: 0,
    wishMenus: 0,
    possibleMenus: 0,
  };
}

// 2. 배달음식 / 집밥 비율
async function getHomeAndEatOutPercent({ familyId }: StatsQuery) {
  // TODO: fridge_ingredients 테이블에서 is_active=true 기준으로 통계
  // + usage_count 상위 N개 조회
  return {
    totalIngredients: 0,
    topIngredients: [] as {
      ingredientName: string;
      usageCount: number;
    }[],
  };
}

/**
 * 3. 오늘의 메뉴 관련 통계 (예: today_menus 몇 개 있는지 등)
 */
async function getTodayMenuStats({ familyId }: StatsQuery) {
  // TODO: today_menus 테이블 기준으로 family별 오늘의 메뉴 수 / 최근 N일 등
  return {
    todayMenuCount: 0,
  };
}

/**
 * GET /api/stats?familyId=1&userId=1
 */
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

    // 0. 권한 체크
    const authError = await assertFamilyMember({ familyId, userId });
    if (authError) return authError;

    // 1~3 병렬로 통계 조회
    const [menuStats, ingredientStats, todayMenuStats] = await Promise.all([
      getMenuStats({ familyId, userId }),
      getIngredientStats({ familyId, userId }),
      getTodayMenuStats({ familyId, userId }),
    ]);

    const result: StatsResponse = {
      ...menuStats,
      ...ingredientStats,
      ...todayMenuStats,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("GET /api/stats error:", err);
    return NextResponse.json(
      { error: "통계를 불러오는 중 서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}