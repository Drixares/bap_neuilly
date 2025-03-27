"use client"
import Header from '../_components/header';
import Footer from '../_components/footer';
import Pagination from '../_components/pagination';
import CreatorList from '../_components/creator-list';
import CreatorNbr from '../_components/creator-nbr';
import { Creator } from '@/types/creator';
import { useEffect, useState } from 'react'; 
import { getAllCreators } from '@/actions/get-creators';
import SearchModal from '../_components/search-modal';
import { DecorativeElements } from '../_components/decorative-elements';


export default function Home() {
    const [creators, setCreators] = useState<Creator[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCreators, setCurrentCreators] = useState<Creator[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
    const itemsPerPage = 16;
    
    useEffect(() => {
        async function fetchData() {
            const creatorsFromDb = await getAllCreators();
            
            const transformedCreators = creatorsFromDb.map(creator => {
                return {
                    ...creator,
                    bio: creator.bio || null,
                };
            });
            
            setCreators(transformedCreators);
        }
        
        fetchData();
    }, []);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredCreators(creators);
        } else {
            const filtered = creators.filter(creator => 
                creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (creator.businessInfo?.companyName || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCreators(filtered);
        }
    }, [searchTerm, creators]);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentCreators(filteredCreators.slice(indexOfFirstItem, indexOfLastItem));
        if (searchTerm && currentPage !== 1) setCurrentPage(1);
    }, [currentPage, filteredCreators, itemsPerPage, searchTerm]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };
    
    useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentCreators(creators.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage, creators]);

    
    return (
        <div>
            <Header />
            <main>
                <div className='bg-[var(--beige)] relative'>
                    <h1 className='text-3xl text-center text-[#552D08]'>Liste des exposants 2025</h1>
                    <div className='bg-[var(--beige)] flex justify-between items-center p-8'>
                        <CreatorNbr creator={currentCreators} />
                        <Pagination 
                            totalItems={creators.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                    <DecorativeElements/>
                    <div className='flex justify-between py-16'>
                        <SearchModal onSearch={handleSearch} searchTerm={searchTerm}/>
                        <div className='flex flex-wrap w-[80%] gap-8 justify-center '>
                            <CreatorList creator={currentCreators} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}