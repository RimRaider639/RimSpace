import React from 'react';
import Network from '../classes/Network';

export const SocketContext = React.createContext(null);

export default function SocketContextProvider({children}) {
  const io = React.useRef(null);
  const [chats, setChats] = React.useState([]);
  const initialise = username => {
    console.log('initialising connection');
    io.current = new Network(username);
    io.current.connect();
    io.current.listenToRoom(setChats);
  };
  const getChats = () => {
    return io.current.getChats(setChats);
  };
  return (
    <SocketContext.Provider
      value={{io: io.current, initialise, chats, getChats, setChats}}>
      {children}
    </SocketContext.Provider>
  );
}
