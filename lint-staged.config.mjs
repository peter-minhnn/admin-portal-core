export default {
  // This will lint and format TypeScript and //JavaScript files
  '**/*.(ts|tsx|js)': () => [`bun lint`, `bun format`],
};
