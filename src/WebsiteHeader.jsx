
/* IMPORTANT TO READ
Component which represents the header where the user can select :
-- Either the latest movies
-- Either his favorite movies */

/* Importing React */
import React, { Component } from 'react';
/* Importing Ant design */
import 'antd/dist/antd.css';
import { Layout, Menu, Popover, Button } from 'antd';

/* Importing children */

/* Importing styles and images */
import './style.css';

const { Header } = Layout;

class WebsiteHeader extends Component {
  constructor(props){
    super(props);
    this.showPopover=this.showPopover.bind(this);
    this.hidePopover=this.hidePopover.bind(this);
    this.showFavoriteHeader=this.showFavoriteHeader.bind(this);
    this.showAllHeader=this.showAllHeader.bind(this);

    this.state={
      visible: false,
      showFavorite:true
    }
  }

  //Next two functions are triggered when user clicks on button with number of films liked
  showPopover(visible){
    this.setState(
      {visible}
    );
  }
  hidePopover(){
    this.setState(
      {visible: false}
    );
  }

  //Next two functions are triggered when user clicks on "My Movies" or "Last releases"
  showFavoriteHeader(){
    this.props.favHeaderToLayout();
  }
  showAllHeader(){
    this.props.allHeaderToLayout();
  }

  render(){
    return(
      <Header id="header">
        <div className="logo"/>
        <Menu
          id = "headerMenu"
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
        >
          <img src="/images/logo.png" className="WebsiteLogo" alt="logo"/>
          <Menu.Item key="1" onClick={this.showAllHeader}>
            Last releases
          </Menu.Item>
          <Menu.Item key="2" onClick={this.showFavoriteHeader}>
            My movies
          </Menu.Item>
        </Menu>

        <Popover
          placement="bottom"
          content={
            <Button href="" onClick={this.hidePopover}>
              {this.props.favoriteLastMovies}
            </Button>
          }
          title="Derniers films ajoutés"
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.showPopover}
        >
          <Button type="secondary" id="nbFilms">
            {this.props.moviesCount} Films
          </Button>
        </Popover>
      </Header>
    )
  }
}

export default WebsiteHeader;
