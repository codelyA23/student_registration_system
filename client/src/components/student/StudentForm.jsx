import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { CInputGroup, CFormInput } from "@coreui/react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

const StudentForm = () => {
  const { user } = useSelector((state) => state.auth);
  const createdBy = user && user.first_name;
  const [formData, setFormData] = useState({
    code: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    course_id: "",
    user_id: user ? user.user_id : "",
    CreatedBy: createdBy || "",
  });
  const [msg, setMsg] = useState("");
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

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
      setCourses(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    try {
      const response = await axios.post('http://localhost:2402/studentCreate', formData, {
        headers: {
          Authorization: authHeader,
        },
      });
      setModules(response.data.modules);
      setMsg(response.data.msg);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <div className="card is-shadowless" style={{ width: "50%", marginLeft: "auto", marginRight: "auto", marginTop: "30px" }}>
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit}>
              <Link to="/listUsers" className="button mb-2 bg-danger" style={{ color: "white", textDecoration: "none", fontSize: "15PX", fontWeight: "bold" }}>
                <span><BiArrowBack /></span>
              </Link>
              <p className="subtitle text-center" style={{ fontSize: "15px", fontWeight: "bold" }}>
                ADD STUDENT
              </p>
              <p className="has-text-centered" style={{ color: "red" }}>
                {msg}
              </p>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>Code</label>
                <div className="control">
                  <input type="text" className="input" name="code" value={formData.code} onChange={handleChange} placeholder="Code" required />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>First Name</label>
                <div className="control">
                  <input type="text" className="input" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>Last Name</label>
                <div className="control">
                  <input type="text" className="input" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>Email</label>
                <div className="control">
                  <input type="email" className="input" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>Phone Number</label>
                <div className="control">
                  <input type="text" className="input" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>Date of Birth</label>
                <div className="control">
                  <input type="date" className="input" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>Address</label>
                <div className="control">
                  <input type="text" className="input" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>City</label>
                <div className="control">
                  <input type="text" className="input" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>State</label>
                <div className="control">
                  <input type="text" className="input" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>Zip Code</label>
                <div className="control">
                  <input type="text" className="input" name="zip_code" value={formData.zip_code} onChange={handleChange} placeholder="Zip Code" />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>Country</label>
                <div className="control">
                  <input type="text" className="input" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
                </div>
              </div>
              <div className="field">
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>Course</label>
                <div className="control">
                  <select name="course_id" className="input" value={formData.course_id} onChange={handleChange} required>
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.course_name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field" hidden>
                <label className="label" style={{ fontSize: "15px", fontWeight: "bold" }}>Created By</label>
                <CInputGroup className="mb-4">
                  <CFormInput type="text" className="input" name="CreatedBy" value={formData.CreatedBy} onChange={handleChange} placeholder="Created By" />
                </CInputGroup>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button" style={{ background: "green", color: "white", textDecoration: "none", fontSize: "15PX", fontWeight: "bold" }}>
                    <span><MdPersonAddAlt1 /></span> Save
                  </button>
                </div>
              </div>
            </form>
            {modules.length > 0 && (
              <div>
                <h3>Modules for selected course:</h3>
                <ul>
                  {modules.map(module => (
                    <li key={module.id}>{module.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
