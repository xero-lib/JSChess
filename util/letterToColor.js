export default function (letter) {
    if (['P', 'R', 'N', 'B', 'Q', 'K'].includes(letter)) return "Light";
    if (['p', 'r', 'n', 'b', 'q', 'k'].includes(letter)) return "Dork";
    return false
}