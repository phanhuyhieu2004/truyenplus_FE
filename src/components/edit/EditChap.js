import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactQuill from "react-quill";

import 'react-quill/dist/quill.snow.css';
import {Alert, Modal, Stack} from "@mui/material";
import striptags from "striptags";

function EditChap() {
    const {storyId, chapterId} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [chapterNumber, setChapterNumber] = useState("");
    const navigate = useNavigate();
    const formats = [
        'font', 'size',
        'bold', 'italic', 'underline', 'strike',


        'header', 'blockquote',
        'indent',
        'direction', 'align',

    ];
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
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
    useEffect(() => {

        axios.get(`https://poetic-heart-production.up.railway.app/api/chapters/${chapterId}`)
            .then(response => {
                const chapterData = response.data;
                setTitle(chapterData.title);
                setContent(chapterData.content);
                setChapterNumber(chapterData.chapterNumber);
            })
            .catch(error => {
                console.error("Lỗi rùi hu hu:", error);
            });
    }, [chapterId]);
    const convertToUppercase = (title) => {
        return title.replace(/(?:^|\s)\S/g, char => char.toUpperCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        // Loại bỏ các thẻ HTML chỉ để kiểm tra độ dài nội dung
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

        const updatedChapterData = {
            title: titleData,
            content: content

        };

        axios.put(`https://poetic-heart-production.up.railway.app/api/chapters/${chapterId}`, updatedChapterData)
            .then(response => {
                setOpen(true);
                console.log(response.data);
                setTimeout(() => {
                    navigate(`/chapters/${storyId}`);
                }, 1000);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message); // Hiển thị thông báo lỗi từ server
                } else {
                    alert('Lỗi không xác định.'); // Xử lý lỗi mặc định nếu không có thông tin chi tiết từ server
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
                                                className="avatar" alt="không có ảnh"
                                            />
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
                                            <h1>Cập nhật chương</h1>
                                        </div>

                                        <Link to={`/chapters/${storyId}`}><button className="btn-add">
                                            Quay về danh sách chương
                                        </button></Link>
                                        <div className="">
                                            <form onSubmit={handleSubmit}


                                            >


                                                <div className="form-profile">
                                                    <div className="edit-row">
                                                        <div className="col-1">Số chương</div>
                                                        <div className="col-2" >
                                                            <input
                                                                className="input form-control"
                                                                type="text"

                                                                value={chapterNumber}
                                                                readOnly={true}
                                                            />
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
                                                               style={{marginBottom: '0!important'}}>Lưu ý: Tiêu đề phải tối thiểu từ 5 đến tối đa là  50 ký tự.</p>                                                     </div>
                                                        <div className="col-3"/>
                                                    </div>


                                                    <div className="edit-row">
                                                        <div className="col-1">Nội dung (*)</div>
                                                        <div className="col-2" style={{width: 'calc(100% - 30px)'}}>
                                                            <ReactQuill
                                                                value={content}
                                                                onChange={handleChangeContent}
                                                                modules={modules}
                                                                formats={formats}

                                                            />
                                                            <p style={{marginBottom: '0!important'}}>Lưu ý: Nội dung phải tối thiểu từ 30 đến tối đa là  7000 ký tự.</p>

                                                    </div>
                                                        <div className="col-3"/>
                                                    </div>


                                                    <div className="edit-row">
                                                        <div className="col-1"/>
                                                        <div className="col-2">
                                                            <div className="action">
                                                                <button className="btn-form">
                                                                    Sửa chương
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
                                    <Alert variant="filled" severity="success">Sửa chương thành công rồi</Alert>
                                </Stack>
                            </Modal>

                        </main>
                    </div>
                </section>
            </main>
        </>
    );
}

export default EditChap;