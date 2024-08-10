import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../css/DetailDish.css";

const DetailDish = () => {
  const id = useParams().id;
  const [dish, setDish] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const apiUrl = `${process.env.REACT_APP_URL_API_ADMIN}/dishes/${id}`;

  const fetchDish = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDish(data);
    } catch (error) {
      console.error("Error fetching dish:", error);
    }
  };
  useEffect(() => {
    fetchDish();
  }, []);

  return (
    <div id="dish-details-container">
  <h1 id="dish-details-title">Chi tiết món ăn</h1>

  <div id="dish-details-content">
    <div id="dish-info">
      <div class="dish-detail-item">
        <p class="dish-detail-label">Tên món ăn:</p>
        <p class="dish-detail-value">{dish.name}</p>
      </div>

      <div class="dish-detail-item">
        <p class="dish-detail-label">Ảnh:</p>
        <img
          id="dish-thumbnail"
          src={dish.thumbnail && dish.images[0].image_url}
          alt={dish.name}
        />
      </div>

      <div class="dish-detail-item">
        <p class="dish-detail-label">Mô tả:</p>
        <p class="dish-detail-value">{dish.description}</p>
      </div>

      <div class="dish-detail-item">
        <p class="dish-detail-label">Giá:</p>
        <p class="dish-detail-value">{dish.price}</p>
      </div>

      <div class="dish-detail-item">
        <p class="dish-detail-label">Danh mục:</p>
        <p class="dish-detail-value">{dish.category}</p>
      </div>
    </div>
    
    <div id="dish-images">
      <p class="dish-detail-label">Ảnh chi tiết:</p>
      <div class="detail-images">
        {dish.images &&
          dish.images.map((image, index) => (
            <img
              key={index}
              class="detail-image"
              src={image.image_url}
              alt={dish.name}
            />
          ))}
      </div>
    </div>
  </div>

  <div id="dish-details-buttons">
    <button class="dish-action-button"><Link to={`/admin/v1/list-dishes`}>Quay lại</Link></button>
    <button class="dish-action-button"><Link to={`/admin/v1/update-dish/${id}`}>Sửa</Link></button>
  </div>
</div>

  );
};

// Export the DetailDish component
export default DetailDish;
