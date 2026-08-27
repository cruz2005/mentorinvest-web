import { NextResponse } from 'next/server';
import { fetchYahooQuotes } from '@/lib/yahooFinance';

export const dynamic = 'force-dynamic';

interface Quote {
  symbol: string;
  price: number;
  changePercent: number;
  marketState?: string;
}

const CRYPTO_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
const CRYPTO_LABEL: Record<string, string> = {
  BTCUSDT: 'BTC/USD',
  ETHUSDT: 'ETH/USD',
  SOLUSDT: 'SOL/USD',
};
const STOCK_SYMBOLS = ['AAPL', 'NVDA', 'TSLA', 'MSFT', 'GOOGL', 'SPY', 'GC=F'];
const ORDER = [
  'BTC/USD', 'ETH/USD', 'SOL/USD', 'EUR/USD',
  'AAPL', 'NVDA', 'TSLA', 'MSFT', 'GOOGL', 'SPY',
  'GOLD', 'GBP/USD',
];

// Jour ouvré précédent une date donnée (les taux BCE ne sont publiés
// qu'une fois par jour ouvré — il faut ancrer sur la date réellement
// publiée par Frankfurter, pas sur l'horloge système, sous peine de
// comparer parfois la même journée à elle-même).
function prevBusinessDay(from: string): string {
  const d = new Date(`${from}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  while (d.getUTCDay() === 0 || d.getUTCDay() === 6) {
    d.setUTCDate(d.getUTCDate() - 1);
  }
  return d.toISOString().split('T')[0];
}

async function fetchCrypto(): Promise<Quote[]> {
  const url =
    'https://api.binance.com/api/v3/ticker/24hr?symbols=' +
    encodeURIComponent(JSON.stringify(CRYPTO_SYMBOLS));
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Binance ${res.status}`);
  const data = (await res.json()) as Array<{
    symbol: string;
    lastPrice: string;
    priceChangePercent: string;
  }>;
  return data.map((item) => ({
    symbol: CRYPTO_LABEL[item.symbol] ?? item.symbol,
    price: parseFloat(item.lastPrice),
    changePercent: parseFloat(item.priceChangePercent),
  }));
}

async function fetchStocks(): Promise<Quote[]> {
  const results = await fetchYahooQuotes(STOCK_SYMBOLS);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return results.map((q: any) => ({
    symbol: q.symbol === 'GC=F' ? 'GOLD' : (q.symbol as string),
    price: (q.regularMarketPrice as number) ?? 0,
    changePercent: (q.regularMarketChangePercent as number) ?? 0,
    marketState: q.marketState as string | undefined,
  }));
}

async function fetchForex(): Promise<Quote[]> {
  const curRes = await fetch('https://api.frankfurter.dev/v1/latest?from=EUR&to=USD,GBP', {
    cache: 'no-store',
  });
  if (!curRes.ok) throw new Error(`Frankfurter ${curRes.status}`);
  const cur = (await curRes.json()) as {
    date: string;
    rates: { USD: number; GBP: number };
  };

  const eurUsd = cur.rates?.USD ?? 0;
  const eurGbp = cur.rates?.GBP ?? 1;
  const gbpUsd = eurGbp > 0 ? eurUsd / eurGbp : 0;

  // Ancré sur la date réellement publiée par "latest" (cur.date), pas sur
  // l'horloge système, sinon on compare parfois la même journée à elle-même.
  const prev = prevBusinessDay(cur.date);
  const oldRes = await fetch(`https://api.frankfurter.dev/v1/${prev}?from=EUR&to=USD,GBP`, {
    cache: 'no-store',
  });

  let eurChange = 0;
  let gbpChange = 0;

  if (oldRes.ok) {
    const old = (await oldRes.json()) as {
      rates: { USD: number; GBP: number };
    };
    const prevEurUsd = old.rates?.USD ?? eurUsd;
    const prevEurGbp = old.rates?.GBP ?? eurGbp;
    const prevGbpUsd = prevEurGbp > 0 ? prevEurUsd / prevEurGbp : gbpUsd;
    if (prevEurUsd) eurChange = ((eurUsd - prevEurUsd) / prevEurUsd) * 100;
    if (prevGbpUsd) gbpChange = ((gbpUsd - prevGbpUsd) / prevGbpUsd) * 100;
  }

  return [
    { symbol: 'EUR/USD', price: eurUsd, changePercent: eurChange },
    { symbol: 'GBP/USD', price: gbpUsd, changePercent: gbpChange },
  ];
}

export async function GET() {
  const [cryptoR, stocksR, forexR] = await Promise.allSettled([
    fetchCrypto(),
    fetchStocks(),
    fetchForex(),
  ]);

  const all: Quote[] = [
    ...(cryptoR.status === 'fulfilled' ? cryptoR.value : []),
    ...(stocksR.status === 'fulfilled' ? stocksR.value : []),
    ...(forexR.status === 'fulfilled' ? forexR.value : []),
  ];

  const map = new Map(all.map((q) => [q.symbol, q]));
  const tickers = ORDER.map((s) => map.get(s)).filter(
    (q): q is Quote => q !== undefined,
  );

  const partial =
    cryptoR.status === 'rejected' ||
    stocksR.status === 'rejected' ||
    forexR.status === 'rejected';

  return NextResponse.json({ tickers, partial, ts: Date.now() });
}
