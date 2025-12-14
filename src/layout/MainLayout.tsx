import React, { Children, useEffect, useState } from 'react';
import {
    FormOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TableOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';

const { Header, Sider, Content } = Layout;

// logo style
const app_login_style = {
    height: '64px',
    backgroundColor: 'rgb(0 21 41)',
    weight: '100%'
}

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menus = [
        {
            key: '/home',
            icon: <HomeOutlined />,
            label: 'Home',
        },
        {
            key: '/demo',
            icon: <TableOutlined />,
            label: 'Demo',
        },
        {
            key: '/form',
            icon: <FormOutlined />,
            label: 'Form',
            children: [
                { key: '/form/a-form', label: 'A-Form' },
                { key: '/form/base-form', label: 'Base-Form' }
            ]
        },
    ]



    // select menu
    const [selectKeys, setSelectKeys] = useState<string[]>([])
    const [openKeys, setOpenKeys] = useState<string[]>([])

    // select menu path by local current path
    const localtion = useLocation()
    const navigate = useNavigate()


    const clickMenuItem = (e: any) => {
        navigate(e.key)
    }

    const openSelect = (e: any) => {
        console.log(e.key);
        let parentPath = (path: string) => path.split('/').slice(0, -1).join('/')
        const parentMenu = menus.find(item => parentPath(e.key) === item.key || '/' + parentPath(e.key) === item.key) ?? e
        return parentMenu.key
    }

    const defaultSelectedKeys = [openSelect(menus.find(item => localtion.pathname === item.key || (item.children?.find(child => child.key === localtion.pathname))))]


    return (
        <Layout className='full-height'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div style={app_login_style} />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[localtion.pathname]}
                    defaultOpenKeys={defaultSelectedKeys}
                    items={menus}
                    onClick={clickMenuItem}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;