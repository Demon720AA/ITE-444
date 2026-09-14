import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import db from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
//import DeleteButton from "@/components/DeleteButton";
import DeleteButton from "@/components/SweetAlertDel";
import SuccessAlert from "@/components/SuccessAlert";




export default async function Home() {


//   async function deletestudent(formData) {
//     "use server";

//     const id = formData.get("id");

//     await db.query(
//         "DELETE FROM student WHERE id = ?",
//         [id]
//     );

//     revalidatePath("/admin/students");
// }

async function deletestudent(formData) {
    "use server";

    const id = formData.get("id");

    await db.query(
        "DELETE FROM student WHERE id = ?",
        [id]
    );

    revalidatePath("/students");
}


    const [student] = await db.query(
        "SELECT * FROM student ORDER BY id DESC"
    );

    return (
        <>
         <SuccessAlert />
          <NavbarAdmin />
          <BootstrapClient />

            <div className="container mt-5">

                <h1 className="mb-4">
                    Studnet List 
                    <Link className="btn btn-primary btn-sm" href="/students/create">
                                        + student
                        </Link>

                </h1>

                <div className="row">

            <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead>
                <tr>
                  <th width="5%" className="text-center">ID</th>
                  {/* <th width="10%" className="text-center">รูป</th> */}
                  <th width="25%">student_name</th>
                  <th width="10%" className="text-center">student_major</th>
                  <th width="5%" className="text-center">dateCreate</th>
                  <th width="5%" className="text-center">edit</th>
                  <th width="5%" className="text-center">remove</th>
                </tr>
              </thead>

              <tbody>
                {student.map((student) => (
                  <tr key={student.student_code}>
                    <td className="text-center">{student.student_code}</td>

                    {/* <td className="text-center">
                      <img
                        src={student.img_url}
                        alt={student.student_name}
                        width="100"
                      />
                    </td> */}
                    <td>{student.student_name}</td>

                    <td align="left">{student.student_major}</td>
                    <td align="center">
                      {new Date(student.dateCreate).toLocaleDateString("th-TH")}
                    </td>

                    <td className="text-center">
                      <Link
                        href={`/students/update/${student.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        edit  
                      </Link>
                    </td>

                    <td className="text-center">
                      <form action={deletestudent}>

        <input
            type="hidden"
            name="id"
            value={student.id}
        />

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

