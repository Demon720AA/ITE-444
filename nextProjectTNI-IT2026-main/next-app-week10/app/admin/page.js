import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import db from "@/lib/prisma";
import Link from "next/link";

import CounterChart from "@/components/CounterChart";

export default async function Dashboard() {
  //all product
  const totalProducts = await prisma.products.count();

  //sum stock
  const result = await prisma.products.aggregate({
    _sum: {
      stock: true,
    },
  });
  const totalStock = result._sum.stock || 0;

  // 1. ข้อมูลผู้เข้าชมรายเดือน (tbl_counter)
  const counterData = await prisma.$queryRaw`
    SELECT 
    MONTH(dateCreate) AS month,
    COUNT(*) AS total
    FROM tbl_counter
    WHERE YEAR(dateCreate) = 2026
    GROUP BY MONTH(dateCreate)
    ORDER BY month
  `;
  
  const monthNames = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
  ];

  const visitorChartData = counterData.map((item) => ({
    label: monthNames[Number(item.month) - 1],
    value: Number(item.total),
  }));

  // 2. ข้อมูลจำนวนนักศึกษาแยกตามสาขา (student)
  const studentMajorData = await prisma.student.groupBy({
    by: ['student_major'],
    _count: {
      id: true,
    },
  });

  const majorChartData = studentMajorData.map((item) => ({
    label: item.student_major || "ไม่ระบุ",
    value: item._count.id,
  }));

  // 3. ข้อมูลสต็อกสินค้า 5 อันดับแรก (products)
  const topStockProducts = await prisma.products.findMany({
    orderBy: {
      stock: 'desc',
    },
    take: 5,
    select: {
      name: true,
      stock: true,
    },
  });

  const stockChartData = topStockProducts.map((item) => ({
    label: item.name,
    value: item.stock,
  }));

  // 4. ข้อมูลราคาสินค้า 5 อันดับแรก (products)
  const topPriceProducts = await prisma.products.findMany({
    orderBy: {
      price: 'desc',
    },
    take: 5,
    select: {
      name: true,
      price: true,
    },
  });

  const priceChartData = topPriceProducts.map((item) => ({
    label: item.name,
    value: Number(item.price),
  }));

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-4 mb-5">
        <h3 className="mb-4 fw-bold text-secondary">
          <i className="bi bi-speedometer2 me-2"></i>Dashboard Overview
        </h3>

        {/* ยอดสรุป Cards */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card shadow-sm border-0 h-100" style={{ backgroundColor: "#e0f2fe", borderRadius: "15px" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <div className="bg-primary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-box-seam text-primary fs-3"></i>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-muted fw-bold mb-1">สินค้าทั้งหมด</h6>
                    <h3 className="fw-bold mb-0 text-dark">{totalProducts} <span className="fs-6 text-muted fw-normal">รายการ</span></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card shadow-sm border-0 h-100" style={{ backgroundColor: "#dcfce7", borderRadius: "15px" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <div className="bg-success bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-boxes text-success fs-3"></i>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-muted fw-bold mb-1">สต็อกทั้งหมด</h6>
                    <h3 className="fw-bold mb-0 text-dark">{totalStock} <span className="fs-6 text-muted fw-normal">ชิ้น</span></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card shadow-sm border-0 h-100" style={{ backgroundColor: "#fef3c7", borderRadius: "15px" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <div className="bg-warning bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-currency-dollar text-warning fs-3"></i>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-muted fw-bold mb-1">ยอดขายวันนี้</h6>
                    <h3 className="fw-bold mb-0 text-dark">฿85,000</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card shadow-sm border-0 h-100" style={{ backgroundColor: "#fee2e2", borderRadius: "15px" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <div className="bg-danger bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-graph-up-arrow text-danger fs-3"></i>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-muted fw-bold mb-1">ยอดขายเดือนนี้</h6>
                    <h3 className="fw-bold mb-0 text-dark">฿1.25M</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section 1 */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h5 className="card-title fw-bold text-secondary mb-3"><i className="bi bi-bar-chart-line me-2"></i>สถิติผู้เข้าชมเว็บไซต์รายเดือน</h5>
                <CounterChart data={visitorChartData} type="line" title="" color="blue" label="จำนวนผู้เข้าชม" />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h5 className="card-title fw-bold text-secondary mb-3"><i className="bi bi-pie-chart me-2"></i>จำนวนนักศึกษาแยกตามสาขา</h5>
                <CounterChart data={majorChartData} type="bar" title="" color="colorful" label="จำนวนนักศึกษา" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section 2 */}
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "15px", backgroundColor: "#f8f9fa" }}>
              <div className="card-body p-4">
                <h5 className="card-title fw-bold text-secondary mb-3"><i className="bi bi-box-seam me-2"></i>สินค้าที่มีสต็อกมากที่สุด (Top 5)</h5>
                <CounterChart data={stockChartData} type="bar" title="" color="green" label="จำนวนสต็อก (ชิ้น)" />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "15px", backgroundColor: "#f8f9fa" }}>
              <div className="card-body p-4">
                <h5 className="card-title fw-bold text-secondary mb-3"><i className="bi bi-cash-coin me-2"></i>สินค้าที่มีราคาสูงที่สุด (Top 5)</h5>
                <CounterChart data={priceChartData} type="bar" title="" color="orange" label="ราคาสินค้า (บาท)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
