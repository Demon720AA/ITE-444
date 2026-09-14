import db from "@/lib/db";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import BootstrapClient from "@/components/BootstrapClient";

export default async function StudentDetail({ params }) {
  const { id } = await params;

  const [students] = await db.query("SELECT * FROM students WHERE id = ?", [
    id,
  ]);

  const student = students[0];

  if (!student) {
    return (
      <div className="container mt-5">
        <h1>ไม่พบนักศึกษา</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <BootstrapClient />

      <div className="container mt-5">
        <h1>{student.student_name}</h1>

        <table className="table table-bordered mt-4">
          <tbody>
            <tr>
              <th width="30%">รหัสนักศึกษา</th>
              <td>{student.student_code}</td>
            </tr>

            <tr>
              <th>ชื่อ-สกุล</th>
              <td>{student.student_name}</td>
            </tr>

            <tr>
              <th>สาขาวิชา</th>
              <td>{student.student_major}</td>
            </tr>

            <tr>
              <th>วันที่เพิ่ม</th>
              <td>{new Date(student.dateCreate).toLocaleString("th-TH")}</td>
            </tr>
          </tbody>
        </table>

        <Link href="/students" className="btn btn-secondary mt-3">
          กลับหน้ารายชื่อ
        </Link>
      </div>
    </>
  );
}
