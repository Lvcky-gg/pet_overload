import { useSelector } from 'react-redux';

import './Loader.css';

const Loader = () => {
    interface RootState {
        loading: {
            loading: boolean;
        };
    }

    const loading = useSelector((state: RootState) => state.loading.loading);

    if (loading)
        return (
            <div className='loader'>
                <div className='loader-container'>
                    <div className='loader-spinner'>
                        <span className='spinner'></span>
                    </div>
                </div>
            </div>
        );

    return null;
};

export default Loader;
