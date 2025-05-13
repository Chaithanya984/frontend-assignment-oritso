/* eslint-disable no-unused-vars */
import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import Taskitems from "../Taskitems";

import "./index.css";
import Header from "../Header";

const letloadsomething = {
  INITIAL: "INITIAL",
  LOADVIEW: "LOADING",
  FAILURE: "FAILURE",
  RESULT: "RESULT",
};

class Tasks extends Component {
  state = {
    showmsg: false,
    isstatus: letloadsomething.LOADVIEW,
    getdataarr: [],
    sendtitle: "",
    senddescr: "",
    sendtaskduedate: "",
    sendtaskstatus: "",
    sendtaskremarks: "",
    sendtaskcreatedtimestamp: "",
    sendtaskupdatedtimestamp: "",
    senderrtitle: false,
    senderrdescr: false,
    senderrdue: false,
    senderrstat: false,
    senderrrem: false,
    senderrcr: false,
    senderup: false,
    searchin: "",
  };

  componentDidMount() {
    this.callmyapi();
  }

  callmyapi = async () => {
    const { isstatus } = this.state;
    this.setState({ isstatus: letloadsomething.LOADVIEW });
    const getjwt = Cookies.get("jwt_token");
    const uri = "http://localhost:4000/alltask";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getjwt}`,
        "Content-type": "application/json",
      },
    };

    const startfetch = await fetch(uri, options);
    const data = await startfetch.json();
    if (startfetch.ok) {
      const storeddata = data.alldatas;
      this.setState({
        isstatus: letloadsomething.RESULT,
        getdataarr: storeddata,
      });
    } else {
      this.setState({ isstatus: letloadsomething.FAILURE });
    }
  };

  calltoadd = async (event) => {
    event.preventDefault();
    const {
      sendtitle,
      senddescr,
      sendtaskduedate,
      sendtaskstatus,
      sendtaskremarks,
      sendtaskcreatedtimestamp,
      sendtaskupdatedtimestamp,
    } = this.state;
    if (
      sendtitle !== "" &&
      senddescr !== "" &&
      sendtaskduedate !== "" &&
      sendtaskstatus !== "" &&
      sendtaskremarks !== "" &&
      sendtaskcreatedtimestamp !== "" &&
      sendtaskupdatedtimestamp !== ""
    ) {
      const getdata = {
        tasktitle: sendtitle,
        taskdescription: senddescr,
        taskduedate: sendtaskduedate,
        taskstatus: sendtaskstatus,
        taskremarks: sendtaskremarks,
        taskcreatedtimestamp: sendtaskcreatedtimestamp,
        taskupdatedtimestamp: sendtaskupdatedtimestamp,
      };
      const getjwts = Cookies.get("jwt_token");
      const urlss = "http://localhost:4000/addtask";
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getjwts}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(getdata),
      };
      const response = await fetch(urlss, options);

      const data = await response.json();
      if (response.ok) {
        this.setState(
          {
            sendtitle: "",
            senddescr: "",
            sendtaskduedate: "",
            sendtaskstatus: "",
            sendtaskremarks: "",
            sendtaskcreatedtimestamp: "",
            sendtaskupdatedtimestamp: "",
          },
          this.callmyapi
        );
      }
    } else {
      const storefirsts = sendtitle !== "" ? false : true;
      const storesseconds = senddescr !== "" ? false : true;
      const storesthirds = sendtaskduedate !== "" ? false : true;
      const storesfour = sendtaskstatus !== "" ? false : true;
      const storesfive = sendtaskremarks !== "" ? false : true;
      const storessix = sendtaskcreatedtimestamp !== "" ? false : true;
      const storesseven = sendtaskupdatedtimestamp !== "" ? false : true;

      this.setState({
        senderrtitle: storefirsts,
        senderrdescr: storesseconds,
        senderrdue: storesthirds,
        senderrstat: storesfour,
        senderrrem: storesfive,
        senderrcr: storessix,
        senderup: storesseven,
      });
    }
  };

  gettingcallfromapi = () => {
    this.callmyapi();
  };

  getloadingview = () => (
    <div>
      <h1>Loading view</h1>
    </div>
  );

  getfailureview = () => (
    <div>
      <h1>failure view</h1>
    </div>
  );

  getresultview = () => {
    const { getdataarr, searchin } = this.state;
    const letsfilter = getdataarr.filter((each) =>
      each.tasktitle.toLowerCase().includes(searchin.toLowerCase())
    );

    return (
      <ul className="remove-ul">
        {letsfilter.length === 0 ? (
          <li>
            <h1>Tasks are empty add to manage task</h1>
          </li>
        ) : (
          letsfilter.map((each) => (
            <Taskitems
              key={each.id}
              sendeach={each}
              sendfunction={this.gettingcallfromapi}
            />
          ))
        )}
      </ul>
    );
  };

  callingtaskdata = () => {
    const { isstatus } = this.state;
    switch (isstatus) {
      case letloadsomething.LOADVIEW:
        return this.getloadingview();

      case letloadsomething.FAILURE:
        return this.getfailureview();
      case letloadsomething.RESULT:
        return this.getresultview();
      default:
        break;
    }
  };

  callingtochangetitle = (event) => {
    this.setState({ sendtitle: event.target.value });
  };
  callingtochangedescr = (event) => {
    this.setState({ senddescr: event.target.value });
  };
  callingtochangedue = (event) => {
    this.setState({ sendtaskduedate: event.target.value });
  };
  callingtochangestatus = (event) => {
    this.setState({ sendtaskstatus: event.target.value });
  };
  callingtochangeremark = (event) => {
    this.setState({ sendtaskremarks: event.target.value });
  };
  callingtochangecreate = (event) => {
    this.setState({ sendtaskcreatedtimestamp: event.target.value });
  };
  callingtochangeupdate = (event) => {
    this.setState({ sendtaskupdatedtimestamp: event.target.value });
  };

  changeSearch = (event) => {
    this.setState({ searchin: event.target.value });
  };

  checkingtitles = (event) => {
    if (event.target.value === "") {
      this.setState({ senderrtitle: true });
    } else {
      this.setState({ senderrtitle: false });
    }
  };

  checkingdesc = (event) => {
    if (event.target.value === "") {
      this.setState({ senderrdescr: true });
    } else {
      this.setState({ senderrdescr: false });
    }
  };

  checkingdue = (event) => {
    if (event.target.value === "") {
      this.setState({ senderrdue: true });
    } else {
      this.setState({ senderrdue: false });
    }
  };

  checkingstat = (event) => {
    if (event.target.value === "") {
      this.setState({ senderrstat: true });
    } else {
      this.setState({ senderrstat: false });
    }
  };

  checkingremark = (event) => {
    if (event.target.value === "") {
      this.setState({ senderrrem: true });
    } else {
      this.setState({ senderrrem: false });
    }
  };

  checkingscrea = (event) => {
    if (event.target.value === "") {
      this.setState({ senderrcr: true });
    } else {
      this.setState({ senderrcr: false });
    }
  };

  checkingupd = (event) => {
    if (event.target.value === "") {
      this.setState({ senderup: true });
    } else {
      this.setState({ senderup: false });
    }
  };

  render() {
    const {
      sendtitle,
      senddescr,
      sendtaskduedate,
      sendtaskstatus,
      sendtaskremarks,
      sendtaskcreatedtimestamp,
      sendtaskupdatedtimestamp,
      senderrtitle,
      senderrdescr,
      senderrdue,
      senderrstat,
      senderrrem,
      senderrcr,
      senderup,
      searchin,
    } = this.state;

    const getjwt = Cookies.get("jwt_token");
    if (getjwt === undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="main-task-bg">
        <Header />
        <div className="main-sub-task-bg">
          <form onSubmit={this.calltoadd} className="main-sub-form">
            <h1 className="add-title">Adding Tasks</h1>
            <div className="task-cont">
              <label className="task-label">Task Title</label>
              <input
                onBlur={this.checkingtitles}
                onChange={this.callingtochangetitle}
                value={sendtitle}
                type="text"
                className="task-input-cont"
              />
              {senderrtitle && <p>*Required</p>}
            </div>
            <div className="task-cont">
              <label className="task-label">Task Description</label>
              <input
                onBlur={this.checkingdesc}
                onChange={this.callingtochangedescr}
                value={senddescr}
                className="task-input-cont"
                type="text"
              />
              {senderrdescr && <p>*Required</p>}
            </div>
            <div className="task-cont">
              <label className="task-label">Task Due Date</label>
              <input
                onBlur={this.checkingdue}
                onChange={this.callingtochangedue}
                value={sendtaskduedate}
                className="task-input-cont-dat"
                type="datetime-local"
              />
              {senderrdue && <p>*Required</p>}
            </div>
            <div className="task-cont">
              <label className="task-label">Task Status</label>
              <input
                onBlur={this.checkingstat}
                onChange={this.callingtochangestatus}
                value={sendtaskstatus}
                className="task-input-cont"
                type="text"
              />
              {senderrstat && <p>*Required</p>}
            </div>
            <div className="task-cont">
              <label className="task-label">Task Remarks</label>
              <input
                onBlur={this.checkingremark}
                onChange={this.callingtochangeremark}
                value={sendtaskremarks}
                className="task-input-cont"
                type="text"
              />
              {senderrrem && <p>*Required</p>}
            </div>
            <div className="task-cont">
              <label className="task-label">Created On</label>
              <input
                onBlur={this.checkingscrea}
                onChange={this.callingtochangecreate}
                value={sendtaskcreatedtimestamp}
                className="task-input-cont-dat"
                type="datetime-local"
              />
              {senderrcr && <p>*Required</p>}
            </div>
            <div className="task-cont">
              <label className="task-label">Last Updated on</label>
              <input
                onBlur={this.checkingupd}
                onChange={this.callingtochangeupdate}
                value={sendtaskupdatedtimestamp}
                className="task-input-cont-dat"
                type="datetime-local"
              />
              {senderup && <p>*Required</p>}
            </div>
            <div className="task-cont-but">
              <button type="submit" className="task-but">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="second-main-bg">
          <div>
            <div className="sec-search-cont">
              <h1 className="manag-head">Managing Tasks</h1>
              <input
                className="search-inp"
                value={searchin}
                onChange={this.changeSearch}
                type="search"
              />
            </div>

            {this.callingtaskdata()}
          </div>
        </div>
      </div>
    );
  }
}

export default Tasks;
