import socketIOClient from 'socket.io-client';
import {ToastAndroid} from 'react-native';
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
    try {
      this.chats = await axios
        .get(serverURL, {
          params: {user: this.user},
        })
        .then(res => res.data);
      setChats([...this.chats]);
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
        if (!this.onlineUsers.includes(user)) this.onlineUsers.push(user);
        console.log('online users:', this.onlineUsers);
      }
    });

    this.io.on('offline', async user => {
      if (user !== this.user) {
        for (let i = 0; i < this.onlineUsers; i++) {
          if (this.onlineUsers[i] === user) {
            this.onlineUsers.splice(i, 1);
            break;
          }
        }
      }
    });

    this.io.on('new message', ({chatID, message, from}) => {
      console.log(from, 'says', message, 'chatID:', chatID);
      // if (from !== this.user) {
      ToastAndroid.showWithGravity(
        `${from} says ${message}`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      // }
      this.setChats(updateChats, {chatID, message, from});
    });
  }

  setChats(updateChats, {chatID, message, from}) {
    for (let i = 0; i < this.chats.length; i++) {
      if (this.chats[i]._id === chatID) {
        this.chats[i].messages.push({from, message});
        console.log('each chat', this.chats[i].messages);
        break;
      }
    }
    updateChats([...this.chats]);
  }

  disconnect() {
    console.log('disconnecting...');
    try {
      if (this.io) {
        this.io.emit('close', this.user);
        this.io.disconnect();
      }
      this.io = null;
      this.onlineUsers = [];
    } catch (error) {
      console.log('error2', error);
    }
  }

  directMessage(to, user) {
    this.connect(user);
    this.listenToRoom();
  }
}
