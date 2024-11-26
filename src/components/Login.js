import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import img1 from "../assets/loginImg.png";
import { BASE_URL, CRYPTO_SEC } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useCookies } from "react-cookie";
import Loader from "./Loader";
import { reverseDate } from "../utils";

const Login = () => {
  const [admNo, setAdmNo] = useState("");
  const [dob, setDob] = useState("");
  const [facname, setFacname] = useState("");
  const [facpass, setFacPass] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminpass, setAdminPass] = useState("");
  const [loginType, setLoginType] = useState("student");
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();
  const [loading, setLoading] = useState(false);

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await axios.post(`${BASE_URL}/auth/student-login`, {
        admNo: admNo,
        dob: reverseDate(dob),
      });
      setLoading(false);
      if (data.status === 200) {
        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.localStorage.setItem("studentToken", data.data.accessToken);
        setTimeout(() => {
          setAdmNo("");
          setDob("");
          navigate("/student");
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleFacSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await axios.post(`${BASE_URL}/auth/user-login`, {
        username: facname,
        password: facpass,
      });
      setLoading(false);
      if (data.status === 200) {
        if (data.data.type !== "Faculty" || data.data.permission === "No") {
          navigate("/error-403");
        } else {
          toast.success("Logged in successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setCookies("token", data.data.accessToken);
          const encryptedType = CryptoJS.AES.encrypt(
            JSON.stringify(data.data.type),
            CRYPTO_SEC
          ).toString();
          setCookies("type", encryptedType);

          setTimeout(() => {
            setFacPass("");
            setFacname("");
            navigate("/dashboard");
          }, 1000);
        }
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await axios.post(`${BASE_URL}/auth/user-login`, {
        username: adminName,
        password: adminpass,
      });
      setLoading(false);
      if (data.status === 200) {
        if (data.data.type !== "Admin" || data.data.permission === "No") {
          navigate("/error-403");
        } else {
          const token = data.data.accessToken;
          setCookies("token", token);

          const encryptedType = CryptoJS.AES.encrypt(
            JSON.stringify(data.data.type),
            CRYPTO_SEC
          ).toString();
          setCookies("type", encryptedType);

          toast.success("Logged in successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            setAdminName("");
            setAdminPass("");
            navigate("/dashboard");
          }, 1000);
        }
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="loginpage">
        <div className="loginimg">
          <div className="login_select_box">
            <p
              className={
                loginType === "student"
                  ? "login_select_inner login_active"
                  : `login_select_inner`
              }
              onClick={() => {
                setLoginType("student");
                setAdminName("");
                setAdminPass("");
                setFacPass("");
                setFacname("");
              }}
            >
              Student
            </p>
            <p
              className={
                loginType === "faculty"
                  ? "login_select_inner login_active"
                  : `login_select_inner`
              }
              onClick={() => {
                setLoginType("faculty");
                setAdmNo("");
                setDob("");
                setAdminPass("");
                setAdminName("");
              }}
            >
              Faculty
            </p>
            <p
              className={
                loginType === "admin"
                  ? "login_select_inner login_active"
                  : `login_select_inner`
              }
              onClick={() => {
                setLoginType("admin");
                setAdmNo("");
                setDob("");
                setFacPass("");
                setFacname("");
              }}
            >
              Admin
            </p>
          </div>
          {loading ? <Loader /> : <img src={img1} alt="" />}
        </div>

        <form
          onSubmit={handleStudentSubmit}
          className={loginType === "student" ? "loginform" : "d-none"}
        >
          <p>Login</p>
          <div className="login_input">
            <label htmlFor="admNo">Admission Number:</label>
            <input
              className="form-control"
              type="text"
              name="admNo"
              id="admNo"
              required
              value={admNo}
              onChange={(e) => {
                setAdmNo(e.target.value);
              }}
            />
          </div>
          <div className="login_input">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              className="form-control"
              type="date"
              name="dob"
              id="dob"
              required
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
          </div>
          <div className="submit_box">
            <button className=" submit_btn btn btn-danger" type="submit">
              Submit
            </button>
          </div>
        </form>

        <form
          onSubmit={handleFacSubmit}
          className={loginType === "faculty" ? "loginform" : "d-none"}
        >
          <p>Login</p>
          <div className="login_input">
            <label htmlFor="username">Faculty Username:</label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="facusername"
              required
              value={facname}
              onChange={(e) => {
                setFacname(e.target.value);
              }}
            />
          </div>
          <div className="login_input">
            <label htmlFor="pass">Faculty Password:</label>
            <input
              className="form-control"
              type="password"
              name="pass"
              id="facpass"
              required
              value={facpass}
              onChange={(e) => {
                setFacPass(e.target.value);
              }}
            />
          </div>
          <div className="submit_box">
            <button className=" submit_btn btn btn-danger" type="submit">
              Submit
            </button>
          </div>
        </form>

        <form
          onSubmit={handleAdminSubmit}
          className={loginType === "admin" ? "loginform" : "d-none"}
        >
          <p>Login</p>
          <div className="login_input">
            <label htmlFor="username">Admin Username:</label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="adminusername"
              required
              value={adminName}
              onChange={(e) => {
                setAdminName(e.target.value);
              }}
            />
          </div>
          <div className="login_input">
            <label htmlFor="pass">Admin Password:</label>
            <input
              className="form-control"
              type="password"
              name="pass"
              id="adminpass"
              required
              value={adminpass}
              onChange={(e) => {
                setAdminPass(e.target.value);
              }}
            />
          </div>
          <div className="submit_box">
            <button className=" submit_btn btn btn-danger" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
