//import db from "@/lib/db";

import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import prisma from "@/lib/prisma";
import EditTestForm from "@/components/EditTestForm";

export default async function EditTestPage({ params }) {
  const { id } = await params;

  // ดึงข้อมูลสินค้าเดิม
  const test = await prisma.tbl_test.findUnique({
    where: {
      id: Number(id),
    },
  });

  // ถ้าไม่พบสินค้า
  if (!test) {
    return (
      <>
        <NavbarAdmin />

        <BootstrapClient />

        <div className="container mt-5">
          <div className="alert alert-danger">ไม่พบข้อมูลนักศึกษา</div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarAdmin />

      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">แก้ไขข้อมูลนักศึกษา</h1>

        <EditTestForm test={test} />
      </div>
    </>
  );
}
