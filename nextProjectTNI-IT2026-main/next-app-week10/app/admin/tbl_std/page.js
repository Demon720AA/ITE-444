import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeleteButton from "@/components/SweetAlertDel";
import SuccessAlert from "@/components/SuccessAlert";

export default async function TblStdPage() {

    async function deleteTblStd(formData) {
        "use server";
        
        const id = parseInt(formData.get("id"));

        await prisma.tbl_std.delete({
            where: { id }
        });

        revalidatePath("/admin/tbl_std");
    }

    const students = await prisma.tbl_std.findMany({
        orderBy: {
            id: 'desc'
        }
    });

    return (
        <>
         <SuccessAlert />
          <NavbarAdmin />
          <BootstrapClient />

            <div className="container mt-5">
                <h1 className="mb-4">
                    Tbl_Std List 
                    <Link className="btn btn-primary btn-sm ms-3" href="/admin/tbl_std/create">
                        + Add Student
                    </Link>
                </h1>

                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped align-middle">
                            <thead>
                                <tr>
                                    <th width="5%" className="text-center">ID</th>
                                    <th width="20%">std_code</th>
                                    <th width="35%">std_name</th>
                                    <th width="20%" className="text-center">dateCreate</th>
                                    <th width="10%" className="text-center">edit</th>
                                    <th width="10%" className="text-center">remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td className="text-center">{student.id}</td>
                                        <td>{student.std_code}</td>
                                        <td>{student.std_name}</td>
                                        <td className="text-center">
                                            {new Date(student.dateCreate).toLocaleDateString("th-TH")}
                                        </td>
                                        <td className="text-center">
                                            <Link href={`/admin/tbl_std/update/${student.id}`} className="btn btn-warning btn-sm">
                                                edit  
                                            </Link>
                                        </td>
                                        <td className="text-center">
                                            <form action={deleteTblStd}>
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
