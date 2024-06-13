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
import { MdPersonAddAlt1 } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";



const CreateModule = () => {
  const { user } = useSelector((state) => state.auth);
  const createdBy = user && user.first_name
  const [module_name, setModule_name] = useState("");
  const [course_id, setCourse_id] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [status, setStatus] = useState("");
  const [CreatedBy, setCreatedBy] = useState(`${createdBy}`);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);

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
        "http://localhost:2402/modules",
        {
          module_name,
          course_id,
          description,
          start_date,
          end_date,
          status,
          CreatedBy: CreatedBy
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


    // course
    useEffect(() => {
      getCourse();
    }, []);
  
    const getCourse = async () => {
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;
  
      try {
        const response = await axios.get("http://localhost:2402/courses", {
          headers: {
            Authorization: authHeader,
          },
        });
        setCourse(response.data);
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
                <span><BiArrowBack /></span>
              </Link>
              <p
                className="subtitle text-center"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Create Course
              </p>
              <p className="has-text-centered" style={{ color: "red" }}>
                {msg}
              </p>
              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Module Name
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={module_name}
                    onChange={(e) => setModule_name(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Course Name
                </label>
                <div className="control">
                  <select
                    className="input"
                    value={course_id}
                    onChange={(e) => setCourse_id(e.target.value)}
                  >
                    <option value="">Select a Course</option>
                    {course.map((course) => (
                      <option key={course.course_id} value={course.course_id}>
                        {course.course_name}
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
                  Description
                </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="enter description"
                  ></textarea>
                </div>
              </div>


              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Start Date
                </label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={start_date}
                    onChange={(e) => setStart_date(e.target.value)}
                    placeholder="enter first name"
                  />
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  End Date
                </label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={end_date}
                    onChange={(e) => setEnd_date(e.target.value)}
                    placeholder="enter last name"
                  />
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  Status
                </label>
                <div className="control">
                  <select
                    type="text"
                    class="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>SELECT STATUS</option>
                    <option value="open">Open</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
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
                    <span><MdPersonAddAlt1 /></span> {''} Save
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

export default CreateModule;
