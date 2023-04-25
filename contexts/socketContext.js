import React from 'react';
import Network from '../classes/Network';

export const SocketContext = React.createContext(null);

export default function SocketContextProvider({children}) {
  const io = React.useRef(null);
  const [chats, setChats] = React.useState([]);
  const initialise = username => {
    io.current = new Network(username);
    io.current.connect();
    io.current.listenToRoom(setChats);
  };
  const getChats = () => {
    io.current.getChats(setChats);
  };
  return (
    <SocketContext.Provider
      value={{io: io.current, initialise, chats, getChats}}>
      {children}
    </SocketContext.Provider>
  );
}
