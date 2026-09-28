"use client";

import { useActionState } from "react";
import { updateTblStd } from "@/app/admin/tbl_std/update/[id]/actions";

export default function EditTblStdForm({ student }) {
  const initialState = {
    errors: [],
    values: {
      std_code: student.std_code,
      std_name: student.std_name,
    },
  };

  const [state, formAction, pending] = useActionState(
    updateTblStd,
    initialState,
  );

  return (
    <form action={formAction}>
      {/* ส่ง id ไป Server Action */}
      <input type="hidden" name="id" value={student.id} />

      {/* Validation Error */}
      {state?.errors?.length > 0 && (
        <div className="alert alert-danger" role="alert">
          <strong>กรุณาตรวจสอบข้อมูล</strong>
          <ul className="mb-0 mt-2">
            {state.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* รหัสนักศึกษา */}
      <div className="mb-3">
        <label className="form-label">รหัสนักศึกษา (std_code)</label>
        <input
          type="text"
          className="form-control"
          name="std_code"
          placeholder="กรอกรหัสนักศึกษา"
          defaultValue={state?.values?.std_code || ""}
        />
      </div>

      {/* ชื่อ-นามสกุล */}
      <div className="mb-3">
        <label className="form-label">ชื่อ-นามสกุล (std_name)</label>
        <input
          type="text"
          className="form-control"
          name="std_name"
          placeholder="กรอกชื่อ-นามสกุล"
          defaultValue={state?.values?.std_name || ""}
        />
      </div>

      {/* ปุ่มบันทึก */}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
      </button>
    </form>
  );
}
