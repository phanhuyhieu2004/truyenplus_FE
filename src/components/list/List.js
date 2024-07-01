
import {Link} from "react-router-dom";
import {Alert, CircularProgress, Modal, Pagination, Stack, Tooltip} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
function List() {
    const [stories, setStories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [storiesPerPage] = useState(10);
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = () => {
        axios.get("https://poetic-heart-production.up.railway.app/api/stories/full")
            .then(response => {
                setStories(response.data);
            })
            .catch(error => {
                console.error("Lấy ra danh sách truyện:", error);
            });
    };

    const deleteStory = (storyId) => {
        if (window.confirm("Bạn có muốn xoá truyện không?")) {
            axios.delete(`https://poetic-heart-production.up.railway.app/api/stories/${storyId}`)
                .then(() => {
                    setOpen(true);
                    fetchStories();
                })
                .catch(error => {
                    console.error("Lỗi xoá truyện k đc", error);
                    alert("Lỗi rùi hi hi.");
                });
        }
    };
    if(!stories){
        return (
            <>
                <main>
                    <div className='loading-container' style={{margin: '150px 100px',textAlign:'center'}}>
                        <CircularProgress color="error" size={100} />
                    </div>

                </main>
            </>
        )
    }

    const indexOfLastStory = currentPage * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

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
                                                className="avatar" alt="admin"
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
                                            <h1>Danh sách truyện</h1>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="responsive-table">
                                                <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tên truyện</th>
                                                    <th>Tác giả</th>
                                                    <th>Danh mục</th>
                                                    <th>Trạng thái</th>
                                                    <th>Tổng số chương</th>
                                                    <th>Hành động</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                    {currentStories.map((story, index) => (
                                                        <tr key={story.storyId}>
                                                            <td>{index + 1}</td>
                                                            <td>{story.title}</td>
                                                            <td>{story.author}</td>
                                                            <td>
                                                                {story.categories.map(category => category.categoryName).join(", ")}
                                                            </td>
                                                            <td>{story.status}</td>
                                                            <td>{story.totalChapters}</td>
                                                    <td>
                                                        <Tooltip title="Sửa truyện">
                                                            <Link to={`/edit/${story.storyId}`}>
                                                                <i className="fa-solid fa-pen-to-square"/>
                                                            </Link>
                                                        </Tooltip>
                                                        <span
                                                            onClick={() => deleteStory(story.storyId)}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',

                                                                cursor: 'pointer',
                                                                color: 'inherit'
                                                            }}
                                                        >
                                                            <Tooltip title="Xoá truyện">
                                                                <i className="fa-solid fa-x" style={{color: '#215BA6',marginLeft: '5px'}}/>
                                                            </Tooltip>
                                                        </span>
                                                        <Tooltip title="Xem chương">
                                                            <Link to={`/chapters/${story.storyId}`}>
                                                                <i className="fa-solid fa-list" style={{marginLeft: '5px'}}></i>
                                                            </Link>
                                                        </Tooltip>

                                                        <Tooltip title="Xem truyện">
                                                            <Link to={`/story/${story.storyId}`}>
                                                                <i className="fa-solid fa-eye"style={{marginLeft: '5px'}}/>
                                                            </Link>
                                                        </Tooltip>

                                                    </td>
                                                </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="pagination-container" >
                                            <div className="pagination">
                                                <Pagination
                                                    count={Math.ceil(stories.length / storiesPerPage)}
                                                    page={currentPage}
                                                    onChange={handlePageChange}
                                                />
                                            </div>
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

export default List;