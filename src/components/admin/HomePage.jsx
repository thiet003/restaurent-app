import HeaderAdmin from "./Header";
import SideBarAdmin from "./SideBarAdmin";
import "../../css/HomePage.css";
const AdminHomePage = () => {
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