"use client";

import { useActionState } from "react";
import { updateStudent } from "@/app/student/update/[id]/actions";

export default function EditStudentForm({ student }) {
  const initialState = {
    errors: [],
    values: {
      student_code: student.student_code,
      student_name: student.student_name,
      student_major: student.student_major,
    },
  };

  const [state, formAction, pending] = useActionState(
    updateStudent,
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
        <label className="form-label">รหัสนักศึกษา (Student Code)</label>
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
        <label className="form-label">ชื่อ-นามสกุล (Student Name)</label>
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
        <label className="form-label">สาขาวิชา (Student Major)</label>
        <input
          type="text"
          className="form-control"
          name="student_major"
          placeholder="กรอกสาขาวิชา"
          defaultValue={state?.values?.student_major || ""}
        />
      </div>

      {/* ปุ่มบันทึก */}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
      </button>
    </form>
  );
}
