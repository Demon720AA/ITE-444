import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CreateTestForm from "@/components/CreateTestsForm";

export default function CreateTest() {
  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />
      <div className="container mt-5">
        <h1 className="mb-4">เพิ่มข้อมูล</h1>
        <CreateTestForm />
      </div>
    </>
  );
}