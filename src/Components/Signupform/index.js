/* eslint-disable no-unused-vars */
import { Component } from "react";
import { Link } from "react-router-dom";

import "./index.css";

class Signupform extends Component {
  state = {
    usernamdet: "",
    userpassdet: "",
    useremail: "",
    errorstatusone: false,
    errstatustwo: false,
    errstatusthree: false,
    errservermsg: "",
    showerrfromserv: "",
    showingsignuperr: false,
    usercreatedshow: false,
  };

  submitdet = async (event) => {
    event.preventDefault();
    const {
      usernamdet,
      useremail,
      userpassdet,
      errorstatusone,
      errstatustwo,
      errstatusthree,
      showingsignuperr,
    } = this.state;
    if (usernamdet !== "" && userpassdet !== "" && userpassdet !== "") {
      const urls = "http://localhost:4000/register";

      const bringobj = {
        username: usernamdet,
        email: useremail,
        password: userpassdet,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bringobj),
      };

      const response = await fetch(urls, options);
      const data = await response.json();
      if (response.ok) {
        this.setState({ usercreatedshow: true });
      } else {
        this.setState({ usercreatedshow: false });
      }
    } else {
      const storefirst = usernamdet !== "" ? false : true;
      const storessecond = useremail !== "" ? false : true;
      const storesthird = userpassdet !== "" ? false : true;

      this.setState({
        errorstatusone: storefirst,
        errstatustwo: storessecond,
        errstatusthree: storesthird,
      });
    }
  };

  changinguserdet = (event) => {
    this.setState({ usernamdet: event.target.value });
  };

  changingemaildet = (event) => {
    this.setState({ useremail: event.target.value });
  };

  changinguserpassdet = (event) => {
    this.setState({ userpassdet: event.target.value });
  };

  checkuserdet = (event) => {
    if (event.target.value === "") {
      this.setState({ errorstatusone: true });
    } else {
      this.setState({ errorstatusone: false });
    }
  };

  checkemaildet = (event) => {
    if (event.target.value === "") {
      this.setState({ errstatustwo: true });
    } else {
      this.setState({ errstatustwo: false });
    }
  };

  checkpassdet = (event) => {
    if (event.target.value === "") {
      this.setState({ errstatusthree: true });
    } else {
      this.setState({ errstatusthree: false });
    }
  };

  render() {
    const { errorstatusone, errstatustwo, errstatusthree, usercreatedshow } =
      this.state;
    return (
      <div className="signform-bg">
        {usercreatedshow ? (
          <>
            <h1>User has been created on our database</h1>
            <Link to="/">
              <button>Landing page</button>
            </Link>
          </>
        ) : (
          <form className="signform-sub-bg" onSubmit={this.submitdet}>
            <div className="signfirst-cont">
              <label className="signlabel-head" id="signuser">
                Username
              </label>
              <input
                className="signinput-cont-first"
                onBlur={this.checkuserdet}
                onChange={this.changinguserdet}
                htmlFor="signuser"
                type="text"
              />
              {errorstatusone && <p className="signpara-req">*Required</p>}
            </div>
            <div className="signfirst-cont">
              <label className="signlabel-head" id="signemail">
                Email
              </label>
              <input
                className="signinput-cont-first"
                onBlur={this.checkemaildet}
                onChange={this.changingemaildet}
                htmlFor="signemail"
                type="email"
              />
              {errstatustwo && <p className="signpara-req">*Required</p>}
            </div>
            <div className="signfirst-cont">
              <label className="signlabel-head" id="signpassword">
                Password
              </label>
              <input
                className="signinput-cont-first"
                onBlur={this.checkpassdet}
                onChange={this.changinguserpassdet}
                htmlFor="signpassword"
                type="password"
              />
              {errstatusthree && <p className="signpara-req">*Required</p>}
            </div>
            <div className="signbut-cont">
              <button className="signlog-sub-but" type="submit">
                Signup
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Signupform;
