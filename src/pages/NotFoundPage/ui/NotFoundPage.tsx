import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledResult = styled(Result)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9eef5 100%);

  .ant-result-title {
    color: #1a1a1a;
    font-weight: 600;
  }

  .ant-result-subtitle {
    color: #4a4a4a;
  }
`;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    // Проверяем, авторизован ли пользователь
    const isAuthenticated = localStorage.getItem('auth_token');
    
    if (isAuthenticated) {
      navigate('/users', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  return (
    <StyledResult
      status="404"
      title="404"
      subTitle="Извините, страница, которую вы посетили, не существует."
      extra={
        <Button 
          type="primary" 
          onClick={handleBackHome}
          size="large"
          style={{ 
            background: '#1890ff',
            borderColor: '#1890ff',
            boxShadow: '0 2px 0 rgba(0,0,0,0.045)'
          }}
        >
          {localStorage.getItem('auth_token') ? 'На главную' : 'Войти в систему'}
        </Button>
      }
    />
  );
};

export default NotFoundPage;