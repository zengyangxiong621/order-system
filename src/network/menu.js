import { request } from '@/network/request';

export function getMenu() {
  return request({
    url: '/menu/menu_List',
    method: 'post',
  });
}

export function getDishType() {
  return request({
    url: '/menu/dish_type/list',
    method: 'get'
  });
}

export function getListByDish() {
  return request({
    url: '/menu/dish/list',
    method: 'post'
  });
}

export function createOrder(data) {
  return request({
    url: '/menu/order',
    method: 'post',
    data
  });
}

export function getOrder(id) {
  return request({
    url: `/menu/order/${id}`,
    method: 'get',
  });
}

export function getCommentList(data) {
  return request({
    url: `/menu/comment_list`,
    method: 'post',
    data
  });
}

export function saveOrder(id, data) {
  return request({
    url: `/menu/order/submit/${id}`,
    method: 'put',
    data
  });
}
