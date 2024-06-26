'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import socket from '../socket';

type Props = {
  children: React.ReactNode;
};

export default function SocketProvider({ children }: Props) {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (!socket) {
      console.log('process.env.NEXT_PUBLIC_HOST_API variable is missing');
      return;
    }

    console.log('Connecting to Backend..')
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      if (!socket) {
        console.log('process.env.NEXT_PUBLIC_HOST_API variable is missing');
        return;
      }

      console.log('Connected to Backend..')
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on('error', (err) => {
      console.log(err);

      toast.error(JSON.stringify(err));

      if (socket?.connected) {
        onConnect();
      }
    });

    return () => {
      socket?.off("connect", onConnect);
      socket?.off("disconnect", onDisconnect);
    };
  }, []);

  return <>{children}</>;
}