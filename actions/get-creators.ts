"use server"
import { getCreatorsWithBusinessInfo } from "@/data-access/creators";

export async function getAllCreators() {
    const creators = getCreatorsWithBusinessInfo();
    return creators;
}