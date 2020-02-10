import _ from 'lodash'
function toCamelCase(object) {
  let camelCaseObject = _.cloneDeep(object)
  if (_.isArray(camelCaseObject)) {
    return _.map(camelCaseObject, toCamelCase)
  }
  camelCaseObject = _.mapKeys(camelCaseObject, (value, key) => {
    return _.camelCase(key)
  })
  
  return _.mapValues(camelCaseObject, value => {
    if (_.isPlainObject(value)) {
      return toCamelCase(value)
    }
    if (_.isArray(value)) {
      return _.map(value, toCamelCase)
    }
    return value
  })
}
function toSnakeCase(object) {
  let snakeCaseObject = _.cloneDeep(object)
  if (_.isArray(snakeCaseObject)) {
    return _.map(snakeCaseObject, toSnakeCase)
  }
  snakeCaseObject = _.mapKeys(snakeCaseObject, (value, key) => {
    return _.snakeCase(key)
  })
  
  return _.mapValues(snakeCaseObject, value => {
    if (_.isPlainObject(value)) {
      return toSnakeCase(value)
    }
    if (_.isArray(value)) {
      return _.map(value, toSnakeCase)
    }
    return value
  })
}
export {toCamelCase, toSnakeCase}