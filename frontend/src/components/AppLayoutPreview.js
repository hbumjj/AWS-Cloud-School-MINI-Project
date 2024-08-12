'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Flashbar,
  Header,
  HelpPanel,
  Link,
  SideNavigation,
  SplitPanel,
  Button,
  TextContent,
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

const LOCALE = 'en';

function AppLayoutPreview() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/check-auth`, { withCredentials: true });
        setUser(response.data.username);
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <I18nProvider messages={[messages]} locale={LOCALE}>
      <AppLayout
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Home', href: '#' },
              { text: 'Path', href: '#' },
              { text: 'Path 3', href: '#' },
            ]}
          />
        }
        navigationOpen={true}
        navigation={
          <SideNavigation
            header={{
              href: '#',
              text: 'Service name',
            }}
            items={[{ type: 'link', text: `Page #1`, href: `#` }]}
          />
        }
        notifications={
          <Flashbar
            items={[
              {
                type: 'info',
                dismissible: true,
                content: 'This is an info flash message.',
                id: 'message_1',
              },
            ]}
          />
        }
        toolsOpen={true}
        tools={<HelpPanel header={<h2>Overview</h2>}>Help content</HelpPanel>}
        content={
          <ContentLayout
            header={
              <Header
                variant="h1"
                info={<Link variant="info">Info</Link>}
                actions={
                  <Button onClick={handleLogout} variant="primary">
                    Logout
                  </Button>
                }
              >
                Page header
              </Header>
            }
          >
            <TextContent>
              <h2>Welcome, {user || 'Guest'}!</h2>
              <Home />
            </TextContent>
            <SplitPanel header="Split panel header">Split panel content</SplitPanel>
          </ContentLayout>
        }
      />
    </I18nProvider>
  );
}

export default AppLayoutPreview;