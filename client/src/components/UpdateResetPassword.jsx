import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CCardGroup,
  CCard,
  CCol,
  CButton,
  CForm,
  CContainer,
  CRow,
  CFormInput,
  CInputGroupText,
  CInputGroup,
} from "@coreui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import moment from "moment";
import {MdOutlineSystemUpdate} from "react-icons/md";



const ResetPassword = () => {
  const [userPassword, setUserPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const currentDate = moment().format("DD-MM-YYYY");
  const date = new Date();
  const current_time =
    date.getHours() +
    ":" +
    " " +
    date.getMinutes() +
    ":" +
    " " +
    date.getSeconds();
  const today = current_time + "  " + currentDate;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfPassword = () => {
    setShowConfPassword(!showConfPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tokenHeader;
    let authHeader;
    tokenHeader = localStorage.getItem("token");
    authHeader = `Bearer ${tokenHeader}`;

    if (userPassword !== confPassword) {
      setMessage("Passwords do not match");
      return;
    }

    axios
      .post(
        `http://localhost:2402/reset-password/${token}`,
        {
          userPassword,
          confPassword,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const handleAuditUpdatePassword = async () => {
    const actor = user.userName;
    const action = 'Reset Password';
    const performedDate = today;
    const token = localStorage.getItem("token")
    const authHeader = `Bearer ${token}`

    await axios
      .post("http://172.25.160.235:2402/auditTrail", {
        actor,
        action,
        performedDate,
      },
      {
        headers :{
          Authorization:authHeader
        }
      }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <h4
                  className="has-text-centered"
                  style={{
                    fontSize: "15px",
                    textAlign: "center",
                    color: "green",
                  }}
                >
                  {message}
                </h4>
                <CForm
                  onSubmit={handleSubmit}
                  className="box"
                  style={{ width: "100%" }}
                >
                  <h4
                    className="title is-4"
                    style={{
                      textAlign: "center",
                      fontWeight: " 800",
                      fontSize: "15px",
                    }}
                  >
                    Update your New Password
                  </h4>
                  <CInputGroup className="mb-4">
                    <CFormInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="current-password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <CInputGroupText onClick={handleTogglePassword}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </CInputGroupText>
                  </CInputGroup>

                   <CInputGroup className="mb-4">
                  <CFormInput
                    required
                    id="confPassword"
                    minLength={8}
                    type={showConfPassword ? "text" : "password"}
                    className="input"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="confirm password"
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                  <CInputGroupText onClick={handleToggleConfPassword}>
                    {showConfPassword ? <FaEyeSlash /> : <FaEye />}
                  </CInputGroupText>
                </CInputGroup>

                  <hr />

                  <CRow>
                    <CCol xs={6}>
                      <CButton
                        id="login"
                        style={{
                          background: "green",
                          color: "white",
                          textDecoration: "none",
                          fontSize: "15PX",
                          fontWeight: "bold",
                          border: "solid 2px yellow",
                        }}
                        type="submit"
                        onClick={handleAuditUpdatePassword}
                      >
                        <span><MdOutlineSystemUpdate/></span>
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ResetPassword;
