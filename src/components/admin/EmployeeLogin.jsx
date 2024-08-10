import { useState } from "react";
import {useNavigate } from "react-router-dom";
import '../../css/EmployeeLogin.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EmployeeLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const apiUrl = `${process.env.REACT_APP_URL_API_ADMIN}/employees/login`;
    // Xử lý khi người dùng ấn nút Đăng nhập
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            console.log(2);
            toast.error("Vui lòng nhập tên đăng nhập và mật khẩu!");
            return;
        }
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                const messageError = await response.json();
                const message = messageError.message;
                throw new Error(message);
                
            }
            const data = await response.json();
            console.log(data);
            // Lưu access token vào localStorage
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("name", data.name);
            localStorage.setItem("role", data.role);
            toast.success("Đăng nhập thành công!");
            // Chuyển hướng sang trang quản trị
            navigate("/admin/v1/list-dishes");
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error(error.message);
        }
    };

    return (
        <div className="login-container">
    <h1 className="login-title">Đăng nhập quản trị</h1>
    <form className="login-form">
        <div className="form-group">
            <label htmlFor="username" className="form-label">Tên đăng nhập:</label>
            <input
                type="text"
                id="username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="password" className="form-label">Mật khẩu:</label>
            <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button onClick={handleSubmit} type="submit" className="login-button">Đăng nhập</button>
    </form>
    <ToastContainer />
</div>
    )
}

export default EmployeeLogin;