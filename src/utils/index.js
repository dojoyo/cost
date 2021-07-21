/**
 *  全局方法，但是使用率不高，哪里使用哪里import 就好
 */

function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

// 判断是否为FormData
export function isFormData (v) {
  return Object.prototype.toString.call(v) === '[object FormData]'
}

function deepCopy(data) {
  if(!data || !(data instanceof Object) || (typeof data=="function")) {
    return data;
  }
  let constructor = data.constructor;
  let result = new constructor();
  for(let key in data){
    if(data.hasOwnProperty(key)){
      result[key] = deepCopy(data[key]);
    }
  }

  return result;
}

function formatKey(key, data) {
  switch (key){
    case 'objType':
      switch (data){
        case '':
          return {name:'',value:''}
      }
      break
  }

}

function hasRight(ar, resCode) {
  //return true//hardcode
  if (!ar) {
    return false;
  }
  let i = parseInt(resCode / 30);
  i = i < 0 ? 0 : i;
  resCode = resCode % 30;
  return ar.length > i && (ar[i] & 1 << resCode) != 0;
}

export default {
  deepCopy(data) {
    return deepCopy(data)
  },
  formatKey(key, data) {
    return formatKey(key, data)
  },
  parseTime(time, cFormat) {
    return parseTime(time, cFormat)
  },
  hasRight(ar, resCode) {
    return hasRight(ar, resCode)
  }
}
