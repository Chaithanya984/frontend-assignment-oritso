/* eslint-disable no-unused-vars */
import { Component } from "react";
import Cookies from "js-cookie";

import "./index.css";

class Taskitems extends Component {
  state = {
    showviews: false,
    showedit: false,
    inputtitl: this.props.sendeach.tasktitle,
    inputdescr: this.props.sendeach.taskdescription,
    inpurremar: this.props.sendeach.taskremarks,
    inputupdateda: this.props.sendeach.taskupdatedtimestamp,
    inputsta: this.props.sendeach.taskstatus,
    reqtitle: false,
    reqdescr: false,
    reqrem: false,
    requp: false,
    reqsta: false,
    filedelt: false,
  };

  goingtoupdate = async () => {
    const { inputtitl, inputdescr, inpurremar, inputupdateda, inputsta } =
      this.state;
    if (
      inputtitl !== "" &&
      inputdescr !== "" &&
      inpurremar !== "" &&
      inputupdateda !== "" &&
      inputsta !== ""
    ) {
      const makeobj = {
        tasktitle: inputtitl,
        taskdescription: inputdescr,
        taskstatus: inputsta,
        taskremarks: inpurremar,
        taskupdatedtimestamp: inputupdateda,
        id: this.props.sendeach.id,
      };
      const getcook = Cookies.get("jwt_token");
      const urlpo = "http://localhost:4000/updatetask";
      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getcook}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(makeobj),
      };
      const response = await fetch(urlpo, options);

