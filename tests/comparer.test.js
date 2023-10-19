const Hand = require('../Hand');
const CompareHands = require('../CompareHands');
const fs = require('fs');



function getComparerOracles() {
  let data = fs.readFileSync('test-hands.json');
  let comparerOracles = JSON.parse(data);
  return comparerOracles;
}

test('check all tests', () => {
  let comparerOracles = getComparerOracles();
  console.log('comparerOracles.length', comparerOracles.length);
  for (comparerOracle of comparerOracles) {
    let hands = [];
    for (let hand of comparerOracle.hands) {
      hands.push(new Hand(...hand));
    }
    let winningHand = hands;
    if (comparerOracle.winners.length === 1) {
      winningHand = hands[comparerOracle.winners[0]];
    }

    const winner = CompareHands.comparer(hands[0], hands[1]);
    expect(winner).toEqual(winningHand);
  }
});


test('failure', () => {
  let ranks = '23456789TJQKA'; // 23456789AJKQT
  let hand1 = new Hand('♠A', '♠3', '♠K', '♠Q', '♦T');
  let hand2 = new Hand('♥Q', '♥J', '♥3', '♥5', '♦5');

  // console.log('hand1 count', CompareHands.getRanksWithCount(hand1, 2));
  // console.log('hand2 count', CompareHands.getRanksWithCount(hand2, 2));

  // GET SCORE

  let winner = CompareHands.comparer(hand1, hand2);
  expect(winner).toEqual(hand2);
});











