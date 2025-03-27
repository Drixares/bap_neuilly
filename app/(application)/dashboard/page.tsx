import { Button } from "@/components/ui/button";
import CreatorProvider from "@/providers/creator-provider";
import { signOut } from "../admin/actions";

const CreatorDashboard = () => {
    return (
        <CreatorProvider>
            <div>
                <h1>Creator Dashboard</h1>
                <Button onClick={signOut}>
                    Se déconnecter
                </Button>   
            </div>
        </CreatorProvider>
    );
};

export default CreatorDashboard;
