
import {Link, useParams} from "react-router-dom";
import {Alert, Modal, Pagination, Stack, Tooltip} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
function ListChap() {
    const {storyId} = useParams();
    const [chapters, setChapters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [chaptersPerPage] = useState(10);
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const fetchChapters = useCallback(async () => {
        try {
            const response = await axios.get(`https://poetic-heart-production.up.railway.app/api/chapters/story/${storyId}`);
            const sortedChapters = response.data.sort((a, b) => a.chapterId - b.chapterId);
            setChapters(sortedChapters);
        } catch (error) {
            console.error('Lỗi rồi:', error);
        }
    }, [storyId]); // Đảm bảo chỉ tạo lại khi storyId thay đổi

    useEffect(() => {
        fetchChapters();
    }, [fetchChapters]);

    const deleteChapters = (chapterId) => {
        if (window.confirm('Bạn có chắc muốn xoá chương không?')) {
            axios.delete(`https://poetic-heart-production.up.railway.app/api/chapters/${chapterId}`)
                .then(() => {
                    setOpen(true)
                    fetchChapters();
                })
                .catch(error => {
                    console.error('Lỗi khi xoá chương:', error);
                    alert('Xin lỗi, có lỗi xảy ra.');
                });
        }
    };


    const indexOfLastChap = currentPage * chaptersPerPage;
    const indexOfFirstChap = indexOfLastChap - chaptersPerPage;
    const currentChaps = chapters.slice(indexOfFirstChap, indexOfLastChap);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    return(
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
                                                className="avatar" alt="lỗi"
                                            />
                                            <div className="info-text">
                                                <div className="fullname">
                                                    <a href="/form">ADMIN</a>
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
                                            <h1>Danh sách chương </h1>
                                        </div>

                                        <Link to={`/create/${storyId}`}><button className="btn-add">
                                            Thêm chương
                                        </button></Link>
                                        {currentChaps.length >0 ?(
                                        <div className="table-responsive">
                                            <table className="responsive-table">
                                                <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Số chương</th>
                                                    <th>Tên chương</th>
                                                    <th>Tên truyện</th>

                                                    <th>Hành động</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                {currentChaps.map((chap, index) => (
                                                    <tr key={chap.chapterId}>
                                                        <td>{index + 1}</td>
                                                        <td>{chap.chapterNumber}</td>
                                                        <td>{chap.title}</td>
                                                        <td>{chap.story.title}</td>
                                                        <td>
                                                            <Tooltip title="Sửa chương">
                                                                <Link
                                                                    to={`/editChapter/${chap.story.storyId}/${chap.chapterId}`}>
                                                                    <i className="fa fa-pen-to-square" />
                                                                </Link>
                                                            </Tooltip>
                                                            <span onClick={() => deleteChapters(chap.chapterId)} style={{
                                                                background: 'none',
                                                                border: 'none',

                                                                cursor: 'pointer',
                                                                color: 'inherit'
                                                            }}>
                                                                <Tooltip title="Xoá chương">
                                                                    <i className="fa fa-x" style={{color: '#215BA6',marginLeft: '5px'}}/>
                                                                </Tooltip>
                                                            </span>
                                                            <Tooltip title="Xem chương">
                                                                <Link to={`/chapter/${chap.story.storyId}/${chap.chapterId}`}>
                                                                    <i className="fa fa-eye" style={{marginLeft: '5px'}}/>
                                                                </Link>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                ))}

                                                </tbody>
                                            </table>
                                        </div>
                                        ): (<p>Không có chương nào</p>)
                                        }

                                            <div className="pagination">
                                                <Pagination
                                                    count={Math.ceil(chapters.length / chaptersPerPage)}
                                                    page={currentPage}
                                                    onChange={handlePageChange}
                                                />
                                            </div>



                                    </div>


                                </div>
                            </div>
                            <Modal open={open} onClose={handleClose}>
                                <Stack sx={{width: '100%'}} spacing={2}>
                                    <Alert variant="filled" severity="success">Xoá truyện thành công rồi</Alert>
                                </Stack>
                            </Modal>
                        </main>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ListChap;