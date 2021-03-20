import React from "react";
import { Link } from "react-router-dom";
import Bike from "../../images/bike.png";
import Bus from "../../images/bus.png";
import Car from "../../images/car.png";
import train from "../../images/train.png";

const Home = () => {
  const style = {
    margin: "10rem 2rem",
    width: "15rem",
    border: "none",
  };
  return (
    <div>
      {/* navbar */}
      <header className="container pt-2">
        <nav className="navbar navbar-expand-lg navbar-light border-bottom  border-dark">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/home">
              Street Riders
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to="/home"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/destination" className="nav-link">
                    Destination
                  </Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contacts
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <Link to="/login">
                  <button className="btn btn-outline-success" type="button">
                    Login
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </nav>
      </header>
      {/* services */}
      <main className="container d-md-flex mt-5 ">
        <Link to="/destination">
          <div className="card bg-light text-dark p-5" style={style}>
            <img src={Bike} alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title text-center">Bike</h5>
            </div>
          </div>
        </Link>
        <Link to="/destination">
          <div className="card bg-light text-dark p-5" style={style}>
            <img src={Bus} alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title text-center">Bus</h5>
            </div>
          </div>
        </Link>
        <Link to="/destination">
          <div className="card bg-light text-dark p-5" style={style}>
            <img src={Car} alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title text-center">Car</h5>
            </div>
          </div>
        </Link>
        <Link to="/login">
          <div className="card bg-light text-dark p-5" style={style}>
            <img src={train} alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title text-center">Train</h5>
            </div>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default Home;
