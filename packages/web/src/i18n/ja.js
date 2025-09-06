// ja.js
export default {
  app: {
    name: 'Fail2ban',
    expandSidebar: 'サイドバーを展開',
    collapseSidebar: 'サイドバーを折りたたむ',
    toggleSidebar: 'サイドバー切り替え',
    version: 'バージョン {v}',
  },
  nav: {
    heatboard: 'ヒートボード',
    logs: 'ログ / イベント',
    bans: 'バン / 解除',
    reports: 'レポート',
    settings: '設定',
  },
  dashboard: {
    title: 'ダッシュボード',
    stats: {
      todayTotal: '本日の合計',
      bans: 'BAN 件数',
      unbans: '解除 件数',
      restores: '復帰 件数',
      diffFromYesterday: '前日比 {{diff}}',
    },
    charts: {
      seriesTitle: '本日の時系列（攻撃 / BAN）',
      attacksPerHour: '1時間あたりの攻撃数',
    },
    tables: {
      topIpsTitle: 'トップIP（7日間）',
      latestLogsTitle: '最新ログ',
    },
    ui: {
      autoRefreshOn: '自動更新：有効',
      autoRefreshOff: '自動更新：無効',
      retry: '再試行',
      loading: '読み込み中…',
      error: '読み込みに失敗しました',
    },
  },
  topIps: {
    ip: 'IP',
    count: '回数',
    country: '国',
    asn: 'ASN / 組織',
  },
  logs: {
    caption: '最新ログ一覧',
    headers: {
      time: '日時',
      jail: 'Jail',
      action: 'アクション',
      ip: 'IP',
      country: '国',
      reason: '理由',
    },
    action: {
      ban: 'BAN',
      unban: '解除',
      restore: '復帰',
    },
    empty: '表示できるログがありません。',
  },
};
