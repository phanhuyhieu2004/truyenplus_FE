import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css"
import "../../Mobile.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import {CircularProgress} from "@mui/material";


function Home() {
    const [storyView, setStoryView] = useState([]);

    const [stories, setStories] = useState([]);
    const [storiesStatus, setStoriesStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chapters, setChapters] = useState([]);
    const [latestChapters, setLatestChapters] = useState({});
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
    useEffect(() => {
        async function fetchStories() {
            try {
                const response = await axios.get('http://localhost:8080/api/stories/full');
                setStories(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy ra các truyện:', error);
            }
        }

        async function fetchStoriesStatus() {
            try {
                const response = await axios.get('http://localhost:8080/api/stories/status');
                setStoriesStatus(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy ra các truyện full:', error);
            }
        }
setTimeout()
        const fetchChapters = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/chapters'); // API trả về tất cả chương
                setChapters(response.data);
            } catch (error) {
                console.error("Error fetching chapters:", error);
            }
        };

        async function fetchData() {
            setLoading(true);
            await Promise.all([fetchStories(), fetchStoriesStatus()]);
            setLoading(false);
        }

        fetchChapters();
        fetchData();
    }, []);

    useEffect(() => {
        const groupedChapters = {};

        // Nhóm chương theo storyId
        chapters.forEach(chapter => {
            if (!groupedChapters[chapter.story.storyId]) {
                groupedChapters[chapter.story.storyId] = [];
            }
            groupedChapters[chapter.story.storyId].push(chapter);
        });

        const latestChaptersData = {};

        // Lấy chương cuối cùng cho mỗi truyện
        for (const [storyId, chaptersArray] of Object.entries(groupedChapters)) {
            const lastChapter = chaptersArray.reduce((prev, current) => {
                return (prev.chapterNumber > current.chapterNumber) ? prev : current;
            });
            latestChaptersData[storyId] = lastChapter;
        }

        setLatestChapters(latestChaptersData);
    }, [chapters]);

    const settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        swipe: true,
        swipeToSlide: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    if (loading) {
        return (
            <>
                <main>
                    <div className='loading-container' style={{margin: '150px 100px', textAlign: 'center'}}>
                        <CircularProgress size={100}/>
                    </div>

                </main>
            </>
        )
    } else {
        return (
            <>
                <main>
                    <div className="container">
                        <div className="wrapper homepage">

                            <div className="main-wrapper">

                                <div className="fullCol">
                                    <div className="daily-update">
                                        <h2 className="title update-title" title="TRUYỆN HOT">
                                            <i class="fa-solid fa-fire-flame-curved"></i> TRUYỆN HOT
                                        </h2>
                                    </div>
                                    <div className="contentstory">
                                        <div className="home-content">

                                            <div className="listitems">
                                                {storyView.slice(0,12)
                                                    . map((story, index) => (
                                                    <div className="item" key={index}>
                                                        <div style={{
                                                            position: 'relative',
                                                            overflow: 'hidden', width: 'fit-content',
                                                            height: '270px'
                                                        }}><Link className="cover" to={`/story/${story.storyId}`}>
                                                            <img src={story.image}
                                                                 alt={story.title}/>
                                                            <span className="hot-label"><i
                                                                className="fa-solid fa-star fa-beat"></i></span> </Link>
                                                        </div>
                                                        <div className="info">
                                                            <h3>
                                                                <Link to={`/story/${story.storyId}`}>
                                                                    {story.title}
                                                                </Link>
                                                            </h3>

                                                            <Link to={`/author/${story.author}`} className="sts sts_1">

                                                                <i className="fa-solid fa-user"></i> {story.author} - <i
                                                                className="fa-solid fa-eye"></i> {story.view}

                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="daily-update">
                                        <h2 className="title update-title" title="TRUYỆN MỚI CẬP NHẬT">
                                            <i className="fa fa-refresh"/> TRUYỆN MỚI CẬP NHẬT
                                        </h2>
                                    </div>
                                    <div className="contentstory">
                                        <div className="home-content">

                                            <div className="listitems">
                                                {stories.slice(0,12).map((story, index) => (
                                                    <div className="item" key={index}>
                                                        <div style={{
                                                            position: 'relative',
                                                            overflow: 'hidden', width: 'fit-content',
                                                            height: '270px'
                                                        }}><Link className="cover" to={`/story/${story.storyId}`}>
                                                            <img src={story.image}
                                                                 alt={story.title}/>
                                                            <span className="full-label"></span> </Link>
                                                        </div>
                                                        <div className="info">
                                                            <h3>
                                                                <Link to={`/story/${story.storyId}`}>
                                                                    {story.title}
                                                                </Link>
                                                            </h3>

                                                            <Link to={`/author/${story.author}`} className="sts sts_1">

                                                                <i className="fa-solid fa-user"></i> {latestChapters[story.storyId] ? (
                                                                <span> Chương {latestChapters[story.storyId].chapterNumber} - <i
                                                                    className="fa-solid fa-calendar-days"></i> {story.createdAt[2]} / {story.createdAt[1]} / {story.createdAt[0]} </span>
                                                            ) : (
                                                                <span>Không có chương nào</span>
                                                            )}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="daily-update">
                                        <h2 className="title update-title" title="TRUYỆN MỚI CẬP NHẬT">
                                            <i class="fa-solid fa-list"></i> TRUYỆN FULL
                                        </h2>
                                    </div>
                                    <div>
                                        <div className="home-content">
                                            <Slider {...settings} className="listitems owl-slide" id="owl-slide-home">
                                                {storiesStatus.map((story, index) => (
                                                    <div className="item" key={index}>
                                                        <Link className="cover" to={`/story/${story.storyId}`}>
                                                            <img src={story.image}
                                                                 alt={story.title}/>
                                                            <span/>
                                                        </Link>
                                                        <div className="info">
                                                            <h3>
                                                                <Link to={`/story/${story.storyId}`}>
                                                                    {story.title}
                                                                </Link>
                                                            </h3>
                                                            <small className="label-full">
                                                                <span>Full</span> {story.totalChapters} chương
                                                            </small>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Slider>


                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </main>

            </>

        )
    }

}

export default Home