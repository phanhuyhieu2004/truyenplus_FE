import "./Chap.css"
import React, {useEffect, useState} from "react";
import {CircularProgress, Dialog} from "@mui/material";
import {Close} from "@mui/icons-material";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css'
function Chap() {
    const [openEditModal, setOpenEditModal] = useState(false);
    const {chapterId, storyId} = useParams();
    const navigate = useNavigate();

    const [chapters, setChapters] = useState([]);
    const [chapter, setChapter] = useState(null);

    useEffect(() => {
        const fetchChapterInfo = async () => {
            try {
                const response = await axios.get(`https://poetic-heart-production.up.railway.app/api/chapters/${chapterId}`);
                setChapter(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Lỗi rồi:', error);
            }
        };

        if (chapterId) {
            fetchChapterInfo();
        }
    }, [chapterId]);

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };


    const handleEditClick = () => {
        setOpenEditModal(true);
    };



    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await axios.get(`https://poetic-heart-production.up.railway.app/api/chapters/story/${storyId}`);
                // Sắp xếp các chương theo `chapterNumber`
                const sortedChapters = response.data.sort((a, b) => a.chapterId - b.chapterId);
                setChapters(sortedChapters);
            } catch (error) {
                console.error('Lỗi rồi:', error);
            }
        };
        if (storyId) {
            fetchChapters();
        }
    }, [storyId]);

    if (!chapter) {
        return (
            <>
                <main>
                    <div className='loading-container' style={{margin: '150px 100px', textAlign: 'center'}}>
                        <CircularProgress color="error" size={100}/>
                    </div>

                </main>
            </>
        )
    }

    const currentChapterIndex = chapters.findIndex(chap => chap.chapterId === parseInt(chapterId, 10));
    const isFirstChapter = currentChapterIndex === 0;
    const isLastChapter = currentChapterIndex === chapters.length - 1;

    const handlePreviousChapter = () => {
        if (currentChapterIndex > 0) {
            const previousChapterId = chapters[currentChapterIndex - 1]?.chapterId;
            if (previousChapterId) {
                navigate(`/chapter/${storyId}/${previousChapterId}`);
            }
        }
    };

    const handleNextChapter = () => {
        if (currentChapterIndex < chapters.length - 1) {
            const nextChapterId = chapters[currentChapterIndex + 1]?.chapterId;
            if (nextChapterId) {
                navigate(`/chapter/${storyId}/${nextChapterId}`);
            }
        }
    };

    return (
        <div>
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
                itemProp="url"
                href="/home"
                className="home"
                title="Truyện Plus"
            >
              <span itemProp="name" className="bc-sm-hidden">
                Đọc truyện online
              </span>
              <span itemProp="name" className="bc-home">
                Truyện
              </span>
              <meta itemProp="position" content={1}/>
            </a>
          </span>
                            <span className="separator">»</span>
                            <span
                                itemScope=""
                                itemProp="itemListElement"
                                itemType="/home"
                            >
             <Link to={`/story/${storyId}`}>


              <span itemProp="item">
                            {chapter.story.title}
              </span>
              <meta itemProp="position" content={2}/>
           </Link>
          </span>
                            <span className="separator bc-sm-hidden">»</span>
                            <span
                                className="bc-sm-hidden"
                                itemScope=""
                                itemProp="itemListElement"
                                itemType="/home"
                            >
            <span itemProp="item">Chương {chapter.chapterNumber}</span>
            <meta itemProp="position" content={3}/>
          </span>
                        </p>
                    </div>
                </div>
            </div>


    <div
        className="vung-doc"
        id="vungdoc"
        style={{backgroundColor: "#fafaf3", color: "#000000", fontSize: 18}}

    >
        <div className="chapter_wrap">
            <div className="chapter_control" id="gotochap">
                <span
                    onClick={handlePreviousChapter}
                    className={`back ${isFirstChapter ? 'disabled' : ''}`}
                >
                    &lt;&lt; Chương trước
                </span>
                <span onClick={handleEditClick} className="btn-dschuong"/>
                <span onClick={handleNextChapter}
                      className={`next ${isLastChapter ? 'disabled' : ''}`}>
                    Chương tiếp &gt;&gt;
                </span>
            </div>
            <div>
                <h1 className="current-book">
                    <Link to={`/story/${storyId}`}>
                        {chapter.story.title}
                    </Link>
                    <span className="current-chapter">
        Chương {chapter.chapterNumber}: {chapter.title}</span>
                </h1>
            </div>
            <div className="clearfix"/>
        </div>
        <div className="truyen">
            <ReactQuill
                value={chapter.content}
                readOnly={true}
                theme={"bubble"}
            />
        </div>
            <div className="chapter_wrap">
                <div className="clearfix"/>
                <div className="chapter_control control--last">
                    <span onClick={handleNextChapter}
                          className={`next ${isLastChapter ? 'disabled' : ''}`}>
                        Chương tiếp &gt;&gt;
                    </span>
                </div>
                <div className="clearfix"/>
            </div>
        </div>
            <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                <div id="browse-chapter">
                    <div className="title-list-chapter"><span>Danh sách chương</span>
                        <Close  onClick={handleCloseEditModal}  style={{position:"absolute", top:'0', right:'10px', width:'unset'}}/>
                    </div>
                    <div className="content">
                        <div className="b-ajax-wrapper">
                            <div className="chapter-list">
                                <div className="row">
                                    {chapters.map((chap, index) => (
                                        <div className="col-md-6 col-sm-12" key={index}>
                                            <span>
                                                   Chương {chap.chapterNumber} :
                                                <Link to={`/chapter/${storyId}/${chap.chapterId}`}>
                                                    {chap.title}
                                                </Link>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>

    )
}

export default Chap