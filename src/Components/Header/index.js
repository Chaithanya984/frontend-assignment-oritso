import { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";
import { Link } from "react-router-dom";
class Header extends Component {
  state = { moborwebview: false };

  callbut = () => {
    this.setState((prevState) => ({ moborwebview: !prevState.moborwebview }));
  };

  callLogf = () => {
    const { history } = this.props;
    Cookies.remove("jwt_token");
    history.replace("/");
  };
  render() {
    const { moborwebview } = this.state;

    return (
      <>
        <nav className="nav-cont">
          <div className="nav-sub">
            <div>
              <h1>Task Manger</h1>
            </div>

            {moborwebview ? (
              <button onClick={this.callbut} className="show-when-needed">
                Close
              </button>
            ) : (
              <button onClick={this.callbut} className="show-when-needed">
                Menu
              </button>
            )}

            <ul className="ul-nav-cont">
              <Link className="Link" to="/">
                <li className="main-li">Main</li>
              </Link>
              <Link className="Link" to="/tasks">
                <li className="main-li">Task Manger</li>
              </Link>
              <li className="main-li">
                <button onClick={this.callLogf} className="log-out">
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <div className="show-when-neededs">
            <ul className={moborwebview ? "hide-for-mob" : "hide-it"}>
              <Link className="Link" to="/">
                <li className="main-li-focus">Main</li>
              </Link>

              <Link className="Link" to="/tasks">
                <li className="main-li-focus">Task Manger</li>
              </Link>

              <li className="main-li-focus">
                <button onClick={this.callLogf} className="log-outs">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default withRouter(Header);
