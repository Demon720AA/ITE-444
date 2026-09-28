import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditTblStdForm from "@/components/EditTblStdForm";

export default async function EditTblStdPage({ params }) {
  const { id } = await params;
  const numericId = parseInt(id);

  const student = await prisma.tbl_std.findUnique({
    where: { id: numericId }
  });

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
        <h1 className="mb-4">แก้ไขข้อมูลนักศึกษา (tbl_std)</h1>
        <EditTblStdForm student={student} />
      </div>
    </>
  );
}
