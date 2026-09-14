import { Suspense } from "react";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeleteButton from "@/components/SweetAlertDel";
import SuccessAlert from "@/components/SuccessAlert";
import prisma from "@/lib/prisma";

export default async function Home() {
  async function deleteTest(formData) {
    "use server";

    const id = formData.get("id");

    await prisma.tbl_test.delete({
      where: {
        id: Number(id),
      },
    });
    revalidatePath("/admin/tests");
  }

  const tests = await prisma.tbl_test.findMany();

  return (
    <>
      <Suspense fallback={null}>
        <SuccessAlert basePath="/admin/tests" />
      </Suspense>

      <NavbarAdmin />

      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">
          รายการทดสอบ
          <Link className="btn btn-primary btn-sm" href="/admin/tests/create">
            + ข้อมูล
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
                  <th width="30%">Name</th>
                  <th width="25%">Lastname</th>
                  <th width="5%" className="text-center">
                    edit
                  </th>
                  <th width="5%" className="text-center">
                    remove
                  </th>
                </tr>
              </thead>

              <tbody>
                {tests.map((test) => (
                  <tr key={test.id}>
                    <td className="text-center">{test.id}</td>

                    <td>{test.name}</td>

                    <td>{test.lastname}</td>

                    <td className="text-center">
                      <Link
                        href={`/admin/tests/update/${test.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        edit
                      </Link>
                    </td>

                    <td className="text-center">
                      <form action={deleteTest}>
                        <input type="hidden" name="id" value={test.id} />

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
