//import React from 'react';

export default function PosApp() {
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#038ef2' }}>
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#/">
            <img 
              src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" 
              alt="Bootstrap" 
              width="30" 
              height="24" 
            />
            ร้านบ้านๆ
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="#/">ขายหน้าร้าน</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#/">ขายออนไลน์</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#/">ตั้งค่า</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#/">รายงาน</a>
              </li>
              {/* 
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#/">Action</a></li>
                  <li><a className="dropdown-item" href="#/">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#/">Something else here</a></li>
                </ul>
              </li> 
              */}
              {/* 
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
              */}
            </ul>
            {/* 
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> 
            */}
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-3 mb-2">
        <div className="row">
          <div className="col">
            <a href="#/" className="btn btn-primary btn-sm me-1"> ทั้งหมด </a> 
            <a href="#/" className="btn btn-success btn-sm me-1"> อาหารเซ็ต </a>  
            <a href="#/" className="btn btn-info btn-sm me-1"> อาหารจานเดียว </a> 
            <a href="#/" className="btn btn-danger btn-sm me-1"> เครื่องดื่ม </a> 
            <a href="#/" className="btn btn-warning btn-sm me-1"> ของหวาน </a> 
            <a href="#/" className="btn btn-dark btn-sm"> กาแฟ </a> 
          </div>
        </div>
      </div>

      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          {/* main page */}
          <div className="col-sm-8">
            <div className="row"> 
              
              {/* item group 1 */}
              {[...Array(6)].map((_, i) => (
                <div className="col-sm-2 mb-2" key={`item-group-1-${i}`}>
                  <div className="card" style={{ width: '100%' }}>
                    <img src="https://devbanban.com/app/foodpos/p_img/104599236620190428_221506.png" className="card-img-top" alt="ข้าวไข่เจียวหมูสับ" />
                    <div className="card-body">
                      <h6 className="card-title text-center">ข้าวไข่เจียวหมูสับ</h6>
                      <p className="card-text text-center">฿ 60.00 </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* item group 2 */}
              {[...Array(5)].map((_, i) => (
                <div className="col-sm-2 mb-2" key={`item-group-2-${i}`}>
                  <div className="card" style={{ width: '100%' }}>
                    <img src="https://devbanban.com/app/coffee/p_img/126798917220190225_110423.jpg" className="card-img-top" alt="อเมริกาโน (เย็น)" />
                    <div className="card-body">
                      <h6 className="card-title text-center">อเมริกาโน (เย็น)</h6>
                      <p className="card-text text-center">฿ 60.00 </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* item group 3 */}
              {[...Array(5)].map((_, i) => (
                <div className="col-sm-2 mb-2" key={`item-group-3-${i}`}>
                  <div className="card" style={{ width: '100%' }}>
                    <img src="https://devbanban.com/app/foodpos/p_img/167208652420190428_221354.jpeg" className="card-img-top" alt="กะเพราไก่ไข่ดาว" />
                    <div className="card-body">
                      <h6 className="card-title text-center">กะเพราไก่ไข่ดาว</h6>
                      <p className="card-text text-center">฿ 80.00 </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* item group 4 */}
              {[...Array(5)].map((_, i) => (
                <div className="col-sm-2 mb-2" key={`item-group-4-${i}`}>
                  <div className="card" style={{ width: '100%' }}>
                    <img src="https://devbanban.com/app/coffee/p_img/f106533583120190225_140101.jpg" className="card-img-top" alt="พุดดิ้งนมสด" />
                    <div className="card-body">
                      <h6 className="card-title text-center">พุดดิ้งนมสด</h6>
                      <p className="card-text text-center">฿ 40.00 </p>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
          {/* main page */}

          {/* table box */}
          <div className="col-sm-4">
            <table className="table mb-1">
              <tbody>
                <tr>
                  <td width="70%"><b> รายการปัจจุบัน (6) </b></td>
                  <td width="30%"> 
                    <span className="text-danger" style={{ cursor: 'pointer' }}> - ล้างทั้งหมด </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center" scope="col" width="5%">#</th>
                  <th scope="col" width="40%">รายการอาหาร</th>
                  <th className="text-center" scope="col" width="5%">QTY</th>
                  <th className="text-end" scope="col" width="10%">ราคา</th>
                  <th className="text-end" scope="col" width="10%">รวม</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">1.</td>
                  <td>ข้าวไข่เจียวหมูสับ</td>
                  <td className="text-center">2</td>
                  <td className="text-end">120.00</td>
                  <td className="text-end">฿240.00</td>
                </tr>
                <tr>
                  <td className="text-center">2.</td>
                  <td>กะเพราไก่ไข่ดาว</td>
                  <td className="text-center">2</td>
                  <td className="text-end">80.00</td>
                  <td className="text-end">฿160.00</td>
                </tr>
                <tr>
                  <td className="text-center">3.</td>
                  <td>พุดดิ้งนมสด</td>
                  <td className="text-center">2</td>
                  <td className="text-end">40.00</td>
                  <td className="text-end">฿80.00</td>
                </tr>
                <tr>
                  <td className="text-center">4.</td>
                  <td>ข้าวไข่เจียวหมูสับ</td>
                  <td className="text-center">2</td>
                  <td className="text-end">120.00</td>
                  <td className="text-end">฿240.00</td>
                </tr>
                <tr>
                  <td className="text-center">5.</td>
                  <td>ข้าวไข่เจียวหมูสับ</td>
                  <td className="text-center">2</td>
                  <td className="text-end">120.00</td>
                  <td className="text-end">฿240.00</td>
                </tr>
                <tr>
                  <td className="text-center">6.</td>
                  <td>อเมริกาโน</td>
                  <td className="text-center">2</td>
                  <td className="text-end">60.00</td>
                  <td className="text-end">฿120.00</td>
                </tr>

                {/* Summaries */}
                <tr>
                  <td className="text-center" colSpan={4}> ยอดรวม  (Subtotal) </td>
                  <td className="text-end"> <b> ฿ 1,080.00</b></td>
                </tr>
                <tr>
                  <td className="text-center" colSpan={4}> ส่วนลด (Discount) </td>
                  <td className="text-end"> <b> ฿  0</b></td>
                </tr>
                <tr>
                  <td className="text-center" colSpan={4}> ภาษี  (VAT 7%) </td>
                  <td className="text-end"> <b> ฿  0 </b></td>
                </tr>
                <tr>
                  <td className="text-center" colSpan={4}> ยอดสุทธิ   </td>
                  <td className="text-end"> <b> ฿  1,080.00</b></td>
                </tr>
              </tbody>
            </table>

            <div className="d-grid gap-2">
              <button className="btn btn-success"> ชำระเงิน  </button>
              <button className="btn btn-warning"> พักบิล  </button>
            </div>
          </div>
          {/* table box */}
        </div>
      </div>

      <footer className="mt-3 mb-2">
        <p className="text-center">  
          POS UI by devbanban.com 2026 <br /> 
          🔥 โปรแรง! ลดสูงสุด 80% <br />
          💻 Source Code กว่า 40 โปรแกรม พร้อมใช้ทันที <br />
          ✔️ ซื้อแล้วปรึกษาได้ฟรี <br />
          🌐 เลือกดูสินค้า: <a href="https://devbanban.com/?p=4425" target="_blank" rel="noreferrer"> คลิกเลย </a> 
        </p>
      </footer>
    </>
  );
}