"use client";

import { useActionState } from "react";
import { createTblStd } from "@/app/admin/tbl_std/create/actions";

const initialState = {
  errors: [],
  values: {
    std_code: "",
    std_name: "",
  },
};

export default function CreateTblStdForm() {
  const [state, formAction, pending] = useActionState(
    createTblStd,
    initialState,
  );

  return (
    <form action={formAction}>
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
        <label className="form-label">รหัสนักศึกษา</label>
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
        <label className="form-label">ชื่อ-นามสกุล</label>
        <input
          type="text"
          className="form-control"
          name="std_name"
          placeholder="กรอกชื่อ-นามสกุล"
          defaultValue={state?.values?.std_name || ""}
        />
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
      </button>
    </form>
  );
}
