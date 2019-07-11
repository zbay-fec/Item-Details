import React from 'react';

export default function Image(props) {
  if(props && !props.toggle){
    return <img src={props.image} width='320' height='320'></img>
  }else if(props){
    return <img src={props.side} width='320' height='320'></img>
  }
}