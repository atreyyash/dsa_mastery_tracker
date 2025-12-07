import { Table, Tag, Checkbox, message, Space, Button } from "antd";
import { useProblemStatus } from "../hooks/useProblemStatus";
import { LinkOutlined, YoutubeOutlined } from "@ant-design/icons";

const difficultyColors = {
    Easy: "green",
    Medium: "orange",
    Hard: "red",
};

const ProblemsTable = ({ problems, progress, refresh }) => {
    const { loading, updateStatus } = useProblemStatus();

    const handleStatusChange = async (problemId, checked) => {
        try {
            await updateStatus(problemId, checked);
            message.success("Progress updated");
            refresh();
        } catch (error) {
            message.error("Failed to update progress");
        }
    };

    const columns = [
        {
            title: "Status",
            key: "status",
            render: (_, record) => (
                <Checkbox
                    checked={progress?.some((p) => String(p.problemId) === String(record._id))}
                    disabled={loading}
                    onChange={(e) =>
                        handleStatusChange(record._id, e.target.checked)
                    }
                />
            ),
        },
        {
            title: "Problem",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Difficulty",
            dataIndex: "difficulty",
            key: "difficulty",
            render: (diff) => <Tag color={difficultyColors[diff]}>{diff}</Tag>,
        },
        {
            title: 'Links',
            dataIndex: 'links',
            key: 'links',
            render: (_, record) => (
                <Space>
                    {
                        record?.links?.leetcode && (
                            <Button 
                                type="link"
                                href={record?.links?.leetcode}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/icons-leetcode.png" alt="ltcode" />
                            </Button>
                        )
                    }
                    {
                        record?.links?.youtube && (
                            <Button 
                                type="link"
                                icon={<YoutubeOutlined  twoToneColor='red' />}
                                href={record?.links?.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        )
                    }
                    {
                        record?.links?.article && (
                            <Button 
                                type="link"
                                icon={<LinkOutlined/>}
                                href={record?.links?.article}
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        )
                    }
                </Space>
            ),
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={problems}
            rowKey="_id"
            pagination={false}
            loading={loading}
        />
    );
};

export default ProblemsTable;
