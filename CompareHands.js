module.exports = class CompareHands {

  static suits = '♥♦♣♠';
  static ranks = '23456789TJQKA';

  // return the winning hand
  static comparer(hand1, hand2) {

    let comparers = [
      'isStraightFlush',
      'isFourOfAKind',
      'isFullHouse',
      'isFlush',
      'isStraight',
      'isThreeOfAKind',
      'isTwoPair',
      'isOnePair',
      'isHighestCard'
    ];

    for (let comparer of comparers) {
      let hand1Score = this[comparer](hand1);
      let hand2Score = this[comparer](hand2);
      console.log(comparer, 'hand1Score', hand1Score, 'hand2Score', hand2Score);
      // nobody has this kind combination - continue to next comparer
      if (hand1Score === 0 && hand2Score === 0) { continue; }
      // at least has one hand has this kind of combination
      // which hand won?
      if (hand1Score === hand2Score) { return [hand1, hand2]; }
      else if (hand1Score > hand2Score) { return hand1; }
      else { return hand2; }
    }

  }

  static isStraightFlush(hand) {
    // if not straight or not flush -> 0
    // otherwise score of flush
    return this.isStraight(hand) && this.isFlush(hand);
  }

  static isFourOfAKind(hand) { // TODO!
    let ranks = '';
    for (let card of hand.cards) {
      ranks += card.rank;
    }

    let score = 0, counter = 0;
    for (let card of hand.cards) {
      score += this.rankToPoint(card.rank) * 10 ** counter;
      counter += 2;
    }

    let rankCounts = {};
    for (let rank of ranks) {
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;

      if (rankCounts[rank] === 4) {
        return score + this.rankToPoint(rank) * 10 ** counter;
      }
    }
    return 0;
  }

  static isFullHouse(hand) { // TODO!
    return 0;
  }

  static isFlush(hand) {
    let suits = [];
    for (let card of hand.cards) {
      suits.push(card.suit);
    }
    // not a flush -> 0
    if ([...new Set(suits)].length !== 1) {
      return 0;
    }
    // return points depending of strength of flush
    this.sortByRank(hand);
    let score = 0, counter = 0;
    for (let card of hand.cards) {
      score += this.rankToPoint(card.rank) * 10 ** counter;
      counter += 2;
    }
    return score;
  }

  static isStraight(hand) {
    // sort from low to high
    this.sortByRank(hand);
    // get the ranks of the cards
    let ranks = '';
    for (let card of hand.cards) {
      ranks += card.rank;
    }
    // if both 2 and A then place A first
    if (ranks.includes('2') && ranks.includes('A')) {
      ranks = 'A' + ranks.slice(0, 4);
    }
    // not a straight -> 0
    // Check if the hand is included in A23456789TJQKA+
    if (!('A' + this.ranks).includes(ranks)) { return 0; };
    // return points depending on strength of straight
    return this.rankToPoint(ranks[4]);
  }

  static isThreeOfAKind(hand) { // TODO!
    let ranks = '';
    for (let card of hand.cards) {
      ranks += card.rank;
    }

    let score = 0, counter = 0;
    for (let card of hand.cards) {
      score += this.rankToPoint(card.rank) * 10 ** counter;
      counter += 2;
    }

    let rankCounts = {};
    for (let rank of ranks) {
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;

      if (rankCounts[rank] === 3) {
        return score + this.rankToPoint(rank) * 10 ** counter;
      }
    }
    return 0;
  }

  static isTwoPair(hand) { // TODO!
    this.sortByRank(hand);
    const handRanks = hand.cards.map(card => card.rank);
    const uniqueRanks = [...new Set(handRanks)];
    let pairRanks = [];
    let nonPairRanks = [];

    for (let rank of uniqueRanks) {
      if (handRanks.filter(handRank => handRank === rank).length === 2) {
        pairRanks.push(rank);
      } else {
        nonPairRanks.push(rank);
      }
    }

    // not a two pair -> 0
    if (pairRanks.length !== 2) { return 0; }

    // Add score 
    let score = 0;
    let counter = 0;
    for (let rank of nonPairRanks) {
      score += this.rankToPoint(rank) * 10 ** counter;
      counter += 2;
    }
    score += this.rankToPoint(pairRanks[1]) * 10 ** (counter + 2) + this.rankToPoint(pairRanks[0]) * 10 ** (counter);
    return score;
  }

  static isOnePair(hand) { // TODO!
    this.sortByRank(hand);
    const handRanks = hand.cards.map(card => card.rank);
    const uniqueRanks = [...new Set(handRanks)];
    let pairRanks = [];
    let nonPairRanks = [];

    for (let rank of uniqueRanks) {
      if (handRanks.filter(handRank => handRank === rank).length === 2) {
        pairRanks.push(rank);
      } else {
        nonPairRanks.push(rank);
      }
    }

    // not a one pair -> 0
    if (pairRanks.length !== 1) { return 0; }

    // Add score 
    let score = 0;
    let counter = 0;
    for (let rank of nonPairRanks) {
      score += this.rankToPoint(rank) * 10 ** counter;
      counter += 2;
    }
    score += this.rankToPoint(pairRanks[0]) * 10 ** counter
    return score;
  }

  static isHighestCard(hand) { // TODO!
    this.sortByRank(hand);
    let score = 0;
    let counter = 0;
    for (let card of hand.cards) {
      score += this.rankToPoint(card.rank) * 10 ** counter;
      counter += 2;
    }
    return score;
  }

  // helper functions below:

  static rankToPoint(rank) {
    return this.ranks.indexOf(rank) + 2;
  }

  static sortByRank(hand) {
    hand.cards = hand.cards.sort((a, b) => {
      return this.rankToPoint(a.rank) < this.rankToPoint(b.rank) ?
        -1 : 1;
    });
  }


}