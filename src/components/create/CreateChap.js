import "./Create.css";
import React, {useState} from "react";
import axios from "axios";

import {Link, useNavigate, useParams} from "react-router-dom";
import {Alert, Modal, Stack} from "@mui/material";
import ReactQuill from "react-quill";

import 'react-quill/dist/quill.snow.css';
import striptags from "striptags";

function CreateChap() {
    const {storyId} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [chapterNumber, setChapterNumber] = useState("");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const formats = [
        'font', 'size',
        'bold', 'italic', 'underline', 'strike',


        'header', 'blockquote',
        'indent',
        'direction', 'align',

    ];
    const convertToUppercase = (title) => {
        return title.replace(/(?:^|\s)\S/g, char => char.toUpperCase());
    };

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
    const handleChangeContent = (value) => {
        setContent(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();



        const plainTextContent = striptags(content);
        const plainTextContents = striptags(title);

        if (plainTextContent.length < 30|| plainTextContent.length > 7000) {
            alert("Nội dung phải tối thiểu từ 30 đến tối đa là  7000 ký tự");
            return;
        }
        if (plainTextContents.length < 5 ||plainTextContents.length >50) {
            alert("Tiêu đề phải tối thiểu từ 5 đến tối đa là  50 ký tự");
            return;
        }
        const titleData = convertToUppercase(title);

        const chapterData = {
            title: titleData,
            content: content,
            chapterNumber: chapterNumber
        };

        axios.post(`https://poetic-heart-production.up.railway.app/api/chapters/${storyId}`, chapterData)
            .then(response => {
                setOpen(true);
                console.log(response.data);
                setTimeout(() => {
                    navigate(`/chapters/${storyId}`);
                }, 1000);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert('Lỗi không xác định.');
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
                                                className="avatar" alt="ảnh lỗi"                                            />
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
                                            <h1>Thêm chương</h1>
                                        </div>

                                        <Link to={`/chapters/${storyId}`}><button className="btn-add">
                                            Quay về danh sách chương
                                        </button></Link>
                                        <div className="">
                                            <form onSubmit={handleSubmit}


                                            >


                                                <div className="form-profile">
                                                    <div className="edit-row">
                                                        <div className="col-1">Số chương <span>(*)</span></div>
                                                        <div className="col-2" style={{width: 'calc(100% - 30px)'}}>
                                                            <input
                                                                className="input form-control"
                                                                type="number"
                                                                placeholder="Nhập số chương"
                                                                value={chapterNumber}
                                                                onChange={(e) => setChapterNumber(e.target.value)}
                                                                required

                                                            />
                                                            <p class="register-notify"
                                                               style={{marginBottom: '0!important'}}>Lưu ý: Số chương phải nhập số,không được trùng lặp số chương trong cùng 1 truyện.</p>

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
                                                               style={{marginBottom: '0!important'}}>Lưu ý: Tiêu đề phải tối thiểu từ 5 đến tối đa là  50 ký tự.</p>                                                        </div>
                                                        <div className="col-3"/>
                                                    </div>


                                                    <div className="edit-row">
                                                        <div className="col-1">Nội dung <span>(*)</span></div>
                                                        <div className="col-2" style={{width: 'calc(100% - 30px)'}}>
                                                            <ReactQuill
                                                                value={content}
                                                                onChange={handleChangeContent}
                                                                modules={modules}
                                                                formats={formats}

                                                            />
                                                            <p className="register-notify"
                                                               style={{marginBottom: '0!important'}}>Lưu ý: Nội dung phải tối thiểu từ 30 đến tối đa là  7000 ký tự.</p>
                                                        </div>
                                                        <div className="col-3"/>
                                                    </div>


                                                    <div className="edit-row">
                                                        <div className="col-1"/>
                                                        <div className="col-2">
                                                            <div className="action">
                                                                <button className="btn-form">
                                                                    Thêm chương
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
                                    <Alert variant="filled" severity="success">Thêm chương thành công rồi</Alert>
                                </Stack>
                            </Modal>

                        </main>
                    </div>
                </section>
            </main>
        </>
    );
}

export default CreateChap;
