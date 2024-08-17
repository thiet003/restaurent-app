import '../../css/ChangePassword.css';
import HeaderAdmin from './Header';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
const ChangePassword = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const apiUrl = `${process.env.REACT_APP_URL_API_ADMIN}/employees/change-password`;
    const fetchChangePassword = async () => {
        if(!oldPassword || !newPassword || !confirmPassword){
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }
        const data = {
            oldPassword,
            newPassword
        }
        const accessToken = localStorage.getItem('accessToken');
        const token = 'Bearer ' + accessToken;
        try {
            const response = await axios.patch(apiUrl, data, {
                headers: {
                    authorization: token
                }
            });
            if (response.status === 200) {
                toast.success('Đổi mật khẩu thành công');
                navigate('/admin/v1/infor');
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới không khớp');
            return;
        }
        fetchChangePassword();
    }
    return (
        <div>
            <HeaderAdmin />
            <div className='change-password'>
                <h1>Đổi mật khẩu</h1>
                <form>
                    <label>Nhập mật khẩu cũ</label>
                    <input type='password' onChange={(e) => setOldPassword(e.target.value)} required></input>
                    <label>Mật khẩu mới</label>
                    <input type='password' required onChange={(e) => setNewPassword(e.target.value)}></input>
                    <label>Nhập lại mật khẩu mới</label>
                    <input type='password' required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    <p>{error}</p>
                    <button type='submit' onClick={handleSubmit}>Thay đổi</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;