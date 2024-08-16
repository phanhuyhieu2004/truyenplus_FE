import { useEffect, useState } from "react";
import "./Header.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const [isActive, setIsActive] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const toggleMenu = () => {
        setIsActive(!isActive);
    };
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
                            <div className={`overlay ${isActive ? 'active' : ''}`} />
                            <nav className={`menu ${isActive ? 'active' : ''}`} id="menu">
                                <ul className="menu-section" >
                                    <li className="menu-item-has-children">
                                        <a href="/home" className="dropdown">
                                            <i className="fa-solid fa-list"></i> DANH MỤC <i
                                            className="fa-solid fa-caret-down"></i>
                                        </a>
                                        <ul className="menu-subs menu-mega menu-column-3">
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Truyện Full"
                                                >
                                                    Truyện Full
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="/home" title="Danh sách Truyện Hot">
                                                    Truyện Hot
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Ngôn Tình Ngắn"
                                                >
                                                    Ngôn Tình Ngắn
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Ngôn Tình Hay"
                                                >
                                                    Ngôn Tình Hay
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Ngôn Tình 18+"
                                                >
                                                    Ngôn Tình 18+
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Ngôn Tình Hoàn"
                                                >
                                                    Ngôn Tình Hoàn
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Ngôn Tình Ngược"
                                                >
                                                    Ngôn Tình Ngược
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Ngôn Tình Sủng"
                                                >
                                                    Ngôn Tình Sủng
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Ngôn Tình Hài"
                                                >
                                                    Ngôn Tình Hài
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Ngôn Tình Sắc"
                                                >
                                                    Ngôn Tình Sắc
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Đam Mỹ Hay"
                                                >
                                                    Đam Mỹ Hay
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="/home" title="Danh sách Đam Mỹ Hài">
                                                    Đam Mỹ Hài
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="/home" title="Danh sách Đam Mỹ H">
                                                    Đam Mỹ H
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Truyện Teen Hay"
                                                >
                                                    Truyện Teen Hay
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/home"
                                                    title="Danh sách Kiếm Hiệp Hay"
                                                >
                                                    Kiếm Hiệp Hay
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="/danh-sach/truyen-tien-hiep-hay"
                                                    title="Danh sách Tiên Hiệp Hay"
                                                >
                                                    Tiên Hiệp Hay
                                                </a>
                                            </li>
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
                                                    <Link to={`/category/${category.categoryName}`}><i class="fa fa-tags"></i> {category.categoryName}
                                                    </Link></li>
                                            ))}
                                        </ul>
                                    </li>

                                    <li className="menu-item-has-children">
                                        <a href="/home"><i class="fa-brands fa-blogger"></i> BLOG </a>
                                    </li>

                                    {user ? (<li className="menu-item-has-children">
                                        <span className="dropdown">
                                            Xin chào {user.name} <i
                                            className="fa-solid fa-caret-down"></i>
                                        </span>
                                            <ul className="menu-subs menu-column-1">

                                            <li className="menu-item">
                                                    <a href="/list">Danh sách truyện</a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="/create">Thêm truyện</a>
                                                </li>
                                                <li className="menu-item">
                                                    <button onClick={handleLogout}
                                                            style={{all: 'unset', cursor: 'pointer'}}>
                                                        Đăng xuất
                                                    </button>
                                                </li>
                                            </ul>
                                        </li>)
                                        : (<li className="menu-item-has-children">
                                            <a className="dropdown" href={"/login"}>
                                                <i className="fa-solid fa-user"></i> ĐĂNG NHẬP
                                            </a>

                                        </li>)
                                    }
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
        </>
    );
}

export default Header;
