import { NextResponse } from 'next/server';
import { fetchYahooQuotes } from '@/lib/yahooFinance';

export const dynamic = 'force-dynamic';

// Symboles Yahoo Finance des indices affichés sur le Globe 3D.
const INDEX_SYMBOLS = [
  '^GSPC', '^IXIC', '^FTSE', '^FCHI', '^GDAXI', '^SSMI',
  '^N225', '^HSI', '000001.SS', '^AXJO', '^BVSP', '^GSPTSE',
  '^NSEI', 'DFMGI.AE',
];

interface IndexQuote {
  symbol: string;
  price: number | null;
  changePercent: number | null;
}

export async function GET() {
  try {
    const results = await fetchYahooQuotes(INDEX_SYMBOLS);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = new Map(results.map((q: any) => [q.symbol as string, q]));

    const indices: IndexQuote[] = INDEX_SYMBOLS.map((symbol) => {
      const q = map.get(symbol);
      return {
        symbol,
        price: q?.regularMarketPrice ?? null,
        changePercent: q?.regularMarketChangePercent ?? null,
      };
    });

    return NextResponse.json({ indices, ts: Date.now() });
  } catch {
    return NextResponse.json(
      { indices: [], ts: Date.now(), error: 'Yahoo Finance unavailable' },
      { status: 502 },
    );
  }
}
