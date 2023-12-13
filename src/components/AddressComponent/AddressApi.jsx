import { useState, useEffect } from 'react'
import { Select } from 'antd'
import {
  fetchProvinces,
  fetchDistricts,
  fetchWards,
  searchProvince,
  searchDistrict,
  searchWard
} from '../../services/AddressService'

const { Option } = Select

const AddressApi = ({ onAddressSelect } ) => {
  const [provinceSearch, setProvinceSearch] = useState('')
  const [provinces, setProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const [districtSearch, setDistrictSearch] = useState('')
  const [districts, setDistricts] = useState([])
  const [wardSearch, setWardSearch] = useState('')
  const [wards, setWards] = useState([])


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const initialProvinces = await fetchProvinces()
        setProvinces(initialProvinces)
      } catch (error) {
        // Handle error
      }
    }

    fetchInitialData()
  }, [])

  const handleProvinceSearch = async (value) => {
    setProvinceSearch(value)
    if (value.trim() !== '') {
      try {
        const searchResults = await searchProvince(value)
        setProvinces(searchResults)
      } catch (error) {
        // Handle error
      }
    }
  }

  const handleProvinceSelect = async (provinceCode) => {
    try {
      const selectedProvince = provinces.find((province) => province.name === provinceCode)

      setSelectedProvince(selectedProvince)

      const fetchedDistricts = await fetchDistricts(selectedProvince.code)
      setDistricts(fetchedDistricts)
    } catch (error) {
      // Handle error
    }
  }

  const handleDistrictSearch = async (value) => {
    setDistrictSearch(value)
    if (value.trim() !== '' && selectedProvince) {
      try {
        const searchResults = await searchDistrict(value, selectedProvince.code)
        setDistricts(searchResults)
      } catch (error) {
        // Handle error
      }
    }
  }

  const handleDistrictSelect = async (districtCode) => {
    try {
      const selectedDistrict = districts.find((district) => district.name === districtCode)
      setSelectedDistrict(selectedDistrict)

      const fetchedWards = await fetchWards(selectedDistrict.code)
      setWards(fetchedWards)
    } catch (error) {
      // Handle error
    }
  }

  const handleWardSearch = async (value) => {
    setWardSearch(value)
    if (value.trim() !== '' && selectedDistrict) {
      try {
        const searchResults = await searchWard(value, selectedDistrict.code)
        setWards(searchResults)
      } catch (error) {
        // Handle error
      }
    }
  }
  const handleWardSelect = (wardCode) => {
    // Assuming ward is the final level of address selection
    const selectedWard = wards.find((ward) => ward.name === wardCode)
    const selectedAddress = {
      province: selectedProvince?.name,
      district: selectedDistrict?.name,
      ward: selectedWard?.name
    }
    onAddressSelect(selectedAddress)
  }


  return (
    <div >
      <Select
        showSearch
        value={selectedProvince?.name}
        placeholder="Chọn tỉnh/Thành phố"
        defaultActiveFirstOption={false}
        suffixIcon={false}
        filterOption={false}
        onSearch={handleProvinceSearch}
        onChange={handleProvinceSelect}
        notFoundContent={null}
        style={{ marginBottom:'20px' }}
      >
        {provinces.map((province) => (
          <Option key={province.code} value={province.name}>
            {province.name}
          </Option>
        ))}
      </Select>

      <Select
        showSearch
        value={selectedDistrict?.name}
        placeholder="Chọn Quận/huyện"
        defaultActiveFirstOption={false}
        suffixIcon={false}
        filterOption={false}
        onSearch={handleDistrictSearch}
        onChange={handleDistrictSelect}
        notFoundContent={null}
        style={{ marginBottom:'20px' }}
      >
        {districts.map((district) => (
          <Option key={district.code} value={district.name}>
            {district.name}
          </Option>
        ))}
      </Select>

      <Select
        showSearch
        value={selectedWard?.name}
        placeholder="Chọn Xã/Phường/Ấp"
        defaultActiveFirstOption={false}
        suffixIcon={false}
        filterOption={false}
        onSearch={handleWardSearch}
        onChange={handleWardSelect}
        notFoundContent={null}
      >
        {wards.map((ward) => (
          <Option key={ward.code} value={ward.name}>
            {ward.name}
          </Option>
        ))}
      </Select>
    </div>
  )
}

export default AddressApi
