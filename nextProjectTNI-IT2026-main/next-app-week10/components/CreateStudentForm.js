"use client";

import { useActionState } from "react";
import { createStudent } from "@/app/admin/student/create/actions";

const initialState = {
  errors: [],
  values: {
    student_code: "",
    student_name: "",
    student_major: "",
  },
};

export default function CreateStudentForm() {
  const [state, formAction, pending] = useActionState(
    createStudent,
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
          name="student_code"
          placeholder="กรอกรหัสนักศึกษา"
          defaultValue={state?.values?.student_code || ""}
        />
      </div>

      {/* ชื่อ-นามสกุล */}
      <div className="mb-3">
        <label className="form-label">ชื่อ-นามสกุล</label>
        <input
          type="text"
          className="form-control"
          name="student_name"
          placeholder="กรอกชื่อ-นามสกุล"
          defaultValue={state?.values?.student_name || ""}
        />
      </div>

      {/* สาขาวิชา */}
      <div className="mb-3">
        <label className="form-label">สาขาวิชา</label>
        <input
          type="text"
          className="form-control"
          name="student_major"
          placeholder="กรอกสาขาวิชา"
          defaultValue={state?.values?.student_major || ""}
        />
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
      </button>
    </form>
  );
}
