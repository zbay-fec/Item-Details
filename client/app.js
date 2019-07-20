import React from "react";
import axios from "axios";
import Sidebar from './components/sidebar.js'
import Image from './components/image.js'

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
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
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleCart = this.handleCart.bind(this);
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
    this.setState({quantity: e.target.value})
  }

  handleCart() {
    window.dispatchEvent(new CustomEvent('itemBought', {
      detail: {
        qty: this.state.quantity,
        id: this.state.item.data.ID
      }
    }));
    this.setState({quantity: 1})
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

  componentDidUpdate (prevProps, prevState) {
    // if(this.state.item.data.ID !== prevState.item.data.ID){
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
    // }
  }

  render () {
    if(this.props.showCart === true) {
      return <div></div>;
    }else{
      return (
      <div>
        <div class="alert alert-success">
          <strong>Success!</strong> Indicates a successful or positive action.
        </div>
      <div className='kgrid-parent'>
        <div id='sidebar'>
          <Sidebar images={this.state.images} mouse={this.onMouseOver} handle={this.handleMouseOver}
          click={this.handleClick} background={this.handleBackGround}/>
        </div>
        <div id='image'>
          <Image image={this.state.main} side={this.state.side} toggle={this.state.toggle}/>
          <span><p id="sale"><i>$</i><b className='kb'> Have one to sell?</b><button className='kbutton1' type="button">Sell now</button></p></span>
        </div>
        <div>
          <h1 className='kh1' id='title'>{this.state.item.data['Name']}</h1>
          <h5 className='kh5'><div className='kfixed'>Condition: </div><div className='ktitlecol'><b className='kb'>{this.state.item.data.Condition}</b></div></h5>
          <h5 className='kh5'><div className='kfixed'>Quantity:</div><div className='ktitlecol'><input value={this.state.quantity} type='text' size='4' id='kinput' onChange={this.handleQuantity}></input></div></h5>
          <h5 id='priceblock' className='kh5'>
            <div id='price'className='kfixed'>Price: </div><div className='ktitlecol' id='dollarval'>US ${this.state.item.data.Price}</div>
            <div id='kbuttons'>
              <div className='kbuttons'><button className='kbutton1' id='kbuyitbutton'>Buy It Now</button></div>
              <div className='kbuttons'><button className='kbutton1' id='kadditbutton' onClick={this.handleCart}>Add to cart</button></div>
              <div className='kbuttons'><button className='kbutton1' id='kwatchitbutton'><i id='kheart' className="material-icons">favorite_border</i>Add to watchlist</button></div>
            </div>
            <div id='ktable'>
              <div className='ktablecolumn' id='kcol1'>
                <div className='kcenter'>
                100% buyer satisfaction
                </div>
              </div>
              <div className='ktablecolumn' id='col2'>
                <div className='kcenter'>
                Free delivery in 2 days
                </div></div>
              <div className='ktablecolumn' id='col3'>
                <div className='kcenter'>
                More than 95% sold
                </div></div>
            </div>
          </h5>
          <h5 className='kh2'><div className='kfixed'>Shipping: </div>
            <div className='ktitlecol' id='kshipping'>
              <div><span><img id='ktruck' src='https://zbay-food.s3.us-east-2.amazonaws.com/Payment+Types/xmyxg1ubry1npie2zlpan5za3yu.png'></img></span><span id='ka'>FAST 'N FREE</span></div>
              <div><span id='kb'>Guaranteed by</span><span id='kc'> Wed. Jul. 17 </span> <span id='kd'><a onClick={(e) => {e.preventDefault()}} href='/'>| See details</a></span></div>
              <div id='ke'>Item location: US, United States</div>
              <div><span id='kf'>Ships to: United States</span><span id='kg'> | <a onClick={(e) => {e.preventDefault()}} href='/'>See exclusions</a></span></div>
            </div>
          </h5>
          <h5 className='kh2'><div className='kfixed'>Payments:</div>
            <div className='ktitlecol' id='kpayments'>
              <span><img src='https://zbay-food.s3.us-east-2.amazonaws.com/Payment+Types/paypal.png'></img></span>
              <span><img src='https://zbay-food.s3.us-east-2.amazonaws.com/Payment+Types/credit_cards.png'></img></span>
              <div><img src='https://zbay-food.s3.us-east-2.amazonaws.com/Payment+Types/logoPaypalCredit_104x16.png'></img></div>
              <div><span id='kh'>Special financing available.    </span><span id='ki'>Apply Now   |  See terms</span></div>
            </div>
          </h5>
          <h5 className='kh2'><div className='kfixed'>Returns:</div>
            <div className='ktitlecol'>
              <span id='kj'>30 day returns. Buyer pays for return shipping |</span> <span id='kk'>See details</span>
            </div>
          </h5>
        </div>
        <div id='seller'>
          <div id='ksellconfidence'>
            <h2 className='kh2'>Shop with confidence</h2>
            <div id='ktable2'>
              <div className='kmoneypic' id='kmoneypic'>
                <img className='kmoneypic' src='https://zbay-food.s3.us-east-2.amazonaws.com/Payment+Types/Screen+Shot+2019-07-13+at+8.34.01+PM.png'></img>
              </div>
              <div id='ksidemoney'>
                <h6 className='kh6'>ZBay Money Back Guarantee</h6>
                <p id='klearnmore'>Get the item you ordered or get your money back. <a onClick={(e) => {e.preventDefault()}} href='/'>Learn more</a></p>
              </div>
            </div>
          </div>
          <div id='ksellinfo'>
            <h2 className='kh2' id='ksellerinfotitle'>Seller Information</h2>
            <h6 className='kh6' id='ksellername'><a onClick={(e) => {e.preventDefault()}} href='/'>{this.state.item.data['Seller Name']}</a> (<a onClick={(e) => {e.preventDefault()}} href='/'>{this.state.item.data['Seller Score']}</a>)</h6>
            <h6 className='kh6' id='ksellerpercent'>{this.state.item.data['Seller Feedback']}% Positive Feedback</h6>
              <p className='ksellinfolinks'><a onClick={(e) => {e.preventDefault()}} href='/'><i id='kheart2' className="material-icons">favorite_border</i>Save this Seller</a></p>
              <p className='ksellinfolinks'><a onClick={(e) => {e.preventDefault()}} href='/'>Contact seller</a></p>
              <p className='ksellinfolinks'><a onClick={(e) => {e.preventDefault()}} href='/'>Visit store</a></p>
              <p className='ksellinfolinks'><a onClick={(e) => {e.preventDefault()}} href='/'>See other items</a></p>
          </div>
        </div>
      </div>
      </div>
      )
    }
  }
}
export default ItemDetail;
