"use strict";
;
function updateObjectInArray(initialArray, key, value, patch) {
    const array = [...initialArray];
    const updatedArray = array.map(obj => {
        if (obj[key] === value) {
            return Object.assign(Object.assign({}, obj), patch);
        }
        else {
            return obj;
        }
    });
    return updatedArray;
}
;
const mockArray = [
    {
        id: 1,
        title: "A",
        isPost: false
    },
    {
        id: 2,
        title: "B",
        isPost: false
    },
    {
        id: 3,
        title: "C",
        isPost: false
    }
];
console.log(mockArray);
console.log(updateObjectInArray(mockArray, 'id', 3, { 'isPost': true }));
console.log(updateObjectInArray(mockArray, 'title', 'B', { 'id': 15 }));
console.log(updateObjectInArray(mockArray, 'isPost', false, { 'title': 'Hello' }));
