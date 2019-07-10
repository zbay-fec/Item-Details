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
          ID: "CSB996n",
          Condition: '',
        }
      }
    }
    this.image = this.image.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  componentDidMount () {
    axios.get(`/item/${this.state.item.data.ID}`)
      .then(results => {
        this.setState({item : results});
        this.setState({images : this.image()});
        this.setState({main : this.state.images[0]})
      }
    )
  }

  render () {
    return (
    <div>
    <h1>{this.state.item.data['Name']}</h1>
      <Sidebar images={this.state.images} mouse={this.onMouseOver} handle={this.handleMouseOver} click={this.handleClick}/>
      <Image image={this.state.main} side={this.state.side} toggle={this.state.toggle}/>
      <h5>Condition: {this.state.item.data.Condition}</h5>
      <h5>Quantity: <input type='text' size='4'></input></h5>
      <h5>Price: {this.state.item.data.Price}</h5>
      <h3>Seller Information</h3>
      <h5>{this.state.item.data['Seller Name']} {this.state.item.data['Seller Score']}</h5>
      <h5>{this.state.item.data['Seller Feedback']}% Positive Feedback</h5>
    </div>
    )
  }
}
export default ItemDetail;
