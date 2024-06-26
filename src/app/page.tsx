import ResultBlock from '@/components/ResultBlock';
import TradeButton from '@/components/TradeButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24 space-x-6">
      <ResultBlock />

      <TradeButton />
    </main>
  );
}
