export function autoMapper<T>(data: any, type: new () => T): T {
  const entity = new type();
  for (const key in entity) {
    if (!data.hasOwnProperty(key)) continue;
    entity[key] = data[key];
  }
  return entity;
}

export function autoMapperToArray<T>(data: any, type: new () => T): T[] {
  const keys = Object.keys(data);
  const entity = new type();
  let result: any[] = [];
  for (let i = 0; i < keys.length; i++) {
    let template: any = {};
    let isObject: boolean = false;
    for (const key in entity) {
      var props = `[${i}].${key}`;
      if (!data.hasOwnProperty(props)) {
        template[key] = undefined;
      } else {
        isObject = true;
        template[key] = data[props];
      }
    }
    if (isObject) result.push(template);
  }
  return result;
}
