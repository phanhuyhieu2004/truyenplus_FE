import {Link} from "react-router-dom";
import React from "react";

function Dashboard(){
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="form-bar">
            <div className="clearfix">
                <img
                    src="https://static-00.iconduck.com/assets.00/cs-cat-admin-icon-512x512-3l4exe6y.png"
                    className="avatar" alt="admin"
                />
                <div className="info-text">
                    <div className="fullname">
                        <a href="/form">{user.name}</a>
                    </div>

                </div>
            </div>
            <ul className="action">
                <li>
                    {" "}
                    <Link to="/home">
                        <i className="fa fa-book-open-reader"></i> Truyện plus
                    </Link>{" "}
                </li>
                {user.role==0 && (
                    <>
                        <li>
                            {" "}
                            <Link to="/list">
                                <i className="fa fa-bars"/> Danh sách truyện
                            </Link>{" "}
                        </li>
                        <li>
                            {" "}
                            <Link to="/create">
                                <i className="fa fa-plus"></i> Thêm truyện

                            </Link>{" "}
                        </li>
                    </>
                )}
                <li>
                    {" "}
                    <Link to="/history">
                        <i className="fa-solid fa-bookmark"></i> Lịch sử đọc truyện

                    </Link>{" "}
                </li>


            </ul>
        </div>

    )
}

export default Dashboard;