import axios from "axios";

const generateFilter = (regions, countries, StartStage = "", EndStage = "") => {
    const regionsStr = regions
        .split(",")
        .map((region) => region.trim())
        .join();
    const countriesFilter = Boolean(countries[0])
        ? `and search.in(Location, '${regionsStr},${countries.join(",")}', ',')`
        : ``;
    const stageNumberFilter = `StageNumber ge ${Number(
        StartStage
    )} and StageNumber le ${Number(EndStage)}`;
    return `${stageNumberFilter} ${countriesFilter}`;
};

const getStartups = async (query, top) => {
    const request = axios.get(
        `/api/startups?query=${query}&includeAll=True&top=${top}`
    );
    const result = await request;
    return result.data;
};

const matchStartups = async (query, top, filter) => {
    const request = axios.get(
        `/api/startups?query=${query}&top=${top}&filter=${filter}`
    );
    const result = await request;
    return result.data;
};

const addStartup = async (startupObject) => {
    const request = axios.post(`/api/index`, startupObject);
    const result = await request;
    return result.data;
};

const removeStartup = async (startupObject) => {
    const startupJSON = {
        searchaction: "delete",
        ...startupObject,
    };
    const request = axios.post(`/api/index`, startupJSON);
    const result = await request;
    return result;
};

const exportedObject = {
    getStartups,
    removeStartup,
    addStartup,
    matchStartups,
    generateFilter,
};

export default exportedObject;
