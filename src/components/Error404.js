import rocket from "../assets/rocket404.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Error404 = () => {
  return (
    <>
      <Navbar />
      <div className="error_403">
        <div className="err_main_cont">
          <img src={rocket} alt="" />
          <div className="error_403_inner">
            <h1>Error - 404</h1>
            <h3>Not Found</h3>
            <p>The page You Requested doesn't Exists!!</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Error404;