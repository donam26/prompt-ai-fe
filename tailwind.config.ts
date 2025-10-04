import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(262 100% 97%)",
          100: "hsl(262 100% 94%)",
          200: "hsl(262 100% 88%)",
          300: "hsl(262 100% 82%)",
          400: "hsl(262 100% 70%)",
          500: "hsl(262 100% 60%)",
          600: "hsl(262 83% 58%)", // Main primary color
          700: "hsl(262 83% 48%)", // Hover state
          800: "hsl(262 83% 38%)",
          900: "hsl(262 83% 28%)",
          950: "hsl(262 83% 18%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors for coaching section
        coaching: {
          primary: "#5700C6",
          secondary: "#3F09A8",
          light: "#F0E8FF",
          medium: "#A779E9",
          gradient: {
            from: "#511CB2",
            to: "#E3E3FE",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 1s ease-in-out infinite",
        spin: "spin 1s linear infinite",
        scroll: "scroll 0.5s linear infinite",
      },
      backgroundImage: {
        "coaching-gradient":
          "linear-gradient(131.39deg, #511CB2 5.19%, #E3E3FE 94.53%)",
        "button-gradient": "linear-gradient(90deg, #F0E8FF 0%, #A779E9 100%)",
        "prompt-library-gradient":
          "linear-gradient(333.14deg, rgba(244, 240, 255, 0.5) 11.99%, rgba(133, 27, 253, 0.15) 200.33%, rgba(158, 117, 211, 0) 285.94%)",
        "ai-modules-gradient":
          "linear-gradient(147.09deg, #010101 34.11%, #B685F4 95.95%)",
        "secret-modules-gradient":
          "linear-gradient(130.35deg, #000000 -38.01%, #5700C6 5.76%, #D4B2FF 100.98%)",
        "livestream-gradient":
          "linear-gradient(158.53deg, #F6D0D3 12.38%, #F6DBDA 29.18%, #FDF5F4 65.73%)",
        "enterprise-gradient":
          "linear-gradient(131.39deg, #511CB2 5.19%, #E3E3FE 94.53%)",
        "trending-gradient":
          "linear-gradient(86.67deg, #FFFFFF -27.61%, #484848 237.16%)",
        "button-purple-gradient":
          "linear-gradient(0deg, rgba(218, 205, 255, 0.9), rgba(218, 205, 255, 0.9))",
        "cta-banner-gradient":
          "linear-gradient(135deg, #8B5CF6 0%, #5700C6 50%, #3F09A8 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
