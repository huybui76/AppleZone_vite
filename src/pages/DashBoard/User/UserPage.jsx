import React, { useState } from 'react';
import { Button, Form, Modal, Select, Space } from 'antd';
import axiosClient from '../../../services/axiosClient';
import ModalComponent from '../../../components/ModalComponent/ModalComponent';
import { useQuery } from '@tanstack/react-query';
import InputComponent from '../../../components/InputComponent/InputComponent';
import TableComponent from '../../../components/TableComponent/TableComponent';
import './index.css';
import * as UserService from '../../../services/UserService';
import { useMutationHooks } from '../../../hooks/useMutationHooks';
import { messageSuccess, messageError } from "../../../utils";

const INITIAL_STATE = {
    name: '',
    email: '',
    isAdmin: false,
    phone: '',
    password: ''
};

const User = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [rowSelected, setRowSelected] = useState('');
    const [form] = Form.useForm();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [deletingUserId, setDeletingUserId] = useState(null);

    const alertMessages = {
        userCreated: 'Thêm người dùng thành công',
        userUpdated: 'Cập nhật thông tin người dùng thành công',
        userExists: 'Người dùng này đã tồn tại!',
        emailExists: 'Email này đã được sử dụng trước đó!',
        passLength: 'Mật khẩu phải dài hơn 6 kí tự!',
        userDeleted: 'Xoá thông tin người dùng thành công',
    };

    const mutation = useMutationHooks(async (data) => {
        const { name, email, isAdmin, phone, password } = data;

        if (editingUserId) {
            const res = await UserService.updateUser(editingUserId, {
                name,
                email,
                isAdmin,
                phone,
                password
            });
            return res;
        } else {
            const res = await UserService.signupUser({
                name,
                email,
                isAdmin,
                phone,
                password
            });
            return res;
        }
    });

    const queryUsers = useQuery({
        queryKey: ['users'],
        queryFn: UserService.getAllUser,
    });
    const { data: users } = queryUsers;


    const showDeleteConfirmation = (userId) => {
        setDeletingUserId(userId);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteConfirmed = async () => {
        await axiosClient.delete(`user/deleteUser/${deletingUserId}`, { _id: deletingUserId });

        queryUsers.refetch();
        setIsDeleteModalVisible(false);
        messageSuccess(alertMessages.userDeleted)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingUserId(null);
        form.resetFields();
    };

    const onFinish = async (values) => {
        const isEmailExists = users?.data?.some(
            (user) => user.email.toLowerCase() === values.email.toLowerCase() && user._id !== editingUserId
        );

        if (isEmailExists) {
            messageError(alertMessages.emailExists);
            return;
        }
        if (values.password.length < 6) {
            messageError(alertMessages.passLength);
            return;
        }

        try {
            const data = await mutation.mutateAsync(values);

            if (data?.status === 'OK' && data?.message === 'CREATE USER SUCCESS') {
                handleCancel();
                messageSuccess(alertMessages.userCreated);
                queryUsers.refetch();
            }

            if (data?.status === 'OK' && data?.message === 'UPDATE USER SUCCESS') {
                handleCancel();
                messageSuccess(alertMessages.userUpdated);
                queryUsers.refetch();
            }
        } catch (error) {
            console.error('Error creating User:', error);
        }
    };

    const editUser = (userId) => {
        const selectedUser = users.data.find((user) => user._id === userId);
        if (selectedUser) {
            setIsModalOpen(true);
            setEditingUserId(userId);
            form.setFieldsValue({
                name: selectedUser.name,
                email: selectedUser.email,
                isAdmin: selectedUser.isAdmin,
                phone: selectedUser.phone,
            });
        }
    };

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids } = data;
            const res = UserService.deleteManyUser(ids, token);
            return res;
        },
    );

    const handleDeleteManyUsers = (ids) => {
        Modal.confirm({
            title: 'Xác nhận xoá',
            content: 'Bạn có chắc chắn muốn xoá tất cả người dùng?',
            okText: 'Xoá',
            cancelText: 'Hủy',
            onOk: async () => {
                mutationDeletedMany.mutate({ ids: ids }, {
                    onSettled: () => {
                        queryUsers.refetch();
                    },
                });
            },
        });
    };

    const handleChangeSelect = (value) => {
        form.setFieldsValue({
            isAdmin: value,
        });
        setCurrentPage(1);
    };

    const isLoadingUsers = queryUsers.isLoading;

    const dataTable = users?.data?.map((user) => ({
        key: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        phone: user.phone,
        password: user.password,
    })).reverse();

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Quản trị viên',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (isAdmin) => (isAdmin ? 'Có' : 'Không'),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },

        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space className="action-icons-container-user" size="middle">
                    <a onClick={() => editUser(record._id)}>Chỉnh sửa</a>
                    <a onClick={() => showDeleteConfirmation(record._id)}>Xoá</a>
                </Space>
            ),
        },
    ];

    return (
        <div className="dashboard_category">
            <div className="dashboard_category-add">
                <button onClick={() => setIsModalOpen(true)}>Thêm mới</button>
            </div>
            <ModalComponent forceRender title="Tạo người dùng" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={onFinish}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Tên người dùng"
                        name="name"
                        rules={[{ required: true, message: 'Tên người dùng!' }]}
                    >
                        <InputComponent />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Nhập địa chỉ email!' }]}
                    >
                        <InputComponent type="email" />
                    </Form.Item>
                    <Form.Item
                        label="Quản trị viên"
                        name="isAdmin"
                        rules={[{ required: true, message: 'Vui lòng chọn quyền admin!' }]}
                    >
                        <Select placeholder="Bạn có phải là quản trị viên" onChange={handleChangeSelect}>
                            <Select.Option value={true}>Có</Select.Option>
                            <Select.Option value={false}>Không</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Nhập số điện thoại!' }]}
                    >
                        <InputComponent type="tel" maxLength={12} minLength={9} />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
                    >
                        <InputComponent type="password" />
                    </Form.Item>

                    {/* Add other form items for additional user-specific fields as needed */}

                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </ModalComponent>
            <h2 className="dashboard_category-title">Danh sách tất cả người dùng</h2>
            <div className="dashboard_category-show-user">
                {users && users.data ? (
                    <div style={{ marginTop: '20px' }}>
                        <TableComponent
                            handleDeleteMany={handleDeleteManyUsers}
                            columns={columns}
                            isLoading={isLoadingUsers}
                            data={dataTable}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (event) => {
                                        setRowSelected(record._id);
                                    },
                                };
                            }}
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                onChange: (page, pageSize) => {
                                    setCurrentPage(page);
                                },
                            }}
                        />
                    </div>
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
                <p>Bạn có chắc chắn muốn xoá người dùng này?</p>
            </Modal>
        </div>
    );
};

export default User;
