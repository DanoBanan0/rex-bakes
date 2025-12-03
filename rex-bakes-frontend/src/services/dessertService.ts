import api from "./api";
import type { Dessert } from "../types";

export const getDesserts = async () => {
    const response  = await api.get<Dessert[]>("/desserts/");
    return response.data;
}