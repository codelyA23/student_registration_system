import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from 'axios'
import {
  CRow,
  CCol,
  CWidgetStatsA,
  CCard
} from '@coreui/react'


const DashboardDesign = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);


  

  


  // getting the month and the year in the dashboard
  var date = new Date();
  const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
  const month1 = formatter.format(new Date());
  const value = date.getFullYear();
  const dateTime = month1 + " " + value
 

  return (
    <CCard className="p-4">
    <CRow>


 {/* Total Voice Given */}
      {/* <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={
            <>
              <span style={{fontSize:"20px"}}>NLE: {allTotalVoiceLogs.totalSum}</span>
              <span className="fs-6 fw-normal">
                <img src="https://www.svgrepo.com/show/528084/call-chat.svg" alt="" style={{ width: "40px", marginLeft:"80px",  marginTop: "5px"}} />
              </span>
            </>
          }
          title="Total Voice Given"
        />
      </CCol> */}


  {/* Total Data Given  */}
      {/* <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
             <span  style={{fontSize:"20px"}}>{allTotalSmsLogs.totalSum}<strong style={{color:"orangered"}}>GB</strong>{' '}</span> 
              <span className="fs-6 fw-normal">
                <img src="https://www.svgrepo.com/show/492653/data.svg" alt="" style={{ width: "40px", marginLeft: "80px", marginTop: "5px", }} />
              </span>
            </>
          }
          title="Total Data Given"
        />
      </CCol> */}


 {/* Total VOICE for Distrubution */}
      <p style={{fontWeight:"bold"}}>Student Application month of: {dateTime}</p>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
               <span style={{fontSize:"20px"}}>Total</span>
              <span className="fs-6 fw-normal">
              </span>
              <img src="https://www.svgrepo.com/show/336073/phone-outgoing-one.svg" alt="" style={{ width: "40px", marginLeft: "30px", marginTop: "5px" }} />
             
              
            </>
          }
          title="Total  per month"
        />
      </CCol>


  {/*Total SMS for Distrubution  */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              <span style={{fontSize:"20px"}}>Total</span>
              <span className="fs-6 fw-normal">
                <img src="https://www.svgrepo.com/show/209736/sms.svg" alt="" style={{ width: "40px", marginLeft: "70px", marginTop: "5px" }} />
              </span>
            </>
          }
          title="Total  per Month"
        />
      </CCol>

  {/*Total DATA for Distrubution  */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={
            <>
               <span style={{fontSize:"20px"}}>Total<strong style={{color:"orangered"}}> GB</strong>{' '}</span>
              <span className="fs-6 fw-normal">
                <img src="https://www.svgrepo.com/show/12462/wifi.svg" alt="" style={{ width: "40px", marginLeft: "50px", marginTop: "5px", }} />
              </span>
            </>
          }
          title="Total  per month"
        />
      </CCol>

  {/* total number of staffs */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              <span>Staff</span>
              <span className="fs-6 fw-normal">
                <img src="https://www.svgrepo.com/show/493502/men-and-women-who-bow-and-apologize.svg" alt="" style={{ width: "40px", marginLeft: "150px", marginTop: "5px", }} />
              </span>
            </>
          }
          title="Total Staffs"
        />
      </CCol>


        {user && user.role === "admin" && (
        <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>

              <span> Users</span>
              <span className="fs-6 fw-normal">
              </span>
              <img src="https://www.svgrepo.com/show/407091/person-pouting-dark-skin-tone.svg" alt="" style={{ width: "40px", marginLeft: "180px", marginTop: "5px" }} />
            </>
          }
          title="Total Users"
        />
      </CCol>

        )}
      

    </CRow>
      </CCard>
  )
}

export default DashboardDesign
