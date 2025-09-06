// en.js
export default {
  app: {
    name: 'Fail2ban',
    expandSidebar: 'Expand sidebar',
    collapseSidebar: 'Collapse sidebar',
    toggleSidebar: 'Toggle sidebar',
    version: 'Version {v}',
  },
  nav: {
    heatboard: 'Heatboard',
    logs: 'Logs / Events',
    bans: 'Bans / Unbans',
    reports: 'Reports',
    settings: 'Settings',
  },
  dashboard: {
    title: 'Dashboard',
    stats: {
      todayTotal: 'Today Total',
      bans: 'Bans',
      unbans: 'Unbans',
      restores: 'Restores',
      diffFromYesterday: 'vs. yesterday {{diff}}',
    },
    charts: {
      seriesTitle: 'Today’s Timeseries (attacks/bans)',
      attacksPerHour: 'Attacks per hour',
    },
    tables: {
      topIpsTitle: 'Top IPs (7d)',
      latestLogsTitle: 'Latest Logs',
    },
    ui: {
      autoRefreshOn: 'Auto refresh: On',
      autoRefreshOff: 'Auto refresh: Off',
      retry: 'Retry',
      loading: 'Loading…',
      error: 'Failed to load',
    },
  },
  topIps: {
    ip: 'IP',
    count: 'Count',
    country: 'Country',
    asn: 'ASN / Org',
  },
  logs: {
    caption: 'Latest logs',
    headers: {
      time: 'Time',
      jail: 'Jail',
      action: 'Action',
      ip: 'IP',
      country: 'Country',
      reason: 'Reason',
    },
    action: {
      ban: 'Ban',
      unban: 'Unban',
      restore: 'Restore',
    },
    empty: 'No logs to display.',
  },
};
