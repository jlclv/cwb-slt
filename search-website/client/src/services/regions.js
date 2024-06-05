import axios from "axios";

const getCountries = async (regionsStr) => {
    const resultsData = [];
    const regions = regionsStr.split(",");
    for (const region of regions) {
        const request = axios.get(`/api/regions?query=${region.trim()}`);
        const result = await request;
        resultsData.push(result.data[0]);
    }

    return resultsData;
};

const addRegion = async (regionObject) => {
    const request = axios.post(`/api/index`, regionObject);
    const result = await request;
    return result.data;
};

const removeRegion = async (regionObject) => {
    const regionJSON = {
        searchaction: "delete",
        ...regionObject,
    };
    const request = axios.post(`/api/index`, regionJSON);
    const result = await request;
    return result.data;
};

export default { getCountries, addRegion, removeRegion };
