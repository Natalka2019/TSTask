interface ObjectShape {
  id: number;
  title: string;
  isPost: boolean;
};

function updateObjectInArray <T>(initialArray: T[], key:  keyof T, value: T[keyof T], patch: Partial<T>): T[] {
  return initialArray.map(obj => {
    if(obj[key] === value) {
      return {
        ...obj,
        ...patch
      }
    } else {
      return obj;
    }
  });
};

// CHECK

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

console.log(updateObjectInArray<ObjectShape>(mockArray, 'id', 3, {'isPost': true}));
console.log(updateObjectInArray<ObjectShape>(mockArray, 'title', 'B', {'id': 15}));
console.log(updateObjectInArray<ObjectShape>(mockArray, 'isPost', false, {'title': 'Hello'}));


