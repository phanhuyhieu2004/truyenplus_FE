//
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./Home.css"
// import "../../Mobile.css"
// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import {Link} from "react-router-dom";
// import {CircularProgress} from "@mui/material";
// function Category() {
//     const [storiesCategory, setStoriesCategory] = useState([]);
//
//     const  [loading,setLoading]= useState(false);
//     useEffect(()=>{
//         setLoading(true)
//         setTimeout(() => {
//             setLoading(false);
//         }, 1000);
//     },[]);
//
//
//     useEffect(() => {
//         axios.get('https://poetic-heart-production.up.railway.app/api/stories')
//             .then(response => {
//                 setStoriesCategory(response.data);
//             })
//             .catch(error => {
//                 console.error('Lỗi khi lấy ra các truyện:', error);
//             });
//     }, []);
//
//
//     if(loading){
//         return (
//             <>
//                 <main>
//                     <div className='loading-container' style={{margin: '150px 100px',textAlign:'center'}}>
//                         <CircularProgress color="error" size={100} />
//                     </div>
//
//                 </main>
//             </>
//         )
//     } else {
//         return (
//             <>
//                 <main>
//                     <div className="container">
//                         <div className="wrapper homepage">
//
//                             <div className="main-wrapper">
//
//                                 <div className="fullCol">
//
//                                     <div className="daily-update">
//                                         <h2 className="title update-title" title="TRUYỆN MỚI CẬP NHẬT">
//                                             <i className="spire spire--list"/>
//                                             TRUYỆN MỚI CẬP NHẬT
//                                         </h2>
//                                     </div>
//                                     <div id="contentstory">
//                                         <div className="home-content">
//
//                                             <div className="listitems">
//                                                 {stories.map((story, index) => (
//                                                     <div className="item" key={index}>
//                                                         <Link className="cover" to={`/story/${story.storyId}`}>
//                                                             <img src={story.image}
//                                                                  alt={story.title}/>
//                                                             <span/>
//                                                         </Link>
//                                                         <div className="info">
//                                                             <h3>
//                                                                 <Link to={`/story/${story.storyId}`}>
//                                                                     {story.title}
//                                                                 </Link>
//                                                             </h3>
//
//                                                             <Link to={`/story/${story.storyId}`} className="sts sts_1">
//
//                                                                 {story.totalChapters} Chương
//                                                             </Link>
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//
//                                         </div>
//                                     </div>
//
//
//                                 </div>
//
//
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//
//             </>
//
//         )
//     }
//
// }
// export default Category;