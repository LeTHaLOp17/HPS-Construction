import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Components/productCard";
import Poster from "../Components/poster";
import CustomerReview from "../Components/CustomerReview";
import Footer from "./footer";
import ImageSlider from "../Components/imageSlider";
import "../Style/About.css";

const About = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      title: "Bamboo Construction Consultation",
      description:
        "Professional consultation for bamboo-based projects: get guidance on bamboo selection, structural strategies, sustainability, and site execution from experienced industry experts.",
      price: 2500,
      unit: "session",
      rating: 4.9,
      imageUrl: "/images/bcc.jpg",
    },
    {
      id: 2,
      title: "Plaster of Paris (POP) Interior Services",
      description:
        "End-to-end POP solutions for ceilings, walls, and decorative elements. Includes design planning, material sourcing, and on-site precision installation with on-time delivery.",
      price: 430,
      unit: "sq ft",
      rating: 4.7,
      imageUrl: "/images/pops.jpg",
    },
    {
      id: 3,
      title: "Total Bamboo Construction Solutions",
      description:
        "Supply and installation of bamboo structures, fencing, supports, and interior/exterior systems. Quality bamboo, expert craftsmanship, and custom solutions for any project scale.",
      price: 320,
      unit: "sq ft",
      rating: 4.8,
      imageUrl: "/images/tbcs.webp",
    },
    {
      id: 4,
      title: "Construction Material Transport",
      description:
        "Efficient, safe, and region-wide transport of bamboo, POP products, and construction materials—includes secure loading, unloading, and on-time delivery service.",
      price: 30,
      unit: "km",
      rating: 4.6,
      imageUrl: "/images/cmt.avif",
    },
  ];

  return (
    <main className="about-container">
      {/* Hero Section with ImageSlider */}
      <section className="hero-section">
        <div className="hero-slider-wrapper" onClick={() => navigate("/")}>
          <ImageSlider />
          <div className="hero-overlay">
            <div className="hero-text-container">
              <h1 className="hero-title">HPS Construction</h1>
              <p className="hero-description">
                Professional bamboo and POP solutions for modern construction
                needs. Quality craftsmanship with sustainable materials for
                residential and commercial projects.
              </p>
              <div className="hero-actions">
                <button
                  className="hero-cta-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/");
                    {
                      /* ← Changed to navigate to Home (/) */
                    }
                  }}
                >
                  Our Products {/* ← Button text */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="features-section">
        <div className="container">
          <header className="section-header">
            <h2>Our Premium Products</h2>
            <p className="section-description">
              Discover our range of sustainable construction solutions crafted
              with expertise and innovation
            </p>
          </header>

          <div className="button-container">
            <button
              className="explore-button"
              onClick={() => navigate("/Home")}
            >
              Explore Our Products
            </button>
          </div>

          {/* Infinite Product Carousel */}
          <div className="infinite-carousel">
            <div className="carousel-track">
              {[...products, ...products, ...products].map((product, index) => (
                <div key={`${product.id}-${index}`} className="carousel-item">
                  <ProductCard
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    unit={product.unit}
                    rating={product.rating}
                    imageUrl={product.imageUrl}
                    onShare={() => console.log(`Shared: ${product.title}`)}
                    onLearnMore={() => navigate("/Home")}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Poster */}
      <Poster />

      {/* Customer Reviews */}
      <CustomerReview />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default About;
