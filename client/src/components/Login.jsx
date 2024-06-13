import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CFormInput, CInputGroupText, CInputGroup } from "@coreui/react";
import orange from "../assets/images/logo2.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = async (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <>
      <div class="form-bg">
        <div class="container">
          <div class="row">
            <div class="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
              <div class="form-container">
                <form class="form-horizontal" onSubmit={Auth}>
                  <div class="form-icon">
                    <i class="fa fa-user-circle"></i>
                  </div>
                  <div class="form-group">
                    <span class="input-icon">
                      <i class="fa fa-user"></i>
                    </span>
                    <img src={orange} alt="logo" style={{ marginBottom: "20px", width: "50%", height: "20%" }} />
                    <p
                      class="title"
                      style={{
                        color: "black",
                        fontSize: "15",
                        fontWeight: "bold",
                        paddingBottom:"-50px"
                      }}
                    >
                      LIMKOKWING UNIVERSITY
                    </p>
                    <p
                      class="title"
                      style={{
                        color: "black",
                        fontSize: "15",
                        fontWeight: "bold",
                          paddingTop:"-50px"
                      }}
                    >
                      Login
                    </p>
                    <p style={{ color: "red" }}>{message}</p>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div class="form-group">
                    <CInputGroup className="mb-4">
                      <CFormInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <CInputGroupText onClick={handleTogglePassword} style={{marginBottom:"5px"}}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </CInputGroupText>
                    </CInputGroup>
                  </div>
                  <button type="submit" class="btn signin">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
