import request from '@/utils/request'

/**
 * 创建任务
 * @param {object} data { data_id, task_type, ... }
 * @returns Promise
 */
export function createTask(data) {
  return request({
    url: '/api/task/api/v1/', // 对应Vite proxy的 /api/task
    method: 'post',
    data
  })
}

/**
 * 获取任务列表
 * @param {object} params 查询参数 { skip, limit }
 * @returns Promise
 */
export function getTaskList(params) {
  return request({
    url: '/api/task/api/v1/',
    method: 'get',
    params
  })
}