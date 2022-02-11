import Guest from "./src/models/Guest.js";

const listOfIds = [1,2,4,5,7,8,9];

const string = Guest.getByList(listOfIds);

console.log(string);