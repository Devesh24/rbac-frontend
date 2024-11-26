import { DEFAULT_FACULTY_IMG, DEFAULT_STUDENT_IMG } from "./config";

export const studentObj = {
    name: "",
    mName: "",
    fName: "",
    address: "",
    dob: "",
    doa: "",
    phNo: "",
    photo: DEFAULT_STUDENT_IMG,
    class: "",
    rollNo: 0,
    admNo: "",
    category: "",
    gender: ""
}

export const facultyObj = {
    facultyName: "",
    facultyEducation: "",
    facultyDesignation: "",
    facultyExperience: "",
    facultyImg: DEFAULT_FACULTY_IMG,
    facultyPhone: ""
}

export const toastObj = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
}