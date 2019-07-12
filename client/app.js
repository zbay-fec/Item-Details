import React from "react";
import axios from "axios";
import Sidebar from './components/sidebar.js'
import Image from './components/image.js'

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle : false,
      side : '',
      main : '',
      images : [],
      item : {
        data: {
          ID: "FBV587t",
          Condition: '',
        }
      }
    }
    this.image = this.image.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBackGround = this.handleBackGround.bind(this);
  }

  handleClick (e) {
    this.setState({main : e.target.src});
  }

  image () {
    let imageArr = [];
    for(let i = 1; i < 6; i++){
      if(this.state.item.data['Image ' + i]){
        imageArr.push(this.state.item.data['Image ' + i])
      }
    }
    return imageArr;
  }

  handleMouseOver () {
    this.setState(this.toggleImageState);
  }

  toggleImageState (state) {
    return {
      toggle: !state.toggle
    };
  }

  onMouseOver (e) {
    this.setState({side : e.target.src});
  }

  handleBackGround(link) {
    if(link === this.state.main){
      return 'main';
    }else if(link === this.state.side && this.state.toggle){
      return 'side';
    }else{
      return 'reg';
    }
  }

  componentDidMount () {
    axios.get(`/item/${this.state.item.data.ID}`)
      .then(results => {
        this.setState({item : results});
        this.setState({images : this.image()});
        this.setState({main : this.state.images[0]});
      }
    )
  }

  render () {
    return (
    <div className='parent grid-parent'>
      <div id='sidebar'>
        <Sidebar images={this.state.images} mouse={this.onMouseOver} handle={this.handleMouseOver}
        click={this.handleClick} background={this.handleBackGround}/>
      </div>
      <div id='image'>
        <Image image={this.state.main} side={this.state.side} toggle={this.state.toggle}/>
        <span><p id="sale"><i>$</i><b> Have one to sell?</b><button type="button">Sell now</button></p></span>
      </div>
      <div>
        <h1 id='title'>{this.state.item.data['Name']}</h1>
        <h5><div className='fixed'>Condition: <b>{this.state.item.data.Condition}</b></div></h5>
        <h5><div className='fixed'>Quantity: <input type='text' size='4'></input></div></h5>
        <h5>Price: {this.state.item.data.Price}</h5>
      </div>
      <div id='seller'>
        <h3>Seller Information</h3>
        <h5>{this.state.item.data['Seller Name']} {this.state.item.data['Seller Score']}</h5>
        <h5>{this.state.item.data['Seller Feedback']}% Positive Feedback</h5>
      </div>
    </div>
    )
  }
}
export default ItemDetail;
