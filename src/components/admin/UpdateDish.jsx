import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Dùng để lấy id từ URL
import '../../css/UpdateDish.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateDish = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id món ăn từ URL
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [images, setImages] = useState([]);
  const [selectedOption, setSelectedOption] = useState(''); // Option selected: 'thumbnail' or 'full'
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [files, setFiles] = useState([]); // Files to upload
  const [uploadedImages, setUploadedImages] = useState([]); // Images uploaded
  const [imagePreviews, setImagePreviews] = useState([]); // Image previews
  const apiUrl = `${process.env.REACT_APP_URL_API_ADMIN}/dishes/${id}`;

  useEffect(() => {
    // Lấy dữ liệu món ăn hiện tại từ API
    const fetchDish = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const dish = await response.json();
        setName(dish.name);
        setDescription(dish.description);
        setPrice(dish.price);
        setCategory(dish.category);
        setThumbnail(dish.thumbnail);
        setImages(dish.images);
        setThumbnailImage(dish.thumbnail);
      } catch (error) {
        console.error('Error fetching dish:', error);
      }
    };
    fetchDish();
  }, [apiUrl]);
  // Hàm xử lý khi chọn ảnh từ máy tính để thay toàn bộ ảnh mới
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedImages(files)
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(filePreviews);
  };

  // Hàm xử lý khi chọn ảnh đại diện mới
  const handleSetThumbnail = (index) => {
    setThumbnailImage(images[index].image_url);
    console.log(thumbnailImage);
    
    setImages(images.map((image, i) => ({
      ...image,
      isThumbnail: i === index,
    })));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Tạo đối tượng FormData để gửi dữ liệu
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    if(selectedOption === 'thumbnail') {
      console.log('Thumbnail:', thumbnailImage);
      formData.append('thumbnail', thumbnailImage);
    } else if(selectedOption === 'full') {
      uploadedImages.forEach((file) => {
        formData.append('thumbnails', file);
      });
    }
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) {
        console.log(response.statusText);
        
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Dish updated:', result);
      toast.success('Món ăn đã được cập nhật');
      navigate('/admin/v1/list-dishes');
    } catch (error) {
      console.error('Error updating dish:', error);
      toast.error('Có lỗi xảy ra khi cập nhật món ăn');
  };
}
  return (
    <div className="edit-dish-container">
      <h1>Sửa thực đơn</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Tên món ăn:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Mô tả:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Giá:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
          />
        </label>
        <label>
          Loại món ăn:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        
        <div className="option-buttons">
        <button id='nothing-btn' type="button" onClick={() => {
            setSelectedOption('not');
            setThumbnailImage('');
            setUploadedImages([]);
            document.getElementById('nothing-btn').style.backgroundColor = 'green';
            document.getElementById('choose-thumbnail').style.backgroundColor = '#007bff';
            document.getElementById('choose-multi').style.backgroundColor = '#007bff';
          }}>
            Không sửa ảnh
          </button>
          <button id='choose-thumbnail' type="button" onClick={() => {
            setSelectedOption('thumbnail');
            setUploadedImages([]);
            document.getElementById('nothing-btn').style.backgroundColor = '#007bff';
            document.getElementById('choose-thumbnail').style.backgroundColor = 'green';
            document.getElementById('choose-multi').style.backgroundColor = '#007bff';
          }}>
            Thay đổi ảnh đại diện
          </button>
          <button id='choose-multi' type="button" onClick={() => {
            setSelectedOption('full');
            setThumbnailImage('');
            document.getElementById('nothing-btn').style.backgroundColor = '#007bff';
            document.getElementById('choose-thumbnail').style.backgroundColor = '#007bff';
            document.getElementById('choose-multi').style.backgroundColor = 'green';
          }}>
            Thay thế toàn bộ ảnh
          </button>
        </div>
        
        {selectedOption === 'thumbnail' && (
  <div className="thumbnail-section">
    <p>Chọn ảnh đại diện để thay đổi:</p>
    <div className="thumbnail-images">
      {images.map((image, index) => (
        <div
          key={index}
          className={`image-item ${image.isThumbnail ? 'selected' : ''}`}
          onClick={() => handleSetThumbnail(index)}
        >
          <img src={image.image_url} alt={`Thumbnail ${index}`} />
        </div>
      ))}
    </div>
  </div>
)}

{selectedOption === 'full' && (
        <div className="upload-section">
          <label className="choose-img">
            <p>Ảnh:</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </label>
          <div className="uploaded-images">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Uploaded ${index}`}
                className="uploaded-image"
              />
            ))}
          </div>
        </div>
      )}

        <button type="submit">Sửa món ăn</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateDish;
