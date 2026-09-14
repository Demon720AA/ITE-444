import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Add a slight delay for aesthetic loading presentation
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        setError("ไม่สามารถโหลดข้อมูลสินค้าได้ในขณะนี้");
        setLoading(false);
      }
    };
    
    // Simulate network delay for visual effect
    setTimeout(fetchData, 600);
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-title">รายการสินค้า</h1>
        <p className="header-subtitle">คอลเลกชันสินค้าพรีเมียมของเรา</p>
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="header-subtitle">กำลังโหลดข้อมูลสินค้า...</p>
        </div>
      ) : error ? (
        <div className="empty-container">
          <div className="empty-icon">⚠️</div>
          <p className="header-subtitle" style={{ color: 'var(--danger)' }}>{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-container">
          <div className="empty-icon">📦</div>
          <p className="header-subtitle">ยังไม่มีสินค้าในระบบ</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <div className="product-badge">New Arrival</div>
                <img
                  src={product.img_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"} 
                  className="product-image"
                  alt={product.name}
                  onError={(e) => {
                    // Fallback image if URL is broken
                    e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
              </div>

              <div className="product-content">
                <h2 className="product-title">{product.name}</h2>
                <div className="product-price-row">
                  <div className="product-price">
                    {Number(product.price).toLocaleString()}
                    <span className="currency">THB</span>
                  </div>
                  <button className="btn-primary">
                    รายละเอียด
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;