import express from 'express'
import morgan from 'morgan'

/**
 * @function createApp
 * @returns {import('express').Express}
 * アプリ本体を作る。テストや将来の拡張のために関数化。
 */
export function createApp() {
  const app = express()

  // 便利なアクセスログ
  app.use(morgan('dev'))
  app.use(express.json())

  /**
   * @route GET /health
   * シンプルな疎通確認。
   */
  app.get('/health', (req, res) => {
    // 実際の監視ではDBやログパス検査もここでOK
    res.json({ ok: true, service: 'api' })
  })

  /**
   * @route GET /api/summary
   * @query days {number} 集計日数(ダミー実装)
   * MVP前のモック。前段のVueから叩いてUIを先に進める。
   */
  app.get('/api/summary', (req, res) => {
    const days = Number(req.query.days || 14)
    // ダミー値
    res.json({
      rangeDays: days,
      total: 123,
      bans: 100,
      unbans: 22,
      restores: 1,
    })
  })

  return app
}

// 起動スクリプト
const port = Number(process.env.PORT || 3000)
if (process.env.NODE_ENV !== 'test') {
  const app = createApp()
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`)
  })
}
