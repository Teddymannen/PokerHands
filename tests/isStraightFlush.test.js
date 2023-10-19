const Hand = require('../Hand');
const CompareHands = require('../CompareHands');
const suits = '♥♦♣♠';

test('check that isStraightFlush returns truthy if straight', () => {
  for (let suit of suits) {
    let hand = new Hand(suit + '2', suit + '3', suit + '4', suit + '5', suit + '6');
    expect(CompareHands.isStraightFlush(hand)).toBeTruthy();
  }
});

test('check that isStraightFlush returns falsey if not straight', () => {
  let hands = [
    new Hand('♥T', '♥9', '♥8', '♥7', '♦5'), // not straight flush
    new Hand('♥T', '♥9', '♥8', '♥7', '♥5'), // flush, but not straight
    new Hand('♥T', '♥9', '♥8', '♥7', '♦6'), // straight, but not flush
  ];
  for (let hand of hands) {
    expect(CompareHands.isStraightFlush(hand)).toBeFalsy();
  }
});

test('check that isStraightFlush returns a higher score for a stronger hand (higher straight)', () => {
  let hand1 = new Hand('♥9', '♥8', '♥5', '♥7', '♥6');
  let hand2 = new Hand('♣T', '♣9', '♣8', '♣7', '♣6');
  let hand1Score = CompareHands.isStraightFlush(hand1);
  let hand2Score = CompareHands.isStraightFlush(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

test('check that isStraightFlush handles ace as 1 or 14', () => {
  let hand1 = new Hand('♣A', '♣2', '♣3', '♣4', '♣5');
  let hand2 = new Hand('♦T', '♦J', '♦Q', '♦K', '♦A');
  let hand3 = new Hand('♥A', '♥K', '♥Q', '♥2', '♥3');
  let hand1Score = CompareHands.isStraightFlush(hand1);
  let hand2Score = CompareHands.isStraightFlush(hand2);
  let hand3Score = CompareHands.isStraightFlush(hand3);
  expect(hand1Score).toBeTruthy();
  expect(hand2Score).toBeTruthy();
  expect(hand2Score).toBeGreaterThan(hand1Score);
  expect(hand3Score).toBeFalsy();
});

test('check that isStraightFlush returns a equal score for a equal hand', () => {
  let hand1 = new Hand('♥9', '♥8', '♥5', '♥7', '♥6');
  let hand2 = new Hand('♣9', '♣8', '♣5', '♣7', '♣6');
  let hand1Score = CompareHands.isStraightFlush(hand1);
  let hand2Score = CompareHands.isStraightFlush(hand2);
  expect(hand2Score).toEqual(hand1Score);
});