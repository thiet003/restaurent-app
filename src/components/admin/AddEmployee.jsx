import HeaderAdmin from "./Header";
import SideBarAdmin from "./SideBarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import '../../css/AddEmployee.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
  const isAdmin = localStorage.getItem("role") === "admin" ? true : false;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [position, setPosition] = useState("waiter");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const apiUrl = `${process.env.REACT_APP_URL_API_ADMIN}/employees/create`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name || !phone || !username || !password || !retypedPassword){
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if(password !== retypedPassword){
      setError("Mật khẩu không khớp!");
      return;
    }
    // Lấy ngày dạng YYYY-MM-DD
    const hire_date = new Date().toISOString().slice(0, 10);
    const data = {
        name,
        phone,
        username,
        password,
        role,
        position,
        hire_date
    };
    const accessToken = localStorage.getItem("accessToken");
    const token = "Bearer " + accessToken;
    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
           authorization: token,
        },
      });
      if(response.status === 201){
        toast.success("Thêm nhân viên thành công!");
        navigate("/admin/v1/");
      }
    } catch (error) {
        setError(error.response.data.message);
    }
  };
  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/v1/login");
    }
  }, []);
  return (
    <div>
      <HeaderAdmin />
      <div className="add-employee">
        <SideBarAdmin />
        <div className="form-add">
          <h1>Thêm nhân viên</h1>
          <div>
            <form action="">
              <div>
                <label htmlFor="name">Họ tên nhân viên:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="username">Tên đăng nhập:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Mật khẩu:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="retypedPassword">Nhập lại mật khẩu:</label>
                <input
                  type="password"
                  id="retypedPassword"
                  name="retypedPassword"
                  value={retypedPassword}
                  onChange={(e) => setRetypedPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="role">Quyền:</label>
                <select name="" id="" onChange={(e) => setRole(e.target.value)}>
                  <option value="employee">Nhân viên</option>
                  <option value="admin">Quản lý</option>
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
                    <option value="waiter">Phục vụ</option>
                    <option value="chef">Đầu bếp</option>
                    <option value="cashier">Thu ngân</option>
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
                    <option value="manager">Quản lý doanh thu</option>
                    <option value="accountant">Quản lý nhân sự</option>
                  </select>
                </div>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit" onClick={handleSubmit}>
                Thêm nhân viên
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
