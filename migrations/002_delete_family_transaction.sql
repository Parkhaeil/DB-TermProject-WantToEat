-- 가족 전체 삭제를 위한 RPC 함수 (트랜잭션 처리)
CREATE OR REPLACE FUNCTION delete_family_transaction(p_family_id INTEGER)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSON;
BEGIN
  -- 트랜잭션 시작 (함수 내부에서 자동으로 트랜잭션 처리됨)
  
  -- 1. today_menus 삭제
  DELETE FROM today_menus WHERE family_id = p_family_id;
  
  -- 2. menu_likes 삭제 (menus를 통해)
  DELETE FROM menu_likes 
  WHERE menu_id IN (SELECT menu_id FROM menus WHERE family_id = p_family_id);
  
  -- 3. menu_ingredients 삭제 (menus를 통해)
  DELETE FROM menu_ingredients 
  WHERE menu_id IN (SELECT menu_id FROM menus WHERE family_id = p_family_id);
  
  -- 4. menus 삭제
  DELETE FROM menus WHERE family_id = p_family_id;
  
  -- 5. fridge_ingredients 삭제
  DELETE FROM fridge_ingredients WHERE family_id = p_family_id;
  
  -- 6. invitation_codes 삭제
  DELETE FROM invitation_codes WHERE family_id = p_family_id;
  
  -- 7. family_members 삭제
  DELETE FROM family_members WHERE family_id = p_family_id;
  
  -- 8. families 삭제
  DELETE FROM families WHERE family_id = p_family_id;
  
  -- 성공 결과 반환
  v_result := json_build_object(
    'success', true,
    'message', '가족이 삭제되었습니다.'
  );
  
  RETURN v_result;
  
EXCEPTION
  WHEN OTHERS THEN
    -- 에러 발생 시 롤백 (함수 내부에서 자동 처리됨)
    RAISE EXCEPTION '가족 삭제 실패: %', SQLERRM;
END;
$$;

