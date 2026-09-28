"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTblStd(prevState, formData) {
  const std_code = formData.get("std_code")?.trim() || "";
  const std_name = formData.get("std_name")?.trim() || "";

  const errors = [];

  if (!std_code) {
    errors.push("กรุณากรอกรหัสนักศึกษา");
  } else if (std_code.length > 15) {
    errors.push("รหัสนักศึกษาต้องมีความยาวไม่เกิน 15 ตัวอักษร");
  } else if (!/^[a-zA-Z0-9]+$/.test(std_code)) {
    errors.push("รหัสนักศึกษาต้องประกอบด้วยตัวอักษรภาษาอังกฤษหรือตัวเลขเท่านั้น");
  }

  if (!std_name || std_name.length < 3) {
    errors.push("ชื่อ-นามสกุลนักศึกษาต้องมีอย่างน้อย 3 ตัวอักษร");
  } else if (std_name.length > 200) {
    errors.push("ชื่อ-นามสกุลนักศึกษาต้องไม่เกิน 200 ตัวอักษร");
  }

  if (std_code) {
    try {
      const existingStudent = await prisma.tbl_std.findUnique({
        where: { std_code }
      });

      if (existingStudent) {
        errors.push("รหัสนักศึกษานี้มีอยู่ในระบบแล้ว กรุณาใช้รหัสอื่น");
      }
    } catch (err) {
      console.error("Database query error:", err);
      errors.push("เกิดข้อผิดพลาดในการตรวจสอบรหัสนักศึกษาในฐานข้อมูล");
    }
  }

  if (errors.length > 0) {
    return {
      errors,
      values: {
        std_code,
        std_name,
      },
    };
  }

  try {
    await prisma.tbl_std.create({
      data: {
        std_code,
        std_name,
      },
    });
  } catch (err) {
    console.error("Insert student error:", err);
    return {
      errors: ["ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง"],
      values: {
        std_code,
        std_name,
      },
    };
  }

  redirect("/admin/tbl_std?success=create");
}
