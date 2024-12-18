import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const fileCreation = () => {
    rl.question("Enter your file name: ", (fileName) => {
        rl.question("Enter your content for your file: ", (fileContent) => {
            fs.writeFile(`${fileName}.txt`, fileContent, (err) => {
                if (err) {
                    console.error(`Error writing file: ${err.message}`);
                } else {
                    console.log(`File "${fileName}.txt" created successfully`);
                }
                rl.close();
            });
        });
    });
};

fileCreation();