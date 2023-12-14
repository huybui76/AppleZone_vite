import React from 'react'
import { UserOutlined, AppstoreOutlined, FileAddOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import * as ProductService from '../../../services/ProductService'
import * as UserService from '../../../services/UserService'
import * as ProductTypeService from '../../../services/ProductTypeService'
import * as OrderService from '../../../services/OrderService'

const DashboardSummary = () => {
  const queryUserCount = useQuery({
    queryKey: ['userCount'],
    queryFn: UserService.getAllUser
  })

  const queryProductCount = useQuery({
    queryKey: ['productCount'],
    queryFn: ProductService.getAllProduct
  })

  const queryProductTypeCount = useQuery({
    queryKey: ['productTypeCount'],
    queryFn: ProductTypeService.getAllProductType
  })
  const queryOrderCount = useQuery({
    queryKey: ['orderCount'],
    queryFn: OrderService.getAllOrder
  })

  const userCount = queryUserCount.data?.data?.length || 0
  const productCount = queryProductCount.data?.data?.length || 0
  const productTypeCount = queryProductTypeCount.data?.data?.length || 0
  const orderCount = queryOrderCount.data?.data?.length || 0


  const summaryItems = [
    // { key: 'dashboardSummary', icon: <AppstoreOutlined />, name: 'Tổng quan', count: '' },
    { key: 'productTypes', icon: <FileAddOutlined />, name: 'Loại sản phẩm', count: productTypeCount },
    { key: 'products', icon: <AppstoreOutlined />, name: 'Sản phẩm', count: productCount },
    { key: 'users', icon: <UserOutlined />, name: 'Người dùng', count: userCount },
    { key: 'orders', icon: <ShoppingCartOutlined />, name: 'Đơn hàng', count: orderCount }
  ]

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', padding: '20px', flexDirection: 'row' }}>
      {summaryItems.map((item) => (
        <Card key={item.key} style={{ width: '100%', maxWidth: '300px', backgroundColor: '#e3d9d9', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ fontSize: '28px' }}>{item.icon}</span>
            <span style={{ fontSize: '28px', color: '#1e6bc3' }}>{item.name}</span>
          </div>
          <p style={{ justifyContent: 'center' }}>
            {item.count && <span style={{ fontSize: '68px', color: '#ec510f' }}>{item.count}</span>}
          </p>
        </Card>
      ))}
    </div>
  )
}

export default DashboardSummary
