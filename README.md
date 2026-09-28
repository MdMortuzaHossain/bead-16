# Bead 16

## [▶ Play the game](https://mdmortuzahossain.github.io/bead-16/)

A browser version of Sixteen Soldiers (Sholo Guti), with a Bengali interface, a computer opponent, and two players on the same device.

- Traditional 37-point board, 16 beads per side
- Connected-line moves, straight-line jumping captures, and multiple captures
- Optional captures: continue with the same bead or press the end-turn button
- Legal moves highlighted; captures use a distinct diamond marker
- Undo, captured-piece counts, and keyboard controls
- Responsive layout, no downloads or accounts

## Rules used here

Green starts. Move to an adjacent vacant point along a drawn line, or leap over one adjacent enemy onto the next vacant point along the same straight line. Every bead can move in all directions. Captures are optional; after a capture, you may continue capturing with that bead or end the turn. You cannot switch beads during a capture chain.

Capture all opposing beads to win. This edition also treats having no legal moves as a loss. Three occurrences of the same board with the same player to move, or 80 consecutive player turns without a capture, make a draw. These blockade and draw rules are explicitly stated in the game.

Computer play uses a two-turn search with a material and position heuristic; it is a casual opponent, not an unbeatable engine. Undo in computer mode returns to the beginning of your previous turn. Games last for the current page session.

Traditional rule reference: [Sixteen Soldiers](https://en.wikipedia.org/wiki/Sixteen_soldiers). Board geometry cross-checked with [Transum](https://www.transum.org/Software/Fun_Maths/Games/Sixteen_Soldiers.asp). Artwork and code are original.

## Run

Open `index.html` in a modern browser. No dependencies or build step. GitHub Pages serves `main` from the repository root.
