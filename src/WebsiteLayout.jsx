
/* IMPORTANT TO READ
Top component which represents the layout and which includes :
-- The MovieCard components
-- The WebsiteHeader component */

/* Importing React */
import React, { Component } from 'react';
/* Importing Ant design */
import 'antd/dist/antd.css';
import { Layout, Row } from 'antd';
/* Importing children */
import MovieCard from './MovieCard.jsx';
import WebsiteHeader from './WebsiteHeader.jsx';
import backendServerAddress from './backendServerPath.js';
/* Importing styles and images */
import './style.css';

const { Content, Footer } = Layout;

class WebsiteLayout extends Component {
  constructor(props){
    super(props);
    this.keepFavorites=this.keepFavorites.bind(this);
    this.showAll=this.showAll.bind(this);
    this.updateListFavoriteMovies=this.updateListFavoriteMovies.bind(this);

    this.state= {
      showFavorite: false,
      listLatestMovies:[],
      listFavoriteMovies:[]
    }
  }

  //Initialisation of data
  componentDidMount(){
    var ctx = this;
    // Get the latest movies from the backend
    fetch(backendServerAddress.current+'/movie')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
       ctx.setState(
         {listLatestMovies: data});
    })
    // Get the favorite movies from the backend
    fetch(backendServerAddress.current+'/mymovies')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      ctx.setState(
         {listFavoriteMovies: data});
    })
  }

  //Function triggered when user clicks on "My Movies"
  keepFavorites(){
    this.setState(
      {showFavorite: true}
    )
  }
  //Function triggered when user clicks on "Last Releases"
  showAll(){
    this.setState(
      {showFavorite: false}
    )
  }
  //Function triggered when user likes/dislikes a movie on MovieCard
  updateListFavoriteMovies(){
    var ctx = this;
    fetch(backendServerAddress.current+'/mymovies')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      ctx.setState(
         {listFavoriteMovies: data});
    })
  }

  render() {
    /*To handle the display of number of favorite films and popover description in header*/
    var favoriteLastMovies=
    this.state.listFavoriteMovies.slice(Math.max(this.state.listFavoriteMovies.length - 3, 0));
    var favoriteLastMoviesNames=favoriteLastMovies.map(movie => movie.title);

    /*To create the list of html movies cards*/
    var moviesList=[];
    if (this.state.showFavorite===false) {
      for (var i = 0; i < this.state.listLatestMovies.length; i++) {
        var isLike= false;
        for (var j = 0; j < this.state.listFavoriteMovies.length; j++) {
          if (this.state.listLatestMovies[i].id ===this.state.listFavoriteMovies[j].id) {
            isLike= true;
            break;
          }
        }
        moviesList.push(<MovieCard
          key={i}
          movieName={this.state.listLatestMovies[i].title}
          movieDesc={this.state.listLatestMovies[i].overview}
          movieImg={this.state.listLatestMovies[i].poster_path}
          movieId={this.state.listLatestMovies[i].id}
          updateListFavoriteMovies = {this.updateListFavoriteMovies}
          isLike={isLike}
          showFavorite={this.state.showFavorite}
        />)
      }
    } else {
      for (var k = 0; k < this.state.listFavoriteMovies.length; k++) {
        isLike=true;
        moviesList.push(<MovieCard
          key={k}
          movieName={this.state.listFavoriteMovies[k].title}
          movieDesc={this.state.listFavoriteMovies[k].overview}
          movieImg={this.state.listFavoriteMovies[k].poster_path}
          movieId={this.state.listFavoriteMovies[k].id}
          updateListFavoriteMovies = {this.updateListFavoriteMovies}
          isLike={isLike}
          showFavorite={this.state.showFavorite}
        />)
      }
    }


    return(
      <Layout>
        <WebsiteHeader
          moviesCount={this.state.listFavoriteMovies.length}
          favoriteLastMovies= {favoriteLastMoviesNames.join(", ")}
          favHeaderToLayout={this.keepFavorites}
          allHeaderToLayout={this.showAll}
        />
      <Content className="contentBackground">
          <div>
            <Row>
              {moviesList}
            </Row>
          </div>
        </Content>
        <Footer id="footer">
          My Moviz ©2019 Created by François FITZPATRICK
        </Footer>
      </Layout>
    )
  }
}

export default WebsiteLayout;
