import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import {
  CCol,
  CButton,
  CForm,
  CContainer,
  CRow,
  CFormInput,
  CFormSelect,
  CInputGroupText,
  CInputGroup,
} from "@coreui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {MdPersonAddAlt1} from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";



const FormAddUser = () => {
  const { user } = useSelector((state) => state.auth);
  const createdBy = user && user.first_name
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [CreatedBy, setCreatedBy] = useState(`${createdBy}`);
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfPassword = () => {
    setShowConfPassword(!showConfPassword);
  };

  

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

  const saveUser = async (e) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:2402/users",
        {
          username: username,
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          confPassword: confPassword,
          role: role,
          CreatedBy:CreatedBy
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      navigate("/listUsers");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };


  return (
    <div>
      <div
        className="card is-shadowless"
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "30px",
        }}
      >
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveUser}>
              <Link
                to="/listUsers"
                className="button  mb-2 bg-danger"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "15PX",
                  fontWeight: "bold",
                }}
              >
                <span><BiArrowBack/></span>
              </Link>
              <p
                className="subtitle text-center"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                ADD USER
              </p>
              <p className="has-text-centered" style={{ color: "red" }}>
                {msg}
              </p>
              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Name
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  First Name
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                    placeholder="enter first name"
                  />
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  First Name
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    placeholder="enter last name"
                  />
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Email
                </label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sample@gmail.com"
                  />
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Password
                </label>
                <CInputGroup className="mb-4">
                  <CFormInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <CInputGroupText onClick={handleTogglePassword}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </CInputGroupText>
                </CInputGroup>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Confirm Password
                </label>
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
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Role
                </label>
                <div className="control">
                  <select
                    type="text"
                    class="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>SELECT OPTION</option>
                    <option value="staff">Staff</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>
              </div>

              
              <div className="field" hidden>
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  CreatedBy
                </label>
                <CInputGroup className="mb-4">
                  <CFormInput
                    id="confPassword"
                    type="text"
                    className="input"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    placeholder="created by"
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CInputGroup>
              </div>

              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className="button"
                    style={{
                      background: "green",
                      color: "white",
                      textDecoration: "none",
                      fontSize: "15PX",
                      fontWeight: "bold",
                    }}
                    // onClick={handleAuditTrails}
                  >
                   <span><MdPersonAddAlt1/></span> {''} Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
