# How to Play Kaali Teeri

Kaali Teeri is a traditional Indian Gujarati card game played with partnerships that shift every round. Players bid on winning tricks, form temporary alliances, and accumulate points across multiple rounds. This document explains the rules used by this score-tracking application.

---

## Players

- **Minimum:** 2 players
- **Recommended:** 4 or more players

---

## Objective

Score the most points by the end of the game. Points are earned by either winning a round as the bidding partnership or defeating them as the opposition.

---

## Game Structure

A game consists of multiple rounds. Each round has three phases:

1. **Bidding** — one player claims they can win the hand and names a point value
2. **Play** — players form teams and play the hand (with physical cards, outside this app)
3. **Scoring** — points are awarded based on the outcome

---

## Round Setup

At the start of each round, record the following in the app:

### 1. Highest Bidder

Select the player who made the highest bid. This player becomes the round's **bidder** and is automatically counted as a partner.

### 2. Bid Amount

Set the bid amount using the stepper. The valid range is **160 to 250**, in increments of 5.

This value is the stake for the round — it determines how many points are won or lost.

### 3. Partners

Select the bidder's partners from the remaining players. The bidder is always included.

**Partner count rule:** Each round requires exactly `floor(n / 2)` partners in total (including the bidder), where `n` is the total number of players.

| Total players | Required partners |
|:---:|:---:|
| 2 | 1 |
| 3 | 1 |
| 4 | 2 |
| 5 | 2 |
| 6 | 3 |
| 7 | 3 |

The **Next Round** button remains disabled until the correct number of partners is selected.

### 4. Result

After the hand is played, record who won:

- **Partners win** — the bidding team successfully won the hand
- **Non-partners win** — the opposition defeated the bidding team

---

## Scoring

### If Partners Win

| Player | Points earned |
|--------|--------------|
| Bidder | `2 × bid` |
| Other partners | `bid` each |
| Non-partners | `0` |

The bidder earns a bonus for taking on the risk of bidding.

### If Non-Partners Win

| Player | Points earned |
|--------|--------------|
| Each non-partner | `bid` each |
| All partners (including bidder) | `0` |

The opposition earns the full bid amount each for defeating the bidding team.

---

## Scoring Example

**4 players:** Alice, Bob, Carol, Dave. Required partners per round: 2.

### Round 1

- Bidder: **Alice**, bid: **160**, partners: Alice & Bob
- Result: **Partners win**

| Player | Points this round | Running total |
|--------|:-----------------:|:-------------:|
| Alice  | 320 (2 × 160) | 320 |
| Bob    | 160 | 160 |
| Carol  | 0 | 0 |
| Dave   | 0 | 0 |

### Round 2

- Bidder: **Carol**, bid: **200**, partners: Carol & Dave
- Result: **Non-partners win**

| Player | Points this round | Running total |
|--------|:-----------------:|:-------------:|
| Alice  | 200 (non-partner) | 520 |
| Bob    | 200 (non-partner) | 360 |
| Carol  | 0 (partner, lost) | 0 |
| Dave   | 0 (partner, lost) | 0 |

---

## Ending the Game

Press **End Game** at any time (when the form is in its default state, or after correctly filling in a round). The app displays:

- Final scores sorted from highest to lowest
- The winner
- Total number of rounds played

Use **Play Again** to start a new game with the same or different players.

---

## Tips

- Partnerships change every round — yesterday's ally is today's opponent.
- The bidder takes on the most risk: a loss earns zero, but a win earns double.
- Non-partners each earn the full bid if they win, so a large opposition can accumulate points quickly.
- Track the live scores mid-game using the scores button to inform your bidding strategy.
