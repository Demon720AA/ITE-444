"use client";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const initialState = { success: false };

export default function ProductForm({ action }) {
  const [state, formAction] = useActionState(action, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      Swal.fire({
        title: "เพิ่มสินค้าสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        router.push("/admin/products");
      });
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <div className="mb-3">
        <label className="form-label">ชื่อสินค้า</label>

        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="กรอกชื่อสินค้า"
          required
          minLength={1}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ราคา</label>

        <input
          type="number"
          className="form-control"
          name="price"
          placeholder="กรอกราคาสินค้า"
          required
          min={0}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">URL รูปภาพ</label>

        <input
          type="text"
          className="form-control"
          name="img_url"
          placeholder="กรอก URL รูปภาพ"
          required
          minLength={1}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">รายละเอียด</label>

        <textarea
          className="form-control"
          name="description"
          rows="4"
          placeholder="กรอกรายละเอียดสินค้า"
          required
          minLength={1}
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">QTY</label>

        <input
          type="number"
          className="form-control"
          name="stock"
          placeholder="กรอกจำนวนสินค้า"
          required
          min={0}
        />
      </div>

      <button className="btn btn-primary">บันทึกสินค้า</button>
    </form>
  );
}