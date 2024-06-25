import request from '@/utils/request'

// 查询植物种类基础列表
export function listPlantSpecies(query) {
  return request({
    url: '/four/plantSpecies/list',
    method: 'get',
    params: query
  })
}

// 查询植物种类基础详细
export function getPlantSpecies(id) {
  return request({
    url: '/four/plantSpecies/' + id,
    method: 'get'
  })
}

// 新增植物种类基础
export function addPlantSpecies(data) {
  return request({
    url: '/four/plantSpecies',
    method: 'post',
    data: data
  })
}

// 修改植物种类基础
export function updatePlantSpecies(data) {
  return request({
    url: '/four/plantSpecies',
    method: 'put',
    data: data
  })
}

// 删除植物种类基础
export function delPlantSpecies(id) {
  return request({
    url: '/four/plantSpecies/' + id,
    method: 'delete'
  })
}
