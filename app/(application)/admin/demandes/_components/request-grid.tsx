import { getRequestsWithUserInfoUseCase } from "@/use-cases/requests";
import { RequestCard } from "./request-card";

export async function RequestGrid() {
    const requests = await getRequestsWithUserInfoUseCase();

    if (requests.length === 0) {    
        return (
            <div className="text-center py-8 text-muted-foreground">
                Aucune demande trouvée
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
                <RequestCard key={request.id} request={request} />
            ))}
        </div>
    );
}
