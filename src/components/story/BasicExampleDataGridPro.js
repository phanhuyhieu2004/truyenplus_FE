import React, { useState, useContext, createContext } from 'react';

// Context để lưu trữ và quản lý trạng thái bộ lọc
const FilterContext = createContext();

const App = () => {
    const [filters, setFilters] = useState({
        category: '',
        level: '',
        price: '',
    });

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        setCurrentPage(1); // Reset trang khi thay đổi bộ lọc
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'ascending') {
                direction = 'descending';
            } else if (sortConfig.direction === 'descending') {
                direction = 'none'; // Không sắp xếp
            }
        }
        setSortConfig({ key, direction });
    };

    const courses = [
        { id: 1, title: 'React Basics', category: 'Frontend', level: 'Beginner', price: "1200" },
        { id: 2, title: 'Node.js Fundamentals', category: 'Backend', level: 'Intermediate', price: "2000" },
        { id: 3, title: 'Data Structures in Python', category: 'Data Science', level: 'Advanced', price: "3000" },
        { id: 4, title: 'Machine Learning Fundamentals', category: 'Data Science', level: 'Intermediate', price: "1800" },
        { id: 5, title: 'Java Programming', category: 'Backend', level: 'Beginner', price: "1000" },
        { id: 6, title: 'HTML & CSS Basics', category: 'Frontend', level: 'Beginner', price: "1000" },
        { id: 7, title: 'Database Management with SQL', category: 'Backend', level: 'Intermediate', price: "3000" },
        { id: 8, title: 'Algorithms & Data Structures in C++', category: 'Data Science', level: 'Advanced', price: "2000" },
        { id: 9, title: 'Web Development with React', category: 'Frontend', level: 'Intermediate', price: "1800" },
        { id: 10, title: 'Python for Data Analysis', category: 'Data Science', level: 'Advanced', price: "1000" },
    ];

    const filteredCourses = courses.filter((course) => {
        return (
            (filters.category === '' || course.category === filters.category) &&
            (filters.level === '' || course.level === filters.level) &&
            (filters.price === '' || course.price === filters.price)
        );
    });

    const sortedCourses = [...filteredCourses].sort((a, b) => {
        if (sortConfig.key) {
            if (sortConfig.direction === 'ascending') {
                return a[sortConfig.key] < b[sortConfig.key] ? -1 : 1;
            }
            if (sortConfig.direction === 'descending') {
                return a[sortConfig.key] > b[sortConfig.key] ? -1 : 1;
            }
            return 0;
        }
        return 0;
    });

    const paginatedCourses = sortedCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);

    return (
        <FilterContext.Provider value={{ filters, handleFilterChange }}>
            <div style={{ padding: '20px' }}>
                <h1 style={{ color: 'green' }}>GeeksforGeeks</h1>
                <h3>Using Context API for Global State</h3>
                <FilterControls />
                <table>
                    <thead>
                    <tr>
                        <th
                            onClick={() => handleSort('title')}
                            style={{
                                cursor: 'pointer',
                                opacity: sortConfig.key === 'title' ? 1 : 0.5,
                                fontWeight: sortConfig.key === 'title' ? 'bold' : 'normal'
                            }}
                        >
                            Title {sortConfig.key === 'title' ? (sortConfig.direction === 'ascending' ? '▲' : (sortConfig.direction === 'descending' ? '▼' : '▲ ▼')) : '▲ ▼'}
                        </th>
                        <th
                            onClick={() => handleSort('category')}
                            style={{
                                cursor: 'pointer',
                                opacity: sortConfig.key === 'category' ? 1 : 0.5,
                                fontWeight: sortConfig.key === 'category' ? 'bold' : 'normal'
                            }}
                        >
                            Category {sortConfig.key === 'category' ? (sortConfig.direction === 'ascending' ? '▲' : (sortConfig.direction === 'descending' ? '▼' : '▲ ▼')) : '▲ ▼'}
                        </th>
                        <th
                            onClick={() => handleSort('level')}
                            style={{
                                cursor: 'pointer',
                                opacity: sortConfig.key === 'level' ? 1 : 0.5,
                                fontWeight: sortConfig.key === 'level' ? 'bold' : 'normal'
                            }}
                        >
                            Level {sortConfig.key === 'level' ? (sortConfig.direction === 'ascending' ? '▲' : (sortConfig.direction === 'descending' ? '▼' : '▲ ▼')) : '▲ ▼'}
                        </th>
                        <th
                            onClick={() => handleSort('price')}
                            style={{
                                cursor: 'pointer',
                                opacity: sortConfig.key === 'price' ? 1 : 0.5,
                                fontWeight: sortConfig.key === 'price' ? 'bold' : 'normal'
                            }}
                        >
                            Price {sortConfig.key === 'price' ? (sortConfig.direction === 'ascending' ? '▲' : (sortConfig.direction === 'descending' ? '▼' : '▲ ▼')) : '▲ ▼'}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedCourses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.category}</td>
                            <td>{course.level}</td>
                            <td>{course.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '10px' }}>
                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                        First
                    </button>
                    <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))} disabled={currentPage === totalPages}>
                        Next
                    </button>
                    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
                        Last
                    </button>
                </div>
            </div>
        </FilterContext.Provider>
    );
};

const FilterControls = () => {
    const { filters, handleFilterChange } = useContext(FilterContext);
    return (
        <div style={{ marginBottom: '10px' }}>
            <select name="category" value={filters.category} onChange={handleFilterChange} style={{ marginRight: '10px' }}>
                <option value="">All Categories</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Data Science">Data Science</option>
            </select>
            <select name="level" value={filters.level} onChange={handleFilterChange} style={{ marginRight: '10px' }}>
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
            <select name="price" value={filters.price} onChange={handleFilterChange}>
                <option value="">All Prices</option>
                <option value="1000">1000</option>
                <option value="1200">1200</option>
                <option value="1500">1500</option>
                <option value="1800">1800</option>
                <option value="2000">2000</option>
                <option value="2200">2200</option>
                <option value="2500">2500</option>
            </select>
        </div>
    );
};

export default App;
