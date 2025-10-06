import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList({ products, categories, onAddToCart, onViewDetails }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // กรองและเรียงสินค้าด้วย useMemo
  const filteredProducts = useMemo(() => {
    let result =
      selectedCategory === "all"
        ? products
        : products.filter((product) => product.category === selectedCategory);

    // กรองด้วย searchQuery
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // เรียงลำดับ
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="product-list-container">
      {/* Header */}
      <div className="header">
        <h1>🛍️ ร้านค้าออนไลน์</h1>
        <p>Lab 3.2 - การสร้าง Components และ Props</p>
      </div>

      {/* Filter Controls - แนวนอน */}
      <div className="filter-row">
        {/* Category Filter */}
        <div className="filter-item">
          <label htmlFor="category-select">หมวดหมู่:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Box */}
        <div className="filter-item">
          <label htmlFor="search">ค้นหา:</label>
          <input
            id="search"
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort Dropdown */}
        <div className="filter-item">
          <label htmlFor="sort-select">เรียงตาม:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">ชื่อสินค้า</option>
            <option value="price">ราคาต่ำ → สูง</option>
            <option value="rating">คะแนนสูง → ต่ำ</option>
          </select>
        </div>
      </div>

      {/* Products Display */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default ProductList;
