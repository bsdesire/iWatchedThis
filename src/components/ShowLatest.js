import React, { Component } from "react";
import axios from "axios";
import { Row, Badge } from "react-bootstrap";
import TitleAndModal from "./TitleAndModal";

class Latest extends Component {
  page = 1;
  API_KEY = "623087bbd8b0d97fcd8bf2b969dadd00";
  API_URL_LATESTMOVIES = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.API_KEY}&language=en-US&page=${this.page}`;
  API_URL_MOVIEGENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`;
  API_URL_POPULARSHOWS = `https://api.themoviedb.org/3/tv/popular?api_key=${this.API_KEY}&language=en-US&page=1`;
  API_URL_TVGENRES = `https://api.themoviedb.org/3/genre/tv/list?api_key=623087bbd8b0d97fcd8bf2b969dadd00&language=en-US`;
  MY_WATCHED_MOVIES = `https://api-iwt.carlospoupado.com/getMyList.php?type=movies&userid=${this.props.user}`;
  MY_WATCHED_SHOWS = `https://api-iwt.carlospoupado.com/getMyList.php?type=shows&userid=${this.props.user}`;

  state = {
    movies: [],
    genres: [],
    tvgenres: [],
    shows: [],
    watched: [],
    modalShow: false,
    selectedTitle: null,
    modalShowsShow: false,
    selectedShowTitle: null,
    selectedTitleID: null,
  };

  async componentDidMount() {
    axios
      .get(this.API_URL_MOVIEGENRES)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ genres: data.genres });
      });

    axios
      .get(this.API_URL_TVGENRES)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ tvgenres: data.genres });
      });

    axios
      .get(this.API_URL_LATESTMOVIES)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ movies: data.results });
      });

    axios
      .get(this.API_URL_POPULARSHOWS)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ shows: data.results });
      });

    axios
      .get(this.MY_WATCHED_MOVIES)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ watched: data });
      });
  }


  renderMovies = () => {
    return this.state.movies.map((item, idx) => {
      let isItOnMyList = false;
      this.state.watched.map((watcheditem) => {
        if (watcheditem.titleid == item.id) {
          isItOnMyList = true;
        }
      });
      if (isItOnMyList)
        return (
          <>
            <TitleAndModal
              user={this.props.user}
              type="movie"
              movies={this.state.movies}
              selectedTitle={idx}
              selectedTitleID={item.id}
              genres={this.state.genres}
              onmylist
            ></TitleAndModal>
          </>
        );
      else
        return (
          <>
            <TitleAndModal
              user={this.props.user}
              type="movie"
              movies={this.state.movies}
              selectedTitle={idx}
              selectedTitleID={item.id}
              genres={this.state.genres}
            ></TitleAndModal>
          </>
        );
    });
  };

  renderShows = () => {
    return this.state.shows.map((item, idx) => {
      return (
        <>
          <TitleAndModal
            user={this.props.user}
            type="tvshow"
            shows={this.state.shows}
            selectedShowTitle={idx}
            selectedShowTitleID={item.id}
            tvgenres={this.state.tvgenres}
          ></TitleAndModal>
        </>
      );
    });
  };

  render() {
    return [
      <>
        <Row xs="auto" className="center noflex">
          <h2>
            <Badge bg="success">Now Playing (Movies)</Badge>
          </h2>
        </Row>
        <Row xs={6} className="scrollable-x">
          {this.renderMovies()}
        </Row>
        <Row xs="auto" className="center noflex">
          <h2>
            <Badge bg="success">Now Popular (Shows)</Badge>
          </h2>
        </Row>
        <Row xs={6} className="scrollable-x">
          {this.renderShows()}
        </Row>
      </>,
    ];
  }
}

export default Latest;
