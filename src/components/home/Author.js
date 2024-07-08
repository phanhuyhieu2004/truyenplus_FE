

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

    const  [loading,setLoading]= useState(false);
    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    },[]);

    useEffect(() => {
        axios.get(`https://poetic-heart-production.up.railway.app/api/stories/author?author=${author}`)
            .then(response => {
                setSearchAuthor(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy ra các truyện:', error);
            });
    }, [author]);


    if(loading){
        return (
            <>
                <main>
                    <div className='loading-container' style={{margin: '150px 100px',textAlign:'center'}}>
                        <CircularProgress color="error" size={100} />
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
                                            <i className="spire spire--list"/>
                                            TRUYỆN CỦA TÁC GIẢ {author}
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

                                                                <Link to={`/story/${story.storyId}`} className="sts sts_1">

                                                                    {story.totalChapters} Chương
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