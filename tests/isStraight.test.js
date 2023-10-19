const Hand = require('../Hand');
const CompareHands = require('../CompareHands');
const suits = '♥♦♣♠';

test('check that isStraight returns truthy if straight', () => {
  let hand = new Hand('♥9', '♦8', '♥5', '♣7', '♦6');
  expect(CompareHands.isStraight(hand)).toBeTruthy();
});

test('check that isStraight returns falsey if not straight', () => {
  let hand = new Hand('♥9', '♦8', '♥5', '♣7', '♦T');
  expect(CompareHands.isStraight(hand)).toBeFalsy();
});

test('check that isStraight returns a higher score for a stronger hand (higher straight)', () => {
  let hand1 = new Hand('♥9', '♦8', '♥5', '♣7', '♦6');
  let hand2 = new Hand('♥T', '♦9', '♥8', '♣7', '♦6');
  let hand1Score = CompareHands.isStraight(hand1);
  let hand2Score = CompareHands.isStraight(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

test('check that isStraight handles ace as 1 or 14', () => {
  let hand1 = new Hand('♥A', '♦2', '♥3', '♣4', '♦5');
  let hand2 = new Hand('♥T', '♦J', '♥Q', '♣K', '♦A');
  let hand3 = new Hand('♥A', '♦K', '♥Q', '♣2', '♦3');
  let hand1Score = CompareHands.isStraight(hand1);
  let hand2Score = CompareHands.isStraight(hand2);
  let hand3Score = CompareHands.isStraight(hand3);
  expect(hand1Score).toBeTruthy();
  expect(hand2Score).toBeTruthy();
  expect(hand2Score).toBeGreaterThan(hand1Score);
  expect(hand3Score).toBeFalsy();
});

test('check that isStraight returns a equal score for a equal hand', () => {
  let hand1 = new Hand('♥A', '♦2', '♥3', '♣4', '♦5');
  let hand2 = new Hand('♥A', '♦2', '♥3', '♣4', '♦5');
  let hand1Score = CompareHands.isStraight(hand1);
  let hand2Score = CompareHands.isStraight(hand2);
  expect(hand2Score).toEqual(hand1Score);
});