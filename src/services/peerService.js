import { Peer } from "peerjs";

export default class PeerService {
  static peer = null;
  static peerID = "";
  static conn = null;

  static initPeer() {
    this.peer = new Peer();
  }
}