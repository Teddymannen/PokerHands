const Hand = require('../Hand');
const CompareHands = require('../CompareHands');
const suits = '♥♦♣♠';
const ranks = '23456789TJQKA';

function offsetRank(rankIndex, amountOffsets) {
  let offsetRanks = [];
  for (let i = 1; i <= amountOffsets; i++) {
    offsetRanks.push(ranks[(rankIndex + i) % ranks.length]);
  }
  return offsetRanks;
}

test('check that isOnePair returns truthy if one pair', () => {
  for (let rankIndex = 0; rankIndex < ranks.length; rankIndex++) {
    let rank = ranks[rankIndex];
    let offsetRanks = offsetRank(rankIndex, 3);
    let hand = new Hand('♥' + rank, '♦' + rank, '♦' + offsetRanks[0], '♣' + offsetRanks[1], '♥' + offsetRanks[2]);
    expect(CompareHands.isOnePair(hand)).toBeTruthy();
  }
});

test('check that isOnePair returns falsey if not one pair', () => {
  let hand = new Hand('♥9', '♦8', '♦7', '♣6', '♥3');
  expect(CompareHands.isOnePair(hand)).toBeFalsy();
});

test('check that isOnePair returns a higher score for a stronger hand (higher pair)', () => {
  let hand1 = new Hand('♥9', '♠9', '♠8', '♠7', '♠5');
  let hand2 = new Hand('♥T', '♠T', '♦8', '♣7', '♥5');
  let hand1Score = CompareHands.isOnePair(hand1);
  let hand2Score = CompareHands.isOnePair(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

test('check that isOnePair returns a higher score for a stronger hand (higher kicker)', () => {
  let hand1 = new Hand('♠9', '♦9', '♦8', '♦7', '♥5');
  let hand2 = new Hand('♠9', '♣9', '♣8', '♣7', '♥6');
  let hand1Score = CompareHands.isOnePair(hand1);
  let hand2Score = CompareHands.isOnePair(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

test('check that isOnePair returns a equal score for a equal hand', () => {
  let hand1 = new Hand('♥9', '♦9', '♦8', '♦7', '♦5');
  let hand2 = new Hand('♥9', '♣9', '♣8', '♣7', '♥5');
  let hand1Score = CompareHands.isOnePair(hand1);
  let hand2Score = CompareHands.isOnePair(hand2);
  expect(hand2Score).toEqual(hand1Score);
});

