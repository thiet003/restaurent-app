import HeaderAdmin from "./Header";
import SideBarAdmin from "./SideBarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import '../../css/AddEmployee.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
const UpdateEmployee = () => {
    const roleDictAdmin = {
        "manager": "Quản lý doanh thu",
        "accountant": "Quản lý nhân sự"
    }
    const roleDictEmployee = {
        "waiter": "Phục vụ",
        "chef": "Đầu bếp",
        "cashier": "Thu ngân"
    }
    const { id } = useParams();
    const [role, setRole] = useState("");
    const [position, setPosition] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = `${process.env.REACT_APP_URL_API_ADMIN}/employees/${id}`;
        const accessToken = localStorage.getItem("accessToken");
        const token = "Bearer " + accessToken;
        const data = {
            role,
            position
        };
        try {
            const response = await axios.patch(apiUrl, data, {
                headers: {
                    authorization: token,
                },
            });
            if (response.status === 200) {
                toast.success("Cập nhật thông tin nhân viên thành công!");
                navigate("/admin/v1/list-employees");
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    const fetchEmployee = async () => {
        const apiGetEmployee = `${process.env.REACT_APP_URL_API_ADMIN}/employees/${id}`;
        const accessToken = localStorage.getItem("accessToken");
        const token = "Bearer " + accessToken;
        try {
            const response = await axios.get(apiGetEmployee, {
                headers: {
                    authorization: token,
                },
            });
            if (response.status === 200) {
                setRole(response.data.role);
                setPosition(response.data.position);
            }
        } catch (error) {
            console.error("Error fetching employee:", error);
        }
    }
    useEffect(() => {
        fetchEmployee();
    }, []);    
    return (
        <div>
      <HeaderAdmin />
      <div className="add-employee">
        <SideBarAdmin />
        <div className="form-add">
          <h1>Cập nhật thông tin nhân viên</h1>
          <div>
            <form action="">
              <div>
                <label htmlFor="role">Quyền:</label>
                <select name="" id="" onChange={(e) => setRole(e.target.value)}>
                    <option value="admin" selected={role === "admin"}>Quản lý</option>
                    <option value="employee" selected={role === "employee"}>Nhân viên</option>
                </select>
              </div>
              {role === "employee" && (
                <div>
                  <label htmlFor="position">Vị trí:</label>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="waiter" selected={position === "waiter"}>Phục vụ</option>
                    <option value="chef" selected={position === "chef"}>Đầu bếp</option>
                    <option value="cashier" selected={position === "cashier"}>Thu ngân</option>
                  </select>
                </div>
              )}
              {role === "admin" && (
                <div>
                  <label htmlFor="position">Vị trí</label>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="manager" selected={position === "manager"}>Quản lý doanh thu</option>
                    <option value="accountant" selected={position === "accountant"}>Quản lý nhân sự</option>
                  </select>
                </div>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit" onClick={handleSubmit}>
                Cập nhật
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
};

export default UpdateEmployee;