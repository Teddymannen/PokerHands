const Hand = require('../Hand');
const CompareHands = require('../CompareHands');
const suits = '♥♦♣♠';

test('check that isTwoPair returns truthy if one pair', () => {
  let hand = new Hand('♥9', '♦9', '♦8', '♣8', '♥5');
  expect(CompareHands.isTwoPair(hand)).toBeTruthy();
});

test('check that isTwoPair returns falsey if not one pair', () => {
  let hand = new Hand('♥9', '♦9', '♦7', '♣6', '♥5');
  expect(CompareHands.isTwoPair(hand)).toBeFalsy();
});

test('check that isTwoPair returns a higher score for a stronger hand (higher lower pair)', () => {
  let hand1 = new Hand('♥9', '♠9', '♠7', '♠7', '♠5');
  let hand2 = new Hand('♥9', '♠9', '♦8', '♣8', '♥5');
  let hand1Score = CompareHands.isTwoPair(hand1);
  let hand2Score = CompareHands.isTwoPair(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

test('check that isTwoPair returns a higher score for a stronger hand (higher higher pair)', () => {
  let hand1 = new Hand('♥9', '♠9', '♠8', '♠8', '♠5');
  let hand2 = new Hand('♥T', '♠T', '♦7', '♣7', '♥5');
  let hand1Score = CompareHands.isTwoPair(hand1);
  let hand2Score = CompareHands.isTwoPair(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

test('check that isTwoPair returns a higher score for a stronger hand (higher kicker)', () => {
  let hand1 = new Hand('♠9', '♦9', '♦8', '♦8', '♥5');
  let hand2 = new Hand('♠9', '♣9', '♣8', '♣8', '♥6');
  let hand1Score = CompareHands.isTwoPair(hand1);
  let hand2Score = CompareHands.isTwoPair(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

test('check that isTwoPair returns a equal score for a equal hand', () => {
  let hand1 = new Hand('♥9', '♦9', '♦8', '♦8', '♦5');
  let hand2 = new Hand('♥9', '♣9', '♣8', '♣8', '♥5');
  let hand1Score = CompareHands.isTwoPair(hand1);
  let hand2Score = CompareHands.isTwoPair(hand2);
  expect(hand2Score).toEqual(hand1Score);
});

