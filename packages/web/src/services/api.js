const API_BASE = import.meta.env.VITE_API_BASE || ''

/**
 * @function jget
 * @param {string} path - 例: /api/summary?days=7
 * @returns {Promise<any>}
 * fetchの薄いラッパ。エラー時は例外。
 */
export async function jget(path) {
  const r = await fetch(`${API_BASE}${path}`)
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
  return r.json()
}

/**
 * @function getSummary
 * @param {number} days
 * @returns {Promise<{rangeDays:number,total:number,bans:number,unbans:number,restores:number}>}
 */
export function getSummary(days = 14) {
  // UIデモ用の暫定API
  return jget(`/api/summary?days=${days}`)
}
