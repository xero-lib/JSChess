export default function persist(x) {
    return JSON.parse(JSON.stringify(x));
}