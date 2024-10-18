import axios from 'axios';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchEpisodes = async () => {
    const response = await axios.get(`${API_BASE_URL}/episode`);
    return response.data;
};

export const fetchCharactersByEpisode = async (episodeId: string) => {
    console.log(`${API_BASE_URL}/episode/${episodeId}`)
    const response = await axios.get(`${API_BASE_URL}/episode/${episodeId}`);
    return response.data;
};
