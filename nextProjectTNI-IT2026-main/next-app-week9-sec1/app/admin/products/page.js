import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import db from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeleteButton from "@/components/DeleteButton";



export default async function Home() {
  //remove product
  async function deleteProduct(formData) {
    "use server";
    const id = formData.get("id");
    await db.query(
        "DELETE FROM products WHERE id = ?",
        [id]
    );
    revalidatePath("/admin/products");
}

//query product
    const [products] = await db.query(
        "SELECT * FROM products ORDER BY id DESC"
    );

    return (
        <>
            <NavbarAdmin />

            <BootstrapClient />

            <div className="container mt-5">

                <h1 className="mb-4">
                    รายการสินค้า

                    <Link className="btn btn-primary btn-sm" href="/admin/products/create"> 
                            + ข้อมูล 
                    </Link>
                    
                </h1>

                <div className="row">

           <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead>
                <tr>
                  <th width="5%" className="text-center">ID</th>
                  <th width="10%">รูป</th>
                  <th width="35">ชื่อสินค้า</th>
                  <th width="10%" className="text-center">ราคา</th>
                  <th width="5%" className="text-center">QTY</th>
                  <th width="5%" className="text-center">edit</th>
                  <th width="5%" className="text-center">remove</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>

                    <td className="text-center">{product.id}</td>

                    <td>
                      <img
                        src={product.img_url}
                        alt={product.name}
                        width="100"
                      />
                    </td>
                    <td>{product.name}</td>

                    <td align="right">{Number(product.price).toLocaleString()}</td>
                    <td align="right">{Number(product.stock).toLocaleString()}</td>

                    <td className="text-center">
                      <Link
                        href={`/products/${product.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        edit
                      </Link>
                    </td>

                    <td className="text-center">

                     <form action={deleteProduct}>
                            <input
                                type="hidden"
                                name="id"
                                value={product.id}
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

