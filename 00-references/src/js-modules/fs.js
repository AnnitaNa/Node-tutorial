import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const fileName = "test.txt";
const folderName = "test-folder";
const folderPath = path.join(__dirname, folderName);
const filePath = path.join(folderPath, fileName);
const data = "writing/";

//* async -> have a callback function -> can handle error inside
//* sync -> have no call back function -> use try catch to handle error
//* fs.promises -> have no call back function -> use try catch to handle error

//* stream -> sends chunks of file (when it is too big)

//------------ 1) creates folder

async function createFolder() {
    //! async function with promises and try/catch
    try {
        await fs.promises
            .mkdir(path.join(__dirname, folderName))
            .then(console.log("folder created"));
    } catch (err) {
        throw err;
    }
}
createFolder();

//------------ 2) Creates and writes file

fs.promises.writeFile(filePath, data).then(console.log("file created"));

fs.promises.appendFile(filePath, data);

//------------- 3) Reads file
//needs to put enconding, or you will get back a lot of rubish

let readFileAsync = await fs.promises.readFile(filePath, "utf-8");
console.log(readFileAsync);

//* OR

const stream = fs.createReadStream(filePath, "utf-8"); //!-- stream
for await (let chunk of stream) {
    console.log(`I am reading chunk ${chunk}`);
}
// ------------- 4) delete file and folder

fs.promises.unlink(filePath).then(console.log("file deleted"));
fs.promises.rmdir(folderPath).then(console.log("folder deleted"));

//? you can add a flag to change behaviour
/*
    (fileName, data, {flag: #}, err =>{})
    where # =
    'a'  -> append data
    'w' -> subscribes data
*/
