import axios from 'axios'

const BASE_API_URL = 'https://provinces.open-api.vn/api'

export const fetchProvinces = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/p/`)
    return response.data
  } catch (error) {
    console.error('Error fetching provinces:', error)
    throw error
  }
}

export const fetchDistricts = async (provinceCode) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/p/${provinceCode}`, { params: { depth: 2 } })
    return response.data.districts
  } catch (error) {
    console.error('Error fetching districts:', error)
    throw error
  }
}

export const fetchWards = async (districtCode) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/d/${districtCode}`, { params: { depth: 2 } })
    return response.data.wards
  } catch (error) {
    console.error('Error fetching wards:', error)
    throw error
  }
}

export const searchProvince = async (term) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/p/search/`, { params: { q: term } })
    return response.data
  } catch (error) {
    console.error('Error searching provinces:', error)
    throw error
  }
}

export const searchDistrict = async (term, provinceCode) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/d/search/`, { params: { q: term, p: provinceCode } })
    return response.data
  } catch (error) {
    console.error('Error searching districts:', error)
    throw error
  }
}

export const searchWard = async (term, districtCode) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/w/search/`, { params: { q: term, d: districtCode } })
    return response.data
  } catch (error) {
    console.error('Error searching wards:', error)
    throw error
  }
}
