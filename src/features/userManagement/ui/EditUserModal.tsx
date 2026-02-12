import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { UserOutlined, LinkOutlined, IdcardOutlined } from '@ant-design/icons';
import { User } from './../../../entities/model/types';
import { useUserMutations } from '../lib/useUserMutations';

interface EditUserModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  avatar: string;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, open, onClose }) => {
  const [form] = Form.useForm();
  const { updateUser, deleteUser, isUpdating, isDeleting } = useUserMutations();

  useEffect(() => {
    if (user && open) {
      form.setFieldsValue({
        name: user.name,
        avatar: user.avatar,
      });
    }
  }, [user, open, form]);

  const handleSubmit = (values: FormValues) => {
    if (user) {
      updateUser(
        { id: user.id, ...values },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  const handleDelete = () => {
    if (user) {
      Modal.confirm({
        title: 'Удаление пользователя',
        content: `Вы уверены, что хотите удалить пользователя ${user.name}?`,
        okText: 'Удалить',
        okType: 'danger',
        cancelText: 'Отмена',
        onOk: () => {
          deleteUser(user.id, {
            onSuccess: () => {
              onClose();
            },
          });
        },
      });
    }
  };

  const handleCancel = () => {
    if (!isUpdating && !isDeleting) {
      form.resetFields();
      onClose();
    }
  };

  const isLoading = isUpdating || isDeleting;

  return (
    <Modal
      title="Редактирование пользователя"
      open={open}
      onCancel={handleCancel}
      footer={null}
      closable={!isLoading}
      maskClosable={!isLoading}
      width={520}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={isLoading}
      >
        <Form.Item 
          label="ID"
          tooltip="ID пользователя (не редактируется)"
        >
          <Input 
            prefix={<IdcardOutlined />} 
            value={user?.id} 
            disabled 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="name"
          label="Имя"
          rules={[
            { required: true, message: 'Введите имя пользователя' },
            { min: 2, message: 'Имя должно быть не менее 2 символов' },
            { max: 50, message: 'Имя должно быть не более 50 символов' },
          ]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Введите имя" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="Ссылка на аватарку"
          rules={[
            { required: true, message: 'Введите ссылку на аватар' },
            { type: 'url', message: 'Введите корректную ссылку' },
            { pattern: /^https?:\/\//i, message: 'Ссылка должна начинаться с http:// или https://' }
          ]}
        >
          <Input 
            prefix={<LinkOutlined />} 
            placeholder="https://example.com/avatar.jpg" 
            size="large"
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right', marginBottom: 0, marginTop: 24 }}>
          <Button
            type="default"
            danger
            onClick={handleDelete}
            loading={isDeleting}
            disabled={isUpdating}
            style={{ marginRight: 8 }}
            size="large"
          >
            Удалить
          </Button>
          <Button 
            onClick={handleCancel} 
            disabled={isLoading} 
            style={{ marginRight: 8 }}
            size="large"
          >
            Отмена
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={isUpdating}
            size="large"
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};