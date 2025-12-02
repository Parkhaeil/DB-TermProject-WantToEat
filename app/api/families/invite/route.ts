// app/api/families/invite/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

// POST /api/families/invite
// body: { code: string, userId: number }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, userId } = body;

    if (!code || !userId) {
      return NextResponse.json(
        { error: "초대 코드와 사용자 ID가 필요합니다." },
        { status: 400 }
      );
    }

    // 1) 초대 코드 조회 (활성 코드만)
    const { data: invite, error: inviteError } = await supabaseAdmin
      .from("invitation_codes")
      .select("invite_id, family_id, is_active")
      .eq("code", code)
      .eq("is_active", true)
      .maybeSingle();

    if (inviteError) {
      console.error("초대 코드 조회 에러:", inviteError);
      return NextResponse.json(
        { error: `초대 코드 조회 실패: ${inviteError.message}` },
        { status: 500 }
      );
    }

    if (!invite) {
      return NextResponse.json(
        { error: "유효하지 않은 초대 코드입니다." },
        { status: 400 }
      );
    }

    const familyId = invite.family_id;

    // 2) 가족 정보 조회 (비활성 가족 제외)
    const { data: family, error: familyError } = await supabaseAdmin
      .from("families")
      .select("family_id, family_name, created_by, is_active")
      .eq("family_id", familyId)
      .eq("is_active", true)
      .maybeSingle();

    if (familyError) {
      console.error("가족 조회 에러:", familyError);
      return NextResponse.json(
        { error: `가족 조회 실패: ${familyError.message}` },
        { status: 500 }
      );
    }

    if (!family) {
      return NextResponse.json(
        { error: "해당 초대 코드의 가족을 찾을 수 없거나 비활성화된 가족입니다." },
        { status: 400 }
      );
    }

    // 3) 내가 만든 가족이면 참여 불가
    if (family.created_by === userId) {
      return NextResponse.json(
        { error: "본인이 만든 가족에는 초대 코드로 참여할 수 없습니다." },
        { status: 400 }
      );
    }

    // 4) 이미 가족 구성원인지 확인
    const { data: existingMember, error: memberCheckError } = await supabaseAdmin
      .from("family_members")
      .select("family_id, user_id")
      .eq("family_id", familyId)
      .eq("user_id", userId)
      .maybeSingle();

    if (memberCheckError) {
      console.error("가족 구성원 조회 에러:", memberCheckError);
      return NextResponse.json(
        { error: `가족 구성원 조회 실패: ${memberCheckError.message}` },
        { status: 500 }
      );
    }

    if (existingMember) {
      return NextResponse.json(
        { error: "이미 이 가족에 속해 있습니다." },
        { status: 400 }
      );
    }

    // 5) 가족 구성원으로 추가 (기본 역할: FOLLOWER)
    const { error: insertError } = await supabaseAdmin
      .from("family_members")
      .insert({
        family_id: familyId,
        user_id: userId,
        role: "FOLLOWER",
      });

    if (insertError) {
      console.error("가족 구성원 추가 에러:", insertError);
      return NextResponse.json(
        { error: `가족 참여 실패: ${insertError.message}` },
        { status: 500 }
      );
    }

    // 6) 성공 응답 - 프론트에서 가족 목록 새로고침할 때 사용 가능
    return NextResponse.json({
      success: true,
      family: {
        familyId: family.family_id,
        familyName: family.family_name,
        role: "FOLLOWER" as const,
      },
    });
  } catch (err) {
    console.error("POST /api/families/invite error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}


