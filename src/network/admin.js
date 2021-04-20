import { request } from '@/network/request';

export function userLogin(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  });
}

export function userRegister(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data
  });
}

