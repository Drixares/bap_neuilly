import CreatorProvider from "@/providers/creator-provider";

const CreatorDashboard = () => {
    return (
        <CreatorProvider>
            <div>
                <h1>Creator Dashboard</h1>
            </div>
        </CreatorProvider>
    );
};

export default CreatorDashboard;
