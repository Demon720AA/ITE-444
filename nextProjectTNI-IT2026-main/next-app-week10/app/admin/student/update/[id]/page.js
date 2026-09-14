import db from "@/lib/db";

import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditStudentForm from "@/components/EditStudentForm";

export default async function EditStudentPage({ params }) {
  const { id } = await params;

  // ดึงข้อมูลสินค้าเดิม
  const [students] = await db.query("SELECT * FROM student WHERE id = ?", [
    id,
  ]);

  const student = students[0];

  // ถ้าไม่พบสินค้า
  if (!student) {
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

        <EditStudentForm student={student} />
      </div>
    </>
  );
}
