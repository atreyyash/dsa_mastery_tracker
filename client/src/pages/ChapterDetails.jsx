import { Typography, Progress, Spin, message } from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ProblemsTable from "../components/ProblemTable";
import { useProblems } from "../hooks/useProblems";
import { useChapter } from "../hooks/useChapter";
import { useProgress } from "../hooks/useProgress";

const { Title, Text } = Typography;

const ChapterDetails = () => {
    const { chapterId } = useParams();
    const { loading: chLoading, fetchChapter, chapter} = useChapter();
    const { loading: prLoading, fetchProblems, problems: { count, problems } } = useProblems();
    const { loading: _, fetchProgress, progress } = useProgress();
    const loading = chLoading || prLoading;

    const fetchDetails = async () => {
        try {
            await Promise.all([
                fetchChapter(chapterId),
                fetchProblems(chapterId),
                fetchProgress(),
            ]);
        } catch (error) {
            // console.log(error);
            message.error("Failed to load chapter details");
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [chapterId]);

    if (loading || !chapter) return <Spin size="large" />;

    if (!loading && problems.count === 0) {
        return <Title level={4}>No problems available for this chapter.</Title>;
    }

    const completedCount = problems.filter((p) => p.completed).length;
    const total = count;
    const percent = Math.round((completedCount / total) * 100);

    return (
        <>
            <Title level={3}>{chapter.title}</Title>
            <Text>{chapter.description}</Text>
            <br/><br/>
            <Text>Progress: {completedCount} / {total}</Text>

            <Progress percent={percent} size="small" />

            <div style={{ marginTop: 20 }}>
                <ProblemsTable problems={problems} progress={progress} refresh={fetchDetails} />
            </div>
        </>
    );
};

export default ChapterDetails;
