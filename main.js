import {sumToString} from "./src/mild/mild_1"
  
console.log("Sum to String: " + sumToString(4,7));

import {removeKeyNonDestructive} from "./src/mild/mild_2"

import {removeKeys} from "./src/mild/mild_2"

let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};

obj = removeKeys(obj, ['password', 'age'])

console.log(obj);