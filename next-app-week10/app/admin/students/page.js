import { Suspense } from "react";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import db from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeleteButton from "@/components/SweetAlertDel";
import SuccessAlert from "@/components/SuccessAlert";

export default async function Home() {
  async function deleteStudent(formData) {
    "use server";

    const id = formData.get("id");

    await db.query("DELETE FROM students WHERE id = ?", [id]);

    revalidatePath("/admin/students");
  }

  const [students] = await db.query("SELECT * FROM students ORDER BY id DESC");

  return (
    <>
      <Suspense fallback={null}>
        <SuccessAlert basePath="/admin/students" />
      </Suspense>

      <NavbarAdmin />

      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">
          รายชื่อนักศึกษา
          <Link
            className="btn btn-primary btn-sm"
            href="/admin/students/create"
          >
            + นักศึกษา
          </Link>
        </h1>

        <div className="row">
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead>
                <tr>
                  <th width="5%" className="text-center">
                    ID
                  </th>
                  <th width="15%">รหัสนักศึกษา</th>
                  <th width="30%">ชื่อ-สกุล</th>
                  <th width="25%">สาขาวิชา</th>
                  <th width="15%" className="text-center">
                    วันที่เพิ่ม
                  </th>
                  <th width="5%" className="text-center">
                    edit
                  </th>
                  <th width="5%" className="text-center">
                    remove
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="text-center">{student.id}</td>

                    <td>{student.student_code}</td>

                    <td>{student.student_name}</td>

                    <td>{student.student_major}</td>

                    <td className="text-center">
                      {new Date(student.dateCreate).toLocaleString("th-TH")}
                    </td>

                    <td className="text-center">
                      <Link
                        href={`/admin/students/update/${student.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        edit
                      </Link>
                    </td>

                    <td className="text-center">
                      <form action={deleteStudent}>
                        <input type="hidden" name="id" value={student.id} />

                        <DeleteButton />
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
