import { Layout, Menu, Button, Alert } from "antd";
import {
    AppstoreOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChapters, setSelectedChapter } from "../utils/chapterReducer";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
    const dispatch = useDispatch();
    const { chapters, error, selectedChapter } = useSelector((state) => state.chapters);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchChapters = async () => {
            dispatch(fetchAllChapters());
        };
        fetchChapters();
    }, [dispatch]);

    const handleMenuChange = (e) => {
        const selected = chapters.find(ch => ch._id === e.key);
        dispatch(setSelectedChapter(selected));
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const items = location.pathname === '/dashboard' ? [
        {
            key: "1",
            icon: <AppstoreOutlined />,
            label: "Dashboard",
            onClick: () => navigate("/"),
        },
    ] : [
            {
                key: "1",
                icon: <AppstoreOutlined />,
                label: "Dashboard",
                onClick: () => navigate("/"),
            },
            chapters?.map((chapter) => ({
            key: chapter._id,
            icon: <AppstoreOutlined />,
            label: chapter.title,
            onClick: () => navigate(`/chapters/${chapter._id}`),
            }))
    ].flat();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sider collapsible>
                <div
                    style={{
                        height: 60,
                        margin: 16,
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 18,
                        textAlign: "center",
                    }}
                >
                    DSA Mastery Sheet
                </div>

                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    selectedKeys={selectedChapter ? [selectedChapter._id] : ["1"]}
                    onClick={handleMenuChange}
                    items={items}
                />
            </Sider>

            {/* Content Area */}
            <Layout>
                <Header
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        background: "#fff",
                        paddingInline: 20,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    }}
                >
                    <Button
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        danger
                        type="text"
                    >
                        Logout
                    </Button>
                </Header>

                <Content style={{ padding: 24, background: "#f5f6fa" }}>
                    <Outlet/>
                </Content>
            </Layout>

            {error && (
                <Alert
                    title="Error"
                    description={error}
                    type="error"
                    style={{ margin: 16 }}
                    closable
                />
            )}
        </Layout>
    );
};

export default DashboardLayout;
