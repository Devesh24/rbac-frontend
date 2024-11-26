import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../config";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import "../styles/AddUser.css";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { useAuth } from "../Hooks/auth";
import { toastObj } from "../templateObjects";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState(""); // Confirm password state
  const [type, setType] = useState(""); // User type (e.g., Admin, Faculty)
  const { cookies } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the passwords match
    if (checkPass !== password) {
      return toast.error("Passwords do not match!", toastObj);
    }

    setLoading(true);
    try {
      // Ask the user for confirmation before submitting the form
      const [isOk] = await AlertConfirm("Are you sure?");

      if (!isOk) return;
      const accessToken = cookies.token;
      await axios.post(
        `${BASE_URL}/user/register`,
        {
          username: username,
          password: password,
          type: type,
        },
        {
          headers: {
            token: `Bearer ${accessToken}`, // Send the token in the headers for authorization
          },
        }
      );
      toast.success("User registered successfully!", toastObj);
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, [1000]);
    } catch (err) {
      setLoading(false);
      return toast.error("Something went wrong!", toastObj);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="register_user_main_cont">
          <form onSubmit={handleSubmit}>
            <h1>Register User</h1>
            <div className="row">
              <div className="col-md-6 my-2">
                <label className="form-label" htmlFor="username">
                  Username:{" "}
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  id="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <label className="form-label" htmlFor="pass">
                  Password:{" "}
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="pass"
                  id="pass"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <label className="form-label" htmlFor="conf_pass">
                  Confirm Password:{" "}
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="conf_pass"
                  id="conf_pass"
                  onChange={(e) => {
                    setCheckPass(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <label className="form-label" htmlFor="type">
                  Type:{" "}
                </label>
                <select
                  className="form-select"
                  id="type"
                  required
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value="">--Select--</option>
                  <option value={"Faculty"}>Faculty</option>
                  <option value={"Admin"}>Admin</option>
                  <option value={"Computer Operator"}>Computer Operator</option>
                </select>
              </div>
              <div className="form_submit_btn_box mt-4">
                <button type="submit" className="form_submit_btn">
                  REGISTER
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AddUser;
