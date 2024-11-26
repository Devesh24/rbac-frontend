import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import "react-alert-confirm/lib/style.css";
import AlertConfirm from "react-alert-confirm";
import { useAuth } from "../Hooks/auth";
import { toast } from "react-toastify";
import { toastObj } from "../templateObjects";

const EditFaculty = ({ facData }) => {
  const [facNew, setFacNew] = useState({});
  const { cookies } = useAuth();
  useEffect(() => {
    setFacNew(facData);
  }, [facData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      /^\d+$/.test(facNew.facultyPhone) === false ||
      facNew.facultyPhone.length !== 10
    ) {
      return toast.error("Invalid phone number!", toastObj);
    }
    try {
      const [isOk] = await AlertConfirm("Are you sure?");
      if (!isOk) return;

      const accessToken = cookies.token;
      await axios.put(`${BASE_URL}/faculty/${facData._id}`, facNew, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      toast.success("Faculty updated successfully!", toastObj);
      setTimeout(() => {
        document.location.reload();
      }, 500);
    } catch (err) {
      return toast.error("Something went wrong!", toastObj);
    }
  };

  const handleChange = (e) => {
    setFacNew((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <>
      <div
        className="modal fade"
        id="edit_faculty_modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <form className="modal-dialog modal-lg" onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 px-3" id="staticBackdropLabel">
                Edit Faculty
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  e.preventDefault();
                  setFacNew(facData);
                }}
              ></button>
            </div>
            <div className="modal_body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="facultyName" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="facultyName"
                    value={facNew.facultyName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="facultyDesignation"
                    className="col-form-label"
                  >
                    Designation:
                  </label>
                  <select
                    className="form-select"
                    id="facultyDesignation"
                    value={facNew.facultyDesignation}
                    onChange={handleChange}
                  >
                    <option value={"Pre-Primary School Teacher"}>
                      Pre-Primary School Teacher
                    </option>
                    <option value={"Primary School Teacher"}>
                      Primary School Teacher
                    </option>
                    <option value={"Middle School Teacher"}>
                      Middle School Teacher
                    </option>
                    <option value={"High School Teacher"}>
                      High School Teacher
                    </option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="facultyExperience" className="col-form-label">
                    Experience:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="facultyExperience"
                    value={facNew.facultyExperience}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="facultyEducation" className="col-form-label">
                    Education:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="facultyEducation"
                    value={facNew.facultyEducation}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="facultyImg" className="col-form-label">
                    Photo:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="facultyImg"
                    value={facNew.facultyImg}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="facultyPhone" className="col-form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="facultyPhone"
                    value={facNew.facultyPhone}
                    onChange={handleChange}
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
                  setFacNew(facData);
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
  );
};

export default EditFaculty;
