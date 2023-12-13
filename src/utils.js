import { message } from 'antd'
export const isJsonString = (data) => {
  try {
    JSON.parse(data)
  } catch (error) {
    return false
  }
  return true
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  }
}


export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(',', '.')
    return `${result} VND`
  } catch (error) {
    return null
  }
}


export const messageSuccess = (text) => {
  message.success({
    content: text,
    className: 'custom-class',
    style: {
      marginTop: '10vh'
    }
  })
}
export const messageError = (text) => {
  message.error({
    content: text,
    className: 'custom-class',
    style: {
      marginTop: '10vh'
    }
  })
}