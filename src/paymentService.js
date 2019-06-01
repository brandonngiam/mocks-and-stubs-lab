const makePayment = amount => {
  console.log(`actually making payment of $${amount}`);
  return `payment made for $${amount}`;
};

const refundPayment = amount => {
  console.log(`actually making refund  of $${amount} `);
  return `refund made for $${amount}`;
};

module.exports = { makePayment, refundPayment };
