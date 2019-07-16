import React from 'react';

export default function Image(props) {
  if(props && !props.toggle){
    return <img src={props.image} className='main' width='500' height='500'></img>
  }else if(props){
    return <img src={props.side} className='main' width='500' height='500'></img>
  }
}