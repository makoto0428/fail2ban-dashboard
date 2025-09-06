/**
 * @function getSummary
 * @param {number} days 取得する集計日数
 * @returns {Promise<{rangeDays:number,total:number,bans:number,unbans:number,restores:number}>}
 * サマリーを取得する。MSW有効時はモックが応答。
 */
export async function getSummary(days = 14) {
  const r = await fetch(`/api/summary?days=${days}`);
  if (!r.ok) throw new Error(`getSummary: ${r.status}`);
  return await r.json();
}

/**
 * @function getTimeseriesToday
 * @returns {Promise<Array<{time:string, attacks:number}>>}
 * 今日の時間帯別カウントを取得。
 */
export async function getTimeseriesToday() {
  const r = await fetch('/api/timeseries');
  if (!r.ok) throw new Error(`getTimeseriesToday: ${r.status}`);
  const json = await r.json();
  // handlers.js が { items: [...] } を返す想定なら items を返す
  return Array.isArray(json) ? json : json.items;
}

/**
 * @function getTopIps
 * @param {number} days 集計日数
 * @returns {Promise<Array<{ip:string,count:number,asn:string,country:string,lastSeen?:string,jails?:string[]}>>}
 * Top offenders（IPランキング）を取得
 */
export async function getTopIps(days = 7) {
  const r = await fetch(`/api/top/ips?days=${days}`);
  if (!r.ok) throw new Error(`getTopIps: ${r.status}`);
  const json = await r.json();
  return json.items ?? json;
}

/**
 * @function getLogs
 * @param {number} limit 取得件数
 * @returns {Promise<Array<{time:string,jail:string,ip:string,country:string,action:'ban'|'unban'|'restore',reason:string,asn?:string}>>}
 * 最新ログを取得
 */
export async function getLogs(limit = 50) {
  const r = await fetch(`/api/logs?limit=${limit}`);
  if (!r.ok) throw new Error(`getLogs: ${r.status}`);
  const json = await r.json();
  return json.items ?? json;
}
