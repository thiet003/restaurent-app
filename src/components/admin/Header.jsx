import { useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import '../../css/HeaderAdmin.css';
const HeaderAdmin = () => {
    const navigate = useNavigate();
    const nameInLocalStorage = localStorage.getItem("name");
    const [name, setName] = useState(nameInLocalStorage);
    useEffect(() => {
        if (localStorage.getItem("name")) {
            setName(localStorage.getItem("name"));
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        setName("");
        navigate("/admin/v1/login");
    };
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