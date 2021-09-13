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


  render() {
    return (
      <div className={s.root}>
        <Widget title={<h6> {this.props.title}</h6>} close handleToggleModal={this.props.toggleModal}> 
        {
        //collapse
        }
          <Row>
            <Col xs="12">
              <h2><p>Here comes info about {this.props.title}</p></h2>
            </Col>
          </Row>
        </Widget>
      </div>
    );
  }
}

export default Modal;
