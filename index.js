// Функції мутують вхідний масив і повертають результат виконання true або false.
// Масив може мати довільну вложеність

function addItem(target, parentItemId, newItem) {
  let result = false;

  function add(target, parentItemId, newItem) {
    if (Array.isArray(target)) {
      for (const element of target) {
        if (Array.isArray(element)) {
          add(element, parentItemId, newItem);
        }
        if (element.id === parentItemId) {
          if (element.hasOwnProperty("child")) {
            element.child.push(newItem);
            result = true;
            break;
          }
          element.child = [newItem];
          result = true;
          break;
        }
        add(element.child, parentItemId, newItem);
      }
    }
  }

  add(target, parentItemId, newItem);

  return result;
}
function deleteItem(target, itemId) {
  let obj = null;

  function del(target, itemId) {
    const idx = target.findIndex(({ id }) => id === itemId);
    if (idx >= 0) {
      const [removeObj] = target.splice(idx, 1);
      obj = removeObj;
      return obj;
    }
    for (const element of target) {
      if (Array.isArray(element)) {
        del(element, itemId);
      }
      if (element.hasOwnProperty("child")) {
        del(element.child, itemId);
        break;
      }
    }
  }

  del(target, itemId);

  return obj;
}
function changeItem(target, itemId, property, newValue) {
  let result = false;

  function change(target, itemId, property, newValue) {
    if (Array.isArray(target)) {
      for (const element of target) {
        if (Array.isArray(element)) {
          change(element, itemId, property, newValue);
        }
        if (element.id === itemId) {
          element[property] = newValue;
          result = true;
          break;
        }
        change(element.child, itemId, property, newValue);
      }
    }
  }

  change(target, itemId, property, newValue);

  return result;
}
function moveItem(target, itemId, newParentItemId) {
  let result = false;
  const obj = deleteItem(target, itemId);
  if (obj) {
    result = addItem(target, newParentItemId, obj);
  }
  return result;
}

let target = [
  [
    {
      id: "1",
      label: "label1",
    },
    {
      id: "2",
      label: "label2",
      child: [
        {
          id: "21",
          label: "label21",
        },
        {
          id: "22",
          label: "label22",
          child: [
            {
              id: "221",
              label: "label221",
            },
            {
              id: "222",
              label: "label222",
              child: [
                // .....
              ],
            },
          ],
        },
        {
          id: "23",
          label: "label23",
        },
      ],
    },
    {
      id: "3",
      label: "label3",
    },
  ],
  [
    {
      id: "41",
      label: "label1",
    },
    {
      id: "42",
      label: "label2",
    },
    {
      id: "43",
      label: "label3",
    },
  ],
];

let newItem = {
  id: "1500",
  label: "new item Label",
};

console.log(addItem(target, "222", newItem), target);
console.log(addItem(target, "23", newItem), target);
console.log(deleteItem(target, "221"), target);
console.log(deleteItem(target, "3"), target);
console.log(deleteItem(target, "42"), target);
console.log(changeItem(target, "22", "label", "new label!!!"), target);
console.log(moveItem(target, "222", "2"), target);
console.log(moveItem(target, "43", "222"), target);
console.log(moveItem(target, "43", "3"), target);
