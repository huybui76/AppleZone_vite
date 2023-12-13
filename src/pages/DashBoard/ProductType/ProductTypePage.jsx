import { useState, useEffect } from 'react'
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons'
import { Button, Form, Modal } from 'antd'
import axiosClient from '../../../services/axiosClient'
import ModalComponent from '../../../components/ModalComponent/ModalComponent'
import { useQuery } from '@tanstack/react-query'
import InputComponent from '../../../components/InputComponent/InputComponent'
import { messageSuccess, messageError } from '../../../utils'
import './index.css'
import * as ProductTypeService from '../../../services/ProductTypeService'
import * as ProductService from '../../../services/ProductService'
import { useMutationHooks } from '../../../hooks/useMutationHooks'
import axios from 'axios'


const ProductType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProductTypeId, setEditingProductTypeId] = useState(null)
  const [form] = Form.useForm()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deletingCategoryId, setDeletingCategoryId] = useState(null)
  const [productCounts, setProductCounts] = useState({})
  const [image, setImage] = useState([])

  const mutation = useMutationHooks(async (data) => {
    const { name, image } = data
    if (editingProductTypeId) {
      const res = await ProductTypeService.updateProductType(
        editingProductTypeId,
        { name, image }
      )
      return res
    } else {
      const res = await ProductTypeService.createProductType({ name, image })
      return res
    }
  })

  const queryProductType = useQuery({
    queryKey: ['productType'],
    queryFn: ProductTypeService.getAllProductType
  })
  const { data: productTypes } = queryProductType

  useEffect(() => {
    const fetchProductCounts = async () => {
      if (productTypes && productTypes.data) {
        for (const productType of productTypes.data) {
          try {
            const count = await ProductService.getProductByType(
              productType._id
            )
            setProductCounts((prevCounts) => ({
              ...prevCounts,
              [productType._id]: count?.totalProducts
            }))
          } catch (error) {
            console.error('Error fetching product count:', error)
          }
        }
      }
    }
    fetchProductCounts()
  }, [productTypes?.data])

  const showDeleteConfirmation = (categoryId) => {
    setDeletingCategoryId(categoryId)
    setIsDeleteModalVisible(true)
  }

  const handleDeleteConfirmed = async () => {
    await axiosClient.delete(
      `productType/deleteProductType/${deletingCategoryId}`,
      { _id: deletingCategoryId }
    )

    queryProductType.refetch()
    setIsDeleteModalVisible(false)
    messageSuccess('Xoá danh mục thành công')
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditingProductTypeId(null)
    form.resetFields()
  }

  const onFinish = async (values) => {
    const isNameExists = productTypes?.data?.some(
      (item) =>
        item.name.toLowerCase() === values.name.toLowerCase() &&
                item._id !== editingProductTypeId
    )

    if (isNameExists) {
      messageError('Danh mục này đã tồn tại')
      return
    }

    try {
      const data = await mutation.mutateAsync(values)

      setImage([])
      if (
        data?.status === 'OK' &&
                data?.message === 'ProductType created successfully'
      ) {
        handleCancel()

        // Update the query to refetch data after mutation
        queryProductType.refetch()
        messageSuccess('Thêm danh mục thành công')
      }

      if (
        data?.status === 'OK' &&
                data?.message === 'UPDATE PRODUCT TYPE SUCCESS'
      ) {
        handleCancel()
        messageSuccess('Sửa danh mục thành công')
        // Update the query to refetch data after mutation
        queryProductType.refetch()
      }
    } catch (error) {
      console.error('Error creating ProductType:', error)
    }
  }


  const editCategory = (productTypeId) => {
    const selectedProductType = productTypes.data.find(
      (item) => item._id === productTypeId
    )
    if (selectedProductType) {
      setIsModalOpen(true)
      setEditingProductTypeId(productTypeId)
      form.setFieldsValue({
        name: selectedProductType.name,
        image: selectedProductType.image
      })
    }
  }
  const uploadPhoto = async (ev) => {
    try {
      const files = ev.target.files


      const CLOUD_NAME = 'dgcxf9zyh'
      const PRESET_NAME = 'demo-upload'
      const FOLDER_NAME = 'AppleZone'

      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('upload_preset', PRESET_NAME)
        formData.append('folder', FOLDER_NAME)
        formData.append('file', file)

        const response = await axios.post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        return response.data.secure_url
      })

      const urls = await Promise.all(uploadPromises)

      setImage(urls)
      form.setFieldsValue({
        image: urls
      })
    } catch (error) {
      console.error('Error uploading images:', error)
      // Thêm xử lý lỗi nếu cần
    }
  }


  return (
    <div className="dashboard_category">
      <div className="dashboard_category-add">
        <button onClick={() => setIsModalOpen(true)}>Thêm mới</button>
      </div>
      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Tên loại sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Tên loại sản phẩm!' }]}
          >
            <InputComponent />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: 'Chọn hình ảnh!' }]}
          ><div>

              <input onChange={(ev) => uploadPhoto(ev)} type="file" />
              <div className='pre_photos'>
                {image && (

                  image.map((photo, index) => (
                    <img style={{ height: '50px' }} key={index} src={photo} alt="" />
                  ))
                )}
              </div>
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
                            Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
      <h2 className="dashboard_category-title">Danh sách tất cả danh mục</h2>
      <div className="dashboard_category-show-product-type">
        {productTypes && productTypes.data ? (
          productTypes.data.map((productTypeData) => (
            <div
              key={productTypeData._id}
              className="dashboard_category-show--content"
            >
              <img src={productTypeData.image} alt="" />
              <h3>{productTypeData.name}</h3>
              <div className="button-container">
                <EditOutlined
                  className="edit_icon"
                  onClick={() => editCategory(productTypeData._id)}
                />
                <DeleteTwoTone
                  className="delete_icon"
                  onClick={() => showDeleteConfirmation(productTypeData._id)}
                />
              </div>
              <div className="dashboard_category-show--count">
                {productCounts[productTypeData._id] !== undefined ? (
                  <p>Số lượng: {productCounts[productTypeData._id]}</p>
                ) : (
                  <p>...</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>...</p>
        )}
      </div>
      {/* Delete Confirmation Modal */}
      <Modal
        title="Xác nhận xoá"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirmed}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Bạn có chắc chắn muốn xoá danh mục này?</p>
      </Modal>
    </div>
  )
}

export default ProductType
