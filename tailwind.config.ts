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
        step: {
          one: "hsl(var(--step-one))",
          two: "hsl(var(--step-two))",
          three: "hsl(var(--step-three))",
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
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        "float-up": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "10%": { opacity: "0.7" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(-110vh) scale(1.35)", opacity: "0" }
        },
        shimmer: {
          "0%": { transform: "translateX(-140%) skewX(-20deg)" },
          "100%": { transform: "translateX(240%) skewX(-20deg)" }
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.09) translate3d(-1.5%, -1%, 0)" }
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.6) translateY(12px)" },
          "60%": { opacity: "1", transform: "scale(1.06) translateY(0)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        },
        "arrow-slide": {
          "0%, 100%": { transform: "translateX(0)", opacity: "0.5" },
          "50%": { transform: "translateX(6px)", opacity: "1" }
        },
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "gradient-shift": "gradient-shift 12s ease-in-out infinite",
        "float-up": "float-up 12s linear infinite",
        shimmer: "shimmer 2.4s ease-in-out 0.7s infinite",
        "ken-burns": "ken-burns 18s ease-in-out infinite alternate",
        "pop-in": "pop-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "bounce-soft": "bounce-soft 2.6s ease-in-out infinite",
        "arrow-slide": "arrow-slide 1.6s ease-in-out infinite",
        "progress-fill": "progress-fill 2.5s linear forwards",
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-overlay': 'var(--gradient-overlay)',
        'gradient-splash': 'var(--gradient-splash)',
        'gradient-glow': 'var(--gradient-glow)',
      },

      boxShadow: {
        'architectural': 'var(--shadow-architectural)',
        'elegant': 'var(--shadow-elegant)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;