import React, { useState } from "react";
import "../styles/SearchStudent.css";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../config";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../Hooks/auth";
import Loader from "./Loader";
import { toast } from "react-toastify";
import {toastObj} from '../templateObjects'

const SearchStudent = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchDetails, setSearchDetails] = useState({
    searchName: "",
    searchAdmNo: "",
    searchClass: "",
  });
  const { cookies } = useAuth();

  const handleChange = (e) => {
    setSearchDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const accessToken = cookies.token;
      var data = [];
      if (
        searchDetails.searchName === "" &&
        searchDetails.searchAdmNo === "" &&
        searchDetails.searchClass === ""
      ) {
        return toast.error("Please enter any one field!", toastObj);
      }
      setLoading(true);
      data = await axios.get(
        `${BASE_URL}/student/searchstudent?admNo=${searchDetails.searchAdmNo}&name=${searchDetails.searchName}&class=${searchDetails.searchClass}`,
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      setSearchResult(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong!", toastObj);
    }
  };

  return (
    <>
      <Navbar />

      <Container>
        <Row className="search_student_main_cont mx-auto">
          <Form className="search-form mx-auto" onSubmit={submitHandler}>
            <h1>Search Student</h1>
            <Container>
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <label className="mb-2" htmlFor="searchName">
                      Name:
                    </label>
                    <div className="">
                      <input
                        className="form-control"
                        type="text"
                        id="searchName"
                        onChange={handleChange}
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label className="mb-2" htmlFor="searchAdmNo">
                      Admission Number:
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="searchAdmNo"
                        onChange={handleChange}
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label className="mb-2" htmlFor="searchClass">
                      Class:
                    </label>
                    <div className="">
                      <select
                        className="form-select"
                        id="searchClass"
                        onChange={handleChange}
                      >
                        <option value="">--Select--</option>
                        <option value={"Nursery"}>Nursery</option>
                        <option value={"LKG"}>LKG</option>
                        <option value={"UKG"}>UKG</option>
                        <option value={"1st"}>1st</option>
                        <option value={"2nd"}>2nd</option>
                        <option value={"3rd"}>3rd</option>
                        <option value={"4th"}>4th</option>
                        <option value={"5th"}>5th</option>
                        <option value={"6th"}>6th</option>
                        <option value={"7th"}>7th</option>
                        <option value={"8th"}>8th</option>
                      </select>
                    </div>
                  </FormGroup>
                </Col>
                <Col className="form_submit_btn_box mt-4">
                  <button className="form_submit_btn" type="submit">
                    Search
                  </button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Row>
        {loading ? (
          <Loader />
        ) : searchResult.length ? (
          <Row className="small_screen_result">
            {searchResult.map((result) => {
              return (
                <div key={result._id} className="my-4">
                  <div className="">
                    <div className="d-flex">
                      <div className="student_res_headers">Adm. No.</div>
                      <div className=" student_res_list">{result.admNo}</div>
                    </div>

                    <div className="d-flex">
                      <div className=" student_res_headers">Name</div>
                      <div className=" student_res_list">{result.name}</div>
                    </div>

                    <div className="d-flex">
                      <div className=" student_res_headers">Class</div>
                      <div className=" student_res_list">{result.class}</div>
                    </div>

                    <div className="d-flex">
                      <div className=" student_res_headers">Roll No.</div>
                      <div className=" student_res_list">{result.rollNo}</div>
                    </div>

                    <div className="d-flex">
                      <div className=" student_res_headers">Details</div>
                      <div className=" student_res_list">
                        <Link
                          target="_blank"
                          to={`/admin-student-profile/${result._id}`}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Row>
        ) : (
          <div className="mb-5">No Students Found</div>
        )}

        {loading ? (
          <Loader />
        ) : searchResult.length ? (
          <Row className="big_screen_result">
            <div className="search_student_list_main mx-auto">
              <Row className="search_student_list_head">
                <Col lg="2">Admission No.</Col>
                <Col lg="4">Student's Name</Col>
                <Col lg="2">Class</Col>
                <Col lg="2">Roll No.</Col>
                <Col lg="2">Details</Col>
              </Row>
              {searchResult.map((result) => {
                return (
                  <Row key={result._id} className="search_student_list_cont">
                    <Col lg="2">{result.admNo}</Col>
                    <Col lg="4">{result.name}</Col>
                    <Col lg="2">{result.class}</Col>
                    <Col lg="2">{result.rollNo}</Col>
                    <Col lg="2">
                      <Link
                        target="_blank"
                        to={`/admin-student-profile/${result._id}`}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </Link>
                    </Col>
                  </Row>
                );
              })}
            </div>
          </Row>
        ) : (
          <></>
        )}
      </Container>
      <Footer mode="dark" />
    </>
  );
};

export default SearchStudent;
