import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CreateTblStdForm from "@/components/CreateTblStdForm";
 
export default function CreateTblStd() {
    return (
        <>
            <NavbarAdmin />
            <BootstrapClient />
            <div className="container mt-5">
                <h1 className="mb-4">
                    เพิ่มนักศึกษา (tbl_std)
                </h1>
                <CreateTblStdForm />
            </div>
        </>
    );
}
