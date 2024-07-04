import { useEffect, useState } from "react";
import "./Header.css";
import axios from "axios";
import {Link} from "react-router-dom";


function Header() {
    const [isActive, setIsActive] = useState(false);
    const [subMenu, setSubMenu] = useState(null);
    const [menuTitle, setMenuTitle] = useState('');
    const [categories, setCategories] = useState([]);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        axios.get('https://poetic-heart-production.up.railway.app/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Lôi không lấy được list danh mục:', error);
            });
    }, []);
    const showSubMenu = (hasChildren) => {
        setSubMenu(hasChildren.querySelector('.menu-subs'));
        setMenuTitle(hasChildren.querySelector('i').parentNode.childNodes[0].textContent);
        hasChildren.querySelector('.menu-subs').classList.add('active');
        hasChildren.querySelector('.menu-subs').style.animation = 'slideLeft 0.5s ease forwards';
        document.querySelector('.menu-mobile-header').classList.add('active');
    };

    const hideSubMenu = () => {
        if (subMenu) {
            subMenu.style.animation = 'slideRight 0.5s ease forwards';
            setTimeout(() => {
                subMenu.classList.remove('active');
                setSubMenu(null);
                setMenuTitle('');
                document.querySelector('.menu-mobile-header').classList.remove('active');
            }, 300);
        }
    };

    const handleClickOutside = (event) => {
        if (!document.querySelector('.menu').contains(event.target) && !document.querySelector('.menu-mobile-trigger').contains(event.target)) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 991 && isActive) {
                setIsActive(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isActive]);

    return (
        <>

            <header className="header">
                <div className="container container-header">
                    <div className="header-top">
                        <div className="header-search">
                            <div className="searching">
                                <form >
                                    <input
                                        id="search"
                                        autoComplete="off"
                                        placeholder="Nhập tên hoặc tác giả..."
                                        name="q"
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
                <div className="container">
                    <div className="wrapper header-wrap">
                        <div className="header-item-left">
                            <div className="top-logo">
                                <a href="/home" title="Truyện Plus - Đọc truyện online nhanh nhất">
                                    <img
                                        src="https://github.com/phanhuyhieu2004/truyenplus_FE/blob/master/public/Remove-bg.ai_1720107171402.png"
                                        alt="Đọc truyện Online, Truyenplus.vn"
                                        title="Đọc truyện Online, Truyenplus.vn"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="header-item-center">
                            <div className={`overlay ${isActive ? 'active' : ''}`} />
                            <nav className={`menu ${isActive ? 'active' : ''}`} id="menu">
                                <div className="menu-mobile-header">
                                    <button type="button" className="menu-mobile-arrow" onClick={hideSubMenu}>
                                        <i className="fa fa-angle-left"/>
                                    </button>
                                    <div className="menu-mobile-title">{menuTitle}</div>
                                    <button type="button" className="menu-mobile-close" onClick={toggleMenu}>
                                        <i className="fa fa-close"/>
                                    </button>
                                </div>
                                <ul className="menu-section" onClick={(e) => {
                                    if (!isActive) return;
                                    const hasChildren = e.target.closest('.menu-item-has-children');
                                    if (hasChildren) showSubMenu(hasChildren);
                                }}>
                                    <li className="menu-item-has-children">
                                        <a href="/home" className="dropdown">
                                            DANH MỤC <i className="fa fa-angle-down"/>
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
                                        <a href="/home" className="dropdown">
                                            THỂ LOẠI <i className="fa fa-angle-down"/>
                                        </a>
                                        <ul className="menu-subs menu-mega menu-column-3">
                                            {categories.map((category) => (
                                                <li className="menu-item">
                                                    <Link to={`/category/${category.categoryId}`}>{category.categoryName}</Link>                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <a href="/home">NGÔN TÌNH</a>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <a href="/home">BLOG </a>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <a href="/home">
                                            NHIỆM VỤ <span className="label-menu">Free</span>
                                        </a>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <span  className="dropdown">
                                            TÀI KHOẢN <i className="fa fa-angle-down"/>
                                        </span>
                                        <ul className="menu-subs menu-column-1">

                                            <li className="menu-item">
                                                <a href="/list">Danh sách truyện</a>
                                            </li><li className="menu-item">
                                                <a href="/create">Thêm truyện</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="header-item-right">
                            <a href="/home" className="menu-icon">
                                <i className="ion ion-md-search"/>
                            </a>
                            <a href="/home" className="menu-icon">
                                <i className="ion ion-md-heart"/>
                            </a>
                            <a href="/home" className="menu-icon">
                                <i className="ion ion-md-cart"/>
                            </a>
                            <button type="button" className="menu-mobile-trigger" onClick={toggleMenu}>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
