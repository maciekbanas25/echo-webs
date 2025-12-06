import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
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
          hover: "hsl(var(--accent-hover))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
        cafe: {
          primary: "hsl(var(--cafe-primary))",
          secondary: "hsl(var(--cafe-secondary))",
          bg: "hsl(var(--cafe-bg))",
          dark: "hsl(var(--cafe-dark))",
        },
        barber: {
          primary: "hsl(var(--barber-primary))",
          secondary: "hsl(var(--barber-secondary))",
          bg: "hsl(var(--barber-bg))",
          dark: "hsl(var(--barber-dark))",
        },
        gym: {
          primary: "hsl(var(--gym-primary))",
          secondary: "hsl(var(--gym-secondary))",
          bg: "hsl(var(--gym-bg))",
          accent: "hsl(var(--gym-accent))",
        },
        photographer: {
          primary: "hsl(var(--photographer-primary))",
          secondary: "hsl(var(--photographer-secondary))",
          bg: "hsl(var(--photographer-bg))",
          dark: "hsl(var(--photographer-dark))",
        },
        detailer: {
          primary: "hsl(var(--detailer-primary))",
          accent: "hsl(var(--detailer-accent))",
          bg: "hsl(var(--detailer-bg))",
          dark: "hsl(var(--detailer-dark))",
        },
        tradesman: {
          primary: "hsl(var(--tradesman-primary))",
          secondary: "hsl(var(--tradesman-secondary))",
          bg: "hsl(var(--tradesman-bg))",
          light: "hsl(var(--tradesman-light))",
          dark: "hsl(var(--tradesman-dark))",
        },
        restaurant: {
          primary: "hsl(var(--restaurant-primary))",
          accent: "hsl(var(--restaurant-accent))",
          bg: "hsl(var(--restaurant-bg))",
          light: "hsl(var(--restaurant-light))",
          dark: "hsl(var(--restaurant-dark))",
        },
        beauty: {
          primary: "hsl(var(--beauty-primary))",
          accent: "hsl(var(--beauty-accent))",
          bg: "hsl(var(--beauty-bg))",
          light: "hsl(var(--beauty-light))",
          dark: "hsl(var(--beauty-dark))",
        },
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-subtle': 'var(--gradient-subtle)',
        'gradient-glow': 'var(--gradient-glow)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'hover': 'var(--shadow-hover)',
        'glow': 'var(--shadow-glow)',
        'intense': 'var(--shadow-intense)',
      },
      transitionTimingFunction: {
        'smooth': 'var(--transition-smooth)',
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "bounce-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "bounce-x": "bounce-x 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
