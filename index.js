const ethers = require('ethers');
const { DefenderRelayProvider } = require('defender-relay-client/lib/ethers');

const credentials = {
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
};
const provider = new DefenderRelayProvider(credentials);

const decodeTransactionResult = (resultAsHexString) => {
  let codeString = `0x${resultAsHexString.substr(138)}`.replace(/0+$/, '');

  if (codeString.length % 2 === 1) {
    codeString += '0';
  }

  return ethers.utils.toUtf8String(codeString);
}

(async () => {
  const result = await provider.call(
    {
      data: '0x406f7f6f000000000000000000000000000000000000000000000000000000001460883c0000000000000000000000000000000000000000000000000000000003154b3a00000000000000000000000000000000000000000056da9d67d20d77090000000000000000000000000000000000000000000000000000000000000064920c48000000000000000000000000d01587ecd64504851e181b36153ef4d93c2bf93900000000000000000000000000000000000000001d471783ac9f1aea98bda2a6',
      from: '0x9dA2192C820C5cC37d26A3F97d7BcF1Bc04232A3',
      to: '0x02D158f550dd434526E0BC4a65F7DD50DDB9afEE',
    },
    35316192,
  );

  const revertReason = decodeTransactionResult(result);
  
  console.log(revertReason);
  
})();