import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Register() {
    const [statusEye, setStatusEye] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleClick = () => {
        setStatusEye(statusEye => !statusEye);

    }

    const handleSubmit = (event) => {
        event.preventDefault();


        if (username.length < 5 || username.length > 15) {
            alert("Tên đăng nhập phải tối thiểu từ 5 đến tối đa là  15 ký tự");
            return;
        }
        if (password.length < 5 || password.length > 15) {
            alert("Mật khẩu phải tối thiểu từ 5 đến tối đa là  15 ký tự");
            return;
        }
        axios.post("http://localhost:8080/api/account/register", {
            name: username,
            password: password
        })
            .then(response => {
                    console.log(response.data);
                    alert("Đăng ký thành công!");
                    navigate("/login");


                    setUsername("");
                    setPassword("")
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
            <div className="main-body">

                <div className="login-container">
                    <div className="screen">
                        <div className="screen__content">
                            <form className="login" onSubmit={handleSubmit}>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input type="text" className="login__input" placeholder="Tên đăng nhập"
                                           value={username}
                                           onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                                <div className="login__field">
                                    <i className={statusEye ? "login__icon fa-solid fa-eye" : " login__icon fa-solid fa-eye-slash"}
                                       onClick={handleClick}></i>

                                    <input type={statusEye ? "text" : "password"} className="login__input"
                                           placeholder="Mật khẩu" value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <button className="button login__submit">
                                    <span className="button__text">ĐĂNG KÝ NGAY</span>
                                    <i className="button__icon fas fa-chevron-right"></i>
                                </button>
                            </form>
                            <div className="social-login">

                                <h3>hoặc Đăng nhập</h3>
                                <div className="social-icons">
                                    <a href="/login" className="social-login__icon fa-solid fa-user"></a>

                                </div>

                            </div>
                        </div>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4"></span>
                            <span className="screen__background__shape screen__background__shape3"></span>
                            <span className="screen__background__shape screen__background__shape2"></span>
                            <span className="screen__background__shape screen__background__shape1"></span>
                        </div>
                    </div>
                </div>
            </div>

            </>
            )
            }

            export default Register;