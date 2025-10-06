import React from "react";
import PropTypes from "prop-types";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push("⭐");
  }

  if (hasHalfStar) {
    stars.push("⭒"); // ดาวครึ่ง
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push("☆");
  }

  return (
    <div className="product-rating">
      {stars.join(" ")} <span className="rating-number">({rating})</span>
    </div>
  );
};

function ProductCard({ product, onAddToCart, onViewDetails }) {
  const { name, description, image, price, originalPrice, discount, inStock } =
    product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x300/cccccc/666666?text=No+Image";
          }}
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        {typeof product.rating === 'number' && renderStars(product.rating)}

        {/* TODO: นักศึกษาจะเพิ่ม rating stars ในส่วน Challenge */}
        <div className="product-price">
          {discount > 0 && (
            <span className="discount text-red-500 text-sm mb-1 inline-block">
              ลด {discount}%
            </span>
          )}
          <div>
            {discount > 0 && (
              <span className="original-price line-through text-gray-400 text-base">
                ฿{originalPrice.toLocaleString()}
              </span>
            )}
            <span className="final-price font-bold text-red-500 text-lg">
              ฿{price.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="product-actions">
          <button
            className="btn btn-secondary"
            onClick={() => onViewDetails(product)}
          >
            ดูรายละเอียด
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? "ใส่ตะกร้า" : "หมดสินค้า"}
          </button>
        </div>
      </div>
    </div>
  );
}

// TODO: นักศึกษาจะเพิ่ม PropTypes validation ในส่วน Challenge
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    inStock: PropTypes.bool.isRequired,
    rating: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};


export default ProductCard;
