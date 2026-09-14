"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SuccessAlert({ basePath = "/admin/products" }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const success = searchParams.get("success");

    if (success === "create") {
      Swal.fire({
        title: "เพิ่มข้อมูลสำเร็จ",
        text: "บันทึกข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      });

      // ลบ ?success=create ออกจาก URL
      router.replace(basePath);
    }

    if (success === "update") {
      Swal.fire({
        title: "แก้ไขข้อมูลสำเร็จ",
        text: "อัพเดทข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      });

      // ลบ ?success=update ออกจาก URL
      router.replace(basePath);
    }
  }, [searchParams, router, basePath]);

  return null;
}
