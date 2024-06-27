import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditFruit() {
    const { id } = useParams();
    const [listOfDis, setListOfDis] = useState([]);
    const [inputData, setInputData] = useState({
        name: "",
        quantity: 0,
        price: 0,
        status: 0,
        image: "",
        description: "",
        id_distributor: ""
    });
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchDistributors = async () => {
            try {
                const response = await axios.get("http://localhost:3001/distributor");
                setListOfDis(response.data);
            } catch (error) {
                console.error('Error fetching distributors:', error);
            }
        };
        fetchDistributors();
    }, []);

    useEffect(() => {
        const fetchFruitById = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/fruit/${id}`);
                setInputData(response.data);
            } catch (error) {
                console.error('Error fetching fruit by id:', error);
            }
        };
        fetchFruitById();
    }, [id]);

    const handleInputChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        swal({
            title: "Xác nhận?",
            text: "Xác nhận cập nhật loại trái cây",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willUpdate) => {
            if (willUpdate) {
                try {
                    const formData = new FormData();
                    formData.append("name", inputData.name);
                    formData.append("quantity", inputData.quantity);
                    formData.append("price", inputData.price);
                    formData.append("status", inputData.status);
                    formData.append("description", inputData.description);
                    formData.append("id_distributor", inputData.id_distributor);
                    if (selectedImage) {
                        formData.append("image", selectedImage);
                    }

                    await axios.put(`http://localhost:3001/fruit/${id}`, formData);
                    swal("Cập nhật thành công!", {
                        icon: "success",
                    }).then(() => {
                        window.location.href = '/fruit';
                    });
                } catch (error) {
                    console.error('Error updating fruit:', error);
                    swal("Cập nhật thất bại!", {
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <div>
            <h2>Chỉnh sửa loại trái cây</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <label className="form-label">Name:</label><br />
                <input type='text' name='name' value={inputData.name} onChange={handleInputChange} className="form-input" /><br />

                <label className="form-label">Quantity:</label><br />
                <input type='number' name='quantity' value={inputData.quantity} onChange={handleInputChange} className="form-input" /><br />

                <label className="form-label">Price:</label><br />
                <input type='number' name='price' value={inputData.price} onChange={handleInputChange} className="form-input" /><br />

                <label className="form-label">Status:</label><br />
                <input type='number' name='status' value={inputData.status} onChange={handleInputChange} className="form-input" /><br />

                <label className="form-label">Image:</label><br />
                <input type='file' name='image' onChange={handleImageChange} className="file-input" /><br />

                <label className="form-label">Description:</label><br />
                <input type='text' name='description' value={inputData.description} onChange={handleInputChange} className="form-input" /><br />

                <label className="form-label">Distributor:</label><br />
                <select name='id_distributor' value={inputData.id_distributor} onChange={handleInputChange} className="form-input">
                    <option value="">Chọn nhà phân phối</option>
                    {listOfDis.map((dis) => (
                        <option key={dis._id} value={dis._id}>{dis.name}</option>
                    ))}
                </select><br />

                <button type="submit" className="submit-button">Cập nhật</button>
            </form>

        </div>
    );
}

export default EditFruit;
