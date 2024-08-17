import HeaderAdmin from "./Header";
import SideBarAdmin from "./SideBarAdmin";
import '../../css/MyInformation.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const MyInformation = () => {
    const [avatar, setAvatar] = useState("");   
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [position, setPosition] = useState("");
    const [hireDate, setHireDate] = useState("");
    const apiUrl = `${process.env.REACT_APP_URL_API_ADMIN}/employees/infor`;
    const fetchMyInfor = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            if (!response.ok) {
                const message = await response.json();
                throw new Error(message);
            }
            const data = await response.json();
            setAvatar(data.avatar);
            setName(data.name);
            setRole(data.role);
            setPosition(data.position);
            const date = data.hire_date.split("T")[0];
            setHireDate(date);
        } catch (error) {
            console.error("Error fetching my information:", error);
        }
    }
    useEffect(() => {
        fetchMyInfor();
    }, []);
  return (
    <div>
        <HeaderAdmin />
        <div className="my-infor">
            <div className="my-infor-content">
                <h1>Thông tin cá nhân</h1>
                <form>
                    <div>
                        <img src={avatar} alt="avatar" />
                    </div>
                    <div>
                        <label htmlFor="name">Họ và tên:</label>
                        <input type="text" id="name" value={name} readOnly />
                    </div>
                    <div>
                        <label htmlFor="role">Quyền:</label>
                        <input type="text" id="role" value={role} readOnly />
                    </div>
                    <div>
                        <label htmlFor="position">Chức vụ:</label>
                        <input type="text" id="position" value={position} readOnly />
                    </div>
                    <div>
                        <label htmlFor="hireDate">Ngày vào làm:</label>
                        <input type="date" id="hireDate" value={hireDate} readOnly />
                    </div>
                    <div>
                        <button type="button" ><Link to="/admin/v1">Quay lại</Link></button>
                        <button type="button"><Link to="/admin/v1/change-password">Thay đổi mật khẩu</Link></button>
                        <button type="button">Cập nhật thông tin</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default MyInformation;