import casual from "casual";

const ICONS = [
  "clear-day",
  "clear-night",
  "rain",
  "snow",
  "sleet",
  "wind",
  "fog",
  "cloudy",
  "partly-cloudy-day",
  "partly-cloudy-night"
];

casual.define("icon", () => ICONS[Math.floor(Math.random() * ICONS.length)]);

const mocks = {
  DateTime: () => new Date(),
  Weather: () => ({
    icon: (casual as any).icon,
    summary: casual.sentence
  })
};

export default mocks;
