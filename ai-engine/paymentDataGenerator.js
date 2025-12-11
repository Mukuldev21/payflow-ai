#!/usr/bin/env node
// Simple local payment data generator (no external API).
// Usage: node paymentDataGenerator.js --count 3
const crypto = require('crypto');

function luhnChecksum(number) {
  let sum = 0, alt = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let n = parseInt(number[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return (sum % 10) === 0;
}

function generateCard(prefix = '4') {
  // Generate a 16-digit card starting with prefix (VISA by default)
  let card = prefix;
  while (card.length < 15) card += String(Math.floor(Math.random() * 10));
  // calculate last digit to satisfy Luhn
  for (let d = 0; d <= 9; d++) {
    const candidate = card + d;
    if (luhnChecksum(candidate)) return candidate;
  }
  return card + '0';
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomExpiry() {
  const year = new Date().getFullYear() + randomInt(1,5);
  const month = String(randomInt(1,12)).padStart(2,'0');
  return `${month}/${String(year).slice(-2)}`;
}

function randomCVV() {
  return String(randomInt(100,999));
}

function randomUPI() {
  const names = ['akash','mukul','priya','raj','simran'];
  return `${names[randomInt(0,names.length-1)]}${randomInt(1,999)}@upi`;
}

function id() {
  return crypto.randomBytes(6).toString('hex');
}

function genSingle() {
  const paymentTypes = ['card','upi','wallet'];
  const type = paymentTypes[randomInt(0, paymentTypes.length-1)];
  const amount = randomInt(10,50000);
  const base = {
    id: id(),
    merchant: `Merchant-${randomInt(100,999)}`,
    amount,
    currency: 'INR',
    createdAt: new Date().toISOString(),
    payerName: ['Mukul','Asha','Ravi','Neha'][randomInt(0,3)]
  };
  if (type === 'card') {
    base.type = 'card';
    base.card = {
      number: generateCard('4'),
      expiry: randomExpiry(),
      cvv: randomCVV(),
      holder: base.payerName
    };
  } else if (type === 'upi') {
    base.type = 'upi';
    base.upi = randomUPI();
  } else {
    base.type = 'wallet';
    base.walletId = 'WL-' + id();
  }
  // basic fraud marker
  base.riskScore = Math.min(100, Math.floor(Math.log10(amount+1) * 20) + randomInt(0,20));
  base.expected = (base.riskScore > 70 || amount > 20000) ? 'otp_required' : 'success';
  return base;
}

// CLI
const args = process.argv.slice(2);
let count = 1;
for (let i=0;i<args.length;i++){
  if (args[i]==='--count') count = parseInt(args[i+1])||1;
}

const out = [];
for (let i=0;i<count;i++) out.push(genSingle());
console.log(JSON.stringify(out, null, 2));
