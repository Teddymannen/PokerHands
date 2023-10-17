const Hand = require('../Hand');
const CompareHands = require('../CompareHands');

test('Test that threeOfAKind returns truthy is three of a kind', () => {
  let hand = new Hand('♥7', '♦2', '♣7', '♠3', '♠7');
  expect(CompareHands.isThreeOfAKind(hand)).toBeTruthy();
});

test('Test that threeOfAKind returns falsey is not three of a kind', () => {
  let hand = new Hand('♥7', '♦2', '♣7', '♠3', '♠8');
  expect(CompareHands.isThreeOfAKind(hand)).toBeFalsy();
});

test('Test that threeOfAKind returns a higher score for a stronger hand (higher three of a kind)', () => {
  let hand1 = new Hand('♥7', '♦2', '♣7', '♠3', '♠7');
  let hand2 = new Hand('♥T', '♣2', '♣T', '♣3', '♠T');
  let hand1Score = CompareHands.isThreeOfAKind(hand1);
  let hand2Score = CompareHands.isThreeOfAKind(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

test('Test that threeOfAKind returns a higher score for a stronger hand (higher kicker)', () => {
  let hand1 = new Hand('♥7', '♦2', '♣7', '♠4', '♠7');
  let hand2 = new Hand('♥7', '♣3', '♣7', '♣4', '♠7');
  let hand1Score = CompareHands.isThreeOfAKind(hand1);
  let hand2Score = CompareHands.isThreeOfAKind(hand2);
  expect(hand2Score).toBeGreaterThan(hand1Score);
});

test('Test that threeOfAKind returns a equal score for a equal hand', () => {
  let hand1 = new Hand('♥7', '♦2', '♣7', '♠4', '♠7');
  let hand2 = new Hand('♥7', '♣2', '♣7', '♣4', '♠7');
  let hand1Score = CompareHands.isThreeOfAKind(hand1);
  let hand2Score = CompareHands.isThreeOfAKind(hand2);
  expect(hand2Score).toEqual(hand1Score);
});