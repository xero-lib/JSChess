let colorboard = new Array(8);
for (let i = 0; i < 8; i++) colorboard[i] = new Array(8);

for (let i = 0; i < 8; i += 2) {
  for (let j = 0; j < 8; j += 2) {
    colorboard[i][j] = "#";
    colorboard[i][j + 1] = " ";

    colorboard[i + 1][j] = " ";
    colorboard[i + 1][j + 1] = "#";
  }
}

// for (let i = 0; i < 8; i++) {
//   for (let j = 0; j < 8; j++) {
//     colorboard[i][j] = (i ^ j) & 1 == 1 ? ' ' : '#';
//   }
// }

export default colorboard;

// (x & 1) ^ (y & 1)
// (x ^ y) & 1

/*
n & 1 => tests if the number is odd
true = 1
false = 0

0 1 0 1 (5)
& & & &
0 0 0 1 (1)
= = = =
0 0 0 1

*/

// for(let y = 0; y < 8; y++)
//     for(let x = 0; x < 8; x++) {

//     }

// function range(n) {
//     return [...Array(n).keys()];
// }

// for(let y = 0; y < 8; y++) {
//     console.log(range(8).map((x) => (x & 1) ^ (y & 1)).join(' '))
// }
