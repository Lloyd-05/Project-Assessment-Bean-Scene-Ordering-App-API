const fs = require("fs");
console.log(" Writing into log ");

const localDate = new Date().toLocaleDateString('en-GB');
const localTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

const ApplicationLog = async () => {

    fs.writeFile(
        "log.txt",
        `The application run on ${localDate} at ${localTime}`,
        function (err) {
            if (err) {
                return console.error(err);
            }

            // If no error the remaining code executes
            console.log("Finished writing ");
            console.log("Reading the log entry that's written");

            // Reading the file
            fs.readFile("log.txt", function (err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log("Data read : " + data.toString());

            });
        }
    );
};
module.exports = ApplicationLog;