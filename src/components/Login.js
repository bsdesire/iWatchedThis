import React, { useContext, useState } from "react";
import { MyContext } from "../contexts/MyContext";

import { Card, Container, Row, Col } from "react-bootstrap";

function Login() {
  const { toggleNav, loginUser, isLoggedIn } = useContext(MyContext);

  const initialState = {
    userInfo: {
      email: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };

  const [state, setState] = useState(initialState);

  // On change input value (email & password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  // On Submit Login From
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await loginUser(state.userInfo);
    if (data.success && data.token) {
      setState({
        ...initialState,
      });
      localStorage.setItem("loginToken", data.token);
      await isLoggedIn();
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  // Show Message on Error or Success
  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt2">
        <Col md="auto" >
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>

            <div className="_loginRegister">
              <h1>Login</h1>
              <form onSubmit={submitForm} noValidate>
                <div className="form-control">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={state.userInfo.email}
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-control">
                  <label>PassWord</label>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={state.userInfo.password}
                    onChange={onChangeValue}
                  />
                </div>
                {errorMsg}
                {successMsg}
                <div className="form-control">
                  <button type="submit">Login</button>
                </div>
              </form>
              <div className="_navBtn">
                <button onClick={toggleNav}>Register</button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
