import React, { Component } from "react";
import axios from "axios";
import { Row, Badge } from "react-bootstrap";
import TitleAndModal from "./TitleAndModal";

class MyList extends Component {
  page = 1;
  API_KEY = "623087bbd8b0d97fcd8bf2b969dadd00";
  API_URL_MOVIEGENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`;
  API_URL_TVGENRES = `https://api.themoviedb.org/3/genre/tv/list?api_key=${this.API_KEY}&language=en-US`;

  state = {
    movies_watched: [],
    genres: [],
    tvgenres: [],
    shows_watched: [],
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
      .get(
        "https://api-iwt.carlospoupado.com/getMyList.php?type=shows&userid=" +
          this.props.user
      )
      .then((response) => {
        let data = response.data;
        data.forEach((item) => {
          axios
            .get(
              `https://api.themoviedb.org/3/tv/${item.titleid}?api_key=${this.API_KEY}&language=en-US`
            )
            .then((response) => response.data)
            .then((item) => {
              this.setState((prevState) => ({
                shows_watched: [  {"id":item.id, "name": item.name, "first_air_date": item.first_air_date, "genre_ids":item.genres, "vote_average": item.vote_average,"vote_count": item.vote_count, "overview": item.overview, "poster_path": item.poster_path},...prevState.shows_watched ]
              }))
            });
        });
      });

      axios
      .get(
        "https://api-iwt.carlospoupado.com/getMyList.php?type=movies&userid=" +
          this.props.user
      )
      .then((response) => {
        let data = response.data;
        data.forEach((item) => {
          axios
            .get(
              `https://api.themoviedb.org/3/movie/${item.titleid}?api_key=${this.API_KEY}&language=en-US`
            )
            .then((response) => response.data)
            .then((item) => {
              this.setState((prevState) => ({
                movies_watched: [ {"id":item.id, "original_title": item.original_title, "release_date": item.release_date, "genre_ids":item.genres, "vote_average": item.vote_average, "vote_count": item.vote_count, "overview": item.overview, "poster_path": item.poster_path}, ...prevState.movies_watched ]
              }))
            });
        });
      });
  }

  renderMovies = () => {
    return this.state.movies_watched.map((item, idx) => {
      return (
        <>
          <TitleAndModal
            user={this.props.user}
            type="movie"
            movies={this.state.movies_watched}
            selectedTitle={idx}
            selectedTitleID={item.id}
            genres={this.state.genres}
            onmylist
          ></TitleAndModal>
        </>
      );
    });
  };

  renderShows = () => {
    return this.state.shows_watched.map((item, idx) => {
      return (
        <>
          <TitleAndModal
            user={this.props.user}
            type="tvshow"
            shows={this.state.shows_watched}
            selectedShowTitle={idx}
            selectedShowTitleID={item.id}
            tvgenres={this.state.tvgenres}
            onmylist
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
            <Badge bg="success">My Movies</Badge>
          </h2>
        </Row>
        <Row xs={6} className="">
          {this.renderMovies()}
        </Row>
        <Row xs="auto" className="center noflex">
          <h2>
            <Badge bg="success">My Shows</Badge>
          </h2>
        </Row>
        <Row xs={6} className="">
          {this.renderShows()}
        </Row>
      </>,
    ];
  }
}

export default MyList;
