import { useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import '../../css/HeaderAdmin.css';
import { isTokenExpired, removeToken } from "../../configs/timeAccessToken";
const HeaderAdmin = () => {
    const navigate = useNavigate();
    const nameInLocalStorage = localStorage.getItem("name");
    const [name, setName] = useState(nameInLocalStorage);
    const [isChecking, setIsChecking] = useState(true);
    useEffect(() => {
        if (localStorage.getItem("name")) {
            setName(localStorage.getItem("name"));
        }
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
    const handleLogout = () => {
        removeToken();
        setName("");
        navigate("/admin/v1/login");
    };
    if (isChecking) {
        return null;
    }
    return (
        <div>
            <header>
                <div className="logo">
                    <h1><Link to="/admin/v1">Admin Page</Link></h1>
                </div>
                <nav>
                    {name &&
                        <div className="user-info">
                            <span>Xin chào, {name}</span>
                            <Link to="/admin/v1/infor">Trang cá nhân</Link>
                            <button onClick={handleLogout}>Đăng xuất</button>
                        </div>
                    }
                    {!name && 
                        <Link to="/admin/v1/login">Đăng nhập</Link>
                    }
                </nav>
            </header>
        </div>
    );
};

export default HeaderAdmin;