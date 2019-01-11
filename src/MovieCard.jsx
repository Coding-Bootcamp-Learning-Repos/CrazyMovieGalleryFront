
/* IMPORTANT TO READ
Component which represents the display of ONE movie */

/* Importing React */
import React, { Component } from 'react';
/* Importing Ant design */
import 'antd/dist/antd.css';
import { Card, Col } from 'antd';
/* Importing children */
import backendServerAddress from './backendServerPath.js';
/* Importing styles and images */
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const { Meta } = Card;

class MovieCard extends Component {
  constructor(props){
    super(props);
    this.changeColor=this.changeColor.bind(this);
    this.state= {
      isLike: this.props.isLike
    };
  }

  //Function triggered when user clicks on heart on movie card
  changeColor(){
    var newLike=!this.props.isLike;
    var ctx = this;
    this.setState(
      {isLike: newLike}
    );
    if (newLike===false) {
      //Ask server to delete disliked film from favorte movies list
      fetch(backendServerAddress.current+'/mymovies?id='+ctx.props.movieId, {
        method:"DELETE"
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        ctx.props.updateListFavoriteMovies();
      })
    } else{
      //Ask server to add liked film to favorite movies list
      fetch(backendServerAddress.current+'/mymovies', {
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: "title="+ctx.props.movieName+"&overview="+ctx.props.movieDesc+"&poster_path="+ctx.props.movieImg+"&id="+ctx.props.movieId
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        ctx.props.updateListFavoriteMovies();
      })
    }
  }

  render() {
    return(
      <div >
        <Col className ="ant-col-xs-24 ant-col-sm-12 ant-col-md-6 centerCard">
          <Card
            className="movieCard"
            cover={
              <div className="packImg">
                <img
                  alt="example"
                  src={"https://image.tmdb.org/t/p/w500"+this.props.movieImg}
                  id="cover"
                />
                <span onClick={this.changeColor}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    id="heart"
                    style={this.props.isLike ? {color: "#FF5B53"} : {color: "#000000"}}
                    className="hide"
                  />
                </span>
              </div>
            }>
            <Meta
              title={this.props.movieName}
              description={this.props.movieDesc}
            />
          </Card>
        </Col>
      </div>
    )
  }
}

export default MovieCard;
