import { Table } from 'antd'
import { useState } from 'react'


const TableComponent = (props) => {
  const { selectionType = 'checkbox', data: dataSource = [], columns = [], handleDeleteMany } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    }
  }
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys)
  }

  return (
    <div>


      {!!rowSelectedKeys.length && (
        <div style={{
          background: '#db1010',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px',
          cursor: 'pointer',
          marginRight: '70%',
          borderRadius: '5px'
        }}
        onClick={handleDeleteAll}
        >
                    Xóa các mục đã chọn
        </div>
      )}

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </div>
  )
}

export default TableComponent