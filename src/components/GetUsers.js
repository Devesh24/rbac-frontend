import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../config";
import EditUser from "./EditUser";
import { toast } from "react-toastify";
import { useAuth } from "../Hooks/auth";
import Loader from "./Loader";
import "../styles/GetUsers.css";

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [searchDetails, setSearchDetails] = useState({
    searchUsername: "",
    searchType: "",
    searchPermi: "",
  });

  const { cookies } = useAuth();

  useEffect(() => {
    setFilteredData(users);
  }, [users]);

  const accessToken = cookies.token;
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await axios.get(`${BASE_URL}/user/getusers`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      setUsers(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      return toast.error("Something went wrong!", {
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
  }, [accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    setSearchDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const deleteHandler = async (id) => {
    try {
      const [isOk] = await AlertConfirm("Are you sure?");
      if (!isOk) return;

      setLoading(true);
      const accessToken = cookies.token;
      await axios.delete(`${BASE_URL}/user/deleteuser/${id}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      fetchData();
      setLoading(false);
      toast.success("User Deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      setLoading(false);
      return toast.error("Something went wrong!", {
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

  useEffect(() => {
    if (searchDetails.searchUsername === "") {
      setFilteredData(users);
    } else if (searchDetails.searchUsername !== "") {
      setFilteredData(
        users.filter((person) => {
          return person.username
            .toLowerCase()
            .includes(searchDetails.searchUsername.toLowerCase());
        })
      );
    }
    if (searchDetails.searchType !== "") {
      setFilteredData(
        users.filter((person) => {
          return person.type === searchDetails.searchType;
        })
      );
    }
    if (searchDetails.searchPermi !== "") {
      setFilteredData(
        users.filter((person) => {
          return person.permission === searchDetails.searchPermi;
        })
      );
    }
  }, [searchDetails, users]);

  return (
    <>
      <EditUser userData={userData} />
      <Navbar />
      <Container>
        <Row className="search_student_main_cont mx-auto">
          <Form className="search-form mx-auto">
            <h1>All Users</h1>
            <Container>
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <label className="mb-2" htmlFor="searchUsername">
                      Username:
                    </label>
                    <div className="">
                      <input
                        className="form-control"
                        type="text"
                        id="searchUsername"
                        onChange={handleChange}
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label className="mb-2" htmlFor="searchType">
                      User Type:
                    </label>
                    <select
                      className="form-select"
                      id="searchType"
                      onChange={handleChange}
                    >
                      <option value={""}>--Select--</option>
                      <option value={"Faculty"}>Faculty</option>
                      <option value={"Admin"}>Admin</option>
                      <option value={"Computer Operator"}>
                        Computer Operator
                      </option>
                    </select>
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label className="mb-2" htmlFor="searchPermi">
                      Permission:
                    </label>
                    <select
                      className="form-select"
                      id="searchPermi"
                      onChange={handleChange}
                    >
                      <option value={""}>--Select--</option>
                      <option value={"Yes"}>Yes</option>
                      <option value={"No"}>No</option>
                    </select>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </Form>
        </Row>
        <Row>
          {loading ? (
            <Loader />
          ) : (
            filteredData.length > 0 && (
              <div className="search_student_list_main mx-auto big_screen_user_res">
                <Row className="search_student_list_head">
                  <Col lg="3">Username</Col>
                  <Col lg="3">Password</Col>
                  <Col lg="2">Type</Col>
                  <Col lg="2">Permissions Given</Col>
                  <Col lg="1">Edit</Col>
                  <Col lg="1">Delete</Col>
                </Row>
                {filteredData.map((result) => {
                  return (
                    <Row
                      key={result._id}
                      className="search_student_list_cont admin_fac_result"
                    >
                      <Col lg="3">{result.username}</Col>
                      <Col lg="3">{result.password}</Col>
                      <Col lg="2">{result.type}</Col>
                      <Col lg="2">{result.permission}</Col>
                      <Col lg="1">
                        <i
                          title="Edit"
                          className="fa-solid fa-pen-to-square"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_user_modal"
                          onClick={() => setUserData(result)}
                        ></i>
                      </Col>
                      <Col lg="1">
                        <i
                          title="Delete"
                          className="fa-solid fa-trash ms-4"
                          onClick={() => deleteHandler(result._id)}
                        ></i>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            )
          )}

          {loading ? (
            <Loader />
          ) : (
            filteredData.length > 0 && (
              <div className="search_student_list_main mx-auto small_screen_user_res">
                {filteredData.map((result) => {
                  return (
                    <div key={result._id} className="my-4">
                      <div className="">
                        <div className="d-flex">
                          <div className="user_res_headers">Username</div>
                          <div className=" user_res_list">
                            {result.username}
                          </div>
                        </div>

                        <div className="d-flex">
                          <div className=" user_res_headers">Password</div>
                          <div className=" user_res_list">
                            {result.password}
                          </div>
                        </div>

                        <div className="d-flex">
                          <div className=" user_res_headers">Type</div>
                          <div className=" user_res_list">{result.type}</div>
                        </div>

                        <div className="d-flex">
                          <div className=" user_res_headers">Permission</div>
                          <div className=" user_res_list">
                            {result.permission}
                          </div>
                        </div>

                        <div className="d-flex">
                          <div className=" user_res_headers">Edit</div>
                          <div className=" user_res_list">
                            <i
                              title="Edit"
                              className="fa-solid fa-pen-to-square"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_user_modal"
                              onClick={() => setUserData(result)}
                            ></i>
                          </div>
                        </div>

                        <div className="d-flex">
                          <div className=" user_res_headers">Delete</div>
                          <div className=" user_res_list">
                            <i
                              title="Delete"
                              className="fa-solid fa-trash ms-4"
                              onClick={() => deleteHandler(result._id)}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default GetUsers;