      if (response.ok) {
        const getdata = await response.json();
      }
    } else {
      const chcfirsts = inputtitl !== "" ? false : true;
      const checseconds = inputdescr !== "" ? false : true;
      const checsthirds = inpurremar !== "" ? false : true;
      const checstoresfour = inputupdateda !== "" ? false : true;
      const checstoresfive = inputsta !== "" ? false : true;
      this.setState({
        reqtitle: chcfirsts,
        reqdescr: checseconds,
        reqrem: checsthirds,
        requp: checstoresfour,
        reqsta: checstoresfive,
      });
    }
  };

  getanothecall = () => {
    const { sendfunction } = this.props;
    sendfunction();
  };

  deleterowbased = async () => {
    const findid = { id: this.props.sendeach.id };
    const urlfordel = "http://localhost:4000/deletetask";
    const finjwt = Cookies.get("jwt_token");

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${finjwt}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(findid),
    };
    const response = await fetch(urlfordel, options);
    const getresul = await response.json();

    if (response.ok) {
      this.getanothecall();
    }
  };

  checkingerrortitle = (event) => {
    if (event.target.value === "") {
      this.setState({ reqtitle: true });
    } else {
      this.setState({ reqtitle: false });
    }
  };

  checkingerrordesc = (event) => {
    if (event.target.value === "") {
      this.setState({ reqdescr: true });
    } else {
      this.setState({ reqdescr: false });
    }
  };

  checkingerrorrem = (event) => {
    if (event.target.value === "") {
      this.setState({ reqrem: true });
    } else {
      this.setState({ reqrem: false });
    }
  };
  checkingerrorup = (event) => {
    if (event.target.value === "") {
      this.setState({ requp: true });
    } else {
      this.setState({ requp: false });
    }
  };

  checkingerrorsta = (event) => {
    if (event.target.value === "") {
      this.setState({ reqsta: true });
    } else {
      this.setState({ reqsta: false });
    }
  };

  callshowview = () => {
    this.setState((prevState) => ({
      showviews: !prevState.showviews,
    }));
  };

  callingedit = () => {
    const { showedit } = this.state;
    if (showedit === false) {
      this.setState((prevState) => ({
        showedit: !prevState.showedit,
      }));
    } else {
      this.setState(
        (prevState) => ({
          showedit: !prevState.showedit,
        }),
        this.goingtoupdate
      );
    }
  };

  changetitles = (event) => {
    this.setState({ inputtitl: event.target.value });
  };

  changedescr = (event) => {
    this.setState({ inputdescr: event.target.value });
  };
  changeremar = (event) => {
    this.setState({ inpurremar: event.target.value });
  };

  changestats = (event) => {
    this.setState({ inputsta: event.target.value });
  };

  changeupda = (event) => {
    this.setState({ inputupdateda: event.target.value.replace("T", " ") });
  };

  calltogetvalue = (recev) => {
    const valuegen = recev.replace("T", " ");
    return valuegen;
  };

  render() {
    const {
      showviews,
      showedit,
      inputtitl,
      inputdescr,
      inpurremar,
      inputupdateda,
      inputsta,
      reqtitle,
      reqdescr,
      reqrem,
      requp,
      reqsta,
    } = this.state;
    const { taskduedate, taskcreatedtimestamp } = this.props.sendeach;

    return (
      <li className="task-box">
        <div className="task-box-sub">
          <h1 className="task-show-head">{inputtitl.toUpperCase()}</h1>
          <div>
            {showviews ? (
              <button className="task-shows-but" onClick={this.callshowview}>
                Close
              </button>
            ) : (
              <button className="task-shows-but" onClick={this.callshowview}>
                View
              </button>
            )}
            <button onClick={this.deleterowbased} className="task-shows-but">
              Delete
            </button>
          </div>
        </div>
        <div
          className={
            showviews ? "views-shows sec-sub-bg" : "views-hide sec-sub-bg"
          }
        >
          <div className="task-details-box">
            <div className="edit-task-but">
              {showedit ? (
                <button onClick={this.callingedit} className="design-edit">
                  Save
                </button>
              ) : (
                <button onClick={this.callingedit} className="design-edit">
                  Edit
                </button>
              )}
            </div>
            {showedit ? (
              <div>
                <div className="first-sub-task">
                  <h1 className="head-title-head">Title</h1>
                  <input
                    type="text"
                    onBlur={this.checkingerrortitle}
                    onChange={this.changetitles}
                    value={inputtitl}
                    className="para-need-para"
                  />
                  {reqtitle && <p>*Required</p>}
                </div>
                <div className="first-sub-task">
                  <h1 className="head-title-head">Description</h1>
                  <input
                    onBlur={this.checkingerrordesc}
                    onChange={this.changedescr}
                    type="text"
                    value={inputdescr}
                    className="para-need-para"
                  />
                  {reqdescr && <p>*Required</p>}
                </div>
                <div className="first-sub-task">
                  <h1 className="head-title-head">Remarks</h1>
                  <input
                    onBlur={this.checkingerrorrem}
                    onChange={this.changeremar}
                    type="text"
                    value={inpurremar}
                    className="para-need-para"
                  />
                  {reqrem && <p>*Required</p>}
                </div>
                <div className="sub-second-box-created">
                  <div>
                    <h1 className="head-title-head">Created on</h1>
                    <p className="para-need-paras">{taskcreatedtimestamp}</p>
                  </div>
                  <div>
                    <h1 className="head-title-head">Updated on</h1>
                    <input
                      onBlur={this.checkingerrorup}
                      onChange={this.changeupda}
                      type="datetime-local"
                      value={inputupdateda}
                      className="para-need-paras"
                    />
                    {requp && <p>*Required</p>}
                  </div>
                  <div>
                    <h1 className="head-title-head">Due date</h1>
                    <p className="para-need-paras">{taskduedate}</p>
                  </div>
                  <div>
                    <h1 className="head-title-head">Status</h1>
                    <input
                      onBlur={this.checkingerrorsta}
                      onChange={this.changestats}
                      value={inputsta}
                      className="para-need-paras"
                    />
                    {reqsta && <p>*Required</p>}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="first-sub-task">
                  <h1 className="head-title-head">Title</h1>
                  <p className="para-need-para">{inputtitl}</p>
                  {reqtitle && <p>*Required</p>}
                </div>
                <div className="first-sub-task">
                  <h1 className="head-title-head">Description</h1>
                  <p className="para-need-para">{inputdescr}</p>
                  {reqdescr && <p>*Required</p>}
                </div>
                <div className="first-sub-task">
                  <h1 className="head-title-head">Remarks</h1>
                  <p className="para-need-para">{inpurremar}</p>
                  {reqrem && <p>*Required</p>}
                </div>
                <div className="sub-second-box-created">
                  <div>
                    <h1 className="head-title-head">Created on</h1>
                    <p className="para-need-paras">
                      {this.calltogetvalue(taskcreatedtimestamp)}
                    </p>
                  </div>
                  <div>
                    <h1 className="head-title-head">Updated on</h1>
                    <p className="para-need-paras">
                      {this.calltogetvalue(inputupdateda)}
                    </p>
                    {requp && <p>*Required</p>}
                  </div>
                  <div>
                    <h1 className="head-title-head">Due date</h1>
                    <p className="para-need-paras">
                      {this.calltogetvalue(taskduedate)}
                    </p>
                  </div>
                  <div>
                    <h1 className="head-title-head">Status</h1>
                    <p className="para-need-paras">{inputsta}</p>
                    {reqsta && <p>*Required</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </li>
    );
  }
}

export default Taskitems;
