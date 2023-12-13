import { useState } from 'react'
import './Navbar.css'
import { ShoppingOutlined } from '@ant-design/icons'
import search_icon from '../../assets/search-interface-symbol.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge } from 'antd'


const Navbar = () => {
  const order = useSelector((state) => state.order)
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  const handleCartIconClick = () => {
    navigate('/cart')
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Chuyển hướng đến trang FindPage và truyền giá trị của input
    navigate(`/find/${searchValue}`)
    // Clear the search value
    setSearchValue('')
  }
  const amounts = order?.orderItems.map((order) => order.amount)
  const totalAmount = amounts.reduce((acc, current) => acc + current, 0)

  return (
    <div className="navbar-container">
      <div className="navbar">
        <NavLink className="nav-appName" to="/">
          Apple Zone
        </NavLink>
        <div className="nav-cate">


          <NavLink
            to="/products-type/6564aee73adaf4c11a499a6b"

            className="menu-component"
            style={{ textDecoration: 'none' }}
          >
            <div className="menu-item-name">iPhone</div>
          </NavLink>
          <NavLink
            to="/products-type/6564aefd3adaf4c11a499a72"

            className="menu-component"
            style={{ textDecoration: 'none' }}
          >
            <div className="menu-item-name">iPad</div>
          </NavLink>
          <NavLink
            to="/products-type/6564af133adaf4c11a499a7c"

            className="menu-component"
            style={{ textDecoration: 'none' }}
          >
            <div className="menu-item-name">Mac</div>
          </NavLink>
          <NavLink
            to="/products-type/6564af273adaf4c11a499a89"

            className="menu-component"
            style={{ textDecoration: 'none' }}
          >
            <div className="menu-item-name">Tai nghe</div>
          </NavLink>
          <NavLink
            to="/products-type/6564af3f3adaf4c11a499a99"

            className="menu-component"
            style={{ textDecoration: 'none' }}
          >
            <div className="menu-item-name">Phụ kiện</div>
          </NavLink>
          <NavLink
            to="/products-type/6564af583adaf4c11a499aac"

            className="menu-component"
            style={{ textDecoration: 'none' }}
          >
            <div className="menu-item-name">Watch</div>
          </NavLink>
        </div>
        <div className="nav-input">
          <form onSubmit={handleSearchSubmit} className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="input-box"
              value={searchValue}
              onChange={handleInputChange}
            />
            <button type="submit">
              <img src={search_icon} alt="search icon" className="search-icon" />
            </button>
          </form>
        </div>
        <div className="nav-icon">
          <div className="shopping-icon">
            <div onClick={handleCartIconClick} style={{ cursor: 'pointer' }}>
              <Badge count={totalAmount} size="small">
                <ShoppingOutlined style={{ fontSize: '22px', color: '#000000' }} />
              </Badge>
            </div>
          </div>
        </div>

        {/* <div className="user-icon">
            <img src={user_icon} alt="" className='icon'  onClick={handleDropdownOpen}/>
          </div> */}
        {/* {dropdownOpen && (
            <div className="dropdown-menu">
              <NavLink to="/SignIn" >Đăng nhập</NavLink>
              <NavLink to="/SignUp">Đăng ký</NavLink>
            </div>
          )} */}
      </div>
    </div>

  )
}

export default Navbar
