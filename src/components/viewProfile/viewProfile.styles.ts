import { StyleSheet } from "react-native";
import { colors, fontSize } from "../../styles/global.styles";

const randomColors = [
  "#22d3ee",
  "#f472b6",
  "#34d399",
  "#fb7185",
  "#f87171",
  "#4ade80",
  "#fb923c",
  "#a3a3a3",
  "#38bdf8",
  "#e879f9",
  "#c084fc",
  "#a78bfa",
  "#818cf8",
  "#60a5fa",
  "#38bdf8",
  "#1a91ff",
  "#22d3ee",
  "#2dd4bf",
  "#34d399",
  "#a3e635",
  "#facc15",
  "#fbbf24",
  "#fb923c",
  "#f87171",
];

const styles = StyleSheet.create({
  header: {
    fontSize: fontSize.big,
    fontWeight: "700",
    color: colors.tertiary,
  },
  header2: {
    marginBottom: 5,
    fontSize: fontSize.big,
    fontWeight: "700",
    color: colors.tertiary,
  },
  header3: {
    marginBottom: 6,
    fontSize: fontSize.big,
    fontWeight: "700",
    color: colors.tertiary,
  },
  banners: {
    marginVertical: 5,
    fontSize: fontSize.normal,
    backgroundColor:
      randomColors[Math.floor(Math.random() * randomColors.length)],
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: colors.primary,
    fontWeight: "500",
  },
});

export default styles;
