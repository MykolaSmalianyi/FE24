import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { urlAPI } from '../../services/api';
import URLStatsGraph from './URLStatsGraph';
import style from './URLStats.module.css';

const URLStats = () => {
    const { shortCode } = useParams();
    const [stats, setStats] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [period, setPeriod] = useState('month');

    const groupDataByPeriod = (data, period) => {
        return data.reduce((acc, dateString) => {
            const date = new Date(dateString);
            let key;
            if (period === 'day') {
                key = date.toISOString().slice(0, 10); // YYYY-MM-DD
            } else if (period === 'week') {
                const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
                key = startOfWeek.toISOString().slice(0, 10); // YYYY-MM-DD
            } else {
                key = date.toISOString().slice(0, 7); // YYYY-MM
            }
            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key]++;
            return acc;
        }, {});
    };

    useEffect(() => {
        const fetchStats = async () => {
            const response = await urlAPI.getURLStats(shortCode);
            setStats(response.data);

            const groupedData = groupDataByPeriod(response.data, period);
            const transformedData = Object.keys(groupedData).map(key => ({
                time: key,
                clicks: groupedData[key],
            }));
            setGraphData(transformedData);
        };

        fetchStats();
    }, [shortCode, period]);

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
    };

    return (
        <div className={style.urlStatsContainer}>
            <div className={style.urlStatsHeader}>
                Статистика URL для {shortCode}
            </div>
            {stats.length === 0 ? (
                <div className={style.noStatsMessage}>
                    Це посилання ще не має статистики.
                </div>
            ) : (
                <div className={style.graphContainer}>
                    <URLStatsGraph data={graphData} period={period}/>
                    <select onChange={handlePeriodChange} value={period} className={style.select}>
                        <option value="day">День</option>
                        <option value="week">Тиждень</option>
                        <option value="month">Місяць</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default URLStats;