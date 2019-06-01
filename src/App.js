import React from "react";
import "./App.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SimpleModal from "./simpleModal";

class App extends React.Component {
  state = {
    movies: "",
    openedMovie:null
  };
  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=6b9f0aa6f700483172cf892adef674b7`
      )
      .then(res => {
        const movies = res.data;
        this.setState({ movies });
      });
  }

  getMovie=(id)=>{
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=6b9f0aa6f700483172cf892adef674b7`
      )
      .then(res => {
        const movie = res.data;
        this.setState({ openedMovie:movie });
      });
  }

  handleModalOpen = e => {
    this.setState({
      isOpen: true,
    });
    this.getMovie(e.target.id)
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  handlePopMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=6b9f0aa6f700483172cf892adef674b7`
      )
      .then(res => {
        const movies = res.data;
        this.setState({ movies });
      });
  };

  handlePlayingMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=6b9f0aa6f700483172cf892adef674b7`
      )
      .then(res => {
        const movies = res.data;
        this.setState({ movies });
      });
  };

  searchMovies = e => {
    const query = e.target.value;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=6b9f0aa6f700483172cf892adef674b7&language=en-US&page=1&include_adult=false&query=${query}`
      )
      .then(res => {
        const movies = res.data;
        this.setState({ movies });
      });
  };

  render() {
    const columns = [
      {
        Header: "Title",
        accessor: "title", // String-based value accessors!
        Cell: props => {
          return (
            <a
              id={props.original.id}
              href="#"
              onClick={this.handleModalOpen}
              className="number"
            >
              {props.value}
            </a>
          );
        },
        width: 150
      },

      {
        Header: "Popular",
        accessor: "popularity",
        width: 150
      },
      {
        Header: "Release Date",
        accessor: "release_date",
        width: 150
      },
      {
        Header: "Overview",
        accessor: "overview",
        width: 350
      }
    ];

    return (
      <div className="app-container">
        <SimpleModal
          isOpen={this.state.isOpen}
          handleClose={this.handleClose}
          movieInfo={this.state.openedMovie}
        />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="title">
              JustForFUN Theaters
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className="app-container">
          <CardHeader title="Movies" />
          <CardContent className="main-card-body">
            <div>
              <Button
                onClick={this.handlePlayingMovies}
                variant="contained"
                color="secondary"
              >
                Now Playing
              </Button>{" "}
              <Button
                onClick={this.handlePopMovies}
                variant="contained"
                color="secondary"
              >
                POP Movies
              </Button>
              <TextField
                onChange={this.searchMovies}
                id="outlined-bare"
                className="search-filter"
                placeholder="Search"
                margin="normal"
                variant="outlined"
              />
            </div>
            {this.state.movies ? (
              <ReactTable
                className="content-table"
                data={this.state.movies.results}
                columns={columns}
              />
            ) : null}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default App;
