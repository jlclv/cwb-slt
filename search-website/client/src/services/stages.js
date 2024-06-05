import axios from "axios";

const getStages = async () => {
    const request = axios.get(`/api/stages`);
    const result = await request;
    return result.data;
};

const getStageNumberFromRange = async (stageRange) => {
    let stageNumberRange = stageRange.toLowerCase();
    const stagesResult = await getStages();
    const stages = Object.fromEntries(
        Object.entries(stagesResult).map(([k, v]) => [`${k}`.toLowerCase(), v])
    );

    Object.keys(stages)
        .sort((a, b) => b.length - a.length)
        .forEach((stage) => {
            stageNumberRange = stageNumberRange.replace(
                stage.toLowerCase(),
                stages[stage]
            );
        });
    let stageArr = stageNumberRange.split("-");
    if (
        Number(stageArr[0]) !== parseInt(stageArr[0]) ||
        Number(stageArr[1]) !== parseInt(stageArr[1])
    )
        return [0, Object.keys(stages).length - 1];
    return stageArr;
};

const exportedObject = { getStages, getStageNumberFromRange };

export default exportedObject;
