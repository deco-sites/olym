import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      fontFamily: {
        "FKOlympikus": ["FKOlympikus"],
        "Signal": ["Signal"],
      },
      fontSize: {
        "6.5xl": [
          "70px",
          {
            lineHeight: "60px",
            letterSpacing: "-0.01em",
            fontWeight: "400",
          },
        ],
        "7xl": [
          "90px",
          {
            lineHeight: "74px",
            letterSpacing: "-0.01em",
            fontWeight: "400",
          },
        ],
        "7.5xl": [
          "120px",
          {
            lineHeight: "100px",
            letterSpacing: "-0.01em",
            fontWeight: "400",
          },
        ],
      },
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      borderRadius: {
        "4xl": "40px",
      },
    },
  },
};
