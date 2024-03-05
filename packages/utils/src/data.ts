/**
 * @description 构建树
 * @param  {Array}  data
 * @param  {String} pid
 * @return {Array}
 */
export function buildTree(data: any[], id: string = 'id', pid: string = 'pid', children: string = 'children'): any[] {
  const tree: any[] = [];
  const keys = {};
  const temp = JSON.parse(JSON.stringify(data));
  temp.forEach((e: any) => (keys[e[id]] = e));
  temp.forEach((e: any) => {
    if (!e[pid]) {
      tree.push(e);
    }
    Object.keys(keys).forEach(k => {
      if (e[id] === keys[k][pid]) {
        if (e[children]) {
          e[children].push(keys[k]);
        } else {
          e[children] = [keys[k]];
        }
      }
    });
  });
  return tree;
}

/**
 * @description 将参数格式化为FormData格式
 */
export function fd(params: any = {}): FormData {
  const formData = new FormData();
  Object.keys(params).forEach(k => formData.append(k, params[k]));
  return formData;
}
