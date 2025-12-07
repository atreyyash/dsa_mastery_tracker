import { Row, Col, Typography, Spin, message } from "antd";
import ChapterCard from "../components/ChapterCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllChapters } from "../utils/chapterReducer";

const { Title } = Typography;

const Dashboard = () => {
    const dispatch = useDispatch();
    const { chapters, loading } = useSelector((state) => state.chapters);

    
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                if (!chapters.length) {
                    dispatch(fetchAllChapters());
                }
            } catch (err) {
                console.log('errDash: ', err);
                message.error("Failed to load chapters.");
            }
        };
        fetchChapters();
    }, [chapters.length, dispatch]);

    if (loading) {
        return <Spin size="large" />;
    }

    if (!loading && !chapters.length) {
        return <Title level={4}>No chapters available.</Title>;
    }

    return (
        <>
            <Title level={3}>All Chapters</Title>

            {loading ? (
                <Spin size="large" />
            ) : (
                <Row gutter={[16, 16]}>
                    {chapters?.map((chapter) => (
                        <Col key={chapter._id} xs={24} sm={12} md={8} lg={6}>
                            <ChapterCard chapter={chapter} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default Dashboard;
