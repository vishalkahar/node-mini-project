import https from "https";
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const apiKey = '';
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const getExchangeRate = () => {
    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            const rates = JSON.parse(data).conversion_rates;
            console.log(rates);

            rl.question('Enter the amount in USD: ', (amount) => {
                rl.question('Enter the target currency(e.g EUR, GBP, INR) ', (currency) => {
                    const rate = rates[currency.toUpperCase()];
                    if (rate) {
                        const convertedAmount = (amount * rate).toFixed(2);
                        console.log(chalk.blue.bgRed.bold(`${amount} USD is approximately ${convertedAmount} ${currency.toUpperCase()}`));
                    } else {
                        console.log('Invalid currency code. Please try again.');
                    }
                    rl.close();
                });
            });
        });
    });
};

getExchangeRate();
