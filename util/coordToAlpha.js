import { files } from "../board/files.js";

export default function coordToAlpha(...[y, x]) {
    if (isNaN(y) || isNaN(x)) {
        return -1;
    }

    if (y > 7 || y < 0 || x > 7 || x < 0) {
        return -2;
    }

    return `${files[x]}${y+1}`;
}