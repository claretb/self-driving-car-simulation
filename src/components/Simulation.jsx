import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import PeerService from "../services/peerService.js";
import QRCode from "qrcode";

export default function Simulation({dimensions}) {

  const { unityProvider, sendMessage, isLoaded, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "Build/car_simulator_webgl.loader.js",
    dataUrl: "Build/car_simulator_webgl.data",
    frameworkUrl: "Build/car_simulator_webgl.framework.js",
    codeUrl: "Build/car_simulator_webgl.wasm",
  });
  const [qr, setQr] = useState("");

  useEffect(() => {
    if (isLoaded) {
      
      if (PeerService.peer == null) {
        PeerService.initPeer();
        PeerService.peer.on("open", (id) => {
          PeerService.peerID = id;
          console.log("PEER ID: " + PeerService.peerID);
          console.log("peer listener added");
          // The URL should be changed on deployment.
          var url = "https://claretb.github.io/app-screen-detector/?peerID=" + PeerService.peerID;
          //var url = "https://192.168.0.2:3000/?peerID=" + PeerService.peerID;
          //var url = "https://172.20.10.2:3000/?peerID=" + PeerService.peerID;
          console.log(url);
          QRCode.toDataURL(url, {
            width: dimensions ? dimensions.width - 210 : "700px",
            margin: 2
          }, (err, url) => {
            if (err) return console.error(err);
      
            setQr(url);
          });
        });
      }
      else if (qr && PeerService.conn == null) {
        PeerService.peer.on("connection", (conn) => {
          PeerService.conn = conn;
          console.log("Conn listener added.");
          conn.on("data", (data) => {
            if(data == "forward") {
              sendMessage("CommandServer", "SetFromWebGL", "0|0.5");
            }
            else if(data == "left") {
              sendMessage("CommandServer", "SetFromWebGL", "-0.5|0.5");
            }
            else if(data == "back") {
              sendMessage("CommandServer", "SetFromWebGL", "0|-0.5");
            }
            else if(data == "right") {
              sendMessage("CommandServer", "SetFromWebGL", "0.5|0.5");
            }
            else {
              console.log("The data came from the mobile phone:");
              console.log(data);
              if (data.steering) {
                sendMessage("CommandServer", "SetFromWebGL", data.steering + "|" + data.throttle);
              }
            }
          });

          setQr("");
        });
      }

      addEventListener("WebGLEmitEvent", handleWebGLEmitEvent);

      return () => {
        removeEventListener("WebGLEmitEvent", handleWebGLEmitEvent);
      };
    }
  }, [isLoaded, addEventListener, removeEventListener, handleWebGLEmitEvent])

  function handleWebGLEmitEvent(angel, acceleration, speed, image) {
    // console.log("Angel: " + angel);
    // console.log("Acceleration: " + acceleration);
    // console.log("Speed: " + speed);
    // console.log("Image:" + image);
    if (PeerService.conn != null) {
      var data = {
        "angel" : angel,
        "speed" : speed,
        "acceleration" : acceleration
      }
      PeerService.conn.send(data);
    }
  }
  

  return (
    <div style={{
      width: dimensions ? dimensions.width - 210 : "700px", 
      height: dimensions ? dimensions.height - 210 : "700px", 
      position: "absolute", 
      transform: "translate(-50%, -50%)"}}>
      {qr && <>
        <img
        style={{ position: "absolute",
          width: "90%", 
          height: "90%",
          marginLeft: "5%",
          marginTop: "5%"
        }}
        src={qr}/>
      </>}
      <Unity style={{width: "100%", height: "100%"}} unityProvider={unityProvider}/>
    </div>
  )
}