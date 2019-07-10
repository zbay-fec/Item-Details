import React from 'react';

export default function Sidebar(props) {
  return(props.images.map(x => (
    <div> 
      <img src={x} width='60' height='60' 
      onMouseOver={props.mouse} onMouseEnter={props.handle} 
      onMouseLeave={props.handle} onClick={props.click}></img>
    </div> 
    )))
}
