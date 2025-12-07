import { Form, Input, Button, Card, Typography, message, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);
    const { login, loading } = useLogin();

    const onFinish = async (values) => {
        try {
            await login(values);
        } catch (error) {
            message.error(error?.message || "Login failed!");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f4f6fc",
            }}
        >
            <Card style={{ width: 350, padding: "20px 10px" }}>
                <Title level={3} style={{ textAlign: "center", marginBottom: 4 }}>
                    DSA Mastery Tracker
                </Title>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        Master DSA, one problem at a time.
                    </Typography.Text>
                </div>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please enter your email!" }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter your password!" }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Login
                    </Button>
                </Form>

                <Space style={{ marginTop: 16, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography.Text type="secondary" style={{ fontSize: 14, marginBottom: 0 }}>
                        Don't have an account?
                    </Typography.Text>
                    <Button
                        type="link"
                        style={{ padding: 0, fontSize: 14 }}
                        onClick={() => { navigate('/signup'); }}
                    >
                        Register
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default Login;
