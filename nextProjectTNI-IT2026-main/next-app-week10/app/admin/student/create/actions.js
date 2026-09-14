"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

/**
 * Server Action สำหรับอัปเดตข้อมูลนักศึกษา
 * รองรับ useActionState / useFormState ของ Next.js
 *
 * @param {object} prevState - สถานะก่อนหน้าของฟอร์ม (errors, values)
 * @param {FormData} formData - ข้อมูลที่ส่งมาจาก <form>
 */
export async function createStudent(prevState, formData) {
  // ดึงข้อมูลฟิลด์ตามโครงสร้างตาราง student
  const student_code = formData.get("student_code")?.trim() || "";
  const student_name = formData.get("student_name")?.trim() || "";
  const student_major = formData.get("student_major")?.trim() || "";

  const errors = [];

  // 1. ตรวจสอบรหัสนักศึกษา (student_code: varchar 15, unique)
  if (!student_code) {
    errors.push("กรุณากรอกรหัสนักศึกษา");
  } else if (student_code.length > 15) {
    errors.push("รหัสนักศึกษาต้องมีความยาวไม่เกิน 15 ตัวอักษร");
  } else if (!/^[a-zA-Z0-9]+$/.test(student_code)) {
    errors.push("รหัสนักศึกษาต้องประกอบด้วยตัวอักษรภาษาอังกฤษหรือตัวเลขเท่านั้น");
  }

  // 2. ตรวจสอบชื่อ-นามสกุลนักศึกษา (student_name: varchar 150)
  if (!student_name || student_name.length < 3) {
    errors.push("ชื่อ-นามสกุลนักศึกษาต้องมีอย่างน้อย 3 ตัวอักษร");
  } else if (student_name.length > 150) {
    errors.push("ชื่อ-นามสกุลนักศึกษาต้องไม่เกิน 150 ตัวอักษร");
  }

  // 3. ตรวจสอบสาขาวิชา (student_major: varchar 200)
  if (!student_major || student_major.length < 2) {
    errors.push("กรุณากรอกชื่อสาขาวิชา");
  } else if (student_major.length > 200) {
    errors.push("ชื่อสาขาวิชาต้องไม่เกิน 200 ตัวอักษร");
  }

  // ตรวจสอบว่ารหัสนักศึกษาซ้ำกับของคนอื่นหรือไม่
  if (student_code) {
    try {
      const [existingStudent] = await db.query(
        "SELECT id FROM student WHERE student_code = ?",
        [student_code]
      );

      if (existingStudent && existingStudent.length > 0) {
        errors.push("รหัสนักศึกษานี้มีอยู่ในระบบแล้ว กรุณาใช้รหัสอื่น");
      }
    } catch (dbErr) {
      console.error("Database query error:", dbErr);
      errors.push("เกิดข้อผิดพลาดในการตรวจสอบรหัสนักศึกษาในฐานข้อมูล");
    }
  }

  // หากมีข้อผิดพลาด ส่งข้อความและค่าที่กรอกกลับไปยังหน้า Form
  if (errors.length > 0) {
    return {
      errors,
      values: {
        student_code,
        student_name,
        student_major,
      },
    };
  }

  // เมื่อผ่าน Validation ทั้งหมด ดำเนินการเพิ่มข้อมูลลงฐานข้อมูลตาราง student
  try {
    await db.query(
      `INSERT INTO student
       (student_code, student_name, student_major)
       VALUES (?, ?, ?)`,
      [student_code, student_name, student_major]
    );
  } catch (err) {
    console.error("Insert student error:", err);
    return {
      errors: ["ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง"],
      values: {
        student_code,
        student_name,
        student_major,
      },
    };
  }

  // เปลี่ยนเส้นทางกลับไปยังหน้ารายการนักศึกษาพร้อม parameter success
  redirect("/student?success=create");
}