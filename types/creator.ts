import { BusinessInfo, User } from "@/db/schema/auth-schema";

export type Creator = User & {
    businessInfo: BusinessInfo | null;
};

export type CreatorCardProps = {
    creator: Creator;
};
