

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css"
import "../../Mobile.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {CircularProgress, Pagination} from "@mui/material";
function Likes() {
    const [stories, setStories] = useState([]);
    const [chapters, setChapters] = useState([]);
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
            const response = await axios.get('http://localhost:8080/api/chapters');
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
                const response = await axios.get('http://localhost:8080/api/stories');
                setStories(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy ra các truyện:', error);
            }
        }
        fetchChapters();
        fetchStories();
    }, []);


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
                                            <i
                                                className="fa-solid fa-heart"></i> TRUYỆN ĐƯỢC YÊU THÍCH

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
                                                            <span className="hot-label"><i
                                                                className="fa-solid fa-heart fa-beat"></i></span>
                                                        </Link>
                                                        </div>
                                                        <div className="info">
                                                        <h3>
                                                                <Link to={`/story/${story.storyId}`}>
                                                                    {story.title}
                                                                </Link>
                                                            </h3>

                                                            <Link to={`/author/${story.author}`} className="sts sts_1">

                                                                <i className="fa-solid fa-user"></i>
                                                                <span>{story.author} </span> - <i
                                                                className="fa-solid fa-heart"></i> <span>{story.likes}</span>

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

export default Likes;