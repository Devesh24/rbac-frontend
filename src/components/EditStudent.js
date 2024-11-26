import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config';
import {reverseDate} from '../utils';
import { studentObj, toastObj } from '../templateObjects';
import AlertConfirm from 'react-alert-confirm';
import 'react-alert-confirm/lib/style.css';
import { useAuth } from '../Hooks/auth';
import { toast } from 'react-toastify';


const EditStudent = ({ studentData }) => {
  const [studentNew, setStudentNew] = useState(studentObj);
  const { cookies } = useAuth();

  const handleChange = (e) => {
    setStudentNew((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    setStudentNew(studentData)
  }, [studentData])

  var today = new Date().toISOString().split('T')[0];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (/^\d+$/.test(studentNew.phNo) === false || studentNew.phNo.length !== 10) {
      return toast.error("Invalid phone number!", toastObj);
    }
    try {
      const [isOk] = await AlertConfirm('Are you sure?');

      if (!isOk) return
      studentNew.dob = reverseDate(studentNew.dob);
      studentNew.doa = reverseDate(studentNew.doa);
      const accessToken = cookies.token;
      await axios.put(
        `${BASE_URL}/student/updatestudentbyid/${studentData._id}`,
        studentNew,
        {
          headers: {
            token: `Bearer ${accessToken}`
          }
        });
      toast.success("Student updated successfully!", toastObj);
      setTimeout(() => {
        window.location = `/admin-student-profile/${studentData._id}`;
      }, 500);
    } catch (err) {
      return toast.error("Something went wrong!", toastObj);
    }

  };


  return (
    <>
      <div
        className="modal fade"
        id="edit_student_modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <form className="modal-dialog modal-xl" onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 px-3" id="staticBackdropLabel">
                Edit Student
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  e.preventDefault();
                  setStudentNew(studentData);
                }}
              ></button>
            </div>
            <div className="modal_body">
              <form className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={studentNew.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="mName" className="col-form-label">
                    Mother's Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mName"
                    value={studentNew.mName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="fName" className="col-form-label">
                    Father's Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fName"
                    value={studentNew.fName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="admNo" className="col-form-label">
                    Admission Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="admNo"
                    value={studentNew.admNo}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="class" className="col-form-label">
                    Class:
                  </label>
                  <select
                    value={studentNew.class}
                    className="form-control form-select"
                    id="class"
                    onChange={handleChange}
                  >
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="gender" className="col-form-label">
                    Gender:
                  </label>
                  <select
                    className="form-control form-select"
                    id="gender"
                    value={studentNew.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="category" className="col-form-label">
                    Category:
                  </label>
                  <select
                    className="form-control form-select"
                    id="category"
                    value={studentNew.category}
                    onChange={handleChange}
                  >
                    <option value="General">General</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="OBC">OBC</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="dob" className="col-form-label">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    value={studentNew.dob}
                    onChange={handleChange}
                    max={today}
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="rollNo" className="col-form-label">
                    Roll Number:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="rollNo"
                    value={studentNew.rollNo}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="address" className="col-form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={studentNew.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="photo" className="col-form-label">
                    Photo:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="photo"
                    value={studentNew.photo}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="phNo" className="col-form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phNo"
                    value={studentNew.phNo}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="doa" className="col-form-label">
                    Date of Admission:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="doa"
                    value={studentNew.doa}
                    onChange={handleChange}
                    max={today}
                  />
                </div>
              </form>
            </div>
            <div className="modal_btn_cont">
              <button
                className="btn cancel_btn"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  setStudentNew(studentData);
                }}
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="btn add_btn"
                data-bs-dismiss="modal"
              >
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>

    </>
  )
}

export default EditStudent