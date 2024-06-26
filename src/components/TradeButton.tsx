'use client';

import { useState } from 'react';
import socket from '@/socket';

export default function TradeButton() {
  const [loading, setLoading] = useState(false);

  const handleTrade = () => {
    setLoading(true);
    socket?.emit('trade_request', () => setLoading(false));
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleTrade}
      disabled={loading}
    >
      Trade
    </button>
  );
}