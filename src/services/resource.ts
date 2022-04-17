/*
 * @author: SumO
 * @create: 2022-04-13 19:34 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-04-17 20:27 PM
 * @desc:
 */
/**
 * 资源相关请求模块
 */

import request from '@/utils/request'

export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getAllResources = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

export const allocateRoleResources = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getRoleResources = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

export const deleteResource = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}
export const getResource = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/resource/${id}`
  })
}
export const updateResource = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}
