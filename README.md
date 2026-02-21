# Kaaliteeri

A score tracker for the Indian Gujarati card game Kaali Teeri. Built with Next.js, React, and Tailwind CSS.

## How it works

1. **Setup** — enter player names (minimum 2)
2. **Game rounds** — for each round, select the highest bidder, the bid amount, the bidder's partners, and who won
3. **End game** — view the final scoreboard sorted by score

### Scoring rules

- Partners win → bidder gets `2 × bid`, each other partner gets `bid`, non-partners get `0`
- Non-partners win → each non-partner gets `bid`, partners get `0`

### Partner count rule

Each round requires exactly `floor(n / 2)` partners (including the bidder), where `n` is the total number of players. The **Next Round** and **End Game** buttons are disabled until this is satisfied. **End Game** is also available immediately when the form is in its default/pristine state.

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

```bash
bun test
bun test --watch
```

## Linting & formatting

```bash
bun run biome:check
```
