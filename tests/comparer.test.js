const Hand = require('../Hand');
const CompareHands = require('../CompareHands');
const fs = require('fs');
let suits = '♥♦♣♠';

function getAllHandsBestToWorst() {
  let allHands = [];
  let allHandsRank = fs.readFileSync('tests/poker-hands.txt', 'utf8');
  allHandsRank = allHandsRank.split('\n');
  for (let i = 0; i < allHandsRank.length; i++) {
    let ranks = allHandsRank[i].trim().split(' ');
    let isFlush = ranks.pop().includes('F');
    let hand = new Hand('♥' + ranks[0], '♦' + ranks[1], '♣' + ranks[2], '♠' + ranks[3], '♠' + ranks[4]);
    if (isFlush) {
      hand = new Hand('♥' + ranks[0], '♥' + ranks[1], '♥' + ranks[2], '♥' + ranks[3], '♥' + ranks[4]);
    }

    allHands.push(hand);
  }
  return allHands
}

test('Check the closest hands (by strength)', () => {
  const forwardCheck = 20;
  const allHands = getAllHandsBestToWorst();
  console.log('allHands.length', allHands.length);
  for (let i = 0; i < allHands.length; i++) {
    let hand1 = allHands[i];
    for (let j = i + 1; j < Math.min(i + forwardCheck, allHands.length); j++) {
      let hand2 = allHands[j];
      let result = CompareHands.comparer(hand1, hand2);
      expect(result).toEqual(hand1);
    }
  }
});
