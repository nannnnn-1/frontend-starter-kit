import request from '@/utils/request'

/**
 * 登录API
 * @param {object} data { username, password }
 * @returns Promise
 */
export function login(data) {
  // 注意：FastAPI的OAuth2PasswordRequestForm需要x-www-form-urlencoded格式
  const formData = new URLSearchParams()
  formData.append('username', data.username)
  formData.append('password', data.password)
  
  return request({
    url: '/api/user/api/v1/token', // 对应Vite proxy的 /api/user
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 注册API
 * @param {object} data { email, password, tenant_name, ... }
 * @returns Promise
 */
export function register(data) {
  return request({
    url: '/api/user/api/v1/register',
    method: 'post',
    data
  })
}

// 未来可以添加获取用户信息的API
// export function getUserInfo() {
//   return request({
//     url: '/api/user/api/v1/users/me',
//     method: 'get'
//   })
// }