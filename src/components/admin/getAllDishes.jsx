import React, { useState, useEffect } from "react";
import "../../css/getAllDishes.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "./Header";
import SideBarAdmin from "./SideBarAdmin";
// Đặt root element cho Modal
Modal.setAppElement("#root");
const DishesList = () => {
  const isAdmin = localStorage.getItem("role") === "admin" ? true : false;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = `${process.env.REACT_APP_URL_API_ADMIN}/dishes`;
  const openModal = (dish) => {
    setDishToDelete(dish);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDishToDelete(null);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_API_ADMIN}/employees/${dishToDelete.dish_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Xóa thành công, cần phải cập nhật danh sách món ăn
      closeModal();
      console.log("Dish deleted successfully");
      
      // window.location.reload();
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };
  const fetchDishes = async (page = 1) => {
    try {
      const keyword = document.getElementById("search-input").value;
      const category = document.getElementById("category-select").value;
      const apiUrl = `${
        process.env.REACT_APP_URL_API_ADMIN
      }/dishes?keyword=${encodeURIComponent(
        keyword
      )}&category=${encodeURIComponent(category)}&page=${page}`;
      const response = await fetch(apiUrl); // Thay URL API thực tế của bạn
      const data = await response.json();

      setDishes(data.dishes);
      setTotalPages(data.totalPages);
      setLoading(false);
      console.log("Dishes fetched:", data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDishes(currentPage);
  }, [currentPage]);

  const searchDishes = () => {
    setCurrentPage(1);
    fetchDishes(1);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleCategoryChange = () => {
    fetchDishes(currentPage);
  };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <HeaderAdmin />
      <div className="admin-homepage">
        <SideBarAdmin />
        <div className="dishes-list-container">
        <h1>Danh sách các món ăn</h1>
        <div class="search-container">
          <div class="search-box">
            <input
              id="search-input"
              type="text"
              class="search-input"
              placeholder="Tìm kiếm..."
            />
            <button className="search-button" onClick={searchDishes}>
              Tìm kiếm
            </button>
          </div>
          <div class="filter-container">
            <select
              class="filter-select"
              name="category"
              id="category-select"
              onChange={handleCategoryChange}
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Món chính">Món chính</option>
              <option value="Tráng miệng">Tráng miệng</option>
              <option value="Đồ uống">Đồ uống</option>
            </select>
          </div>
        </div>
        <div className="add-dish-button">
          <Link to="/admin/v1/create-dish">Thêm món ăn</Link>
        </div>
        <table className="dishes-table">
          <thead>
            <tr>
              <th>Tên món ăn</th>
              <th>Ảnh</th>
              <th>Giá</th>
              <th>Loại món ăn</th>
              {isAdmin && <th>Sửa thông tin</th>}
              {isAdmin && <th>Xóa</th>}
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish.dish_id}>
                <td>
                  <Link to={`/admin/v1/detail-dish/${dish.dish_id}`}>
                    {dish.name}
                  </Link>
                </td>
                <td>
                  <img
                    src={dish.thumbnail}
                    alt={dish.name}
                    className="thumbnail"
                  />
                </td>
                <td className="price">
                  {(dish.price * 1000).toLocaleString()} VNĐ
                </td>
                <td>{dish.category}</td>
                {isAdmin && 
                  <td>
                    <Link to={`/admin/v1/update-dish/${dish.dish_id}`}>Sửa</Link>
                  </td>
                }
                {isAdmin &&
                  <td>
                  <button onClick={() => openModal(dish)}>Xóa</button>
                  </td>
                }
              </tr>
            ))}
          </tbody>
          {/* Modal Xác Nhận */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Xác Nhận Xóa"
            className="modal"
            overlayClassName="overlay"
          >
            <h2>Xác Nhận Xóa</h2>
            <p>Bạn có chắc chắn muốn xóa món ăn này?</p>
            <button onClick={handleDelete}>Xóa</button>
            <button onClick={closeModal}>Hủy</button>
          </Modal>
        </table>
        <div className="pagination-container">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default DishesList;
