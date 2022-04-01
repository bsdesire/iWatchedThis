import React, { useContext } from "react";
import { MyContext } from "../contexts/MyContext";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Badge,
  Button,
  Alert,
} from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Importing the Login & Register Componet
import Login from "./Login";
import Register from "./Register";
import Latest from "./ShowLatest";
import MyList from "./myList";

function Home() {
  const { rootState, logoutUser } = useContext(MyContext);
  const { isAuth, theUser, showLogin } = rootState;

  // If user Logged in
  if (isAuth) {
    return (
      <Container fluid>
        <Row>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">iWatchedThis</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="mylist">My List</Nav.Link>
                  <Nav.Link href="#movies">Movies</Nav.Link>
                  <Nav.Link href="#shows">Shows</Nav.Link>
                  <Nav.Link href="#books">Books</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="#">
                    <Badge bg="light" text="dark">
                      {theUser.name}
                    </Badge>
                  </Nav.Link>
                  <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
        <Row>
          <Col sm={12}>
            <Alert variant="success">
              <Alert.Heading className="center">Hey, thanks for using iWatchedThis!</Alert.Heading>
              <p>
                Thank you! This application was developed as an academic
                project, as such there's definitely a huge chance of finding
                bugs, if you break it somehow, please do email
                contact@carlospoupado.com.
              </p>
            </Alert>
          </Col>
          <Col sm={12} className="center">
            <BrowserRouter>
            <Routes>
            <Route path="/" element={<Latest user={theUser.id}/>}></Route>
            <Route path="/mylist" element={<MyList user={theUser.id}/>}></Route>
              </Routes>
            </BrowserRouter>
          </Col>
        </Row>
      </Container>
    );
  }
  // Showing Login Or Register Page According to the condition
  else if (showLogin) {
    return <Login />;
  } else {
    return <Register />;
  }
}

export default Home;
