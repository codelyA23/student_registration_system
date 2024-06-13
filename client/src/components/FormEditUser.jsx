import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CCol,
  CButton,
  CForm,
  CContainer,
  CRow,
  CFormInput,
  CFormSelect,
  CInputGroupText,
  CInputGroup
} from '@coreui/react'
import moment from "moment";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { BiArrowBack } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";

const FormEditUser = () => {

  const { user } = useSelector((state) => state.auth);
  const updatedBy = user && user.first_name
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [UpdatedBy, setUpdatedBy] = useState(`${updatedBy}`);
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user_id } = useParams();

  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)
  const handleTogglePassword = () => {
      setShowPassword(!showPassword)
    }
  
  const handleToggleConfPassword = () => {
      setShowConfPassword(!showConfPassword)
    }
 



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

  useEffect(() => {
    const getUserById = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(
          `http://localhost:2402/users/${user_id}`,
          config
        );

        setUsername(response.data.username);
        setFirst_name(response.data.first_name);
        setLast_name(response.data.last_name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [user_id]);

  const updateUser = async (e) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:2402/users/${user_id}`,
        {
          username: username,
          first_name: first_name,
          last_name: last_name,
          email: email,
          role: role,
          UpdatedBy:UpdatedBy
        },
        {
          headers: {
            Authorization: authHeader
          }
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
          marginTop: "30px"
        }}
      >
        <div
          className="card-content"
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
        >
          <div className="content">
            <form onSubmit={updateUser}>
              <Link
                to="/listUsers"
                className="button  mb-2 bg-danger"
                style={{
                  background: "black",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "15PX",
                  fontWeight: "bold"
                }}
              >
                <span><BiArrowBack/></span>
              </Link>
              <p
                className="subtitle text-center"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                EDIT USER
              </p>
              <p className="has-text-centered" style={{color:"red"}}>{msg}</p>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  UserName
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
                  Last Name
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

              <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                  hidden
                >
                  UpdatedBy
                </label>

                <CInputGroup className="mb-4" hidden>
                  <CFormInput
                    id="confPassword"
                    type= "text"
                    className="input"
                    value={updatedBy}
                    onChange={(e) => setUpdatedBy(e.target.value)}
                    placeholder="updated by"
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CInputGroup>
              

              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className="button bg-success"
                    style={{
                      background: "black",
                      color: "white",
                      fontSize: "15PX",
                      fontWeight: "bold"
                    }}
                    // onClick={handleAuditEdit}
                  >
                    <span><FaUserEdit/></span> {''} Save
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

export default FormEditUser;
