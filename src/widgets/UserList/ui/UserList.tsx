import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, Avatar, Typography, Row, Col, Button, Spin, Empty, Alert } from 'antd';
import { PlusOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { userApi } from './../../../features/userManagement/api/userApi';
import { User } from './../../../entities/model/types';
import { formatDate } from './../../../entities/user/lib/formatDate';
import { CreateUserModal } from './../../../features/userManagement/ui/CreateUserModal';
import { EditUserModal } from './../../../features/userManagement/ui/EditUserModal';
import styled from 'styled-components';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 12px;
  overflow: hidden;
  
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }

  .ant-card-meta-avatar {
    padding-right: 16px;
  }

  .ant-card-meta-title {
    font-size: 18px;
    margin-bottom: 4px !important;
    color: #1a1a1a;
  }

  .ant-card-meta-description {
    color: #666;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px 32px;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border-radius: 16px;
  color: white;
  
  h2 {
    color: white !important;
    margin-bottom: 0 !important;
  }
`;

const StyledAvatar = styled(Avatar)`
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const EmptyState = styled(Empty)`
  padding: 48px;
  background: white;
  border-radius: 16px;
`;

interface UserListProps {
  onLogout: () => void;
}

export const UserList: React.FC<UserListProps> = ({ onLogout }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Запрос пользователей с TanStack Query
  const { 
    data: users, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  });

  const handleUserClick = (user: User) => {
    setEditingUser(user);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <Spin size="large" tip="Загрузка пользователей..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Ошибка загрузки"
        description="Не удалось загрузить список пользователей. Пожалуйста, попробуйте позже."
        type="error"
        showIcon
        action={
          <Button size="small" onClick={() => refetch()}>
            Повторить
          </Button>
        }
      />
    );
  }

  return (
    <>
      <Header>
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Пользователи
        </Title>
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalOpen(true)}
            style={{ 
              marginRight: 16,
              background: 'white',
              color: '#1890ff',
              borderColor: 'white'
            }}
            size="large"
          >
            Создать пользователя
          </Button>
          <Button 
            icon={<LogoutOutlined />} 
            onClick={onLogout}
            style={{ 
              background: 'rgba(255,255,255,0.2)',
              borderColor: 'white',
              color: 'white'
            }}
            size="large"
          >
            Выход
          </Button>
        </div>
      </Header>

      {!users || users.length === 0 ? (
        <EmptyState
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description="Пользователи не найдены"
        >
          <Button 
            type="primary" 
            onClick={() => setIsCreateModalOpen(true)}
            icon={<PlusOutlined />}
          >
            Создать первого пользователя
          </Button>
        </EmptyState>
      ) : (
        <Row gutter={[24, 24]}>
          {users.map((user) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={user.id}>
              <StyledCard 
                onClick={() => handleUserClick(user)}
                bodyStyle={{ padding: '24px' }}
              >
                <Card.Meta
                  avatar={
                    <StyledAvatar
                      src={user.avatar}
                      size={64}
                      icon={!user.avatar && <UserOutlined />}
                    />
                  }
                  title={user.name}
                  description={
                    <>
                      <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                        Зарегистрирован {formatDate(user.createdAt)}
                      </Text>
                      {user.email && (
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {user.email}
                        </Text>
                      )}
                    </>
                  }
                />
              </StyledCard>
            </Col>
          ))}
        </Row>
      )}

      <CreateUserModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {editingUser && (
        <EditUserModal
          user={editingUser}
          open={!!editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </>
  );
};