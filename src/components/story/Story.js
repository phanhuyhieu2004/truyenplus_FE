import "./Story.css"
import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import {CircularProgress} from "@mui/material";

function Story() {

    const user = JSON.parse(localStorage.getItem("user"));
    const accountId = user.accountId;
    const {storyId} = useParams();
    const [chapters, setChapters] = useState([]);
    const [story, setStory] = useState("");
    const [storyView, setStoryView] = useState([]);
    const chapterListRef = useRef(null);
    const [isLiked, setIsLiked] = useState(false);
    console.log('od', isLiked);

    const [loading, setLoading] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription); // Đổi trạng thái khi nhấp vào nút
    };
    const descriptionPreviewLimit = 200;
    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/stories/${storyId}/like?accountId=${accountId}&checkOnly=true`);
                setIsLiked(response.data === "liked");
            } catch (error) {
                console.error("Error checking like status", error);
            }
        };

        checkLikeStatus();
    }, [storyId, accountId]);
    const toggleLike = async () => {
        setLoading(true);
        try {
            const response = await axios.post(` http://localhost:8080/api/stories/${storyId}/like?accountId=${accountId}`);
            const message = response.data;

            if (message === "Truyện đã được thích") {
                setIsLiked(true);
            } else if (message === "Bạn đã bỏ thích truyện này") {
                setIsLiked(false);
            }

            console.log(message); // Log thông báo từ server
        } catch (error) {
            console.error("Error toggling like", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetchStoryInfo = () => {
            axios.get(`http://localhost:8080/api/stories/${storyId}`)
                .then(response => {
                    setStory(response.data);
                })
                .catch(error => {
                    console.error('Lỗi ruùi nha:', error);
                });
        };
        fetchStoryInfo();
    }, [storyId]);

    useEffect(() => {
        const fetchChapters = () => {
            axios.get(`http://localhost:8080/api/chapters/story/${storyId}`)
                .then(response => {
                    const sortedChapters = response.data.sort((a, b) => a.chapterId - b.chapterId);
                    setChapters(sortedChapters);
                })
                .catch(error => {
                    console.error('Lỗi rồi hu hu :', error);
                });
        };
        fetchChapters();
    }, [storyId]);

    useEffect(() => {
        if (story) {
            document.title = `${story.title} - ${story.author}`;
        } else {
            document.title = "Truyện Plus +";
        }
    }, [story]);

    useEffect(() => {
        const fetchViewStory = () => {
            axios.get(`http://localhost:8080/api/stories/view`)
                .then(response => {
                    setStoryView(response.data);
                })
                .catch(error => {
                    console.error('Lỗi không lấy được bxh truyện có lượt xem nhiều nhất', error);
                });
        };
        fetchViewStory();
    }, []);

    if (!story) {
        return (
            <main>
                <div className='loading-container' style={{margin: '150px 100px', textAlign: 'center'}}>
                    <CircularProgress size={100}/>
                </div>
            </main>
        )
    }

    const updatedAtArray = story.updatedAt;
    const updatedAtFormatted = `${updatedAtArray[2]} - ${updatedAtArray[1]} - ${updatedAtArray[0]}`;

    const scrollToChapterList = () => {
        if (chapterListRef.current) {
            chapterListRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };
    // Số ký tự hiển thị trước khi có "Xem thêm"
    const isDescriptionLong = story.description.length > descriptionPreviewLimit; // Kiểm tra nội dung có dài hơn giới hạn hay không
    return (
        <>
            <div className="container">
                <div className="breadcrumb breadcrumbs" itemScope="" itemType="/home">
                    <div className="rdfa-breadcrumb">
                        <div>
                            <p>
                                <span itemProp="itemListElement" itemScope="" itemType="/home">
                                    <a itemProp="item" href="/home" className="home" title="Truyện Plus">
                                        <span itemProp="name" className="bc-sm-hidden">
                                            <i className="fa-solid fa-house"></i> Trang chủ
                                        </span>
                                        <span className="bc-home">Truyện</span>
                                        <meta itemProp="position" content={1}/>
                                    </a>
                                </span>
                                <span className="separator">»</span>
                                <span itemScope="" itemProp="itemListElement" itemType="/home">
                                    <span itemProp="item">
                                        {story.title}
                                    </span>
                                    <meta itemProp="position" content={2}/>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="wrapper" style={{minHeight: '900px'}}>
                    <div className="main-wrapper">
                        <div className="main-story">
                            <div className="leftCol" itemScope="" itemType="/home">
                                <div className="book-info-top">
                                    <div className="book-info-pic">
                                        <img src={story.image} alt="mất ảnh rồi" itemProp="image"/>
                                    </div>
                                    <ul className="book-info-text">
                                        <li>
                                            <h1 itemProp="name">{story.title}</h1>
                                        </li>

                                        <li>
                                            Tác giả :{" "}
                                            <span itemProp="author">{story.author}</span>
                                        </li>
                                        <li className="li--genres">
                                            Thể loại :{" "}
                                            {story.categories.map((category, index) => (
                                                <span key={category.categoryId}>
                                                <span>{category.categoryName}</span>
                                                    {index !== story.categories.length - 1 && ", "}
                                            </span>
                                            ))}
                                        </li>
                                        <li>Số chương : {story.totalChapters}</li>
                                        <li>
                                            Trạng thái :
                                            <span
                                                className={`label-status ${story.status === 'Full' ? 'label-full' : 'label-updating'}`}>
        {story.status}
    </span></li>
                                        <li>Cập nhật cuối: {updatedAtFormatted}</li>
                                        <li className="clearfix lstbtn">
                                            <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                scrollToChapterList();
                                            }}>
                                                <span className="btn_truyen btn_dschuong">DANH SÁCH CHƯƠNG</span>
                                            </a>
                                            <a href={`/chapter/${story.storyId}/1`}>
                                                <span className="btn_truyen">ĐỌC TỪ ĐẦU</span>
                                            </a>
                                            <button
                                                className="btn-heart"
                                                onClick={toggleLike}
                                                disabled={loading}
                                            >
                                                <i className={`fa-solid fa-heart ${isLiked ? "liked" : ""}`}></i>
                                            </button>


                                        </li>
                                    </ul>
                                </div>
                                <div id="gioithieu">
                                    <h2>Giới thiệu nội dung {story.title}: </h2>
                                    <div itemProp="description">
                                        <ReactQuill
                                            value={showFullDescription ? story.description : story.description.slice(0, descriptionPreviewLimit) + (isDescriptionLong ? '...' : '')}
                                            readOnly={true}
                                            theme={"bubble"}
                                        />
                                        {isDescriptionLong && (
                                            <button onClick={toggleDescription} className={'btn-more'}>
                                                {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div id="chapter" className="chapter" ref={chapterListRef}>
                                    <div className="book-info-chapter">
                                        <div className="row title-list-chapter">
                                            <span>Danh sách chương</span>
                                        </div>
                                        <div id="chapter-list">
                                            <div className="chapter-list">
                                                <div className="row">
                                                    {chapters.map((chapter, index) => (
                                                        <div className="col-md-6 col-sm-12" key={index}>
                                                        <span>
                                                            Chương {chapter.chapterNumber}
                                                            <Link to={`/chapter/${story.storyId}/${chapter.chapterId}`}>
                                                                : {chapter.title}
                                                            </Link>
                                                        </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="middleCol">
                                <div style={{clear: "both"}}/>
                                <div style={{clear: "both"}}/>
                                <div className="xem-nhieu">
                                    <h3 className="title all-title">
                                        Top 10 truyện có <span>lượt xem </span> nhiều nhất
                                    </h3>
                                    <div className="all">
                                        {storyView.slice(0, 10).map((view, index) => (
                                            <div className="xem-nhieu-item" key={index}>
                                                <span>{index + 1}</span>
                                                <h3>
                                                    <Link to={`/story/${view.storyId}`}>
                                                        {view.title}


                                                        <div>
                                                            <i>
                                                                {view.categories.reduce((acc, category, index) => {
                                                                    return acc + (index === 0 ? "" : ", ") + category.categoryName;
                                                                }, "")}
                                                            </i>
                                                        </div>


                                                    </Link>
                                                </h3>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{clear: "both"}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Story;