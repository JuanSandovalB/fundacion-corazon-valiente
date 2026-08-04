const bcrypt = require("bcryptjs");


const password = "CorazonValiente2026";


bcrypt.hash(password,10)
.then(hash=>{

console.log(hash);

});