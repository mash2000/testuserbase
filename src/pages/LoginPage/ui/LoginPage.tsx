import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, Layout, Space, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from './../../../features/auth/lib/useAuth';

const { Title, Text } = Typography;
const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const StyledCard = styled(Card)`
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  
  .ant-card-body {
    padding: 40px 32px;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 8px !important;
  color: #1890ff;
`;

const SubTitle = styled(Text)`
  display: block;
  text-align: center;
  color: #666;
  margin-bottom: 32px;
  font-size: 16px;
`;

const DemoCredentials = styled.div`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 6px;
  margin-top: 24px;
  text-align: center;
  
  p {
    margin-bottom: 4px;
    color: #666;
    
    strong {
      color: #1890ff;
    }
  }
`;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Проверяем авторизацию при загрузке страницы
  useEffect(() => {
    // Если пользователь уже авторизован - перекидываем на страницу пользователей
    if (isAuthenticated()) {
      navigate('/users', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: { login: string; password: string }) => {
    setErrorMessage('');
    
    login(values, {
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });
  };

  return (
    <StyledLayout>
      <Content style={{ display: 'flex', alignItems: 'center', padding: '24px' }}>
        <StyledCard>
          <LogoWrapper>
            <StyledTitle level={2}>User Base</StyledTitle>
            <SubTitle>Система управления пользователями</SubTitle>
          </LogoWrapper>

          <Title level={3} style={{ textAlign: 'center', marginBottom: 32, fontSize: '24px' }}>
            Авторизация
          </Title>

          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ remember: true }}
            size="large"
          >
            <Form.Item
              name="login"
              label="Логин"
              rules={[
                { required: true, message: 'Пожалуйста, введите логин!' },
                { min: 3, message: 'Логин должен быть не менее 3 символов' },
              ]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
                placeholder="Введите логин"
                disabled={isLoading}
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Пароль"
              rules={[
                { required: true, message: 'Пожалуйста, введите пароль!' },
                { min: 3, message: 'Пароль должен быть не менее 3 символов' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Введите пароль"
                disabled={isLoading}
                autoComplete="current-password"
              />
            </Form.Item>

            {/* Отображение ошибки блоком */}
            {errorMessage && (
              <Alert
                message="Ошибка авторизации"
                description={errorMessage}
                type="error"
                showIcon
                style={{ marginBottom: 24 }}
                closable
                onClose={() => setErrorMessage('')}
              />
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
                disabled={isLoading}
                size="large"
                style={{ height: '48px', fontSize: '16px' }}
              >
                {isLoading ? 'Вход в систему...' : 'Войти'}
              </Button>
            </Form.Item>

            <DemoCredentials>
              <Text strong>Данные для входа:</Text>
              <p><strong>Логин:</strong> admin</p>
              <p><strong>Пароль:</strong> admin</p>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                * Используйте эти данные для тестирования
              </Text>
            </DemoCredentials>
          </Form>
        </StyledCard>
      </Content>
    </StyledLayout>
  );
};

export default LoginPage;