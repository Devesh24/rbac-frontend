import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import "../styles/GetFaculties.css";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EditFaculty from "./EditFaculty";
import "react-alert-confirm/lib/style.css";
import AlertConfirm from "react-alert-confirm";
import { useAuth } from "../Hooks/auth";
import Loader from "./Loader";
import { toast } from "react-toastify";

const GetFaculties = () => {
  const [faculties, setFaculties] = useState([]);
  const [facData, setFacData] = useState({});
  const { cookies } = useAuth();
  const [loading, setLoading] = useState(false);

  const fetchFaculties = async () => {
    try {
      setLoading(true);
      const data = await axios.get(`${BASE_URL}/faculty`);
      setFaculties(data.data);
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
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const deleteHandler = async (id) => {
    const [isOk] = await AlertConfirm("Are you sure?");

    if (!isOk) return;
    try {
      setLoading(true);
      const accessToken = cookies.token;
      await axios.delete(`${BASE_URL}/faculty/${id}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      toast.success("Faculty deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      fetchFaculties();
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

  return (
    <>
      <EditFaculty facData={facData} />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Row>
            <div className="search_student_list_main search_fac_list_main mx-auto">
              <Row>
                <h1 className="all-fac-head">All Faculties</h1>
              </Row>

              <Row className="big_screen_fac_result mx-auto">
                <Row className="search_student_list_head">
                  <Col lg="1"></Col>
                  <Col lg="3">Name</Col>
                  <Col lg="2">Designation</Col>
                  <Col lg="2">Experience</Col>
                  <Col lg="2">Education</Col>
                  <Col lg="1">Edit</Col>
                  <Col lg="1">Delete</Col>
                </Row>
                {faculties.map((result) => {
                  return (
                    <Row
                      key={result._id}
                      className="search_student_list_cont admin_fac_result"
                    >
                      <Col lg="1">
                        <div className="admin-get-fac-img-box">
                          <img src={result.facultyImg} alt="Not available" />
                        </div>
                      </Col>
                      <Col lg="3">{result.facultyName}</Col>
                      <Col lg="2">{result.facultyDesignation}</Col>
                      <Col lg="2">{result.facultyExperience} Years</Col>
                      <Col lg="2">{result.facultyEducation}</Col>
                      <Col lg="1">
                        <i
                          title="Edit"
                          className="fa-solid fa-pen-to-square"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_faculty_modal"
                          onClick={() => setFacData(result)}
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
              </Row>

              <Row className="small_screen_fac_result">
                {faculties.map((result) => {
                  return (
                    <div key={result._id} className="my-4">
                      <div className="">
                        <div className="d-flex">
                          <div className="fac_res_headers">Name</div>
                          <div className=" fac_res_list">
                            {result.facultyName}
                          </div>
                        </div>

                        <div className="d-flex">
                          <div className=" fac_res_headers">Designation</div>
                          <div className=" fac_res_list">
                            {result.facultyDesignation}
                          </div>
                        </div>

                        <div className="d-flex">
                          <div className=" fac_res_headers">Experience</div>
                          <div className=" fac_res_list">
                            {result.facultyExperience} Years
                          </div>
                        </div>

                        <div className="d-flex">
                          <div className=" fac_res_headers">Education</div>
                          <div className=" fac_res_list">
                            {result.facultyEducation}
                          </div>
                        </div>

                        <div className="d-flex">
                          <div className=" fac_res_headers">Edit</div>
                          <div className=" fac_res_list">
                            <i
                              title="Edit"
                              className="fa-solid fa-pen-to-square"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_faculty_modal"
                              onClick={() => setFacData(result)}
                            ></i>
                          </div>
                        </div>

                        <div className="d-flex">
                          <div className=" fac_res_headers">Delete</div>
                          <div className=" fac_res_list">
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
              </Row>
            </div>
          </Row>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default GetFaculties;
