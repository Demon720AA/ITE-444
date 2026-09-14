"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function createStudent(prevState, formData) {
  const student_code = formData.get("student_code")?.trim() || "";
  const student_name = formData.get("student_name")?.trim() || "";
  const student_major = formData.get("student_major")?.trim() || "";

  const errors = [];

  // ตรวจรหัสนักศึกษา
  if (!student_code || student_code.length > 15) {
    errors.push("รหัสนักศึกษาต้องไม่ว่างและยาวไม่เกิน 15 ตัวอักษร");
  }

  // ตรวจชื่อ-สกุล
  if (!student_name || student_name.length < 3 || student_name.length > 150) {
    errors.push("ชื่อ-สกุลต้องมีอย่างน้อย 3 ตัวอักษร และไม่เกิน 150 ตัวอักษร");
  }

  // ตรวจสาขาวิชา
  if (
    !student_major ||
    student_major.length < 2 ||
    student_major.length > 200
  ) {
    errors.push("สาขาวิชาต้องมีอย่างน้อย 2 ตัวอักษร และไม่เกิน 200 ตัวอักษร");
  }

  const values = {
    student_code,
    student_name,
    student_major,
  };

  // ถ้ามี Error ส่งกลับไปหน้า Form
  if (errors.length > 0) {
    return { errors, values };
  }

  // ผ่าน Validation ทุกข้อแล้วค่อยบันทึก
  // dateCreate ปล่อยให้ฐานข้อมูลใส่ค่า default เอง
  try {
    await db.query(
      `INSERT INTO students
        (student_code, student_name, student_major)
        VALUES (?, ?, ?)`,
      [student_code, student_name, student_major],
    );
  } catch (error) {
    // student_code เป็น UNIQUE
    if (error.code === "ER_DUP_ENTRY") {
      return {
        errors: ["รหัสนักศึกษานี้มีอยู่แล้ว"],
        values,
      };
    }

    throw error;
  }

  // redirect() ต้องอยู่นอก try เพราะมันทำงานด้วยการ throw
  redirect("/admin/students?success=create");
}
