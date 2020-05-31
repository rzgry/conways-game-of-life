# Conway's game of life

Implementation of conway's game of life using and HTML canvas.

Rules:

- Any live cell with fewer than two live neighbours dies, as if by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

[https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## Development

Uses [parcel](https://parceljs.org) for dev server / bundling.

Install dependencies

```
npm install
```

Start dev server

```
npm start
```

Build

```
npm run build
```
