export default function letterToColor(letter) {
  return letter.toLowerCase() !== letter ? "Light" : "Dark";
}
