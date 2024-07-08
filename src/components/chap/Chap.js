import "./Chap.css"
import React, {useEffect, useState} from "react";
import {CircularProgress, Dialog, IconButton} from "@mui/material";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import {Close} from "@mui/icons-material";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css'
function Chap() {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openSettingModal, setOpenSettingModal] = useState(false);
    const {chapterId, storyId} = useParams();
    const navigate = useNavigate();
    const [zoomLevel, setZoomLevel] = useState(100); // Initial zoom level, in percentage
    const [chapters, setChapters] = useState([]);
    const [chapter, setChapter] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // Initial background color
    const [color, setColor] = useState("#000000"); // Initial text color
    const minZoomLevel = 50; // Minimum zoom level
    const maxZoomLevel = 200; // Maximum zoom level
    const handleColorChange = (backgroundColor, color) => {
        setBackgroundColor(backgroundColor); // Set background color state
        setColor(color); // Set text color state
    };
    useEffect(() => {
        const fetchChapterInfo = async () => {
            try {
                const response = await axios.get(`https://poetic-heart-production.up.railway.app/api/chapters/${chapterId}`);
                setChapter(response.data);
            } catch (error) {
                console.error('Lỗi rồi:', error);
            }
        };

        if (chapterId) {
            fetchChapterInfo();
        }
    }, [chapterId]);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await axios.get(`https://poetic-heart-production.up.railway.app/api/chapters/story/${storyId}`);
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

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    const handleCloseSettingModal = () => {
        setOpenSettingModal(false);
    };

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => Math.min(prevZoom + 10, maxZoomLevel)); // Increase zoom level within limit
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 10, minZoomLevel)); // Decrease zoom level within limit
    };

    const handleEditClick = () => {
        setOpenEditModal(true);
    };
    const handleSettingClick = () => {
        setOpenSettingModal(true);
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
                        {/* eslint-disable-next-line no-undef */}
                        <span onClick={handleSettingClick} className="btn-dschuong" style={{marginLeft:'5px'
                            ,        backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABGlBMVEUAAAD+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v5G2OW2AAAAXXRSTlMAAQIDBAUGBwgJCgsODxgaJicoKSotLzAxMzk7PUZKTE9QUVJUVVZZXF1eYWJjZmdoaWtsbXR4eX6FiYyPlJianZ6go6aorbK0tbe8vsXK2dze5ujp6/Hz9ff5+/1wsAonAAABHUlEQVQoz42S11KbYQxEz/djegmdGNMceoeEZqrBJHQw1Qb7vP9rcGEwP0OZ6Eqj1UirXcF/RpiZILlZ9xGo1ZWiPbHO8JIcW7IcVevr2gGQXCuP8dPd0QBEw4EzTdM8wLk2gloH0akXiyXNzxWcTWUcpN3cdIAB36Jcz7H3rzsO1ZvNgyd1iISuFe0GYEqzEbTk9QdheY7kfgPw5+TJQgKgXa+3uqpEVQ8BiFQz74C/nwHpnYLFBECH3mZ7Y/JMarYGWvPaRvg9T/9eIwA59W47V1LTJHTjsUI3GTvQJo6qB4Z/Xi6X9Gr6wYVUxiE6K5IQhiNOdZzm1DsRAVi1MrdvtfyLXndGXu350qi4tUsPcWvfnmGc7u36b97lGQOvSU4gttpoAAAAAElFTkSuQmCC")'}}/>
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
                <div className="truyen" style={{ overflow: 'hidden', backgroundColor: backgroundColor, color: color }}>                    <div style={{transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left'}}>
                        <ReactQuill
                            value={chapter.content}
                            readOnly={true}
                            theme={"bubble"}
                        />
                    </div>
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
                        <Close onClick={handleCloseEditModal}
                               style={{position: "absolute", top: '0', right: '10px', width: 'unset'}}/>
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
            <Dialog open={openSettingModal} onClose={handleCloseSettingModal}>
                <div id="browse-chapter">
                    <div className="title-list-chapter"><span>Cài đặt</span>
                        <Close  onClick={handleCloseSettingModal}  style={{position:"absolute", top:'0', right:'10px', width:'unset'}}/>
                    </div>
                    <div className="content">
                        <div className="b-ajax-wrapper">
                            <div className="col-md-6 col-sm-12">
                                <div className="zoom-buttons">
                                    <IconButton onClick={handleZoomIn}>
                                        <ZoomInIcon/>
                                    </IconButton>
                                    <IconButton onClick={handleZoomOut}>
                                        <ZoomOutIcon/>
                                    </IconButton>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="color-controls">
                                    <IconButton style={{backgroundColor: '#000000', margin: '5px', color: '#ffffff'}}
                                                onClick={() => handleColorChange('#000000', '#ffffff')}/>
                                    <IconButton style={{backgroundColor: '#ffffff', margin: '5px', color: '#000000'}}
                                                onClick={() => handleColorChange('#ffffff', '#000000')}/>
                                    <IconButton style={{backgroundColor: '#ff0000', margin: '5px', color: '#ffffff'}}
                                                onClick={() => handleColorChange('#ff0000', '#ffffff')}/>
                                    <IconButton style={{backgroundColor: '#00ff00', margin: '5px', color: '#000000'}}
                                                onClick={() => handleColorChange('#00ff00', '#000000')}/>
                                </div>                            </div>


                        </div>
                    </div>
                </div>
            </Dialog>
        </div>

    )
}

export default Chap