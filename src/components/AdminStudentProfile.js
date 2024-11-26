import React, { useCallback, useEffect, useState } from "react";
import "../styles/Student.css";
import Footer from "./Footer";
import axios from "axios";
import Navbar from "./Navbar";
import { BASE_URL, CRYPTO_SEC } from "../config";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useAuth } from "../Hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { reverseDate } from "../utils";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import CryptoJS from "crypto-js";
import EditStudent from "./EditStudent";
import { toastObj } from "../templateObjects";

const AdminStudentProfile = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Get student ID from the URL
  const { cookies } = useAuth(); // Access the cookies from the auth context
  const accessToken = cookies.token;  // Retrieve the token from cookies

  // Decrypt the user type from cookies
  const bytes = CryptoJS.AES.decrypt(cookies.type, CRYPTO_SEC);
  const userType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const navigate = useNavigate();  // Used for navigation after actions like deletion

  // Fetch student data by ID
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await axios.get(`${BASE_URL}/student/getstudentbyid/${id}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      data.data.dob = reverseDate(data.data.dob);
      data.data.doa = reverseDate(data.data.doa);
      setStudentData(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong!", toastObj);
    }
  }, [accessToken, id]);  // Re-fetch if token or ID changes

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Trigger fetchData on component mount


   // Handler for deleting a student
  const deleteHandler = async (id) => {
    try {
      const [isOk] = await AlertConfirm("Are you sure?");

      if (!isOk) return;
      setLoading(true);
      const accessToken = cookies.token;
      await axios.delete(`${BASE_URL}/student/deletestudent/${id}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      toast.success("Student deleted successfully!!", toastObj);
      setLoading(false);
      navigate("/search-student"); // Redirect to the search student page after deletion
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong!", toastObj);
      return;
    }
  };
  return (
    <>
      <EditStudent studentData={studentData} />
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
          <div className="edit_student_btn_box d-flex gap-3 justify-content-center">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#edit_student_modal"
            >
              Edit Profile
            </button>
            {/* Show the delete button only when the user is admin */}
            {userType === "Admin" && (
              <button
                className="d-block btn btn-danger"
                onClick={() => deleteHandler(studentData._id)}
              >
                Delete Profile
              </button>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AdminStudentProfile;
