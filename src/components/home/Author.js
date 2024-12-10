

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css"
import "../../Mobile.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
function Author() {
    const [searchAuthor, setSearchAuthor] = useState([]);
    const {author}=useParams();
    const [chapters, setChapters] = useState([]);
    const [latestChapters, setLatestChapters] = useState({});
    const  [loading,setLoading]= useState(false);
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
useEffect(()=>{
    fetchChapters();
})
    useEffect(() => {
        axios.get(`http://localhost:8080/api/stories/author?author=${author}`)
            .then(response => {
                setSearchAuthor(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy ra các truyện:', error);
            });
    }, [author]);

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
                                        <h2 className="title update-title" title="TRUYỆN MỚI CẬP NHẬT">
                                            <i class="fa-solid fa-user"></i> TRUYỆN CỦA TÁC GIẢ {author}
                                        </h2>
                                    </div>

                                    <div id="contentstory">
                                        <div className="home-content">
                                            {searchAuthor.length >0 ?(
                                                <div className="listitems">
                                                    {searchAuthor.map((story, index) => (
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
                                                                <Link to={`/author/${story.author}`}
                                                                      className="sts sts_1">

                                                                    <i className="fa-solid fa-user"></i> {story.author} - <i
                                                                    className="fa-solid fa-book"></i> {latestChapters[story.storyId] ? (
                                                                    <span> Chương {latestChapters[story.storyId].chapterNumber}  </span>
                                                                ) : (
                                                                    <span>Không có chương nào</span>
                                                                )}
                                                                </Link>

                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ): (<p>Không có truyện nào</p>)
                                            }
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
export default Author;