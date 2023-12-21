import SocketIOClient from 'socket.io-client';
export const IOChanel = {
  MAIN_CONNECTION: "connection",
  DISCONECTION_CHANEL: 'disconnect',
  JOIN_CHAT: "JOIN_CHAT",
  GAME_CHANEL: "GAME_CHANEL",
  JOIN_ROOM: "JOIN_ROOM",
  LEAVE_ROOM: "LEAVE_ROOM",
  ERROR_CHANEL: "ERROR_CHANEL",
  VIEWER_CHANEL: "VIEWER_CHANEL",
  CHAT_CHANEL: "CHAT_CHANEL",
  CHAT_CHANEL_RECEIVE: "CHAT_CHANEL_RECEIVE",
  CHAT_CHANEL_SEND: "CHAT_CHANEL_SEND",
  GAME_CHANEL_WINNER: "GAME_CHANEL_WINNER",
  GET_PLAYER_INFO: "GET_PLAYER_INFO"
};

export class SocketIOService {
  constructor() {
    this.IO_SERVER_URL = 'http://localhost:3200';
    this.DEFAULT_DEPLAY_RECONNECTION = 10000;
  }
  reqConnection(medataData) {
    const accessToken = localStorage.getItem('token');
    return SocketIOClient('http://localhost:3200',{
      reconnectionDelayMax: this.DEFAULT_DEPLAY_RECONNECTION,
      auth: {
        token: accessToken || ''
      },
      query: {
        room_id: medataData?.roomId || ''
       }
    });
  }
}
