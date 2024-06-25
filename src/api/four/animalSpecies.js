import request from '@/utils/request'

// 查询动物种类基础列表
export function listAnimalSpecies(query) {
  return request({
    url: '/four/animalSpecies/list',
    method: 'get',
    params: query
  })
}

// 查询动物种类基础详细
export function getAnimalSpecies(id) {
  return request({
    url: '/four/animalSpecies/' + id,
    method: 'get'
  })
}

// 新增动物种类基础
export function addAnimalSpecies(data) {
  return request({
    url: '/four/animalSpecies',
    method: 'post',
    data: data
  })
}

// 修改动物种类基础
export function updateAnimalSpecies(data) {
  return request({
    url: '/four/animalSpecies',
    method: 'put',
    data: data
  })
}

// 删除动物种类基础
export function delAnimalSpecies(id) {
  return request({
    url: '/four/animalSpecies/' + id,
    method: 'delete'
  })
}
