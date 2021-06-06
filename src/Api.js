/*
 * @Date: 2021-05-27 17:31:50
 * @LastEditors: Fane Kung
 * @LastEditTime: 2021-05-28 01:21:31
 * @FilePath: /svelte-api-project/src/Api.js
 */
const api = (topic = 'react') => {
  const controller = new AbortController(); //使用AbortController來取消請求
  const promise = fetch(`https://api.github.com/search/repositories?q=topic:${topic}`, { signal: controller.signal }) //signal固定用法
  .then(res => res.json())
  return [promise, controller]
}

export default api;