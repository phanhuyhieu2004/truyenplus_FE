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
    const [fontSize, setFontSize] = useState(16);    const [chapters, setChapters] = useState([]);
    const [chapter, setChapter] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // Initial background color
    const [color, setColor] = useState("#000000"); // Initial text color
    const minFontSize = 10; // Minimum font size
    const maxFontSize = 30; // Maximum font size
    const handleColorChange = (backgroundColor, color) => {
        setBackgroundColor(backgroundColor); // Set background color state
        setColor(color); // Set text color state
    };
    const modules = {
        toolbar: false,
    };

    const formats = [
        'size',
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'link', 'image',
    ];
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
        setFontSize(prevSize => Math.min(prevSize + 2, maxFontSize)); // Increase font size within limit
    };

    const handleZoomOut = () => {
        setFontSize(prevSize => Math.max(prevSize - 2, minFontSize)); // Decrease font size within limit
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
                window.scrollTo(0, 0);

                navigate(`/chapter/${storyId}/${previousChapterId}`);

            }
        }
    };

    const handleNextChapter = () => {
        if (currentChapterIndex < chapters.length - 1) {
            const nextChapterId = chapters[currentChapterIndex + 1]?.chapterId;
            if (nextChapterId) {
                window.scrollTo(0, 0);
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
                style={{backgroundColor: backgroundColor, color: color}}
            >
                <div className="chapter_wrap">
                    <div className="chapter_control" id="gotochap">
                <span
                    onClick={handlePreviousChapter}
                    className={`back ${isFirstChapter ? 'disabled' : ''}`}
                >
                    Chương trước
                </span>
                        <span onClick={handleEditClick} className="btn-dschuong"/>
                        {/* eslint-disable-next-line no-undef */}
                        <span onClick={handleSettingClick} className="btn-dschuong" style={{
                            marginLeft: '5px'
                            ,
                            backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABGlBMVEUAAAD+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v5G2OW2AAAAXXRSTlMAAQIDBAUGBwgJCgsODxgaJicoKSotLzAxMzk7PUZKTE9QUVJUVVZZXF1eYWJjZmdoaWtsbXR4eX6FiYyPlJianZ6go6aorbK0tbe8vsXK2dze5ujp6/Hz9ff5+/1wsAonAAABHUlEQVQoz42S11KbYQxEz/djegmdGNMceoeEZqrBJHQw1Qb7vP9rcGEwP0OZ6Eqj1UirXcF/RpiZILlZ9xGo1ZWiPbHO8JIcW7IcVevr2gGQXCuP8dPd0QBEw4EzTdM8wLk2gloH0akXiyXNzxWcTWUcpN3cdIAB36Jcz7H3rzsO1ZvNgyd1iISuFe0GYEqzEbTk9QdheY7kfgPw5+TJQgKgXa+3uqpEVQ8BiFQz74C/nwHpnYLFBECH3mZ7Y/JMarYGWvPaRvg9T/9eIwA59W47V1LTJHTjsUI3GTvQJo6qB4Z/Xi6X9Gr6wYVUxiE6K5IQhiNOdZzm1DsRAVi1MrdvtfyLXndGXu350qi4tUsPcWvfnmGc7u36b97lGQOvSU4gttpoAAAAAElFTkSuQmCC")'
                        }}/>
                        <span onClick={handleNextChapter}
                              className={`next ${isLastChapter ? 'disabled' : ''}`}>
                    Chương tiếp
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
                <div className="truyen" style={{overflow: 'hidden', backgroundColor: backgroundColor, color: color}}>
                    <div>
                        <ReactQuill
                            value={chapter.content}
                            readOnly={true}
                            theme={"bubble"}
                            modules={modules}
                            formats={formats}
                            className={`ql-container ql-size-${fontSize <= 12 ? 'small' : fontSize <= 18 ? 'medium' : 'large'}`}/>
                    </div>
                </div>
                <div className="chapter_wrap">
                    <div className="chapter_control" id="gotochap">
                <span
                    onClick={handlePreviousChapter}
                    className={`back ${isFirstChapter ? 'disabled' : ''}`}
                >
                    Chương trước
                </span>
                        <span onClick={handleEditClick} className="btn-dschuong"/>
                        {/* eslint-disable-next-line no-undef */}
                        <span onClick={handleSettingClick} className="btn-dschuong" style={{
                            marginLeft: '5px'
                            ,
                            backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABGlBMVEUAAAD+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v5G2OW2AAAAXXRSTlMAAQIDBAUGBwgJCgsODxgaJicoKSotLzAxMzk7PUZKTE9QUVJUVVZZXF1eYWJjZmdoaWtsbXR4eX6FiYyPlJianZ6go6aorbK0tbe8vsXK2dze5ujp6/Hz9ff5+/1wsAonAAABHUlEQVQoz42S11KbYQxEz/djegmdGNMceoeEZqrBJHQw1Qb7vP9rcGEwP0OZ6Eqj1UirXcF/RpiZILlZ9xGo1ZWiPbHO8JIcW7IcVevr2gGQXCuP8dPd0QBEw4EzTdM8wLk2gloH0akXiyXNzxWcTWUcpN3cdIAB36Jcz7H3rzsO1ZvNgyd1iISuFe0GYEqzEbTk9QdheY7kfgPw5+TJQgKgXa+3uqpEVQ8BiFQz74C/nwHpnYLFBECH3mZ7Y/JMarYGWvPaRvg9T/9eIwA59W47V1LTJHTjsUI3GTvQJo6qB4Z/Xi6X9Gr6wYVUxiE6K5IQhiNOdZzm1DsRAVi1MrdvtfyLXndGXu350qi4tUsPcWvfnmGc7u36b97lGQOvSU4gttpoAAAAAElFTkSuQmCC")'
                        }}/>
                        <span onClick={handleNextChapter}
                              className={`next ${isLastChapter ? 'disabled' : ''}`}>
                    Chương tiếp
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
                        <Close onClick={handleCloseSettingModal}
                               style={{position: "absolute", top: '0', right: '10px', width: 'unset'}}/>
                    </div>
                    <div className="content">
                        <div className="b-ajax-wrapper">
                            <div className="col-md-6 col-sm-12">
                                <span style={{
                                    font: '700 12px Tahoma',

                                }}>
   Phóng to/nhỏ nội dung :
</span>
                                <div className="zoom-controls">
                                    <IconButton onClick={handleZoomOut} disabled={fontSize <= minFontSize}>
                                        <ZoomOutIcon/>
                                    </IconButton>
                                    <IconButton onClick={handleZoomIn} disabled={fontSize >= maxFontSize}>
                                        <ZoomInIcon/>
                                    </IconButton>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
<span style={{font: '700 12px Tahoma',

   }}>
    Màu nền chương :
</span>                                <div className="color-controls">
                                    <IconButton style={{backgroundColor: '#000000', margin: '5px', color: '#ffffff'}}
                                                onClick={() => handleColorChange('#000000', '#ffffff')}/>
                                    <IconButton style={{backgroundColor: 'pink', margin: '5px', color: '#000000'}}
                                                onClick={() => handleColorChange('pink', '#000000')}/>
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