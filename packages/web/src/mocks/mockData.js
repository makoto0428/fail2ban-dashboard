import seedrandom from 'seedrandom';
import { faker } from '@faker-js/faker';

// 同じ日なら同じ乱数に: UIの確認が安定する
const rng = seedrandom(new Date().toISOString().slice(0, 10));

/**
 * @function rand
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * 乱数（整数）を返す。seeded。
 */
function rand(min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/**
 * @function makeSummary
 * @param {number} days
 * @returns {{rangeDays:number,total:number,bans:number,unbans:number,restores:number}}
 * サマリ（カード用）を生成。
 */
export function makeSummary(days = 14) {
  // 単純なモデル：全体の1〜2割がunban、わずかにrestore
  const bans = rand(80, 200);
  const unbans = Math.floor(bans * 0.2);
  const restores = Math.max(0, Math.floor(bans * 0.01));
  return { rangeDays: days, total: bans + unbans + restores, bans, unbans, restores };
}

/**
 * @function makeTimeseriesToday
 * @returns {Array<{time:string, attacks:number}>}
 * 今日0時〜23時の擬似攻撃カウントを作る（波形＋ノイズ）。
 */
export function makeTimeseriesToday() {
  const out = [];
  for (let h = 0; h < 24; h++) {
    // 夜〜朝は少なめ、昼〜夜にかけて増える っぽい波形
    const base = Math.max(0, Math.round(30 + 25 * Math.sin((h - 6) / 3)));
    const noise = rand(-10, 10);
    out.push({ time: `${String(h).padStart(2, '0')}:00`, attacks: Math.max(0, base + noise) });
  }
  return out;
}

/**
 * @function makeLogs
 * @param {number} n
 * @returns {Array<{time:string, jail:string, ip:string, country:string, action:'ban'|'unban', reason:string}>}
 * 最新ログのダミー。BAN/UNBANが混じる。
 */
export function makeLogs(n = 50) {
  /** @type {Array<'ban'|'unban'>} */
  const actions = ['ban', 'unban'];
  const jails = ['sshd', 'recidive', 'nginx-bot', 'postfix-auth'];

  const items = [];
  for (let i = 0; i < n; i++) {
    const action = actions[rand(0, actions.length - 1)];
    const jail = jails[rand(0, jails.length - 1)];
    const ip = faker.internet.ipv4();
    const country = faker.location.countryCode();
    const reason =
      action === 'ban'
        ? faker.helpers.arrayElement(['password failure', 'port scan', 'invalid user', 'bot probe'])
        : faker.helpers.arrayElement(['manual release', 'timeout', 'whitelist matched']);

    // 直近 n 分のどこか
    const minsAgo = rand(0, n * 3);
    const t = new Date(Date.now() - minsAgo * 60 * 1000).toISOString();

    items.push({ time: t, jail, ip, country, action, reason });
  }
  // 新しい順
  return items.sort((a, b) => (a.time < b.time ? 1 : -1));
}

/**
 * @function topOffenders
 * @param {number} days
 * @returns {Array<{ip:string, count:number, asn:string, country:string}>}
 * 期間中の迷惑IPランキングを生成。
 */
// eslint-disable-next-line no-unused-vars -- // DELETEME
export function topOffenders(days = 7) {
  const count = rand(5, 12);
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({
      ip: faker.internet.ipv4(),
      count: rand(10, 120),
      asn: `AS${rand(1000, 99999)}`,
      country: faker.location.countryCode(),
    });
  }
  // 多い順
  return list.sort((a, b) => b.count - a.count);
}
