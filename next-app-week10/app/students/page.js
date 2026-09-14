import Navbar from "@/components/Navbar";
import BootstrapClient from "@/components/BootstrapClient";
import db from "@/lib/db";
import Link from "next/link";

export default async function StudentList() {
  const [students] = await db.query("SELECT * FROM students ORDER BY id DESC");

  return (
    <>
      <Navbar />

      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">รายชื่อนักศึกษา</h1>

        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead>
              <tr>
                <th width="20%">รหัสนักศึกษา</th>
                <th width="45%">ชื่อ-สกุล</th>
                <th width="35%">สาขาวิชา</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>
                    <Link href={`/students/${student.id}`}>
                      {student.student_code}
                    </Link>
                  </td>

                  <td>{student.student_name}</td>

                  <td>{student.student_major}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
