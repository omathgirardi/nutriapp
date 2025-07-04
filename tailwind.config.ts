import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NutriPlan cores principais
        primary: {
          DEFAULT: "#1570EF",
          50: "#EFF8FF",
          100: "#D1E9FF",
          200: "#B2DDFF",
          300: "#84CAFF",
          400: "#53B1FD",
          500: "#1570EF", // cor principal
          600: "#175CD3",
          700: "#1849A9",
          800: "#194185",
          900: "#102A56",
        },
        secondary: {
          DEFAULT: "#039855",
          50: "#ECFDF3",
          100: "#D1FADF",
          200: "#A6F4C5",
          300: "#6CE9A6",
          400: "#32D583",
          500: "#039855", // cor secundária
          600: "#027A48",
          700: "#05603A",
          800: "#054F31",
          900: "#033A25",
        },
        gray: {
          DEFAULT: "#667085",
          50: "#F9FAFB",
          100: "#F2F4F7", // background
          200: "#EAECF0",
          300: "#D0D5DD", // bordas
          400: "#98A2B3",
          500: "#667085", // texto
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ["var(--font-helvetica)", "sans-serif"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
        "5xl": "48px",
        "6xl": "56px",
        "7xl": "64px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        DEFAULT: "12px", // Border radius padrão do NutriPlan
      },
      boxShadow: {
        subtle: "0 2px 8px rgba(0, 0, 0, 0.05)",
        medium: "0 4px 12px rgba(0, 0, 0, 0.08)",
        card: "0 4px 20px rgba(0, 0, 0, 0.06)",
        dropdown: "0 8px 24px rgba(0, 0, 0, 0.12)",
        glassmorphism: "0 8px 32px rgba(0, 0, 0, 0.08)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          from: { transform: "translateX(20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        pulse: {
          '0%, 100%': { opacity: "1" },
          '50%': { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        slideUp: "slideUp 0.4s ease-out",
        slideInRight: "slideInRight 0.3s ease-out",
        pulse: "pulse 2s infinite",
      },
      backdropFilter: {
        'glass': 'blur(16px) saturate(180%)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom right, rgba(21, 112, 239, 0.05), rgba(21, 112, 239, 0.3))',
        'gradient-button': 'linear-gradient(to right, #1570EF, #2E90FA)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;