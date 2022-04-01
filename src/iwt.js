import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Container, Row, Col, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./app.js";

const API_PATH = "https://api-iwt.carlospoupado.com/feedback_ac.php";

class iwt extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", feedback: "", dataSent: "" };
  }

  onSubmit(event) {
    console.log("submit");
    axios({
      method: "post",
      url: API_PATH,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: this.state,
    })
      .then((result) => {
        console.log(result.data);
        this.setState({
          dataSent: result.data.sent,
        });
        console.log(this.state);
      })
      .catch((error) =>
        this.setState({
          error: error.message,
        })
      );
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#features">Features</Nav.Link>
                  <Nav.Link href="#pricing">Pricing</Nav.Link>
                  <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Link href="#deets">More deets</Nav.Link>
                  <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
        <Row>
          <Col>123</Col>
          <Col>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<App />}></Route>
              </Routes>
            </BrowserRouter>
          </Col>
        </Row>
        <Row>
          <Col>Footer</Col>
        </Row>
      </Container>
    );
  }
}
export default iwt;
