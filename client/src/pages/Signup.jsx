import { Form, Input, Button, Card, Typography, message, Space } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { emailRegex, passwordRegex } from "../utils/constants";

const { Title } = Typography;

const Signup = () => {
    const navigate = useNavigate();
    const { signup, loading } = useSignup();

    const onFinish = async (values) => {
        try {
            const { confirmpassword, ...payload } = values;
            await signup(payload);
        } catch (error) {
            message.error(error?.message || "Signup failed!");
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
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your email!" }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            {
                                pattern: emailRegex,
                                message: "Please enter a valid email address!",
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Please enter your password!" },
                            {
                                pattern: passwordRegex,
                                message: "Password must have at least 8 characters, one uppercase letter, and one special character!",
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmpassword"
                        rules={[
                            { required: true, message: "Please confirm your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Register
                    </Button>
                </Form>

                <Space style={{ marginTop: 16, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography.Text type="secondary" style={{ fontSize: 14, marginBottom: 0 }}>
                        Already have an account?
                    </Typography.Text>
                    <Button
                        type="link"
                        style={{ padding: 0, fontSize: 14 }}
                        onClick={() => { navigate('/login'); }}
                    >
                        Login
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default Signup;
