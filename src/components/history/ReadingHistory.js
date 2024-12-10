import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {Alert, Modal, Pagination, Stack, Tooltip} from "@mui/material";
import Dashboard from "../dashboard/Dashboard";

function ReadingHistory ()  {
    const [history, setHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    const accountId = user.accountId;
const [currentPage,setCurrentPage]=useState(1);
const [historyPerPage]=useState(10);
    const indexOfLastHistory=currentPage* historyPerPage;
    const indexOfFirstHistory=indexOfLastHistory-historyPerPage;
    const currentHistory=history.slice(indexOfFirstHistory,indexOfLastHistory);
    const fetchReadingHistory = async (date = '') => {
        try {
            const url = date
                ? `http://localhost:8080/api/history/account/${accountId}?date=${date}`
                : `http://localhost:8080/api/history/account/${accountId}`;

            const response = await axios.get(url);
            setHistory(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy lịch sử đọc:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (accountId) {
            fetchReadingHistory();
        }
    }, [accountId]);

    // Xử lý khi người dùng chọn ngày
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);
        fetchReadingHistory(selectedDate);
    };
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    return (
        <main>
            <meta name="robots" content="noindex, nofollow"/>
            <section className="archive__page page-single">
                <div className="container">
                    <main className="archive__content" role="main">
                        <div className="form">
                            <div className="wrapper">
                                <Dashboard></Dashboard>
                                <div className="form-content">
                                    <div className="form-title">
                                        <h1>Lịch sử đọc truyện</h1>
                                    </div>

                                    <div className={'search-date'}>
                                        <label htmlFor="date">Chọn ngày: </label>
                                        <input className={'filter-date'}
                                            type="date"
                                            id="date"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                        />
                                    </div>

                                    {history.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="responsive-table">
                                                <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Truyện</th>
                                                    <th>Chương</th>
                                                    <th>Ngày đọc</th>
                                                    <th>Hành động</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {currentHistory.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.story.title}</td>
                                                        <td>{item.chapter.title}</td>
                                                        <td>{item.readAt[2]} - {item.readAt[1]} - {item.readAt[0]}</td>
                                                        <td>
                                                            <Tooltip title="Đọc tiếp">
                                                                <Link
                                                                    to={`/chapter/${item.story.storyId}/${item.chapter.chapterId}`}>
                                                                    <i className="fa fa-eye"/>
                                                                </Link>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p>Không có lịch sử</p>
                                    )}

                                    <div className="pagination">
                                        <Pagination
                                            count={Math.ceil(history.length / historyPerPage)}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>

                    </main>
                </div>
            </section>
        </main>


    );
};

export default ReadingHistory;
