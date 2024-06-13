import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CButton,
  CPopover,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdDeleteForever, MdOutlineCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.flash.min.js";
import * as jzip from "jszip";
import "pdfmake";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jzip;

const CourseList = () => {
  const [course, setCourse] = useState([]);

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

  const deleteCourse = async (course_id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:2402/coursesDelete/${course_id}`, config);
      getCourse();
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Request error:", error.response);
      } else {
        console.error("General error:", error);
      }
    }
  };


  const [visible, setVisible] = useState(false);

  $("#stsTokenDisplay").DataTable().destroy();
  setTimeout(() => {
    $(document).ready(function () {
      $("#stsTokenDisplay").DataTable({
        pagingType: "full_numbers",
        pageLength: 5,
        destroy: true,
        processing: true,
        dom: "Bfrtip",
        buttons: ["copy", "csv", "excel", "pdf", "print"],
      });
    });
  });

  return (
    <div style={{ width: "98%", marginRight: "auto", marginLeft: "auto", marginTop:"40px" }}>
      <Link
        to="/courses/add"
        className="button  mb-2 bg-info"
        style={{
          background: "black",
          color: "white",
          fontWeight: "bold",
          fontSize: "15PX",
          textDecoration: "none",
        }}
       
      >
        <span>
          <AiOutlineUsergroupAdd />
        </span>
        Add User
      </Link>

      <table
        className="table is-striped is-fullwidth"
        id="stsTokenDisplay"
        style={{
          fontSize: "15px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <thead>
          <tr>
            <th>No</th>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Credits</th>
            <th>Availability</th>
            <th>CreatedBy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {course.map((course, index) => (
            <tr key={course.course_id}>
              <td>{index + 1}</td>
              <td>{course.course_code}</td>
              <td>{course.course_name}</td>
              <td>{course.description}</td>
              <td>{course.credits}</td>
              <td>{course.availability}</td>
              <td>{course.CreatedBy}</td>
              <td>
                <CButton className="btn bg-info" style={{ fontWeight: 700 }}>
                  <Link
                    to={`/courses/edit/${course.course_id}`}
                    // onClick={handleAuditTrail}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <BiEdit />
                  </Link>
                </CButton>               
                <CButton
                   onClick={() => deleteCourse(course.course_id)}
                  style={{
                    background: "red",
                    color: "black",
                    fontSize: "15px",
                    fontWeight: "bold",
                    margin: "2px",
                  }}
                >
                  <span style={{ color: "white" }}>
                    <MdDeleteForever />
                  </span>
                </CButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
