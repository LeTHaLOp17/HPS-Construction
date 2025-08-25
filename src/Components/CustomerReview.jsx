import React, { useRef } from "react";
import "../ComponentCss/CustomerReview.css";

// Customer avatars
import img11 from "/images/img11.png";
import img22 from "/images/img22.png";
import img33 from "/images/img33.png";
import img44 from "/images/img44.png";
import img55 from "/images/img55.png";

const CustomerReview = () => {
  const reviews = [
    {
      id: 1,
      name: "Ramesh Verma",
      company: "Shree Constructions",
      location: "Delhi, India",
      avatar: img11,
      email: "ramesh@shreeconstructions.in",
      review:
        "Bhai, inka bamboo quality ekdum mast hai. Har baar delivery time pe milti hai aur service bhi badiya. Hamare site pe use kiya to sabko natural feel aaya. Full paisa vasool experience!",
      score: 4.5,
      verified: true,
    },
    {
      id: 2,
      name: "Anita Sharma",
      company: "Green Interiors",
      location: "Jaipur, India",
      avatar: img22,
      email: "anita@greeninteriors.in",
      review:
        "Unke bamboo panels ne hamare eco-resort ko ekdam alag charm diya. Sabse zyada impress hui main inki dedication aur detailing dekh kar. Bilkul trust karne layak partner hai.",
      score: 4.8,
      verified: true,
    },
    {
      id: 3,
      name: "Sandeep Mehra",
      company: "Modern Builders",
      location: "Mumbai, India",
      avatar: img33,
      email: "sandeep@modernbuilders.in",
      review:
        "Quality hamesha top-notch rehti hai aur team kaafi cooperative hai. 2 saal se kaam kar rahe hain aur abhi tak ek bhi issue nahi aaya. Professional aur reliable log hain.",
      score: 4.6,
      verified: true,
    },
    {
      id: 4,
      name: "Priya Nair",
      company: "Eco Homes",
      location: "Bangalore, India",
      avatar: img44,
      email: "priya@ecohomes.in",
      review:
        "Bamboo ki quality outstanding hai aur delivery bhi time pe hoti hai. Jo sabse acchi baat hai, wo hai unka eco-friendly approach. Hamare sustainable housing vision ke saath perfectly match karta hai.",
      score: 4.7,
      verified: true,
    },
    {
      id: 5,
      name: "Arjun Singh",
      company: "Urban Developers",
      location: "Punjab, India",
      avatar: img55,
      email: "arjun@urbandevelopers.in",
      review:
        "Service badiya hai aur material ki quality premium hai. Inke bamboo use karke hamare projects aur bhi attractive lagne lage. Definitely recommend karta hoon sabko jo eco-friendly construction karna chahte hain.",
      score: 4.9,
      verified: true,
    },
  ];

  // Duplicate reviews for infinite scroll effect
  const infiniteReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  const containerRef = useRef(null);

  // Star rating component
  const DonScore = ({ score }) => {
    const dons = [];
    const fullDons = Math.floor(score);
    const hasHalfDon = score % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullDons) {
        dons.push(
          <span key={i} className="don filled">
            ★
          </span>
        );
      } else if (i === fullDons && hasHalfDon) {
        dons.push(
          <span key={i} className="don half-filled">
            ★
          </span>
        );
      } else {
        dons.push(
          <span key={i} className="don empty">
            ★
          </span>
        );
      }
    }

    return (
      <div className="review-score-container">
        <div className="review-dons">{dons}</div>
      </div>
    );
  };

  return (
    <section className="customer-review-section">
      <div className="customer-review-container" ref={containerRef}>
        <div className="customer-review-header">
          <h2>Honest Reviews</h2>
        </div>

        <div className="customer-review-carousel">
          <div className="customer-review-cards-container">
            <div className="customer-review-cards-track">
              {infiniteReviews.map((review, index) => (
                <div
                  key={`${review.id}-${Math.floor(index / reviews.length)}`}
                  className="customer-review-card"
                >
                  <div className="review-header">
                    <div className="customer-avatar-container">
                      <div className="customer-avatar">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              review.name
                            )}&background=233528&color=fff&size=80&rounded=true`;
                          }}
                        />
                      </div>
                    </div>

                    <div className="customer-info">
                      <div className="customer-name-section">
                        <h4 className="customer-name">{review.name}</h4>
                        {review.verified && (
                          <span className="verified-badge">✔ Verified</span>
                        )}
                      </div>
                      <p className="customer-company">
                        {review.company}, {review.location}
                      </p>
                      <div className="customer-contact">
                        <span className="customer-email">{review.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="review-content">
                    <p className="review-text">{review.review}</p>
                    <div className="review-bottom">
                      <DonScore score={review.score} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
