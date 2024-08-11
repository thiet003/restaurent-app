import "../../css/SideBarAdmin.css";
import { Link } from "react-router-dom";
const SideBarAdmin = () => {
  const isAdmin = localStorage.getItem("role") === "admin" ? true : false;
  return (
    <div className="sidebar">
      {/* Món ăn */}
      <div>
        <h3>Món ăn</h3>
        <ul>
          <li>
            <Link to="/admin/v1/list-dishes">Danh sách món ăn</Link>
          </li>
          <li>
            <Link to="/admin/v1/create-dish">Thêm món ăn</Link>
          </li>
        </ul>
      </div>
      {isAdmin && (
        <div>
          <h3>Nhân viên</h3>
          <ul>
            <li>
              <Link to="/admin/v1/list-employees">Danh sách nhân viên</Link>
            </li>
            <li>
              <Link to="/admin/v1/add-employee">Thêm mới nhân viên</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBarAdmin;
