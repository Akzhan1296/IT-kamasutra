export const updateObjectinArray = (
  items,
  itemId,
  objectPropName,
  newObjProps
) => {
  return items.map((u) => {
    if (u[objectPropName] === itemId) {
      return { ...u, ...newObjProps };
      //из за того что иммутабельно взяли копию элемента массива
    }
    return u;
  });
};
