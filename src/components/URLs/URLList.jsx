import { useState, useEffect } from 'react';
import { urlAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import CreateURL from './CreateURL';
import style from './URLList.module.css';

const URLList = () => {
    const [urls, setUrls] = useState([]);
    const navigate = useNavigate();

    const fetchUrls = async () => {
        const response = await urlAPI.getMyURLs();
        setUrls(response.data);
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>Ваші URLs</h1>
            </div>
            <CreateURL onURLCreated={fetchUrls} />
            <ul className={style.ul}>
                {urls.map((url) => (
                    <li key={url.short} className={style.li} onClick={() => navigate(`/stats/${url.short}`)}>
                        <div>{url.url}</div>
                        <div>Короткий URL: {url.short}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default URLList;