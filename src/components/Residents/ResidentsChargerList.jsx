import { useEffect, useState } from 'react';
import List from '../SharedComponent/List/List';
import SubHeader from '../SharedComponent/SubHeader/SubHeader';
import Pagination from '../SharedComponent/Pagination/Pagination';
import { postRequestWithToken } from '../../api/Requests';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../utils/authStorage';
import Loader from "../SharedComponent/Loader/Loader";
import EmptyList from '../SharedComponent/EmptyList/EmptyList';

const ResidentsChargerList = () => {
    const userDetails                   = getUserDetails();
    const navigate                      = useNavigate();
    const [chargerList, setChargerList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages]   = useState(1);
    const [totalCount, setTotalCount]   = useState(0);
    const [filters, setFilters]         = useState({ start_date: null, end_date: null });
    const [loading, setLoading]         = useState(false);

    const searchTerm = [{
        label: 'Search',
        name: 'search_text',
        type: 'text',
    }];

    const fetchList = (page, appliedFilters = {}) => {
        if (page === 1 && Object.keys(appliedFilters).length === 0) {
            setLoading(false);
        } else {
            setLoading(true);
        }

        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            page_no: page,
            ...appliedFilters,
        };

        postRequestWithToken('community-charger-list', obj, async (response) => {
            if (response.code === 200) {
                setChargerList(response?.data || []);
                setTotalPages(response?.total_page || 1);
                setTotalCount(response?.total ?? 0);
            } else {
                console.log('error in community-charger-list api', response);
            }
            setLoading(false);
        });
    };

    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login');
            return;
        }
        fetchList(currentPage, filters);
    }, [currentPage, filters]);

    const fetchFilteredData = (newFilters = {}) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='main-container'>
            <SubHeader
                heading="Charger List"
                filterValues={filters}
                fetchFilteredData={fetchFilteredData}
                searchTerm={searchTerm}
                count={totalCount}
            />
            {loading ? <Loader /> :
                chargerList.length === 0 ? (
                    <EmptyList
                        tableHeaders={["Charger ID", "kW", "Community", "Area", "Status"]}
                        message="No data available"
                    />
                ) : (
                    <>
                        <List
                            tableHeaders={["Charger ID", "kW", "Community", "Area", "Status"]}
                            pageHeading="Charger List"
                            listData={chargerList}
                            keyMapping={[
                                { key: 'charger_id', label: 'Charger ID' },
                                { key: 'kw', label: 'kW' },
                                { key: 'community_name', label: 'Community' },
                                { key: 'area_name', label: 'Area' },
                                { key: 'status', label: 'Status' },
                            ]}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
        </div>
    );
};

export default ResidentsChargerList;
