import { Component } from "react";
import Cookies from "js-cookie";

import { Link } from "react-router-dom";

import "./index.css";
import { Redirect } from "react-router-dom";

class Mainhome extends Component {
  state = {
    decidelogorsign: true,
  };

  changetosignButton = () => {
    this.setState({ decidelogorsign: false });
  };

  changetologButton = () => {
    this.setState({ decidelogorsign: true });
  };

  render() {
    const getjws = Cookies.get("jwt_token");

    if (getjws !== undefined) {
      return <Redirect to="/tasks" />;
    }
    return (
      <div>
        <div className="land-page-bg">
          <div className="land-page-sub-bg">
            <h1 className="land-page-head">Welcome to our Task Manager</h1>
            <p className="land-page-para">
              Please log in or sign up to explore and start managing your tasks
              with ease.
            </p>
            <div className="land-page-but-cont">
              <Link to="/login">
                <button className="land-page-but">Login</button>
              </Link>
              <Link to="/signup">
                <button className="land-page-buts">Signup</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mainhome;
