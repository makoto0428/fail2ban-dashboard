import { http, HttpResponse } from 'msw';
import { makeSummary, makeTimeseriesToday, makeLogs, topOffenders } from './mockData';

/**
 * @function parseIntQ
 * @param {URLSearchParams} q
 * @param {string} key
 * @param {number} def
 * @returns {number}
 */
function parseIntQ(q, key, def) {
  const v = Number(q.get(key));
  return Number.isFinite(v) ? v : def;
}

export const handlers = [
  // /health
  http.get('/health', () => HttpResponse.json({ ok: true, service: 'api' })),

  // /api/summary?days=14
  http.get('/api/summary', ({ request }) => {
    const url = new URL(request.url);
    const days = parseIntQ(url.searchParams, 'days', 14);
    return HttpResponse.json(makeSummary(days));
  }),

  // /api/timeseries?date=YYYY-MM-DD（今日はダミー固定でもOK）
  http.get('/api/timeseries', () => {
    return HttpResponse.json({ items: makeTimeseriesToday() });
  }),

  // /api/logs?limit=50
  http.get('/api/logs', ({ request }) => {
    const url = new URL(request.url);
    const limit = parseIntQ(url.searchParams, 'limit', 50);
    return HttpResponse.json({ items: makeLogs(limit) });
  }),

  // /api/top/ips?days=7
  http.get('/api/top/ips', ({ request }) => {
    const url = new URL(request.url);
    const days = parseIntQ(url.searchParams, 'days', 7);
    return HttpResponse.json({ items: topOffenders(days) });
  }),
];
