const Hand = require('../Hand');
const CompareHands = require('../CompareHands');
const suits = '♥♦♣♠';

test('check that isFourOfAKind returns truthy if four of of a kind', () => {
  let hand = new Hand('♥2', '♦2', '♣2', '♠2', '♥7');
  expect(CompareHands.isFourOfAKind(hand)).toBeTruthy();
});

test('check that isFourOfAKind returns falsey if not four of of a kind', () => {
  let hand = new Hand('♥2', '♦2', '♣2', '♠3', '♥7');
  expect(CompareHands.isFourOfAKind(hand)).toBeFalsy();
});

test('check that isFourOfAKind returns a higher score for a stronger hand (if two hands but with four of of a kind)', () => {
  let hand1 = new Hand('♥2', '♦2', '♣2', '♠2', '♥7');
  let hand2 = new Hand('♥T', '♦T', '♣T', '♠T', '♥7');
  let hand1Score = CompareHands.isFourOfAKind(hand1);
  let hand2Score = CompareHands.isFourOfAKind(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});