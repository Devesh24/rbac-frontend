import React, { useEffect, useState } from "react";
import "../styles/Student.css";
import Footer from "./Footer";
import axios from "axios";
import Navbar from "./Navbar";
import { BASE_URL } from "../config";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { toastObj } from "../templateObjects";

const Student = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await axios.post(`${BASE_URL}/student/token/verify`, {
        token: window.localStorage.getItem("studentToken"),
      });
      setStudentData(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong!", toastObj);
      setTimeout(() => {
        window.location.href = "./login";
      }, 1000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar userType="Student" />
      {loading ? (
        <Loader />
      ) : (
        <div className="admin_student_profile">
          <div className="profile_top">
            <div className="profile_head">
              <p className="stu_name">{studentData.name}</p>
              <div className="profile_head_grp">
                <h4>Admission Number : </h4>
                <p>{studentData.admNo}</p>
              </div>
              <div className="profile_head_grp">
                <h4>Class : </h4>
                <p>{studentData.class}</p>
              </div>
              <div className="profile_head_grp">
                <h4>Gender : </h4>
                <p>{studentData.gender}</p>
              </div>
            </div>
            <div className="profile_pic">
              <img src={studentData.photo} alt="" />
            </div>
          </div>
          <div className="profile_bottom row g-4">
            <div className="profile_head_grp col-md-6">
              <h4>Mother's Name : </h4>
              <p>{studentData.mName}</p>
            </div>
            <div className="profile_head_grp col-md-6">
              <h4>Father's Name : </h4>
              <p>{studentData.fName}</p>
            </div>
            <div className="profile_head_grp col-md-6">
              <h4>Date of Birth : </h4>
              <p>{studentData.dob}</p>
            </div>
            <div className="profile_head_grp col-md-6">
              <h4>Roll Number : </h4>
              <p>{studentData.rollNo}</p>
            </div>

            <div className="profile_head_grp col-md-6">
              <h4>Category : </h4>
              <p>{studentData.category}</p>
            </div>
            <div className="profile_head_grp col-md-6">
              <h4>Phone Number : </h4>
              <p>{studentData.phNo}</p>
            </div>
            <div className="profile_head_grp col-md-6">
              <h4>Date of Admission : </h4>
              <p>{studentData.doa}</p>
            </div>
            <div className="profile_head_grp col-md-6">
              <h4>Address : </h4>
              <p>{studentData.address}</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Student;
