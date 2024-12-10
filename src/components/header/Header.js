import {useEffect, useState} from "react";
import "./Header.css";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";

function Header() {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));


    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Lôi không lấy được list danh mục:', error);
            });
    }, []);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?searchTerm=${searchTerm}`);
    };

   useEffect(()=>{
       const searchParams = new URLSearchParams(location.search);
       const query = searchParams.get('searchTerm');
       if (query) {
           setSearchTerm(query);
       }
   },[])
    const [isStoryMenuOpen, setStoryMenuOpen] = useState(false);
    const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);
    const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
    const toggleStoryMenu = (event) => {
        event.preventDefault();
        setStoryMenuOpen(!isStoryMenuOpen);
    };
    const toggleAccountMenu = (event) => {
        event.preventDefault();
        setAccountMenuOpen(!isAccountMenuOpen);
    }
    console.log("kd", isCategoryMenuOpen)
    const toggleCategoryMenu = (event) => {
        event.preventDefault();
        setCategoryMenuOpen(!isCategoryMenuOpen);
    };
    return (
        <>
            <header className="header">

                <div className="container">
                    <div className="wrapper header-wrap">
                        <div className="header-item-left">
                            <div className="top-logo">
                                <a href="/home" title="Truyện Plus - Đọc truyện online nhanh nhất">
                                    <img
                                        src="https://github.com/phanhuyhieu2004/truyenplus_FE/blob/master/public/Capture(1).png?raw=true"
                                        alt="Đọc truyện Online, Truyenplus.vn"
                                        title="Đọc truyện Online, Truyenplus.vn"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="header-item-center">
                            <nav className={`menu`} id="menu">
                                <ul className="menu-section" id="navbar__list--pc">
                                    <li className="menu-item-has-children">
                                        <a href="/home" className="dropdown">
                                            <i className="fa-solid fa-list"></i> DANH MỤC <i
                                            className="fa-solid fa-caret-down"></i>
                                        </a>
                                        <ul className="menu-subs menu-mega menu-column-3">
                                            <li className="menu-item">
                                                <Link to={`/newStory/`}><i
                                                    className="fa fa-refresh"></i> Mới Cập Nhật
                                                </Link></li>
                                            <li className="menu-item">
                                                <Link to={`/fullStory/`}><i className="fa-solid fa-book"></i> Truyện
                                                    Full
                                                </Link></li>
                                            <li className="menu-item">
                                                <Link to={`/likes/`}><i className="fa-solid fa-heart"></i> Yêu Thích
                                                </Link></li>
                                            <li className="menu-item">
                                                <Link to={`/viewsStory/`}><i
                                                    className="fa fa-eye"></i>  Xem Nhiều
                                                </Link></li>


                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <span className="dropdown">
                                           <i className="fa-solid fa-list"></i> THỂ LOẠI <i
                                            className="fa-solid fa-caret-down"></i>
                                        </span>
                                        <ul className="menu-subs menu-mega menu-column-3">
                                            {categories.map((category) => (
                                                <li className="menu-item">
                                                    <Link to={`/category/${category.categoryName}`}><i
                                                        class="fa fa-tags"></i> {category.categoryName}
                                                    </Link></li>
                                            ))}
                                        </ul>
                                    </li>

                                    <li className="menu-item-has-children">
                                        <a href="/home"><i class="fa-brands fa-blogger"></i> BLOG </a>
                                    </li>

                                    {user ? (
                                        <li className="menu-item-has-children">
        <span className="dropdown">
            Xin chào {user.name} <i className="fa-solid fa-caret-down"></i>
        </span>
                                            <ul className="menu-subs menu-column-1">
                                                {user.role !== 1 && (
                                                    <>
                                                        <li className="menu-item">
                                                            <a href="/list"> <i class="fa-solid fa-list-ul"></i> Danh sách truyện</a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="/create"><i class="fa-solid fa-plus"></i> Thêm truyện</a>
                                                        </li>
                                                    </>
                                                )}
                                                <li className="menu-item">

                                                    <a href="/history"> <i className="fa-solid fa-list"> </i> Lịch sử
                                                        truyện</a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="#" onClick={handleLogout}><i
                                                        class="fa-solid fa-right-from-bracket"></i> Đăng
                                                        xuất</a>
                                                </li>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li className="menu-item-has-children">
                                            <a className="dropdown" href="/login">
                                                <i className="fa-solid fa-user"></i> ĐĂNG NHẬP
                                            </a>
                                        </li>
                                    )}

                                </ul>
                            </nav>
                        </div>
                        <div className="header-item-right">
                            <div className="header-search">
                                <div className="searching">
                                    <form onSubmit={handleSearchSubmit}>
                                        <input
                                            id="search"
                                            autoComplete="off"
                                            placeholder="Nhập tên hoặc tác giả..."
                                            name="q"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                        <button type="submit">
                                            <i className="fa fa-search"/>
                                        </button>
                                    </form>
                                    <div id="div--q"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="mobile-header">
                <input type="checkbox" name="menu-checkbox" id="menu-checkbox" className="menu-checkbox" hidden/>
                <label htmlFor="menu-checkbox">
                    <svg className="menu-header__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor"
                              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                    </svg>
                </label>
                <label htmlFor="menu-checkbox" className="menu-overlay"></label>
                <div className="menu-drawer">
                    <div className="menu-drawer__top">

                        <label htmlFor="menu-checkbox">
                            <svg className="close__menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                      d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
                            </svg>
                        </label>
                    </div>
                    <ul id="navbar__list--mobile">
                        <li className="menu-item-has-children">
                    <span className="dropdown" onClick={toggleStoryMenu}>
                        <i className="fa-solid fa-list"></i> DANH MỤC <i className="fa-solid fa-caret-down"></i>
                    </span>
                            {isStoryMenuOpen && (
                                <ul className="menu-subs menu-mega menu-column-3">
                                    <li className="menu-item">
                                        <a href={`/newStory/`} className="title-mobile"><i
                                            className="fa fa-refresh"></i> Mới Cập Nhật
                                        </a></li>
                                    <li className="menu-item">
                                        <a href={`/fullStory/`} className="title-mobile"><i className="fa-solid fa-book"></i> Truyện
                                            Full
                                        </a></li>
                                    <li className="menu-item">
                                        <a href={`/likes/`} className="title-mobile"><i className="fa-solid fa-heart"></i> Yêu Thích
                                        </a></li>
                                    <li className="menu-item">
                                        <a href={`/viewsStory/`} className="title-mobile"><i
                                            className="fa fa-eye"></i> Xem Nhiều
                                        </a></li>


                                </ul>
                            )}
                        </li>

                        {/* Menu THỂ LOẠI */}
                        <li className="menu-item-has-children">
                    <span className="dropdown" onClick={toggleCategoryMenu}>
                        <i className="fa-solid fa-list"></i> THỂ LOẠI <i className="fa-solid fa-caret-down"></i>
                    </span>
                            {isCategoryMenuOpen && (
                                <ul className="menu-subs menu-mega menu-column-3">
                                    {categories.map((category) => (
                                        <li key={category.categoryName} className="menu-item">
                                            <Link to={`/category/${category.categoryName}`} className={"title-mobile"}><i
                                                className="fa fa-tags"></i> {category.categoryName}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        {/* Menu BLOG */}
                        <li className="menu-item-has-children">
                            <a href="/home" className={'title-mobile'}><i className="fa-brands fa-blogger"></i> BLOG </a>
                        </li>

                        {/* Hiển thị đăng nhập hoặc thông tin người dùng */}
                        {user ? (
                            <li className="menu-item-has-children">
                        <span className="dropdown" onClick={toggleAccountMenu}>
                            Xin chào {user.name} <i className="fa-solid fa-caret-down"></i>
                        </span>
                                {isAccountMenuOpen && (
                                    <ul className="menu-subs menu-column-1">
                                        {user.role !== 1 && (
                                            <>
                                                <li className="menu-item">
                                                    <a href="/list" className={'title-mobile'}> <i class="fa-solid fa-list-ul"></i> Danh sách truyện</a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="/create" className={'title-mobile'}><i class="fa-solid fa-plus"></i> Thêm truyện</a>
                                                </li>
                                            </>
                                        )}
                                        <li className="menu-item">
                                            <a href="/history" className={'title-mobile'}><i className="fa-solid fa-list"></i> Lịch sử truyện</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#" className={'title-mobile'} onClick={(e) => {
                                                e.preventDefault();
                                                console.log("Đăng xuất");
                                            }}>
                                                <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        ) : (
                            <li className="menu-item-has-children">
                                <a className="dropdown" href="/login">
                                    <i className="fa-solid fa-user"></i> ĐĂNG NHẬP
                                </a>
                            </li>
                        )}

                    </ul>

                </div>

            </div>
        </>
    );
}

export default Header;
