

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css"
import "../../Mobile.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {CircularProgress, Pagination} from "@mui/material";
function ViewStory() {
    const [stories, setStories] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [latestChapters, setLatestChapters] = useState({});
    const  [loading,setLoading]= useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    const [storiesPerPage]=useState(18);
    const indexOfLastStory=currentPage* storiesPerPage;
    const indexOfFirstStory=indexOfLastStory-storiesPerPage;
    const currentStories=stories.slice(indexOfFirstStory,indexOfLastStory);
    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    },[]);
    const fetchChapters = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/chapters'); // API trả về tất cả chương
            setChapters(response.data);
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    useEffect(() => {
        async function fetchStories() {
            try {
                const response = await axios.get('http://localhost:8080/api/stories/view');
                setStories(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy ra các truyện:', error);
            }
        }
        fetchChapters();
        fetchStories();
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


    if(loading){
        return (
            <>
                <main>
                    <div className='loading-container' style={{margin: '150px 100px',textAlign:'center'}}>
                        <CircularProgress size={100} />
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
                                            <i className="fa-solid fa-fire-flame-curved"></i> TRUYỆN HOT

                                        </h2>
                                    </div>

                                    <div className="contentstory">
                                        <div className="home-content">

                                            <div className="listitems">
                                                {currentStories.map((story, index) => (
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

                                                                <i className="fa-solid fa-user"></i> {story.author} - <i
                                                                className="fa-solid fa-eye"></i> {story.view}

                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="pagination-container">
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
                    </div>
                </main>

            </>

        )
    }

}

export default ViewStory;