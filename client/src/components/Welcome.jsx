// import React, {useEffect,useState}from "react";
// import { useSelector } from "react-redux";
// import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// import DashboardDesign from "./DashboardDesign"
// import axios from "axios"
// import {
//   CRow,
//   CCol,
//   CWidgetStatsA,
//   CCard
// } from '@coreui/react'

// const Welcome = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [staffinformationTotalVoiceSum, setStaffinformationTotalVoiceSum] = useState([]);
//   const [staffinformationTotalDataSum, setStaffinformationTotalDataSum] = useState([]);


  
//   useEffect(() => {
//     console.log("Effect is running...");
  
//     const token = localStorage.getItem("token");
//     if (token) {
//       const authHeader = `Bearer ${token}`;
  
//       axios.get("http://localhost:2402/staffinformationTotalVoiceSum", {
//         headers: {
//           Authorization: authHeader,
//         },
//       })
//         .then((response) => {
//           // Transform the data into the format expected by Recharts
//           const transformedVoice = Object.keys(response.data.monthlySums).map((month) => ({
//             label: month,
//             value: response.data.monthlySums[month],
//           }));
          
//           console.log("Transformed Data:", transformedVoice);
  
//           setStaffinformationTotalVoiceSum(transformedVoice);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     } else {
//       console.error("No token found. User not authenticated.");
//     }
  
//     console.log("Effect is finished...");
//   }, []);


//   useEffect(() => {
//     console.log("Effect is running...");
  
//     const token = localStorage.getItem("token");
//     if (token) {
//       const authHeader = `Bearer ${token}`;
  
//       axios.get("http://localhost:2402/staffinformationTotalDataSum", {
//         headers: {
//           Authorization: authHeader,
//         },
//       })
//         .then((response) => {
//           // Transform the data into the format expected by Recharts
//           const transformedData = Object.keys(response.data.monthlySums).map((month) => ({
//             label: month,
//             value: response.data.monthlySums[month],
//           }));
          
//           console.log("Transformed Data:", transformedData);
  
//           setStaffinformationTotalDataSum(transformedData);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     } else {
//       console.error("No token found. User not authenticated.");
//     }
  
//     console.log("Effect is finished...");
//   }, []);
  
  
//   return (
//     <>
//     <div style={{marginTop:"25px"}}>
//     <DashboardDesign/>
//     </div>
//     <br/>
//     {/* Voice charts */}
    
//       <CRow>
        
//     <div className="row">
//     <CCard className="p-4" style={{marginLeft:"10px"}}>
//         <div className="section col-md-12">
//           <h6 className="section-title">Voice Chart</h6>
//           <div className="section-content">
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={staffinformationTotalVoiceSum} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
//                 <Tooltip />
//                 <XAxis dataKey="label" />
//                 <YAxis dataKey="value" />
//                 <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//                 <Legend />
//                 <Line type="monotone" dataKey="value" stroke="#F94C10" name="Voice Monthly Total" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//         </CCard>
      
//         <CCard className="p-4" style={{marginTop:"20px", marginLeft:"10px"}}>
//         <div className="section col-md-12">
//           <h6 className="section-title">Data Chart</h6>
//           <div className="section-content">
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={staffinformationTotalDataSum} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
//                 <XAxis dataKey="label" />
//                 <YAxis dataKey="value" />
//                 <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="value" fill="#F94C10" name="Data Monthly Total" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//         </CCard>
//     </div>

//       </CRow>
//     </>
//   );
// };

// export default Welcome;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import DashboardDesign from "./DashboardDesign";
import axios from "axios";
import {
  CRow,
  CCol,
  CWidgetStatsA,
  CCard,
  CFormSelect
} from '@coreui/react';

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);


  return (
    <>
      <div style={{ marginTop: "25px" }}>
        <DashboardDesign />
      </div>
    </>
  );
};

export default Welcome;

