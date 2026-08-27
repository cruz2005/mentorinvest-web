"use client";

const tickers = [
  { symbol: "AAPL", price: "192.35", change: "+1.24%", up: true },
  { symbol: "TSLA", price: "248.72", change: "+3.61%", up: true },
  { symbol: "BTC/USD", price: "67,420", change: "+2.18%", up: true },
  { symbol: "ETH/USD", price: "3,512", change: "-0.83%", up: false },
  { symbol: "NVDA", price: "875.40", change: "+4.92%", up: true },
  { symbol: "SPY", price: "521.68", change: "+0.47%", up: true },
  { symbol: "GOOGL", price: "175.10", change: "-0.31%", up: false },
  { symbol: "MSFT", price: "415.22", change: "+1.88%", up: true },
  { symbol: "EUR/USD", price: "1.0824", change: "-0.12%", up: false },
  { symbol: "GOLD", price: "2,318", change: "+0.65%", up: true },
];

export default function TickerBanner() {
  const doubled = [...tickers, ...tickers];

  return (
    <div className="relative overflow-hidden bg-[#131722] border-b border-[#2A2E39] py-2">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-8 text-xs font-mono">
            <span className="text-[#D1D4DC] font-semibold">{t.symbol}</span>
            <span className="text-[#787B86]">{t.price}</span>
            <span className={t.up ? "text-[#089981]" : "text-[#F23645]"}>
              {t.change}
            </span>
            <span className="text-[#2A2E39] mx-2">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
