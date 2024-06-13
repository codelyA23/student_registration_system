import React, { useState } from "react";
import { useNavigate,useParams, Link } from "react-router-dom";
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




const EditCourse = () => {
  const { user } = useSelector((state) => state.auth);
  const updatedBy = user && user.first_name
  const [course_code, setCourse_code] = useState("");
  const [course_name, setCourse_name] = useState("");
  const [description, setDescription] = useState("");
  const [credits, setcredits] = useState("");
  const [availability, setavailability] = useState("");
  const [UpdatedBy, setUpdatedBy] = useState(`${updatedBy}`);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { course_id } = useParams();

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
    const getCourseById = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(
          `http://localhost:2402/users/${course_id}`,
          config
        );

        setCourse_code(response.data.course_code);
        setCourse_name(response.data.course_name);
        setDescription(response.data.description);
        setcredits(response.data.credits);
        setavailability(response.data.availability);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getCourseById();
  }, [course_id]);

  const updateCourse = async (e) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:2402/coursesUpdate/${course_id}`,
        {
          course_code,
          course_name,
          description,
          credits,
          availability,
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
                Course Code
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={course_code}
                  onChange={(e) => setCourse_code(e.target.value)}
                  placeholder="enter course code"
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
                <input
                  type="text"
                  className="input"
                  value={course_name}
                  onChange={(e) => setCourse_name(e.target.value)}
                  placeholder="enter first name"
                />
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
                <input
                  type="text"
                  className="input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="description"
                />
              </div>
            </div>

            <div className="field">
              <label
                className="label"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Credit
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={credits}
                  onChange={(e) => setcredits(e.target.value)}
                  placeholder="enter credit"
                />
              </div>
            </div>

            <div className="field">
              <label
                className="label"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Availability
              </label>
              <div className="control">
                <selcet
                  type="text"
                  className="input"
                  value={availability}
                  onChange={(e) => setavailability(e.target.value)}
                >
                  <option value="">select Availability</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </selcet>
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
                >
                  <span><MdPersonAddAlt1 /></span> {''} Save Course
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

export default EditCourse;
