import HeaderAdmin from "./Header";
import SideBarAdmin from "./SideBarAdmin";
import "../../css/HomePage.css";
import { isTokenExpired,removeToken } from "../../configs/timeAccessToken";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
const AdminHomePage = () => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);
    useEffect(() => {
        // Kiểm tra ngay khi component được render
        if (isTokenExpired()) {
            navigate("/admin/v1/login");
        } else {
            setIsChecking(false); // Token hợp lệ, cho phép render trang
        }
        // Thiết lập kiểm tra định kỳ mỗi 1 giây (1000ms)
        const interval = setInterval(() => {
            if (isTokenExpired()) {
                navigate("/admin/v1/login");
                removeToken();
            }
        }, 1000);
        // Xóa bỏ interval khi component bị hủy
        return () => clearInterval(interval);
    }, [navigate]);
    if (isChecking) {
        return null;
    }
    return (
        <div>
            <HeaderAdmin />
            <div className="admin-homepage">
                <SideBarAdmin />
                <div className="admin-content">
                    <h1>Trang quản trị</h1>
                    <p>Chào mừng bạn đến với trang quản trị của nhà hàng</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;