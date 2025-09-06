import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // 無視パターン
  {
    ignores: ['**/node_modules/**', '**/dist/**', 'coverage/**', '.pnpm-store/**', 'tmp/**'],
  },

  // 推奨セット（オブジェクト）と Vue（配列）
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // 共通ルール
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { vue: pluginVue, import: pluginImport, prettier: pluginPrettier },
    rules: {
      // プロジェクト方針
      'no-console': 'off',
      'import/no-unresolved': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-indent': 'off',

      // 💡 Prettier を ESLint エラーとして扱う
      'prettier/prettier': ['error'],
    },
  },

  // API は Node 前提
  {
    files: ['packages/api/**'],
    languageOptions: { globals: { ...globals.node } },
  },

  // .vue 向け微調整
  {
    files: ['**/*.vue'],
    rules: {
      'vue/html-self-closing': 'off',
      'vue/require-default-prop': 'off',
    },
  },

  // ⬇️ これを“配列要素として”最後に置く（キーではない）
  configPrettier,
];
