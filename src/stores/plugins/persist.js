// src/stores/plugins/persist.js
export const piniaPersistPlugin = (context) => {
    const { store } = context
    const key = `pinia-${store.$id}`
    
    // 从localStorage恢复状态
    const storedState = localStorage.getItem(key)
    if (storedState) {
      store.$patch(JSON.parse(storedState))
    }
  
    // 订阅状态变化并保存
    store.$subscribe((mutation, state) => {
      localStorage.setItem(key, JSON.stringify(state))
    })
  }