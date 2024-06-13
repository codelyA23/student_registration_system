import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
} from "@coreui/react";
import { useSelector } from "react-redux";
import moment from "moment";
import { RiMailAddFill } from "react-icons/ri";

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

const ResetPassword = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.auth);

  // const SendResetLink = async (e) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("token");
  //   const authHeader = `Bearer ${token}`;
  //   try {
  //     await axios.post(
  //       "http://localhost:2402/forgetPassword",
  //       {
  //         userEmail: userEmail,
  //       },
  //       {
  //         headers: {
  //           Authorization: authHeader,
  //         },
  //       }
  //     );
  //     navigate("/listUsers");
  //   } catch (error) {
  //     if (error.response) {
  //       setMessage(error.response.data.message);
  //     }
  //   }
  // };

  const SendResetLink = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      await axios.post(
        "http://localhost:2402/forgotPassword",
        {
          userEmail: userEmail,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      // On success, set a success message
      setMessage("Password reset link sent successfully");
      navigate("/listUsers");
    } catch (error) {
      if (error.response) {
        // On failure, set an error message
        setMessage(error.response.data.message);
      }
    }
  };

  const handleResetPassword = async () => {
    const actor = user.userName;
    const action = `reset password ${userEmail}`;
    const performedDate = today;
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    await axios
      .post(
        "http://localhost:2402/auditTrail",
        {
          actor,
          action,
          performedDate,
        },
        {
          headers: {
            Authorization: authHeader,
          },
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
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center login-page">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={5} style={{ marginTop: "-300px" }}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={SendResetLink}>
                      {message && (
                        <div
                          className={`alert ${
                            message === "Password reset link sent successfully"
                              ? "alert-success"
                              : "alert-error"
                          }`}
                        >
                          {message}
                        </div>
                      )}
                      <p className="title is-5" style={{ textAlign: "center" }}>
                        Reset Password
                      </p>
                      <p
                        className="text-medium-emphasis"
                        style={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        Enter your Email
                      </p>
                      <p>{message}</p>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          required
                          id="email"
                          className="input"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          type="email"
                          placeholder="name@example.com"
                          aria-describedby="exampleFormControlInputHelpInline"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={8}>
                          <hr />

                          <div className="d-grid gap-1">
                            <CButton
                              id="forgetpassword"
                              style={{
                                background: "green",
                                color: "white",
                                textDecoration: "none",
                                fontSize: "15PX",
                                fontWeight: "bold",
                              }}
                              type="submit"
                              onClick={handleResetPassword}
                            >
                              <span><RiMailAddFill/></span> {''}Submit
                            </CButton>
                          </div>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default ResetPassword;
