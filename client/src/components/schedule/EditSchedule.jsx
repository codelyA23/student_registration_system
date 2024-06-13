import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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



const EditSchedule = () => {
    const { user } = useSelector((state) => state.auth);
    const updatedBy = user && user.first_name
    const createdBy = user && user.first_name
    const [course_id, setCourse_id] = useState("");
    const [module_id, setModule_id] = useState("");
    const [day_of_week, setDay_of_week] = useState("");
    const [start_time, setStart_time] = useState("");
    const [end_time, setEnd_time] = useState("");
    const [location, setLocation] = useState("");
    const [UpdatedBy, setUpdatedBy] = useState(`${updatedBy}`);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);
    const [course, setCourse] = useState([]);
    const { schedule_id } = useParams();
   

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

    useEffect(() => {
        const getModuleById = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get(
                    `http://localhost:2402/moduleById/${schedule_id}`,
                    config
                );

                setDay_of_week(response.data.day_of_week);
                setStart_time(response.data.start_time);
                setEnd_time(response.data.end_time);
                setLocation(response.data.location);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getModuleById();
    }, [schedule_id]);

    const updateModule = async (e) => {
        const token = localStorage.getItem("token");
        const authHeader = `Bearer ${token}`;
        e.preventDefault();
        try {
            await axios.patch(
                `http://localhost:2402/scheduleUpdate/${schedule_id}`,
                {
                    course_id,
                    module_id,
                    day_of_week,
                    start_time,
                    end_time,
                    location,
                    UpdatedBy
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


     // course
     useEffect(() => {
        getCourse();
        getModules()
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


      // module
  const getModules = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:2402/allModules", {
        headers: {
          Authorization: authHeader,
        },
      });
      setModules(response.data);
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
                  Schedule Class
                </p>
                <p className="has-text-centered" style={{ color: "red" }}>
                  {msg}
                </p>
  
                <div className="field">
                  <label
                    className="label"
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                  >
                    Days Of the week
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={-day_of_week}
                      onChange={(e) => setDay_of_week(e.target.value)}
                      placeholder="enter days of the week"
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
                    Module Name
                  </label>
                  <div className="control">
                    <select
                      className="input"
                      value={module_id}
                      onChange={(e) => setModule_id(e.target.value)}
                    >
                      <option value="">Select a Course</option>
                      {modules.map((modules) => (
                        <option key={modules.module_id} value={modules.modules_id}>
                          {modules.course_name}
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
                    Start Time
                  </label>
                  <div className="control">
                    <input
                      type="time"
                      className="input"
                      value={start_time}
                      onChange={(e) => setStart_time(e.target.value)}
                      placeholder="enter start time "
                    />
                  </div>
                </div>
  
                <div className="field">
                  <label
                    className="label"
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                  >
                    End Time
                  </label>
                  <div className="control">
                    <input
                      type="time"
                      className="input"
                      value={end_time}
                      onChange={(e) => setEnd_time(e.target.value)}
                      placeholder="enter last name"
                    />
                  </div>
                </div>
  
                <div className="field">
                  <label
                    className="label"
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                  >
                    Location
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="enter location of the class"
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
                      value={UpdatedBy}
                      onChange={(e) => setUpdatedBy(e.target.value)}
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

export default EditSchedule;
