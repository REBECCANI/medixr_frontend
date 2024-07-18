import { url } from 'inspector'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'wave-1': 'url("/bg_1.svg")',
        'blob-1': 'url("/blob.svg")',
        'blur-1': 'url("/blur.svg")',
        'hero-bg': 'url("/hero-blob.png")',
        'hero-2': 'url("/hero-2.svg")',
        'bg-1': 'url("/hero-3.svg")',
        'bg-2': 'url("/layer-1.png")',
        'bg-3': 'url("/hero-5.svg")',
        'bg-4': 'url("/hero-4.svg")',
        'bg-5': 'url("/IMGL9169.jpg")',
        'bg-8': 'url("/IMGL9418.jpg")',
        'bg-6': 'url("/bg_2.png")',
        'bg-7': 'url("/bg_3.png")',
        'bg-10': 'url("/IMGL9434.jpg")',
        'bg-9' : 'url("/main_trainig.jpg")',
        'balls': 'url("/balls.png")'
      },
      colors: {
        primary: "#007bff",
        secondary: "#203842",
        dimWhite: "rgba(255, 255, 255, 0.8)",
        dimBlack: "rgba(130, 130, 130, 0.5)",
        dimBlacker: "rgba(100, 100, 100, 0.7)",
        dimBlue: "rgba(0, 101, 255, 0.7)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '2500px',
        xxxl: '3500px'
      }
    },
  },
  plugins: [],
}
export default config
