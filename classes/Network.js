import socketIOClient from 'socket.io-client';
import axios from 'axios';
const socketURL = `wss://grizzly-lapis-pump.glitch.me`;
const serverURL = `https://grizzly-lapis-pump.glitch.me/chats/all`;

export default class Network {
  io;
  constructor(user) {
    this.isConnected = false;
    this.user = user;
    this.chats = [];
    this.onlineUsers = [];
    this.io = socketIOClient(`${socketURL}`, {
      autoConnect: false,
    });
  }

  connect() {
    this.io.connect();
    this.io.on('connect', async () => {
      this.isConnected = true;
      this.io.emit('open', this.user);
    });
    this.io.on('error', error => console.log(error));
  }

  async getChats(setChats) {
    console.log(this.user);
    try {
      this.chats = await axios
        .get(serverURL, {
          params: {user: this.user},
        })
        .then(res => res.data);
      setChats(this.chats);
      console.log('chats:', this.chats);
    } catch (error) {
      console.log('error1', error);
    }
  }

  listenToRoom(updateChats) {
    this.io.on('online', async user => {
      if (user === this.user) {
        console.log('joined');
        await this.getChats(updateChats);
      } else {
        this.onlineUsers.push(user);
        console.log(this.onlineUsers);
      }
    });

    this.io.on('new message', ({chatID, message, from}) => {
      console.log(from, 'says', message);
      this.chats = this.chats.map(chat =>
        chat._id === chatID
          ? {...chat, message: chat.message.push({user: from, message})}
          : chat,
      );
      updateChats({...this.chats});
    });
  }

  disconnect() {
    console.log('disconnecting...');
    try {
      this.io.emit('close', this.user);
      this.io.disconnect();
      this.io = null;
    } catch (error) {
      console.log('error2', error);
    }
  }

  directMessage(to, user) {
    this.connect(user);
    this.listenToRoom();
  }
}
