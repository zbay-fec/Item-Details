import React from "react";
import axios from "axios";
import Sidebar from './components/sidebar.js'
import Image from './components/image.js'

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      toggle : false,
      side : '',
      main : '',
      images : [],
      item : {
        data: {
          ID: "AVR693z",
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

  handleQuantity(e) {
    console.log(e.target.value);
  }

  componentDidMount () {
    axios.get(`http://ec2-52-15-148-19.us-east-2.compute.amazonaws.com:3002/item/${this.state.item.data.ID}`)
      .then(results => {
        this.setState({item : results});
        this.setState({images : this.image()});
        this.setState({main : this.state.images[0]});
        window.addEventListener('productChanged', e => this.setState({item : {data : {ID : e.detail.id}}}));
      }
    )
    .catch(err => {
      console.log(err);
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
        <h5><div className='fixed'>Condition: </div><div className='titlecol'><b>{this.state.item.data.Condition}</b></div></h5>
        <h5><div className='fixed'>Quantity:</div><div className='titlecol'><input type='text' size='4'></input></div></h5>
        <h5 id='priceblock'>
          <div id='price'className='fixed'>Price: </div><div className='titlecol' id='dollarval'>US ${this.state.item.data.Price}</div>
          <div id='buttons'>
            <div className='buttons'><button id='buyitbutton'>Buy It Now</button></div>
            <div className='buttons'><button id='additbutton'>Add to cart</button></div>
            <div className='buttons'><button id='watchitbutton'><i id='heart' className="material-icons">favorite_border</i>Add to watchlist</button></div>
          </div>
          <div id='table'>
            <div className='tablecolumn' id='col1'>
              <div className='center'>
              100% buyer satisfaction
              </div>
            </div>
            <div className='tablecolumn' id='col2'>
              <div className='center'>
              Free delivery in 2 days
              </div></div>
            <div className='tablecolumn' id='col3'>
              <div className='center'>
              More than 95% sold
              </div></div>
          </div>
        </h5>
        <h5><div className='fixed'>Shipping: </div>
          <div className='titlecol' id='shipping'>
            <div><span><img id='truck' src='https://zbay-food.s3.us-east-2.amazonaws.com/Payment+Types/xmyxg1ubry1npie2zlpan5za3yu.png'></img></span><span id='a'>FAST 'N FREE</span></div>
            <div><span id='b'>Guaranteed by</span><span id='c'> Wed. Jul. 17 </span> <span id='d'><a href=''>| See details</a></span></div>
            <div id='e'>Item location: US, United States</div>
            <div><span id='f'>Ships to: United States</span><span id='g'> | <a href=''>See exclusions</a></span></div>
          </div>
        </h5>
        <h5><div className='fixed'>Payments:</div>
          <div className='titlecol' id='payments'>
            <span><img src='https://zbay-food.s3.us-east-2.amazonaws.com/Payment+Types/paypal.png'></img></span>
            <span><img src='https://zbay-food.s3.us-east-2.amazonaws.com/Payment+Types/credit_cards.png'></img></span>
            <div><img src='https://zbay-food.s3.us-east-2.amazonaws.com/Payment+Types/logoPaypalCredit_104x16.png'></img></div>
            <div><span id='h'>Special financing available.    </span><span id='i'>Apply Now   |  See terms</span></div>
          </div>
        </h5>
        <h5><div className='fixed'>Returns:</div>
          <div className='titlecol'>
            <span id='j'>30 day returns. Buyer pays for return shipping |</span> <span id='k'>See details</span>
          </div>
        </h5>
      </div>
      <div id='seller'>
        <div id='sellconfidence'>
          <h2>Shop with confidence</h2>
          <div id='table2'>
            <div className='moneypic' id='moneypic'>
              <img className='moneypic' src='https://zbay-food.s3.us-east-2.amazonaws.com/Payment+Types/Screen+Shot+2019-07-13+at+8.34.01+PM.png'></img>
            </div>
            <div id='sidemoney'>
              <h6>ZBay Money Back Guarantee</h6>
              <p id='learnmore'>Get the item you ordered or get your money back. <a href=''>Learn more</a></p>
            </div>
          </div>
        </div>
        <div id='sellinfo'>
          <h2 id='sellerinfotitle'>Seller Information</h2>
          <h6 id='sellername'><a href=''>{this.state.item.data['Seller Name']}</a> (<a href=''>{this.state.item.data['Seller Score']}</a>)</h6>
          <h6 id='sellerpercent'>{this.state.item.data['Seller Feedback']}% Positive Feedback</h6>
            <p className='sellinfolinks'><a href=''><i id='heart2' className="material-icons">favorite_border</i>Save this Seller</a></p>
            <p className='sellinfolinks'><a href=''>Contact seller</a></p>
            <p className='sellinfolinks'><a href=''>Visit store</a></p>
            <p className='sellinfolinks'><a href=''>See other items</a></p>
        </div>
      </div>
    </div>
    )
  }
}
export default ItemDetail;
