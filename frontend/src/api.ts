import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const validadeWithGemini = async (data: {word: string, theme:string}) => {
    try{
        const response = await api.post("/validate", data);
        return response.data;
    } catch (error){
        throw error;
    }
}