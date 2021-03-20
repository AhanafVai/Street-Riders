import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleMap } from "./GoogleMap";
import { ImLocation2 } from "react-icons/im";
import { BiTargetLock } from "react-icons/bi";
import { userContext } from "../../App";

const Destination = () => {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  return (
    <div>
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
                <h5>user:{loggedInUser.email}</h5>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <main className="d-md-flex ">
        {!show && (
          <form
            onSubmit={() => setShow(!show)}
            className=" bg-light  border-white rounded"
            style={{ width: "20rem", margin: "2rem 2rem", padding: "2rem" }}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Pickup location
              </label>
              <input
                type="name"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onBlur={(e) => setLocation(e.target.value)}
                placeholder="Pickup Point"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Destination
              </label>
              <input
                type="name"
                className="form-control"
                id="exampleInputPassword1"
                onBlur={(e) => setDestination(e.target.value)}
                placeholder="Destination"
                required
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-dark" type="submit">
                Confirm
              </button>
            </div>
          </form>
        )}
        {/* test compo */}
        {show && (
          <form
            className=" bg-light  border-white rounded"
            style={{ width: "18rem", margin: "4rem 4rem", padding: "1rem" }}
          >
            <section
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                padding: "2rem",
                borderRadius: "1rem",
              }}
            >
              <div className="mb-3">
                <p>
                  <ImLocation2 />
                  {location}
                </p>
              </div>
              <div className="mb-3">
                <p>
                  <BiTargetLock />
                  {destination}
                </p>
              </div>
            </section>
          </form>
        )}

        <div className="md-1">
          <GoogleMap />
        </div>
      </main>
    </div>
  );
};

export default Destination;
