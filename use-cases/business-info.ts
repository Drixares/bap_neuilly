import { getBusinessInfoByArtisanId } from "@/data-access/business-info";

export async function getBusinessInfoByArtisanIdUseCase(artisanId: string) {
    const businessInfo = await getBusinessInfoByArtisanId(artisanId);
    return businessInfo;
}
