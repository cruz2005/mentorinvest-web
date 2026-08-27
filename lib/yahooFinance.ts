const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

// Yahoo Finance exige un cookie + "crumb" depuis 2024 (anti-bot) ; on les
// récupère une fois puis on les met en cache tant qu'ils fonctionnent.
interface YahooAuth {
  cookie: string;
  crumb: string;
}

let yahooAuth: YahooAuth | null = null;

async function refreshYahooAuth(): Promise<YahooAuth> {
  const cookieRes = await fetch('https://fc.yahoo.com', {
    headers: { 'User-Agent': UA },
    redirect: 'manual',
    cache: 'no-store',
  });
  const cookie = (cookieRes.headers.get('set-cookie') ?? '').split(';')[0];
  if (!cookie) throw new Error('Yahoo cookie unavailable');

  const crumbRes = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
    headers: { 'User-Agent': UA, Cookie: cookie },
    cache: 'no-store',
  });
  const crumb = (await crumbRes.text()).trim();
  if (!crumb || crumb.length > 50) throw new Error('Yahoo crumb unavailable');

  yahooAuth = { cookie, crumb };
  return yahooAuth;
}

async function queryYahoo(symbols: string[], auth: YahooAuth): Promise<Response> {
  const url = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols.join(','))}&crumb=${encodeURIComponent(auth.crumb)}`;
  return fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: 'https://finance.yahoo.com/',
      Cookie: auth.cookie,
    },
    cache: 'no-store',
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchYahooQuotes(symbols: string[]): Promise<any[]> {
  const auth = yahooAuth ?? (await refreshYahooAuth());
  let res = await queryYahoo(symbols, auth);

  // Cookie/crumb expiré ou invalidé → on en récupère un nouveau et on retente une fois.
  if (res.status === 401 || res.status === 403) {
    const fresh = await refreshYahooAuth();
    res = await queryYahoo(symbols, fresh);
  }

  if (!res.ok) throw new Error(`Yahoo Finance ${res.status}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (await res.json()) as any;
  if (data?.finance?.error) throw new Error(`Yahoo Finance: ${data.finance.error.description}`);
  return data?.quoteResponse?.result ?? [];
}
