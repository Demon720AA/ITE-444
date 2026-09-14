"use client";

import { useActionState } from "react";

import { createTest } from "@/app/admin/tests/create/actions";

const initialState = {
  errors: [],

  values: {
    name: "",
    lastname: "",
  },
};

export default function CreateTestForm() {
  const [state, formAction, pending] = useActionState(createTest, initialState);

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

      {/* ชื่อ */}

      <div className="mb-3">
        <label className="form-label">ชื่อ</label>

        <input
          type="text"
          className="form-control"
          name="name"
          maxLength={150}
          placeholder="กรอกชื่อ"
          defaultValue={state?.values?.name || ""}
        />
      </div>

      {/* นามสกุล */}

      <div className="mb-3">
        <label className="form-label">นามสกุล</label>

        <input
          type="text"
          className="form-control"
          name="lastname"
          maxLength={200}
          placeholder="กรอกนามสกุล"
          defaultValue={state?.values?.lastname || ""}
        />
      </div>

      {/* Submit */}

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
      </button>
    </form>
  );
}