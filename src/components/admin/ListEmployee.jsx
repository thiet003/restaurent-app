import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "./Header";
import SideBarAdmin from "./SideBarAdmin";
import '../../css/ListEmployee.css';
import Modal from "react-modal";
const ListEmployee = () => {
    const roleDictAdmin = {
        "manager": "Quản lý doanh thu",
        "accountant": "Quản lý nhân sự"
    }
    const roleDictEmployee = {
        "waiter": "Phục vụ",
        "chef": "Đầu bếp",
        "cashier": "Thu ngân"
    }
    const expirateTime = localStorage.getItem("expirateTime");
    const currentTime = Date.now();
    const isAdmin = localStorage.getItem("role") === "admin" ? true : false;
    const accessToken = localStorage.getItem("accessToken");
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const isExpired = currentTime > expirateTime;
    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const openModal = (employee) => {
        setEmployeeToDelete(employee);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setEmployeeToDelete(null);
      };
      const handleDelete = async () => {
        try {
            const apiUrl = `${process.env.REACT_APP_URL_API_ADMIN}/employees/${employeeToDelete.employee_id}`;
            const accessToken = "Bearer " + localStorage.getItem("accessToken");
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": accessToken
                }
            });
            // Xóa thành công, cần phải cập nhật danh sách nhân viên
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };
    const fetchEmployees = async (page = 1) => {
        if(!accessToken){
            return;
        }
        const keyword = document.getElementById("search-input").value || "";
        const limit = 5;
        const apiUrl = `${process.env.REACT_APP_URL_API_ADMIN}/employees?keyword=${keyword}&page=${page}&limit=${limit}`;
        const token = "Bearer " + accessToken;
        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                }
            });
            const data = await response.json();
            setEmployees(data.employees);
            setTotalPages(data.totalPage);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (isExpired) {
            console.log("Token expired");
            
            navigate("/admin/v1/login");
            if(localStorage.getItem("accessToken")){
                localStorage.removeItem("accessToken");
                localStorage.removeItem("expirateTime");
                localStorage.removeItem("name");
                localStorage.removeItem("role");
            }
        }
        if (!isAdmin) {
            window.location.href = "/admin/v1/";
        }
        fetchEmployees(currentPage);
    }, [currentPage]);
    const handleClick = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setTimeout(() => {
            fetchEmployees(currentPage);
        }, 100);
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    return (
        <div >
            <HeaderAdmin />
            <div className="list-employees">
                <SideBarAdmin />
                <div className="tbEmp">
                    <h1>Danh sách nhân viên</h1>
                    <div className="search-employee">
                        <input id="search-input" type="text" placeholder="Tìm kiếm nhân viên" />
                        <button className="search-e-btn" onClick={handleClick}>Tìm kiếm</button>
                    </div>
                    <table >
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Họ tên</th>
                                <th>Ảnh</th>
                                <th>Số điện thoại</th>
                                <th>Tên đăng nhập</th>
                                <th>Quyền</th>
                                <th>Chức vụ</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map((employee, index) => (
                                    <tr key={employee.employee_id}>
                                        <td>{index + 1}</td>
                                        <td>{employee.name}</td>
                                        <td><img src={employee.avatar} alt="" /></td>
                                        <td>{employee.phone}</td>
                                        <td>{employee.username}</td>
                                        {
                                            employee.role === "admin" &&
                                            <td>Quản trị viên</td>
                                        }
                                        {
                                            employee.role === "employee" &&
                                            <td>Nhân viên</td>
                                        }
                                        {
                                            employee.role === "admin" &&
                                            <td>{roleDictAdmin[employee.position]}</td>
                                        }
                                        {
                                            employee.role === "employee" &&
                                            <td>{roleDictEmployee[employee.position]}</td>
                                        }
                                        {employee.role === "employee" &&
                                            <td>
                                            <button onClick={() => navigate(`/admin/v1/update-employee/${employee.employee_id}`)}>Sửa</button>
                                            <button onClick={() => openModal(employee)}>Xóa</button>
                                            </td>
                                        }
                                        {employee.role === "admin" &&
                                            <td></td>
                                        }
                                    </tr>
                                ))
                            }
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
    )
}

export default ListEmployee;
