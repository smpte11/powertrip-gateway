import casual from "casual";
import { MockList } from "graphql-tools";

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
  }),
  Day: () => ({
    activities: () => new MockList([0, 5])
  })
};

export default mocks;
