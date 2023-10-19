const Hand = require('../Hand');
const CompareHands = require('../CompareHands');
const suits = '♥♦♣♠';

test('check that isFullHouse returns truthy if full house', () => {
  let hand = new Hand('♥2', '♦2', '♣2', '♠3', '♥3');
  expect(CompareHands.isFullHouse(hand)).toBeTruthy();
});

test('check that isFullHouse returns falsey if not full house', () => {
  let hand = new Hand('♥2', '♦2', '♣2', '♠3', '♥7');
  expect(CompareHands.isFullHouse(hand)).toBeFalsy();
});

test('check that isFullHouse returns a higher score for a stronger hand (if two hands but with full house)', () => {
  let hand1 = new Hand('♥2', '♦2', '♣2', '♠3', '♥3');
  let hand2 = new Hand('♥T', '♦T', '♣T', '♠7', '♥7');
  let hand1Score = CompareHands.isFullHouse(hand1);
  let hand2Score = CompareHands.isFullHouse(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

// Fake tests if only one deck of cards
test('check that isFullHouse returns a higher score for a stronger hand (if two hands but with higher two of a kind)', () => {
  let hand1 = new Hand('♥T', '♦T', '♣T', '♠3', '♥3');
  let hand2 = new Hand('♥T', '♦T', '♣T', '♠7', '♥7');
  let hand1Score = CompareHands.isFullHouse(hand1);
  let hand2Score = CompareHands.isFullHouse(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

test('check that isFullHouse returns a equal score for a equal hand', () => {
  let hand1 = new Hand('♥T', '♦T', '♣T', '♠3', '♥3');
  let hand2 = new Hand('♥T', '♦T', '♣T', '♠3', '♥3');
  let hand1Score = CompareHands.isFullHouse(hand1);
  let hand2Score = CompareHands.isFullHouse(hand2);
  expect(hand2Score).toEqual(hand1Score);
});