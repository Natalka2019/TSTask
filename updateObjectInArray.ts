
interface ObjectShape {
  id: number;
  title: string;
  isPost: boolean;
};

function updateObjectInArray <T extends object, K extends keyof T>(initialArray: T[], key: K, value: T[K], patch: Partial<T>): T[] {
  const array = [...initialArray];
  const updatedArray = array.map(obj => {
    if(obj[key] === value) {
      return {
        ...obj,
        ...patch
      }
    } else {
      return obj;
    }
  });

  return updatedArray;
};

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

console.log(updateObjectInArray<ObjectShape, 'id'>(mockArray, 'id', 3, {'isPost': true}));
console.log(updateObjectInArray<ObjectShape, 'title'>(mockArray, 'title', 'B', {'id': 15}));
console.log(updateObjectInArray<ObjectShape, 'isPost'>(mockArray, 'isPost', false, {'title': 'Hello'}));


