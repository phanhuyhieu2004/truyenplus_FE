import "./Create.css";
import React, {useEffect, useState} from "react";
import axios from "axios";

import {Link, useNavigate} from "react-router-dom";

import {Alert, Modal, Stack} from "@mui/material";
import ReactQuill from "react-quill";

import 'react-quill/dist/quill.snow.css';
import striptags from "striptags";

function Create() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filePreview, setFilePreview] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            setFile(null);
            setFilePreview("");
            return;
        }

        const validExtensions = ["jpg", "jpeg", "png", "gif"];
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
            alert("Không phải ảnh, vui lòng chọn lại.");
            setFile(null);
            setFilePreview("");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            setFile(reader.result);
            setFilePreview(reader.result);
        };
    };
    const formats = [
        'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'header', 'blockquote',
        'indent',
        'direction', 'align',
    ];

    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'size': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': '1' }, { 'header': '2' }, 'blockquote'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'align': [] }],
            ['clean']
        ]
    };

    const handleCategoryChange = (categoryId) => {
        if (!selectedCategories.includes(categoryId)) {
            setSelectedCategories([...selectedCategories, categoryId]);
        } else {
            const dataCategories = selectedCategories.filter(id => id !== categoryId)
            setSelectedCategories(dataCategories);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = () => {
            axios.get('https://poetic-heart-production.up.railway.app/api/categories')
                .then(response => {
                    setCategories(response.data);
                })
                .catch(error => {
                    console.error('Lỗi rồi:', error);
                });
        };

        fetchCategories();
    }, []);

    const handleChangeDescription = (value) => {
        setDescription(value);
    };

    const convertToUppercase = (title) => {
        return title.replace(/(?:^|\s)\S/g, char => char.toUpperCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const plainTextContent = striptags(title);
        const plainTextContents = striptags(description);
        if (plainTextContent.length < 5 || plainTextContent.length > 50) {
            alert("Tiêu đề phải tối thiểu từ 5 đến tối đa là  50 ký tự");
            return;
        }

        if (plainTextContents.length < 30 || plainTextContents.length > 4000) {
            alert("Mô tả phải tối thiểu  từ 30 đến tối đa là 4000 ký tự");
            return;
        }

        if (selectedCategories.length === 0) {
            alert("Vui lòng chọn 1 danh mục");
            return;
        }
        if (!file) {
            alert("Vui lòng chọn một ảnh");
            return;
        }


        const titleData = convertToUppercase(title);

        const data = {
            title: titleData,
            image: file,
            description: description,
            author: author,
            status: "New",
            categories: selectedCategories
        };

        axios.post("https://poetic-heart-production.up.railway.app/api/stories", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                setOpen(true);
                console.log(response.data);
                setTimeout(() => {
                    navigate("/list");
                }, 1000);
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    alert("Không được trùng tên truyện,hãy nhập lại tên khác !");
                } else {
                    console.error("Lỗi:", error);
                }
            });
    };
    return (
        <>
            <main>
                <meta name="robots" content="noindex, nofollow" />
                <section className="archive__page page-single">
                    <div className="container">
                        <main className="archive__content" role="main">
                            <div className="form">
                                <div className="wrapper">
                                    <div className="form-bar">
                                        <div className="clearfix">
                                            <img
                                                src="https://static-00.iconduck.com/assets.00/cs-cat-admin-icon-512x512-3l4exe6y.png"
                                                className="avatar" alt="không thể xem anh"                                            />
                                            <div className="info-text">
                                                <div className="fullname">
                                                    <span>ADMIN</span>
                                                </div>

                                            </div>
                                        </div>
                                        <ul className="action">
                                            <li>
                                                {" "}
                                                <Link to="/home">
                                                    <i className="fa fa-book-open-reader"></i> Truyện plus
                                                </Link>{" "}
                                            </li>
                                            <li>
                                                {" "}
                                                <Link to="/list">
                                                    <i className="fa fa-bars"/> Danh sách truyện
                                                </Link>{" "}
                                            </li>
                                            <li>
                                                {" "}
                                                <Link to="/create">
                                                    <i className="fa fa-plus"></i> Thêm truyện

                                                </Link>{" "}
                                            </li>


                                        </ul>
                                    </div>
                                    <div className="form-content">
                                        <div className="form-title">
                                            <h1>Thêm truyện</h1>
                                        </div>
                                        <div className="">
                                            <form onSubmit={handleSubmit}


                                            >

                                                <div className="form-profile">
                                                    <div className="edit-row">
                                                        <div className="col-1">Chọn ảnh <span>(*)</span></div>
                                                        <div className="col-2 row-avatar">


                                                            <div className="image-upload">
                                                                <input
                                                                    type="file"
                                                                    id="file-input"
                                                                    accept=".jpg, .jpeg, .png, .gif"
                                                                    onChange={handleFileChange}
                                                                    style={{display: 'none'}}
                                                                />
                                                                <label htmlFor="file-input">
                                                                    <div className="image-preview">
                                                                        {filePreview ? (
                                                                            <img src={filePreview} alt="Ảnh đã chọn"
                                                                                 width="200"
                                                                                 height="200"/>
                                                                        ) : (
                                                                            <div className="image-icon">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                    stroke="currentColor"
                                                                                    width="50"
                                                                                    height="50"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth={2}
                                                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                                                    />
                                                                                </svg>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </label>

                                                            </div>

                                                        </div>
                                                        <div className="col-3"/>
                                                    </div>
                                                    <div className="edit-row edit-row-email">
                                                        <div className="col-1 col-md-4">Tiêu đề <span>(*)</span></div>

                                                        <div className="col-2">
                                                            <input
                                                                className="input form-control"
                                                                type="text"
                                                                placeholder="Nhập tiêu đề"
                                                                value={title}
                                                                onChange={(e) => setTitle(e.target.value)}
                                                                required
                                                            />
                                                            <p class="register-notify"
                                                               style={{marginBottom: '0!important'}}>Lưu ý: Tiêu đề phải
                                                                tối thiểu từ 5 đến tối đa là 50 ký tự .</p></div>
                                                        <div className="col-3"/>
                                                    </div>
                                                    <div className="edit-row">
                                                        <div className="col-1">Tác giả <span>(*)</span></div>
                                                        <div className="col-2">
                                                            <input
                                                                className="input form-control"
                                                                type="text"
                                                                placeholder="Nhập tên tác giả"
                                                                value={author}
                                                                onChange={(e) => setAuthor(e.target.value)}
                                                                required
                                                            />

                                                        </div>
                                                        <div className="col-3"/>
                                                    </div>


                                                    <div className="edit-row">
                                                        <div className="col-1">Mô tả <span>(*)</span></div>
                                                        <div className="col-2">
                                                            <ReactQuill value={description}
                                                                        onChange={handleChangeDescription}

                                                                        modules={modules} formats={formats}/>


                                                        </div>

                                                        <div className="col-3"/>
                                                    </div>


                                                    <div className="edit-row">
                                                        <div className="col-1">Danh mục <span>(*)</span></div>
                                                        <div className="col-2" style={{width: 'calc(100% - 30px)'}}>
                                                            <div className="form-category">

                                                                <div className="category-container">
                                                                    <div className="category-grid">
                                                                        {categories.map((category, index) => (
                                                                            <div key={category.categoryId}
                                                                                 className="category-item">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={category.categoryId}
                                                                                    value={category.categoryId}
                                                                                    defaultChecked={selectedCategories.includes(category.categoryId)}
                                                                                    onChange={() => handleCategoryChange(category.categoryId)}
                                                                                />
                                                                                <label
                                                                                    htmlFor={category.categoryId}>{category.categoryName}</label>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-3"/>
                                                    </div>

                                                    <div className="edit-row">
                                                        <div className="col-1"/>
                                                        <div className="col-2">
                                                            <div className="action">
                                                                <button className="btn-form">
                                                                    Thêm truyện
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="col-3"/>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Modal open={open} onClose={handleClose}>
                                <Stack sx={{width: '100%'}} spacing={2}>
                                    <Alert variant="filled" severity="success">Thêm truyện thành công rồi</Alert>
                                </Stack>
                            </Modal>

                        </main>
                    </div>
                </section>
            </main>
        </>
    );
}
export default Create;
