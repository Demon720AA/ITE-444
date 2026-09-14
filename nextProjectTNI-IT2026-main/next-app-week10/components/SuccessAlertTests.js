"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SuccessAlert() {

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {

        if (searchParams.get("success") === "create") {

            Swal.fire({
                title: "เพิ่มข้อมูลสำเร็จ",
                text: "บันทึกข้อมูลเรียบร้อยแล้ว",
                icon: "success",
                confirmButtonText: "ตกลง"
            });

            // ลบ ?success=... ออกจาก URL
            router.replace(window.location.pathname);
        }

        if (searchParams.get("success") === "update") {

            Swal.fire({
                title: "แก้ไขข้อมูลสำเร็จ",
                text: "อัปเดทข้อมูลเรียบร้อยแล้ว",
                icon: "success",
                confirmButtonText: "ตกลง"
            });

            // ลบ ?success=... ออกจาก URL
            router.replace(window.location.pathname);
        }

    }, [searchParams, router]);

    return null;
}