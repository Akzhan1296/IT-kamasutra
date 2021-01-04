export const updateObjectinArray = (
  items: any,
  itemId: any,
  objectPropName: any,
  newObjProps: any
) => {
  return items.map((u: any) => {
    if (u[objectPropName] === itemId) {
      return { ...u, ...newObjProps };
      //из за того что иммутабельно взяли копию элемента массива
    }
    return u;
  });
};
