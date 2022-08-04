import React, { useEffect } from 'react';
import aruco819 from '../markers/aruco-819.svg';
import aruco273 from '../markers/aruco-273.svg';
import aruco61 from '../markers/aruco-61.svg';
import aruco922 from '../markers/aruco-922.svg';

export default function Aruco({dimensions}) {

  return(
    <React.Fragment>
      <img 
      style={{ 
        position: "absolute", 
        marginTop: dimensions ? -(dimensions.height / 2) + 5 : "-395px", 
        marginLeft: dimensions ? -(dimensions.width / 2) + 5 : "-395px", 
        width: "100px", 
        height: "100px"
      }}
      src={aruco819}/>
      <img 
      style={{ 
        position: "absolute", 
        marginTop: dimensions ? -(dimensions.width / 2) + 5 : "-395px", 
        marginLeft: dimensions ? (dimensions.width / 2) - 105 : "295px", 
        width: "100px", 
        height: "100px"
      }}
      src={aruco273}/>
      <img 
      style={{ 
        position: "absolute", 
        marginTop: dimensions ? (dimensions.height / 2) - 105 : "295px", 
        marginLeft: dimensions ? -(dimensions.width / 2) + 5 : "-395px", 
        width: "100px", 
        height: "100px"
      }}
      src={aruco61}/>
      <img 
      style={{ 
        position: "absolute", 
        marginTop: dimensions ? (dimensions.height / 2) - 105 : "295px", 
        marginLeft: dimensions ? (dimensions.width / 2) - 105 : "295px", 
        width: "100px", 
        height: "100px"
      }}
      src={aruco922}/>
    </React.Fragment>
  )
}