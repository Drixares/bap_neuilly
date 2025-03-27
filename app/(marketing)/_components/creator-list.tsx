import CreatorCard from './creator-card'
import { Creator } from '@/types/creator';


export default function CreatorList({ creator }: { creator: Creator[] }) {
    const transformedCreators = creator.map(item => ({
        ...item,
        businessInfo: item.businessInfo ? {
            ...item.businessInfo,
            siretNum: item.businessInfo.siretNum || undefined,
            businessDescription: item.businessInfo.businessDescription || undefined,
            website: item.businessInfo.website || undefined,
            registrationNumber: item.businessInfo.registrationNumber || undefined
        } : undefined
    }));
    return (
        <>
            {transformedCreators.map((item) => (
                console.log(item),
                <CreatorCard key={item.id} Creator={item} Business={item.businessInfo} />
            ))}
        </>
    )
}