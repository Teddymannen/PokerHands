const Hand = require('../Hand');
const CompareHands = require('../CompareHands');
const suits = '♥♦♣♠';
const ranks = '23456789TJQKA';

function offsetRank(rank) {
  return rank === 'A' ? '2' : 'A';
}

test('check that isFourOfAKind returns truthy if four of of a kind', () => {
  for (let rank of ranks) {
    let hand = new Hand('♥' + rank, '♦' + rank, '♣' + rank, '♠' + rank, '♥' + offsetRank(rank));
    expect(CompareHands.isFourOfAKind(hand)).toBeTruthy();
  }
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

test('Test that isFourOfAKind returns a higher score for a stronger hand (higher kicker)', () => {
  let hand1 = new Hand('♥7', '♦7', '♣7', '♠4', '♠7');
  let hand2 = new Hand('♥7', '♦7', '♣7', '♣5', '♠7');
  let hand1Score = CompareHands.isFourOfAKind(hand1);
  let hand2Score = CompareHands.isFourOfAKind(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

test('Test that isFourOfAKind returns a equal score for a equal hand', () => {
  let hand1 = new Hand('♥7', '♦2', '♣7', '♠4', '♠7');
  let hand2 = new Hand('♥7', '♣2', '♣7', '♣4', '♠7');
  let hand1Score = CompareHands.isFourOfAKind(hand1);
  let hand2Score = CompareHands.isFourOfAKind(hand2);
  expect(hand2Score).toEqual(hand1Score);
});