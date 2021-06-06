/*
 * @Date: 2021-05-28 00:40:56
 * @LastEditors: Fane Kung
 * @LastEditTime: 2021-05-28 01:21:22
 * @FilePath: /svelte-api-project/src/store.js
 */
import { writable, readable } from "svelte/store";
import api from "./Api";

export const selected = writable('react'); //這樣點擊按鈕就可以直接呼叫selected這個function

export const setSelected = (topic) => selected.set(topic);

export const repos = readable({ //readable 的第二個參數set是固定用法,當值改變之後會重新呼叫api
  status: 'idle', //idle | loading | error
  items: [],
  error: null,
}, set => {
  let currentController;  //記錄當下的controller
  let unsubscribe = selected.subscribe(val => { //當有呼叫subscribe時就要再設定一個unsubscribe
    if(currentController) {
      currentController.abort(); //放棄,所以下方currentController = null,
    }
    set({
      status: 'loading',
      items: [],
      error: null
    });

    const [response, controller] = api(val.toLowerCase());
    currentController = null;

    response.then(data => {
      set({
        status: 'loaded',
        items: data.items,
        error: null
      })
    }).catch(err => {
      if(err.name === 'AbortError') {
        set({
          status: 'loading',
          items: [],
          error: null, 
        })// 如果觸發了AbortError的話還是可以當作loading的狀態 ,也可以實作在api.js裡
      } else {
        set({
          status: 'error',
          items: [],
          error: err,
        })
      }
      
    })
  })

  return () => {
    unsubscribe();
  }
});