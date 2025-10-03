import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    // Caminhos para seus arquivos que usam TailwindCSS
    './src/app/**/*.{ts,tsx,js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        mustard: '#eab308',       // amarelo ouro
        purpleAccent: '#b308ea',  // roxo
        aquaAccent: '#08eab3',    // verde aqua
      },
    },
  },
  plugins: [],
};

export default config;
