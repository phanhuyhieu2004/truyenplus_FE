import "./Login.css"
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
    const [statusEye, setStatusEye] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleClick = () => {
        setStatusEye(statusEye => !statusEye);

    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn chặn form tự động gửi đi và tải lại trang


        if (username.length < 5 || username.length > 15) {
            alert("Tên đăng nhập phải tối thiểu từ 5 đến tối đa là  15 ký tự");
            return;
        }
        if (password.length < 5 || password.length > 15) {
            alert("Mật khẩu phải tối thiểu từ 5 đến tối đa là  15 ký tự");
            return;
        }
        axios.post("http://localhost:8080/api/account/login", {
            name: username,
            pass: password
        })
            .then(response => {
                console.log(response.data);
                const  user  = response.data;
                console.log("tài khoản là ",user)
                if (user) {
                    // lưu tài khoản vừa đăng nhâập vaào localStrage
                    localStorage.setItem("user", JSON.stringify(user));
                    alert("Đăng nhập thành công!");
                    navigate("/home");
                } else {
                    console.error("Dữ liệu người dùng không có trong phản hồi.");
                }
            })

            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert('Lỗi không xác định.');
                    console.log("Lỗi", error)
                }
            });
    }
    return (
        <>
            <main className="main-content">
                <div className="container login-container">
                    <form className="form-login" onSubmit={handleSubmit}>
                        <h1 className="form-heading">Đăng nhập</h1>
                        <div className="form-group">
                            <i class="far fa-user"></i>
                            <input type="text" className="form-input" placeholder="Tên đăng nhập" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>

                        </div>
                        <div className="form-group">
                            <i className="fas fa-key"></i>
                            <input type={statusEye ? "text" : "password"} className="form-input" placeholder="Mật khẩu"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="eye" onClick={handleClick}>
                                <i className={statusEye ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                            </div>
                        </div>
                        <div className="form-link">
                            <span>Chưa có tài khoản ? </span>

                            <a href="/register">Đăng ký</a>
                        </div>
                        <input type="submit" className="form-submit" value={"Đăng nhập"}/>
                    </form>


                </div>
            </main>
        </>
    )
}

export default Login;