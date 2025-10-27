import request from '@/utils/request'

/**
 * 上传文件
 * @param {FormData} formData 包含文件的表单数据
 * @returns Promise
 */
export function uploadFile(formData) {
  return request({
    url: '/api/data/api/v1/upload', // 对应Vite proxy的 /api/data
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 获取数据列表
 * @param {object} params 查询参数 { skip, limit }
 * @returns Promise
 */
export function getDataList(params) {
  return request({
    url: '/api/data/api/v1/',
    method: 'get',
    params
  })
}