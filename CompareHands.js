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

  static isFourOfAKind(hand) {
    let { ranksWithCount, otherRanks } = this.getRanksWithCount(hand, 4);
    if (ranksWithCount.length !== 1) { return 0; }
    return this.getScore([...otherRanks, ...ranksWithCount]);
  }

  static isFullHouse(hand) {
    let { ranksWithCount: pair } = this.getRanksWithCount(hand, 2);
    let { ranksWithCount: threeOfAKind } = this.getRanksWithCount(hand, 3);
    if (pair.length !== 1 || threeOfAKind.length !== 1) { return 0; }
    return this.getScore([...pair, ...threeOfAKind]);
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

  static isThreeOfAKind(hand) {
    let { ranksWithCount, otherRanks } = this.getRanksWithCount(hand, 3);
    if (ranksWithCount.length !== 1) { return 0; }
    return this.getScore([...otherRanks, ...ranksWithCount]);
  }

  static isTwoPair(hand) {
    let { ranksWithCount, otherRanks } = this.getRanksWithCount(hand, 2);
    if (ranksWithCount.length !== 2) { return 0; }
    return this.getScore([...otherRanks, ...ranksWithCount]);
  }

  static isOnePair(hand) {
    let { ranksWithCount, otherRanks } = this.getRanksWithCount(hand, 2);
    if (ranksWithCount.length !== 1) { return 0; }
    return this.getScore([...otherRanks, ...ranksWithCount]);
  }

  static isHighestCard(hand) {
    this.sortByRank(hand);
    return this.getScore(hand.cards.map(card => card.rank));
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

  /**
   * Count occurences of each rank in a hand
   * @param {Hand} hand 
   * @returns {Object} An object with the rank as key and the number of times it appears in the hand as value
   */
  static countRanks(hand) {
    let rankCounts = {};
    for (let card of hand.cards) {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    }
    return rankCounts;
  }

  /**
   * Get ranks that appear a certain number of times in a hand
   * @param {Hand} hand
   * @param {Number} count
   * @returns {Object} An object with `ranksWithCount` and `otherRanks` sorted from low to high
   */
  static getRanksWithCount(hand, count) {
    let rankCounts = this.countRanks(hand);
    let ranksWithCount = [];
    let otherRanks = [];
    for (let rank in rankCounts) {
      if (rankCounts[rank] === count) {
        ranksWithCount.push(rank);
      } else {
        otherRanks.push(rank);
      }
    }
    // Sort ranks from low to high
    otherRanks.sort((a, b) => this.rankToPoint(a) - this.rankToPoint(b));
    ranksWithCount.sort((a, b) => this.rankToPoint(a) - this.rankToPoint(b));
    return { ranksWithCount, otherRanks };
  }

  /**
   * Get the score of a hand
   * @param {Array} ranks The ranks of the cards in the hand in the order of least to most important
   * @returns {Number} The score of the hand
   */
  static getScore(ranks) {
    let score = 0;
    let counter = 0;
    for (let rank of ranks) {
      score += this.rankToPoint(rank) * 10 ** counter;
      counter += 2;
    }
    return score;
  }
}