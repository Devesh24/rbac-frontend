import React, { useState } from "react";
import "../styles/AddFaculty.css";
import { BASE_URL } from "../config";
import axios from "axios";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { facultyObj, toastObj } from "../templateObjects";
import "react-alert-confirm/lib/style.css";
import AlertConfirm from "react-alert-confirm";
import { useAuth } from "../Hooks/auth";
import Loader from "./Loader";
import { toast } from "react-toastify";

const AddFaculty = () => {
  // State to manage the form input values and loading state
  const [facultyDetails, setfacultyDetails] = useState(facultyObj);
  const [loading, setLoading] = useState(false);

  // Use the custom `useAuth` hook to get the authentication token
  const { cookies } = useAuth();

  // Handle input change for form fields
  const handleChange = (e) => {
    setfacultyDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (facultyDetails.facultyPhone !== "") {
      // Validate phone number before submission
      if (
        /^\d+$/.test(facultyDetails.facultyPhone) === false ||
        facultyDetails.facultyPhone.length !== 10
      ) {
        return toast.error("Invalid phone no.!", toastObj);
      }
    }

    try {
      // Ask for user confirmation before proceeding with the form submission
      const [isOk] = await AlertConfirm("Are you sure?");
      if (!isOk) return;

      setLoading(true);
      const accessToken = cookies.token;
      await axios.post(`${BASE_URL}/faculty`, facultyDetails, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      setLoading(false);
      toast.success("Faculty added successfully!", toastObj);
      setTimeout(() => {
        window.location.reload();
      }, 500);
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
        <Container className="add_faculty_main_cont">
          <Form onSubmit={submitHandler}>
            <h1>Add Faculty</h1>
            <Container>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="mb-2" htmlFor="facultyName">
                      Name
                    </label>
                    <div className="formInputBox">
                      <input
                        type="text"
                        id="facultyName"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="mb-2" htmlFor="facultyEducation">
                      Education
                    </label>
                    <div className="formInputBox">
                      <input
                        type="text"
                        id="facultyEducation"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="mb-2" htmlFor="facultyDesignation">
                      Designation
                    </label>
                    <div className="formInputBox">
                      <select
                        className="form-select"
                        id="facultyDesignation"
                        required
                        onChange={handleChange}
                      >
                        <option value="">--Select--</option>
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
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="mb-2" htmlFor="facultyExperience">
                      Experience
                    </label>
                    <div className="formInputBox">
                      <input
                        type="number"
                        id="facultyExperience"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="mb-2" htmlFor="facultyImage">
                      Image Link
                    </label>
                    <div className="formInputBox">
                      <input
                        type="text"
                        id="facultyImg"
                        onChange={handleChange}
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="mb-2" htmlFor="facultyPhone">
                      Phone Number
                    </label>
                    <div className="formInputBox">
                      <input
                        type="text"
                        id="facultyPhone"
                        onChange={handleChange}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="form_submit_btn_box" lg="12">
                  <button className="form_submit_btn" type="submit">
                    Add
                  </button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default AddFaculty;
