// .eslintrc.js
module.exports = {
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // Certifique-se de que 'prettier' seja o último a ser estendido
  ],
  rules: {
    'prettier/prettier': 'warn', // Ou 'error' se você quiser que erros de formatação falhem no build
    'react/prop-types': 'off',
  },
  env: {
    browser: true, // Se seu código roda no navegador
    node: true, // Se você usa Node.js
    jest: true, // Adicione isso para reconhecer as globais do Jest
    "cypress": true
  },
}
