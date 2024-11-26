import axios from "axios";
import React, { useEffect, useState } from "react";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { useAuth } from "../Hooks/auth";
import {toastObj} from '../templateObjects'

const EditUser = ({ userData }) => {
  const [userNew, setUserNew] = useState({});
  const { cookies } = useAuth();

  useEffect(() => {
    setUserNew(userData);
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [isOk] = await AlertConfirm("Are you sure?");
      if (!isOk) return;

      const accessToken = cookies.token;
      await axios.put(`${BASE_URL}/user/updateuser/${userData._id}`, userNew, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      toast.success("User updated successfully!", toastObj);
      setTimeout(() => {
        document.location.reload();
      }, 500);
    } catch (err) {
      return toast.error("Something went wrong!", toastObj);
    }
  };

  const handleChange = (e) => {
    setUserNew((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <>
      <div
        className="modal fade"
        id="edit_user_modal"
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
                Edit User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  e.preventDefault();
                  setUserNew(userData);
                }}
              ></button>
            </div>
            <div className="modal_body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="username" className="col-form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={userNew.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="password" className="col-form-label">
                    Password:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={userNew.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="type" className="col-form-label">
                    User Type:
                  </label>
                  <select
                    className="form-select"
                    id="type"
                    value={userNew.type}
                    onChange={handleChange}
                  >
                    <option value={"Faculty"}>Faculty</option>
                    <option value={"Admin"}>Admin</option>
                    <option value={"Computer Operator"}>
                      Computer Operator
                    </option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="permission" className="col-form-label">
                    Give Permissions:
                  </label>
                  <select
                    className="form-select"
                    id="permission"
                    value={userNew.permission}
                    onChange={handleChange}
                  >
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal_btn_cont">
              <button
                className="btn cancel_btn"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  setUserNew(userData);
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

export default EditUser;
