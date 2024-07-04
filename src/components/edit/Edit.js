import React, {useEffect, useState} from "react";
import axios from "axios";

import {Link, useNavigate, useParams} from "react-router-dom";

import {Alert, Modal, Stack} from "@mui/material";
import ReactQuill from "react-quill";

import 'react-quill/dist/quill.snow.css';
import striptags from "striptags";


function Edit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [hasChapter, setHasChapter] = useState(false);
    const [status, setStatus] = useState("New");
    const [file, setFile] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    useEffect(() => {
        const checkChapter = () => {
            axios.get(`https://poetic-heart-production.up.railway.app/api/stories/chap/${id}`)
                .then(response => {
                    const hasChapters = response.data > 0;
                    setHasChapter(hasChapters);
                })
                .catch(error => {
                    console.error("Looi rùi hi hi:", error);
                });
        };

        checkChapter();
    }, [id]);

    useEffect(() => {
        const fetchStories = () => {
            axios.get(`https://poetic-heart-production.up.railway.app/api/stories/${id}`)
                .then(response => {
                    const {title, author, description, categories, image, status} = response.data;
                    setTitle(title);
                    setAuthor(author);
                    setDescription(description);
                    setStatus(status);
                    setFileUrl(`${image}`);
                    setFile(image);
                    const categoryIds = categories.map(category => category.categoryId);

                    setSelectedCategories(categoryIds);
                })
                .catch(error => {
                    console.error('Lỗi truyện:', error);
                });

            axios.get('https://poetic-heart-production.up.railway.app/api/categories')
                .then(response => {
                    setCategories(response.data);
                    console.log(typeof response.data[0].categoryId)
                })
                .catch(error => {
                    console.error('Lỗi danh mục:', error);
                });
        };

        fetchStories();
    }, [id]);

    const formats = [
        'font', 'size',
        'bold', 'italic', 'underline', 'strike',


        'header', 'blockquote',
        'indent',
        'direction', 'align',

    ];

    const modules = {
        toolbar: [
            [{'font': []}, {'size': []}],
            ['bold', 'italic', 'underline', 'strike'],


            [{'header': '1'}, {'header': '2'}, 'blockquote'],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'direction': 'rtl'}],
            [{'align': []}],

            ['clean']
        ]
    };
    const handleChangeDescription = (value) => {
        setDescription(value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            setFile(null);
            setFileUrl("");
            return;
        }

        const validExtensions = ["jpg", "jpeg", "png", "gif"];
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
            alert("Không phải ảnh, vui lòng chọn lại.");
            setFile(null);
            setFileUrl("");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            setFile(reader.result);
            setFileUrl(reader.result);
        };
    };

    const handleCategoryChange = (categoryId) => {

        console.log(categoryId);
        console.log(selectedCategories);
        if (!selectedCategories.includes(categoryId)) {
            setSelectedCategories([...selectedCategories, categoryId]);
        } else {
            const dataCategories = selectedCategories.filter(id => id !== categoryId)
            setSelectedCategories(dataCategories);
        }

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
            alert("Vui lòng chọn 1 danh mục ");
            return
        }
        const titleData = convertToUppercase(title);
        console.log("Tiêu đề ",titleData);
        const formData = new FormData();
        formData.append('title', titleData);
        formData.append('description', description);
        formData.append('author', author);
        formData.append('status', status);
        formData.append('categories', selectedCategories);


        if (file) {
            formData.append('image', file)

        }
        console.log(file);
        axios.put(`https://poetic-heart-production.up.railway.app/api/stories/${id}`, formData, {
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
                    alert("Không được trùng tên truyện,hãy nhập lại tên khác !")
                } else {
                    console.error("Lỗi:", error);
                }
            });
    };


    return (
        <>
            <main>
                <meta name="robots" content="noindex, nofollow"/>
                <section className="archive__page page-single">
                    <div className="container">
                        <main className="archive__content" role="main">
                            <div className="form">
                                <div className="wrapper">
                                    <div className="form-bar">
                                        <div className="clearfix">
                                            <img
                                                src="https://static-00.iconduck.com/assets.00/cs-cat-admin-icon-512x512-3l4exe6y.png"
                                                className="avatar" alt="ảnh "                                            />
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
                                            <h1>Cập nhật truyện</h1>
                                        </div>
                                        <div className="">
                                            <form onSubmit={handleSubmit}


                                            >

                                                <div className="form-profile">
                                                    <div className="edit-row">
                                                        <div className="col-1">Chọn ảnh (*)</div>
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
                                                                        {fileUrl ? (
                                                                            <img src={fileUrl} alt="Ảnh đã chọn"
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
                                                        <div className="col-1 col-md-4">Tiêu đề (*)</div>

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
                                                    <div className="col-1">Tác giả (*)</div>
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
                                                        <div className="col-1">Mô tả (*)</div>
                                                        <div className="col-2" style={{width: 'calc(100% - 30px)'}}>
                                                            <ReactQuill value={description}
                                                                        onChange={handleChangeDescription}
                                                                        modules={modules} formats={formats}/>
                                                            <p className="register-notify"
                                                               style={{marginBottom: '0!important'}}>Lưu ý :Mô tả phải
                                                                tối thiểu từ 30 đến tối đa là 4000 ký tự .</p>


                                                        </div>
                                                        <div className="col-3"/>
                                                    </div>
                                                    <div className="edit-row">
                                                        <div className="col-1">Danh mục (*)</div>
                                                        <div className="col-2" style={{width: 'calc(100% - 30px)'}}>
                                                            <div className="form-category">

                                                                <div className="category-container">
                                                                    <div className="category-grid">
                                                                        {categories.map(category => (
                                                                            <div key={category.categoryId} className="category-item">

                                                                                <input type="checkbox" id={category.categoryId}

                                                                                       checked={selectedCategories.includes(category.categoryId)}
                                                                                       onChange={() => {
                                                                                           handleCategoryChange(category.categoryId)
                                                                                       }}/>
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
                                                    {hasChapter && (
                                                    <div className="edit-row">

                                                        <div className="col-1">Trạng thái </div>
                                                        <div className="col-2" style={{width: 'calc(100% - 30px)'}}>
                                                            <div className="form-status">

                                                                    <div className="form-checkbox" >


                                                                        <input type="radio" id="update" name="status"
                                                                               value="Update"
                                                                               checked={status === "Update"}
                                                                               onChange={(e) => setStatus(e.target.value)}/>
                                                                        <label htmlFor="update">Update</label>
                                                                        <input type="radio" id="full" name="status"
                                                                               value="Full"
                                                                               checked={status === "Full"}
                                                                               onChange={(e) => setStatus(e.target.value)}/>
                                                                        <label htmlFor="full">Full</label>
                                                                    </div>

                                                            </div>
                                                        </div>
                                                        <div className="col-3"/>

                                                    </div>
                                                )}

                                                    <div className="edit-row">
                                                        <div className="col-1"/>
                                                        <div className="col-2">
                                                            <div className="action">
                                                                <button className="btn-form">
                                                                    Sửa truyện
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
                                    <Alert variant="filled" severity="success">Sửa truyện thành công rồi</Alert>
                                </Stack>
                            </Modal>

                        </main>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Edit;
