import { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";

class Loginform extends Component {
  state = {
    usernameinput: "",
    userpassinput: "",
    errstatus: false,
    inperrstatus: false,
    showingservermsg: "",
    showingstatusserver: false,
  };

  sendingtoke = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    Cookies.set("user_id");
    history.replace("/tasks");
  };

  callingsubmit = async (event) => {
    event.preventDefault();
    const { usernameinput, userpassinput } = this.state;
    if (usernameinput !== "" && userpassinput !== "") {
      const makingObj = { username: usernameinput, password: userpassinput };

      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(makingObj),
      };
      const url = "https://backend-assignment-oritso.onrender.com/login";
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok === true) {
        this.sendingtoke(data.jwtToken);
      } else {
        this.setState({
          showingservermsg: response.message,
          showingstatusserver: true,
        });
      }
    } else {
      const storesuserinp = usernameinput !== "" ? false : true;
      const storesuserpass = userpassinput !== "" ? false : true;
      this.setState({ inperrstatus: storesuserinp, errstatus: storesuserpass });
    }
  };

  callingtochangeusername = (event) => {
    this.setState({ usernameinput: event.target.value });
  };

  callingtochangepass = (event) => {
    this.setState({ userpassinput: event.target.value });
  };

  checkingpassblur = (event) => {
    if (event.target.value === "") {
      this.setState({ errstatus: true });
    } else {
      this.setState({ errstatus: false });
    }
  };

  checkinguninpblur = (event) => {
    if (event.target.value === "") {
      this.setState({ inperrstatus: true });
    } else {
      this.setState({ inperrstatus: false });
    }
  };

  render() {
    const {
      usernameinput,
      userpassinput,
      inperrstatus,
      errstatus,
      showingstatusserver,
      showingservermsg,
    } = this.state;
    return (
      <div className="form-bg">
        <form className="form-sub-bg" onSubmit={this.callingsubmit}>
          <div className="first-cont">
            <label id="labusername" className="label-head">
              Username
            </label>
            <input
              className="input-cont-first"
              onBlur={this.checkinguninpblur}
              onChange={this.callingtochangeusername}
              value={usernameinput}
              type="text"
            />
            {inperrstatus && <p className="para-req">*Required</p>}
          </div>
          <div className="first-cont">
            <label id="labpassword" className="label-head">
              Password
            </label>
            <input
              className="input-cont-first"
              onBlur={this.checkingpassblur}
              onChange={this.callingtochangepass}
              value={userpassinput}
              type="password"
            />
            {errstatus && <p className="para-req">*Required</p>}
          </div>
          <div className="but-cont">
            <button type="submit" className="log-sub-but">
              Login
            </button>
            {showingstatusserver && <p>{showingservermsg}</p>}
          </div>
        </form>
      </div>
    );
  }
}

export default Loginform;
