import React, { useState, useCallback } from "react";
import HPSProductCard from "../Components/productCard";
import QueryForm from "../Components/queryForm";
import { createPortal } from "react-dom";
import "../Style/Home.css";
import Footer from "./footer";
import Poster from "../Components/poster";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUserData, setModalUserData] = useState(null);

  // FIXED: Helper functions for safe formatting
  const safeFormatPrice = (price) => {
    if (price === null || price === undefined) return "0";
    if (typeof price !== "number") return String(price);
    return price.toLocaleString();
  };

  const safeFormatDate = (dateValue) => {
    if (!dateValue) return "Not available";
    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch (error) {
      return "Date error";
    }
  };

  const allProducts = [
    {
      id: 1,
      title: "Assam Bamboo Pole 24 Feet",
      description:
        "Premium quality Assam bamboo poles perfect for construction and structural applications. Naturally treated and durable for long-term projects.",
      price: 120,
      unit: "piece",
      rating: 4.8,
      category: "bamboo",
      imageUrl: "/images/24bamboopole.jpg",
    },
    {
      id: 2,
      title: "Brown Bamboo Fencing",
      description:
        "Natural brown bamboo fencing panels ideal for privacy screens, garden boundaries, and decorative outdoor installations.",
      price: 50,
      unit: "sq ft",
      rating: 4.6,
      category: "fencing",
      imageUrl: "/images/bf.jpg",
    },
    {
      id: 3,
      title: "Coconut Coir Rope",
      description:
        "Strong natural fiber rope made from coconut coir, perfect for bamboo construction binding and eco-friendly applications.",
      price: 49,
      unit: "kg",
      rating: 4.7,
      category: "materials",
      imageUrl: "/images/CCR.jpg",
    },
    {
      id: 4,
      title: "Outdoor Bamboo Fencing",
      description:
        "Weather-resistant bamboo fencing designed for outdoor use with enhanced durability and natural aesthetic appeal.",
      price: 75,
      unit: "sq ft",
      rating: 4.5,
      category: "fencing",
      imageUrl: "/images/obf.jpg",
    },
    {
      id: 5,
      title: "Tree Guard Bamboo",
      description:
        "Protective bamboo tree guards designed to safeguard young trees and plants from animals and environmental damage.",
      price: 240,
      unit: "piece",
      rating: 4.8,
      category: "bamboo",
      imageUrl: "/images/tgb.jpg",
    },
    {
      id: 6,
      title: "Hessian Cloth Roll",
      description:
        "High-quality jute hessian cloth rolls perfect for landscaping, erosion control, and eco-friendly construction applications.",
      price: 380,
      unit: "roll",
      rating: 4.6,
      category: "materials",
      imageUrl: "/images/hcr.jpg",
    },
    {
      id: 7,
      title: "Dry Tulda 24 Feet Bamboo Pole",
      description:
        "Specially processed dry Tulda bamboo poles offering superior strength and durability for heavy-duty construction work.",
      price: 110,
      unit: "piece",
      rating: 4.7,
      category: "bamboo",
      imageUrl: "/images/dryt.jpg",
    },
    {
      id: 8,
      title: "Green Bamboo Pole",
      description:
        "Fresh green bamboo poles ideal for immediate construction use with natural flexibility and strength properties.",
      price: 130,
      unit: "piece",
      rating: 4.8,
      category: "bamboo",
      imageUrl: "/images/gbp.jpg",
    },
    {
      id: 9,
      title: "Bamboo Partition Fencing Wall",
      description:
        "Decorative bamboo partition panels perfect for creating room dividers, privacy walls, and interior design elements.",
      price: 25,
      unit: "sq ft",
      rating: 4.4,
      category: "fencing",
      imageUrl: "/images/bpf.jpg",
    },
    {
      id: 10,
      title: "Eucalyptus Wood Poles",
      description:
        "Treated eucalyptus wood poles offering excellent durability and strength for construction and landscaping projects.",
      price: 180,
      unit: "piece",
      rating: 4.6,
      category: "wood",
      imageUrl: "/images/ep.webp",
    },
    {
      id: 11,
      title: "Rectangular Bamboo Ladder",
      description:
        "Sturdy bamboo ladder construction with rectangular design, perfect for scaffolding and construction access solutions.",
      price: 40,
      unit: "feet",
      rating: 4.5,
      category: "bamboo",
      imageUrl: "/images/rb.jpg",
    },
    {
      id: 12,
      title: "Murli Bamboo Pole",
      description:
        "High-quality Murli variety bamboo poles known for their strength and flexibility, ideal for various construction applications.",
      price: 90,
      unit: "piece",
      rating: 4.7,
      category: "bamboo",
      imageUrl: "/images/murli.webp",
    },
    {
      id: 13,
      title: "12 Feet Bamboo Pole",
      description:
        "Standard 12-foot bamboo poles suitable for medium-scale construction projects and structural framework applications.",
      price: 45,
      unit: "piece",
      rating: 4.5,
      category: "bamboo",
      imageUrl: "/images/12.jpg",
    },
    {
      id: 14,
      title: "Desi Bamboo Pole",
      description:
        "Traditional Indian variety bamboo poles offering authentic quality and proven performance for local construction needs.",
      price: 135,
      unit: "feet",
      rating: 4.8,
      category: "bamboo",
      imageUrl: "/images/db.jpg",
    },
    {
      id: 15,
      title: "16 Feet Bamboo Pole",
      description:
        "Medium-length 16-foot bamboo poles perfect for residential construction and moderate-scale building projects.",
      price: 48,
      unit: "piece",
      rating: 4.6,
      category: "bamboo",
      imageUrl: "/images/16.jpg",
    },
    {
      id: 16,
      title: "20 Feet Bamboo Pole",
      description:
        "Long-length 20-foot bamboo poles ideal for larger construction projects requiring extended structural support.",
      price: 90,
      unit: "piece",
      rating: 4.7,
      category: "bamboo",
      imageUrl: "/images/20.jpg",
    },
    {
      id: 17,
      title: "12mm Bamboo Fencing",
      description:
        "Precision-cut 12mm bamboo fencing material offering consistent thickness and professional finishing for quality installations.",
      price: 45,
      unit: "sq ft",
      rating: 4.5,
      category: "fencing",
      imageUrl: "/images/12mm.jpg",
    },
    {
      id: 18,
      title: "Bamboo Challi Length 1-28 Feet",
      description:
        "Flexible bamboo challi available in various lengths from 1 to 28 feet, suitable for custom construction requirements.",
      price: 45,
      unit: "piece",
      rating: 4.6,
      category: "bamboo",
      imageUrl: "/images/bcc.jpg",
    },
    {
      id: 19,
      title: "Big Bamboo Pole",
      description:
        "Large diameter bamboo poles designed for heavy-duty construction and structural applications requiring maximum strength.",
      price: 120,
      unit: "piece",
      rating: 4.8,
      category: "bamboo",
      imageUrl: "/images/bbp.jpg",
    },
    {
      id: 20,
      title: "Bamboo 3 Inch Diameter 24 Feet",
      description:
        "Premium 3-inch diameter bamboo poles in 24-foot lengths, perfect for major structural construction projects.",
      price: 130,
      unit: "feet",
      rating: 4.9,
      category: "bamboo",
      imageUrl: "/images/324.png",
    },
    {
      id: 21,
      title: "28 Feet Bamboo Pole",
      description:
        "Extra-long 28-foot bamboo poles for large-scale construction projects requiring maximum length and structural integrity.",
      price: 135,
      unit: "piece",
      rating: 4.8,
      category: "bamboo",
      imageUrl: "/images/28f.jpg",
    },
    {
      id: 22,
      title: "Bamboo Round Chali",
      description:
        "Traditional round chali bamboo pieces ideal for authentic construction methods and decorative architectural elements.",
      price: 80,
      unit: "piece",
      rating: 4.6,
      category: "bamboo",
      imageUrl: "/images/brc.jpg",
    },
    {
      id: 23,
      title: "Bamboo 2 Inches Diameter",
      description:
        "Medium-diameter 2-inch bamboo poles suitable for lightweight construction and scaffolding applications.",
      price: 110,
      unit: "piece",
      rating: 4.7,
      category: "bamboo",
      imageUrl: "/images/b2.webp",
    },
    {
      id: 24,
      title: "Wood Poles 18 Feet",
      description:
        "Treated wooden poles in 18-foot lengths, offering alternative material option for construction and landscaping projects.",
      price: 170,
      unit: "piece",
      rating: 4.5,
      category: "wood",
      imageUrl: "/images/wp18.webp",
    },
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", name: "All Products", icon: "🏗️" },
    { id: "bamboo", name: "Bamboo", icon: "🎋" },
    { id: "pop", name: "POP", icon: "🏛️" },
  ];

  // REMOVED: Alert has been removed, ProductCard now handles its own popups
  const handleProductLearnMore = useCallback(() => {
    // ProductCard now handles its own success/error states with popups
    // No need for additional handling here
  }, []);

  const closeModal = () => {
    console.log("❌ User closed modal");
    setModalOpen(false);
  };

  const openWhatsApp = () => {
    if (!modalUserData) return;
    const { userData, productInfo } = modalUserData;
    const message = encodeURIComponent(
      `🏗️ *Interest in ${
        productInfo.title
      }*\n\nHi HPS Constructions!\n\nName: ${userData.name}\nPhone: ${
        userData.phone
      }\n\nI'm interested in ${productInfo.title} (₹${safeFormatPrice(
        productInfo.price
      )}/${productInfo.unit}).\n\n${
        productInfo.description
      }\n\nOriginal Query: ${
        userData.query || "No specific query"
      }\n\nPlease provide more details about:\n• Availability\n• Installation process\n• Bulk pricing\n• Quality specifications\n\nThank you!`
    );
    window.open(`https://wa.me/919565550142?text=${message}`, "_blank");
    setModalOpen(false);
  };

  const makeCall = () => {
    window.location.href = "tel:9565550142";
    setModalOpen(false);
  };

  // FIXED: Bulletproof Modal with safe formatting
  const renderModal = () => {
    if (!modalOpen || !modalUserData) return null;

    const { userData, productInfo } = modalUserData;

    return createPortal(
      <div className="modal-overlay-portal">
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="modal-content-portal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-success">
              <div className="success-icon">✅</div>
              <h3 className="success-title">
                Interest Registered Successfully!
              </h3>
              <button onClick={closeModal} className="modal-close-btn">
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="user-details-section">
                <p className="section-title">
                  <strong>Your Details:</strong>
                </p>
                <div className="details-grid">
                  <span className="detail-item">
                    👤 {userData?.name || "Not provided"}
                  </span>
                  <span className="detail-item">
                    📞 {userData?.phone || "Not provided"}
                  </span>
                </div>
              </div>

              <div className="product-details-section">
                <p className="product-title">
                  <strong>Product:</strong>{" "}
                  {productInfo?.title || "Unknown Product"}
                  (₹{safeFormatPrice(productInfo?.price)}/
                  {productInfo?.unit || "unit"})
                </p>
              </div>

              <p className="contact-prompt">
                How would you like us to contact you?
              </p>

              <div className="contact-buttons">
                <button onClick={openWhatsApp} className="whatsapp-btn">
                  <span className="btn-icon">💬</span>
                  <div className="btn-content">
                    <div className="btn-title">WhatsApp</div>
                    <div className="btn-subtitle">Chat instantly</div>
                  </div>
                </button>

                <button onClick={makeCall} className="call-btn">
                  <span className="btn-icon">📞</span>
                  <div className="btn-content">
                    <div className="btn-title">Call Now</div>
                    <div className="btn-subtitle">Direct call</div>
                  </div>
                </button>
              </div>

              <p className="footer-note">
                💡 We have your details and will contact you soon!
              </p>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className="home-page">
        <div className="main-heading-container">
          <div className="filter-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`category-btn ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="results-info">
            <span className="results-count">
              {filteredProducts.length} Products Found
            </span>
          </div>
        </div>

        <main className="products-main">
          <div className="products-container">
            <div className="products-grid">
              {filteredProducts.map((product, index) => (
                <div key={`${product.id}-${index}`} className="product-item">
                  <HPSProductCard
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    unit={product.unit}
                    rating={product.rating}
                    imageUrl={product.imageUrl}
                    onCall={() => console.log(`Called for: ${product.title}`)}
                    onLearnMore={handleProductLearnMore}
                  />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-products">
                <div className="no-products-icon">📦</div>
                <h3>No Products Found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </main>

        <section className="cta-section">
          <div className="cta-container">
            <h2>Need Custom Solutions?</h2>
            <p>
              Our experts are ready to help you with personalized construction
              solutions
            </p>
            <button
              className="cta-button"
              onClick={() => (window.location.href = "/contact")}
            >
              Get Free Consultation
            </button>
          </div>
        </section>

        <Poster />
        <Footer />
        <QueryForm />
      </div>

      {renderModal()}
    </>
  );
};

export default Home;
