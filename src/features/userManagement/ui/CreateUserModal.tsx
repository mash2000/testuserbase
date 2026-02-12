import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useUserMutations } from './../lib/useUserMutations';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  avatar: string;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const { createUser, isCreating } = useUserMutations();

  const handleSubmit = (values: FormValues) => {
    createUser(values, {
      onSuccess: () => {
        form.resetFields();
        onClose();
      },
    });
  };

  const handleCancel = () => {
    if (!isCreating) {
      form.resetFields();
      onClose();
    }
  };

  return (
    <Modal
      title="Создание пользователя"
      open={open}
      onCancel={handleCancel}
      footer={null}
      closable={!isCreating}
      maskClosable={!isCreating}
      width={520}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={isCreating}
        initialValues={{
          name: '',
          avatar: '',
        }}
      >
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
            onClick={handleCancel} 
            disabled={isCreating} 
            style={{ marginRight: 8 }}
            size="large"
          >
            Отмена
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={isCreating}
            size="large"
          >
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};