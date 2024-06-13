import React, { useState, useEffect } from "react";
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



const CreateStaff = () => {
  const { user } = useSelector((state) => state.auth);
  const createdBy = user && user.first_name
  const [user_id, setUser_id] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [CreatedBy, setCreatedBy] = useState(`${createdBy}`);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

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

  const saveStaff = async (e) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:2402/staffCreate",
        {
          user_id: user_id,
          department: department,
          position: position,
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


  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2402/users", {
        headers: {
          Authorization: authHeader,
        },
      });
      setUsers(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
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
            <form onSubmit={saveStaff}>
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
                Create Staff
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
                  <select
                    className="input"
                    value={user_id}
                    onChange={(e) => setUser_id(e.target.value)}
                  >
                    <option value="">Select a name</option>
                    {users.map((users) => (
                      <option key={users.user_id} value={users.user_id}>
                        {users.first_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                 Department
                </label>
                <div className="control">
                  <select
                    type="text"
                    className="input"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    
                  >
                    <option>select a department</option>
                    <option value="IT">IT</option>
                    <option value="social science">Socila Science</option>
                    <option value="socail work"> Social Work</option>
                    <option value="technology">Technology</option>
                   </select>
              
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Position
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Enter you position"
                  />
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

export default CreateStaff;
