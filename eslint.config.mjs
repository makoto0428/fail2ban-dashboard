import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginImport from 'eslint-plugin-import'
import globals from 'globals'

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'coverage/**',
      '.pnpm-store/**',
      'tmp/**',
    ],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      vue: pluginVue,
      import: pluginImport,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'import/no-unresolved': 'off',
      'no-console': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-indent': 'off',
    },
  },

  {
    files: ['packages/api/**'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
]
