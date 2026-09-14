import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import ProductForm from "@/components/ProductForm";
import db from "@/lib/db";

export default function CreateProduct() {
  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />
      <div className="container mt-5">
        <h1 className="mb-4">เพิ่มสินค้า</h1>

        <ProductForm action={createProduct} />
      </div>
    </>
  );
}

async function createProduct(prevState, formData) {
  "use server";

  const name = formData.get("name");
  const price = formData.get("price");
  const img_url = formData.get("img_url");
  const description = formData.get("description");
  const stock = formData.get("stock");

  await db.query(
    `INSERT INTO products
        (name, price, img_url, description, stock)
        VALUES (?, ?, ?, ?, ?)`,
    [name, price, img_url, description, stock],
  );

  return { success: true };
}