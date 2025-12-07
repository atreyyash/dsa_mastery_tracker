import { Card, Progress } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedChapter } from "../utils/chapterReducer";

const ChapterCard = ({ chapter }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id, title, progress } = chapter;

    const handleCardClick = () => {
        dispatch(setSelectedChapter(chapter));
        navigate(`/chapters/${_id}`)
    }

    return (
        <Card
            hoverable
            style={{ width: 260 }}
            onClick={handleCardClick}
        >
            <h3 style={{ marginBottom: 10 }}>{title}</h3>

            <Progress
                percent={progress?.percent || 0}
                size="small"
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
            />

            <p style={{ marginTop: 8, fontSize: 12 }}>
                {progress?.completed || 0} / {progress?.total || 0} Problems Completed
            </p>
        </Card>
    );
};

export default ChapterCard;
