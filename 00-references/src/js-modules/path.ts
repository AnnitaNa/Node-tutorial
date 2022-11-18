import path from 'path'
import { fileURLToPath } from "url";

// absolute path to the current file
const __filename = fileURLToPath(import.meta.url); //! __filename
console.log(__filename);

// parses a string path into as object
let pathObject = path.parse(__filename); //! parse(#)
console.log(pathObject);

// absolute path to the parent folder     // * ATTENTION: this gives the path of *working* directory -> not the directory the file is in!

const __dirname = path.dirname(__filename); //! __dirname
console.log(__dirname);
console.log(pathObject.dir);
console.log(path.resolve()); //! resolve()

// returns last part of a path
console.log(path.basename(__filename)); //! basename(#)
console.log(pathObject.base);

// returns file extension
console.log(path.extname(__filename)); //! extname(#)
console.log(pathObject.ext);

// formats a path object into a string
console.log(path.format(pathObject)); //! format(#)

// joins several segments into a path
console.log(path.join("node", "my-directory", "myFile.js")); //! join(#)

// prints the separator   /
console.log(path.sep); //! sep()
