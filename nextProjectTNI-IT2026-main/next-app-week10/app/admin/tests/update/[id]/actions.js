"use server";

//import db from "@/lib/db";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

/**
 * Server Action สำหรับอัปเดตข้อมูลนักศึกษา
 * รองรับ useActionState / useFormState ของ Next.js
 *
 * @param {object} prevState - สถานะก่อนหน้าของฟอร์ม (errors, values)
 * @param {FormData} formData - ข้อมูลที่ส่งมาจาก <form>
 */
export async function updateTest(prevState, formData) {
  // ดึงค่า ID ของนักศึกษาที่ต้องการแก้ไข
  const id = formData.get("id");

  // ดึงข้อมูลฟิลด์ตามโครงสร้างตาราง student
  const name = formData.get("name")?.trim() || "";
  const lastname = formData.get("lastname")?.trim() || "";

  const errors = [];

  // 1. ตรวจสอบรหัสนักศึกษา (student_code: varchar 15, unique)
  // if (!student_code) {
  //   errors.push("กรุณากรอกรหัสนักศึกษา");
  // } else if (student_code.length > 15) {
  //   errors.push("รหัสนักศึกษาต้องมีความยาวไม่เกิน 15 ตัวอักษร");
  // } else if (!/^[a-zA-Z0-9]+$/.test(student_code)) {
  //   errors.push("รหัสนักศึกษาต้องประกอบด้วยตัวอักษรภาษาอังกฤษหรือตัวเลขเท่านั้น");
  //}

  // 2. ตรวจสอบชื่อ-นามสกุลนักศึกษา (name: varchar 150)
  if (!name || name.length < 3) {
    errors.push("ชื่อ-นามสกุลนักศึกษาต้องมีอย่างน้อย 3 ตัวอักษร");
  } else if (name.length > 150) {
    errors.push("ชื่อ-นามสกุลนักศึกษาต้องไม่เกิน 150 ตัวอักษร");
  }

  // 3. ตรวจสอบสาขาวิชา (lastname: varchar 200)
  if (!lastname || lastname.length < 2) {
    errors.push("กรุณากรอกชื่อสาขาวิชา");
  } else if (lastname.length > 200) {
    errors.push("ชื่อสาขาวิชาต้องไม่เกิน 200 ตัวอักษร");
  }

  // ตรวจสอบว่ารหัสนักศึกษาซ้ำกับของคนอื่นหรือไม่ (ยกเว้นแถวตัวเอง id != ?)
  // if (student_code && id) {
  //   try {
  //     const [existingStudent] = await db.query(
  //       "SELECT id FROM student WHERE student_code = ? AND id != ?",
  //       [student_code, id]
  //     );

  //     if (existingStudent && existingStudent.length > 0) {
  //       errors.push("รหัสนักศึกษานี้มีอยู่ในระบบแล้ว กรุณาใช้รหัสอื่น");
  //     }
  //   } catch (dbErr) {
  //     console.error("Database query error:", dbErr);
  //     errors.push("เกิดข้อผิดพลาดในการตรวจสอบรหัสนักศึกษาในฐานข้อมูล");
  //   }
  // }

  // หากมีข้อผิดพลาด ส่งข้อความและค่าที่กรอกกลับไปยังหน้า Form
  if (errors.length > 0) {
    return {
      errors,
      values: {
        id,
        name,
        lastname
      }
    };
  }

  // เมื่อผ่าน Validation ทั้งหมด ดำเนินการอัปเดตข้อมูลลงฐานข้อมูลตาราง student
  try {
    await prisma.tbl_test.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name,
                    lastname
                }
            });
  } catch (err) {
    console.error("Update student error:", err);
    return {
      errors: ["ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง"],
      values: {
        id,
        name,
        lastname,
      },
    };
  }

  // เปลี่ยนเส้นทางกลับไปยังหน้ารายการนักศึกษาพร้อม parameter success
  redirect("/admin/tests?success=update");
}