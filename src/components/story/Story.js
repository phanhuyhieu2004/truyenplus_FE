import "./Story.css"
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
function Story() {

    const {storyId} = useParams();
    const [chapters, setChapters] = useState([]);
    const [story, setStory] = useState("");

    useEffect(() => {
        const fetchStoryInfo = () => {
            axios.get(`https://poetic-heart-production.up.railway.app/api/stories/${storyId}`)
                .then(response => {
                    setStory(response.data);

                    console.log('truyện', response.data)
                })
                .catch(error => {
                    console.error('Lỗi ruùi nha:', error);
                });
        };

        fetchStoryInfo();
    }, [storyId]);

    useEffect(() => {
        const fetchChapters = () => {
            axios.get(`https://poetic-heart-production.up.railway.app/api/chapters/stories/${storyId}`).then(response => {
                setChapters(response.data);

            })
                .catch(error => {
                    console.error('Lỗi rồi hu hu :', error);
                });
        };

        fetchChapters();
    }, [storyId]);
    if (!story) {
        return (<p>Load</p>)
    }
    const updatedAtArray = story.updatedAt;



    const updatedAtFormatted = `${updatedAtArray[2]} - ${updatedAtArray[1]} - ${updatedAtArray[0]}`;

    return(
        <>
            <div className="container">
                {" "}
                <div
                    className="breadcrumb breadcrumbs"
                    itemScope=""
                    itemType="/home"
                >
                    <div className="rdfa-breadcrumb">
                        <div>
                            <p>
            <span
                itemProp="itemListElement"
                itemScope=""
                itemType="/home"
            >
              <a
                  itemProp="item"
                  href="/home"
                  className="home"
                  title="Truyện Plus"
              >
                <span itemProp="name" className="bc-sm-hidden">
                  Truyện Plus
                </span>
                <span className="bc-home">Truyện</span>
                <meta itemProp="position" content={1} />
              </a>
            </span>
                                <span className="separator">»</span>
                                <span
                                    itemScope=""
                                    itemProp="itemListElement"
                                    itemType="/home"
                                >
              <span itemProp="item">
                            {story.title}
              </span>
                <span itemProp="name">{story.title}</span>

                                <meta itemProp="position" content={2}/>
                            </span>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="wrapper">
                    <div className="main-wrapper">
                        <div className="leftCol" itemScope="" itemType="/home">
                            <div className="book-info-top">
                                <div className="book-info-pic">
                                    <img src={story.image} alt="mất ảnh rồi"
                                        itemProp="image"
                                    />
                                </div>
                                <ul className="book-info-text">
                                    <li>
                                        <h1 itemProp="name">{story.title}</h1>
                                    </li>
                                    <li>
                                        Tác giả :{" "}
                                        <span itemProp="author">
                                            {story.author}
                                        </span>
                                    </li>
                                    <li className="li--genres">
                                        Thể loại :{" "}
                                        {story.categories.map((category, index) => (
                                            <span key={category.categoryId}>
        <span

        >
          {category.categoryName}
        </span>
                                                {index !== story.categories.length - 1 && ", "}
      </span>
                                        ))}
                                    </li>
                                    <li>Số chương : {story.totalChapters}</li>
                                    <li>
                                        Trạng thái :
                                        <span className="label-status label-updating">{story.status}</span>
                                    </li>

                                    <li>Cập nhật cuối: {updatedAtFormatted}</li>


                                </ul>
                            </div>

                            <div id="gioithieu">
                                <h2>Giới thiệu nội dung {story.title}: </h2>
                                <div itemProp="description">
                                    <ReactQuill
                                        value={story.description}
                                        readOnly={true}
                                        theme={"bubble"}
                                    /></div>
                                </div>
                            </div>
                            <div style={{ clear: "both" }} />

                            <div style={{ clear: "both" }} />
                            <div id="chapter" className="chapter">
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

                </div>
            </div>
        </>

    )
}
export default Story