import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Col,
  Row,
  Image,
  Modal,
  Badge,
  Button,
} from "react-bootstrap";

class TitleModal extends Component {
  state = {
    modalShow: false,
    selectedTitle: this.props.selectedTitle,
    selectedTitleID: this.props.selectedTitleID,
    selectedShowTitle: this.props.selectedShowTitle,
    selectedShowTitleID: this.props.selectedShowTitleID,
    isShowOnMyList: this.props.onmylist
  };
  

  submitMovie = async (event) => {
    console.log(this.props);
    event.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.set("userid", this.props.user);
    bodyFormData.set("titleid", this.state.selectedTitleID);
    await axios({
      method: "post",
      url: "https://api-iwt.carlospoupado.com/addMovieTitle.php",
      data: bodyFormData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}`,
      },
    })
      .then(function (response) {
        console.log(response);
        this.setState({
          isShowOnMyList: true
        })
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  submitShow = async (event) => {
    event.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.set("userid", this.props.user);
    bodyFormData.set("titleid", this.state.selectedShowTitleID);
    await axios({
      method: "post",
      url: "https://api-iwt.carlospoupado.com/addShowTitle.php",
      data: bodyFormData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}`,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  onOpenModal = (idx, idtitle) => {
    this.setState({
      modalShow: true,
      selectedTitle: idx, // When a post is clicked, mark it as selected
      selectedTitleID: idtitle,
      selectedShowTitle: idx, // When a post is clicked, mark it as selected
      selectedShowTitleID: idtitle,
    });
    console.log(this.state.isShowOnMyList);
  };

  onCloseModal = () => {
    this.setState({ modalShow: false });
  };

  renderModal = () => {
    const { modalShow } = this.state;
    if (this.props.type == "movie") {
      // Check if it's a MOVIE
      // Check to see if there's a selected post. If so, render it.
      if (this.props.selectedTitle !== null) {
        const title = this.props.movies[this.props.selectedTitle];

        return (
          <>
            <Image
              key={title.id}
              onClick={() => this.onOpenModal(this.selectedTitle, title.id)}
              className="poster"
              fluid
              variant="dark"
              src={"https://image.tmdb.org/t/p/original" + title.poster_path}
            />
            <Modal
              contentClassName="custom-modal"
              show={modalShow}
              onHide={this.onCloseModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header
                contentClassName="custom-modal-header"
                closeButton
                closeVariant="white"
              >
                {this.props.onmylist ? (
                  <form onSubmit={(e) => this.submitMovie(e)}>
                    <Button variant="danger" type="submit">
                      Remove from My List
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={(e) => this.submitMovie(e)}>
                    <Button variant="success" type="submit">
                      Add to My List
                    </Button>
                  </form>
                )}
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col xs={4} md={4}>
                      <Image
                        className="poster"
                        fluid
                        src={
                          "https://image.tmdb.org/t/p/original" +
                          title.poster_path
                        }
                      />
                    </Col>
                    <Col xs={8} md={8}>
                      <Badge pill bg="dark">
                        Original Title:
                      </Badge>
                      <Badge pill bg="secondary">
                        {title.original_title}
                      </Badge>
                      <br />
                      <Badge pill bg="dark">
                        Release Date:
                      </Badge>
                      <Badge pill bg="secondary">
                        {title.release_date}
                      </Badge>
                      <br />
                      <Badge pill bg="dark">
                        Genres
                      </Badge>
                      <Badge pill bg="secondary">
                        {title.genre_ids.map((genreId) => {
                          var result = this.props.genres.filter((x) => {
                            if (genreId.id != undefined)
                              return x.id === genreId.id;
                            return x.id === genreId;
                          })[0];
                          if (result != undefined) {
                            return result.name + " ";
                          }
                          return;
                        })}
                      </Badge>
                      <br />
                      <Badge pill bg="dark">
                        Rating:
                      </Badge>
                      <Badge pill bg="secondary">
                        {title.vote_average}/10 out of {title.vote_count} votes.
                      </Badge>
                      <br />
                      <Badge pill bg="dark">
                        Description:
                      </Badge>
                      {title.overview}
                      <br />
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
            </Modal>
          </>
        );
      }
    }

    if (this.props.type == "tvshow") {
      // Check if it's a TV SHOWW

      if (this.props.selectedShowTitle !== null) {
        const title = this.props.shows[this.props.selectedShowTitle];
        return (
          <>
            <Image
              key={title.id}
              onClick={() => this.onOpenModal(this.selectedTitle, title.id)}
              className="poster"
              fluid
              variant="dark"
              src={"https://image.tmdb.org/t/p/original" + title.poster_path}
            />
            <Modal
              contentClassName="custom-modal"
              show={modalShow}
              onHide={this.onCloseModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header
                contentClassName="custom-modal-header"
                closeButton
                closeVariant="white"
              >
                {this.props.onmylist ? (
                  <form onSubmit={(e) => this.submitShow(e)}>
                    <Button variant="danger" type="submit">
                      Remove from My List
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={(e) => this.submitShow(e)}>
                    <Button variant="success" type="submit">
                      Add to My List
                    </Button>
                  </form>
                )}
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col xs={4} md={4}>
                      <Image
                        className="poster"
                        fluid
                        src={
                          "https://image.tmdb.org/t/p/original" +
                          title.poster_path
                        }
                      />
                    </Col>
                    <Col xs={8} md={8}>
                      <Badge pill bg="dark">
                        Original Title:
                      </Badge>
                      <Badge pill bg="secondary">
                        {title.name}
                      </Badge>
                      <br />
                      <Badge pill bg="dark">
                        Aired in:
                      </Badge>
                      <Badge pill bg="secondary">
                        {title.first_air_date}
                      </Badge>
                      <br />
                      <Badge pill bg="dark">
                        Genres
                      </Badge>
                      <Badge pill bg="secondary">
                        {title.genre_ids.map((genreId) => {
                          var result = this.props.tvgenres.filter((x) => {
                            if (genreId.id != undefined)
                              return x.id === genreId.id;
                            return x.id === genreId;
                          })[0];
                          //console.log(this.props.tvgenres);
                          if (result != undefined) {
                            return result.name + " ";
                          }
                          return;
                        })}
                      </Badge>
                      <br />
                      <Badge pill bg="dark">
                        Rating:
                      </Badge>
                      <Badge pill bg="secondary">
                        {title.vote_average} out of {title.vote_count} votes.
                      </Badge>
                      <br />
                      <Badge pill bg="dark">
                        Description:
                      </Badge>
                      {title.overview}
                      <br />
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
            </Modal>
          </>
        );
      }
    }
  };

  render() {
    return this.renderModal();
  }
}

export default TitleModal;
