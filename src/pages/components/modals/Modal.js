import React from "react";
import { Row, Col, Button } from "reactstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uuid from "uuid/v4";
import Widget from "../../../components/Widget";
import s from "./Modal.module.scss";

class Modal extends React.Component {

    constructor(props) {
        super(props);
      }

  state = {
    options: {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
    },
  };

  componentDidMount() {
    
  }

  addSuccessNotification = () =>
    toast.success(
      "Showing success message was successful!",
      this.state.options
    );

  toggleLocation = (location) => {
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        position: location,
      },
    }));
  };

  addInfoNotification = () => {
    let id = uuid();
    toast(
      <div>
        Launching thermonuclear war...
        <Button
          onClick={() => this.launchNotification(id)}
          outline
          size="xs"
          className="width-100 mb-xs mr-xs mt-1"
        >
          Cancel launch
        </Button>
      </div>,
      { 
        ...this.state.options,
        className: "Toastify__toast--primary",
        toastId: id
        }
    );
  };

  launchNotification = (id) =>
    toast.update(id, {
      ...this.state.options,
      render: "Thermonuclear war averted",
      type: toast.TYPE.SUCCESS,
    });

  addErrorNotification = () => {
    let id = uuid();
    toast.error(
      <div>
        Error destroying alien planet <br />
        <Button
          onClick={() => this.retryNotification(id)}
          outline
          size="xs"
          className="width-100 mb-xs mr-xs mt-1"
        >
          Retry
        </Button>
      </div>,
      { ...this.state.options, toastId: id }
    );
  };

  retryNotification = (id) =>
    toast.update(id, {
      ...this.state.options,
      render: "Alien planet destroyed!",
      type: toast.TYPE.SUCCESS,
    });

  render() {
    return (
      <div className={s.root}>
        <Widget title={<h6> {this.props.title}</h6>} close collapse>
          <Row>
            <Col xs="12">
              <h2><p>Here comest info about {this.props.title}</p></h2>
            </Col>
          </Row>
        </Widget>
      </div>
    );
  }
}

export default Modal;
