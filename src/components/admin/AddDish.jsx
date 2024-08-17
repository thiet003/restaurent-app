import React, { useState } from 'react';
import '../../css/CreateDish.css';
import HeaderAdmin from './Header';
import SideBarAdmin from './SideBarAdmin';
const CreateDish = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Món chính');
  const [thumbnails, setThumbnails] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const apiUrl = `${process.env.REACT_APP_URL_API_ADMIN}/dishes`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(apiUrl);

    // Tạo đối tượng FormData để gửi dữ liệu
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);

    // Thêm nhiều ảnh vào FormData
    thumbnails.forEach((file) => {
      formData.append('thumbnails', file);
    });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Dish created:', result);

      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setThumbnails([]);
      setImagePreviews([]);
    } catch (error) {
      console.error('Error creating dish:', error);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setThumbnails(files);

    // Hiển thị ảnh đã chọn
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(filePreviews);
  };

  return (
    <div>
      <HeaderAdmin/>
      <div className='add-dish'>
        <SideBarAdmin/>
        <div className="create-dish-container">
      <h1>Thêm mới thực đơn</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Tên món ăn:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
        <p>Mô tả:</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
        <p>Giá:</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
          />
        </label>
        <label>
        <p>Loại:</p>
          <select name="select-type" id="select-type" onChange={(e) => setCategory(e.target.value)}>
            <option value="Món chính">Món chính</option>
            <option value="Tráng miệng">Tráng miệng</option>
            <option value="Đồ uống">Đồ uống</option>
          </select>
        </label>
        <label className='choose-img'>
          <p>Ảnh:</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            required
            placeholder='Chọn ảnh'
          />
        </label>
        <div className="image-previews">
          {imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`preview-${index}`}
              style={{ width: '100px', height: '100px', margin: '5px' }}
            />
          ))}
        </div>
        <button type="submit">Thêm món ăn</button>
      </form>
    </div>
      </div>
    </div>
    
  );
};

export default CreateDish;
