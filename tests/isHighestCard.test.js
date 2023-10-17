const Hand = require('../Hand');
const CompareHands = require('../CompareHands');
const suits = '♥♦♣♠';

test('check that isHighestCard returns truthy if highest card', () => {
  let hand = new Hand('♥2', '♦3', '♣4', '♠5', '♥7');
  expect(CompareHands.isHighestCard(hand)).toBeTruthy();
});

test('check that isHighestCard returns a higher score for a stronger hand (if two hands but with highest card)', () => {
  let hand1 = new Hand('♥2', '♦3', '♣4', '♠5', '♥7');
  let hand2 = new Hand('♥T', '♦9', '♣5', '♠Q', '♥A');
  let hand1Score = CompareHands.isHighestCard(hand1);
  let hand2Score = CompareHands.isHighestCard(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});