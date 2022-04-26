import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useSearchBox = (action) => {
    const [search, setSearch] = useState(null);
    const dispatch = useDispatch();

    const handleSearch = (search) => setSearch(search);


    useEffect(() => {
        let time;
        if (search !== null)
            time = setTimeout(() => {
                dispatch(action({ search }));
            }, 200);

        return () => time && clearTimeout(time);
    }, [search, dispatch, action]);

    return handleSearch;
};