"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTest(prevState, formData) {
  const name = formData.get("name")?.trim() || "";
  const lastname = formData.get("lastname")?.trim() || "";

  const errors = [];

  // ตรวจชื่อ (คอลัมน์ name รองรับไม่เกิน 150 ตัวอักษร)
  if (!name || name.length < 3 || name.length > 150) {
    errors.push("ชื่อต้องมีอย่างน้อย 3 ตัวอักษร และไม่เกิน 150 ตัวอักษร");
  }

  // ตรวจนามสกุล (คอลัมน์ lastname รองรับไม่เกิน 200 ตัวอักษร)
  if (!lastname || lastname.length < 3 || lastname.length > 200) {
    errors.push("นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร และไม่เกิน 200 ตัวอักษร");
  }

  const values = {
    name,
    lastname,
  };

  // ถ้ามี Error ส่งกลับไปหน้า Form
  if (errors.length > 0) {
    return { errors, values };
  }

  // ผ่าน Validation ทุกข้อแล้วค่อยบันทึก
  // dateCreate ปล่อยให้ฐานข้อมูลใส่ค่า default เอง
  try {
    await prisma.tbl_test.create({
      data: {
        name,
        lastname,
      },
    });
  } catch (error) {
    // บันทึกไม่สำเร็จ ส่งข้อความกลับไปแสดงที่หน้า Form
    console.error(error);

    return {
      errors: ["บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"],
      values,
    };
  }

  // redirect() ต้องอยู่นอก try เพราะมันทำงานด้วยการ throw
  redirect("/admin/tests?success=create");
}