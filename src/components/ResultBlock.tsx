'use client';

import { useEffect, useState } from 'react';
import socket from '@/socket';

export default function ResultBlock() {
  const [tradeResult, setTradeResult] = useState<Record<string, any> | null>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    socket?.on('trade_result', (data) => {
      setTradeResult(data);
      setStatus('');
    });

    socket?.on('trading', (data) => {
      setStatus(data);
    });
  }, []);

  return (
    <div className='h-96 w-9/12 rounded overflow-hidden shadow-lg p-5 flex flex-col justify-between'>
      <h1 className='text-center'>Your Trade Details</h1>

      <h5>{status}</h5>
      {
        !!tradeResult &&
        <div
          className='mt-6 overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-300'
        >
          <pre className="p-4 whitespace-pre-wrap break-words">
            {JSON.stringify(tradeResult, null, 4)}
          </pre>
        </div>
      }
    </div>
  );
}