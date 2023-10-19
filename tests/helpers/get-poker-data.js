const fs = require('fs');
const Hand = require("../../Hand");

// let baseUrl = 'https://api.pokerapi.dev/v1/winner/texas_holdem?cc=AC,KD,QH,JS,7C&pc[]=10S,8C&pc[]=3S,2C&pc[]=QS,JH'
const suits = '♥♦♣♠';
const ranks = '23456789TJQKA';
const remoteSuits = 'HDCS';
const remoteRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

function getUrl(communityCards, playerHands) {
  let url = 'https://api.pokerapi.dev/v1/winner/texas_holdem?cc=' + communityCards;
  for (let hand of playerHands) {
    url += '&pc[]=' + hand;
  }
  return url;
}

function toHand(remoteHand) {
  // last character is the suit in remoteHand other characters are the rank
  let hand = [];
  for (card of remoteHand.split(',')) {
    let suit = card[card.length - 1];
    let rank = card.slice(0, card.length - 1);
    let suitIndex = remoteSuits.indexOf(suit);
    let rankIndex = remoteRanks.indexOf(rank);
    hand.push(suits[suitIndex] + ranks[rankIndex]);
  }
  return hand;
}

function toRemoteHand(hand) {
  let remoteHand = [];
  for (card of hand.cards) {
    let suitIndex = suits.indexOf(card.suit);
    let rankIndex = ranks.indexOf(card.rank);
    remoteHand.push(remoteRanks[rankIndex] + remoteSuits[suitIndex]);
  }
  return remoteHand.join(',');
}

function getRandomRemoteCard() {
  let suit = remoteSuits[Math.floor(Math.random() * remoteSuits.length)];
  let rank = remoteRanks[Math.floor(Math.random() * remoteRanks.length)];
  return rank + suit;
}

function getRandomRemoteCards() {
  let usedCards = [];
  let communityCards = [];
  let playerHands = [];
  while (communityCards.length < 5) {
    let card = getRandomRemoteCard();
    if (!usedCards.includes(card)) {
      communityCards.push(card);
      usedCards.push(card);
    }
  }
  // Create 2 player hands
  for (let i = 0; i < 2; i++) {
    let hand = [];
    while (hand.length < 2) {
      let card = getRandomRemoteCard();
      if (!usedCards.includes(card)) {
        hand.push(card);
        usedCards.push(card);
      }
    }
    playerHands.push(hand.join(','));
  }

  return { communityCards: communityCards.join(','), playerHands };
}

async function getRemoteData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function writeHandsToFile(hands) {
  let oldData = fs.readFileSync('test-hands.json');
  let oldHands = JSON.parse(oldData);
  let data = JSON.stringify([...oldHands, ...hands], null, 2);
  fs.writeFileSync('test-hands.json', data);
}

async function getRemoteHands() {
  const hands = [];
  try {
    for (let i = 0; i < 1000; i++) {
      let { communityCards, playerHands } = getRandomRemoteCards();
      let url = getUrl(communityCards, playerHands);
      let remoteData = await getRemoteData(url);

      let winners = remoteData.winners;

      let actualPlayerHands = remoteData.players.map((player) => player.hand);
      let plrIndexWinners = [];
      if (winners.length === 1) {
        for (let winner of winners) {
          plrIndexWinners.push(actualPlayerHands.indexOf(winner.hand));
        }
      }

      hands.push({
        winners: plrIndexWinners,
        hands: actualPlayerHands.map((hand) => toHand(hand)),
        result: winners.length === 1 ? winners[0].result : 'tie'
      });

      console.log(i.toString().padStart(4, ' '), hands[i].hands, hands[i].winners, hands[i].result === 'tie' ? '   tie' : hands[i].result);
    }
  } catch (error) { console.log(error); }
  writeHandsToFile(hands);
}
getRemoteHands();
// fetch(baseUrl)
//   .then(response => response.json())
//   .then(price => console.log(price))