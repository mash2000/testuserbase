import React from 'react';
import { Layout } from 'antd';
import { UserList } from './../../../widgets/UserList/ui/UserList';
import { useAuth } from './../../../features/auth/lib/useAuth';
import styled from 'styled-components';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: #f0f2f5;
`;

const StyledContent = styled(Content)`
  padding: 24px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
`;

const UsersPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <StyledLayout>
      <StyledContent>
        <UserList onLogout={logout} />
      </StyledContent>
    </StyledLayout>
  );
};

export default UsersPage;