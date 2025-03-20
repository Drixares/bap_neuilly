import { adminUserExists } from "@/data-access/admin";

export const adminUserExistsUseCase = async () => {
    const isAdminUserExists = await adminUserExists();
    return isAdminUserExists;
};
