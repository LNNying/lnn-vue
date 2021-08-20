export const getDataByPath = function (data, path) {
  let pathList = path.split('.');
  let res = null;
  let pop;
  while (pop = pathList.shift()) {
      res = data[pop];
    }
  return res;
};
