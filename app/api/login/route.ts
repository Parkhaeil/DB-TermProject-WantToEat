// app/api/login/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 모두 입력해주세요." },
        { status: 400 }
      );
    }

    // 1) email로 유저 찾기
    const result = await pool.query(
      `SELECT user_id, email, password_hash, nickname
       FROM users
       WHERE email = $1 AND is_active = TRUE`,
      [email]
    );

    if (result.rows.length === 0) {
      // 해당 이메일 없음
      return NextResponse.json(
        { error: "해당 이메일의 사용자가 없습니다." },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // 2) 비밀번호 검사 (지금은 그냥 문자열 비교)
    if (user.password_hash !== password) {
      return NextResponse.json(
        { error: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // 3) 로그인 성공 → 최소한의 정보만 반환
    return NextResponse.json({
      userId: user.user_id,
      email: user.email,
      nickname: user.nickname,
    });
  } catch (err) {
    console.error("POST /api/login error:", err);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
