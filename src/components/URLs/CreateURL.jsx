import { useState } from 'react';
import { urlAPI } from '../../services/api';
import style from './CreateURL.module.css';
import Button from '../common/Button';
import Input from '../common/Input';

const CreateURL = ({ onURLCreated }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await urlAPI.createURL({ url });
            setUrl('');
            onURLCreated();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.detail) {
                const errorDetail = err.response.data.detail[0];
                setError(errorDetail.msg);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div>
                <label>Введіть URL: </label>
                <Input
                    type="text"
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>
            {error && <div className={style.error}>{error}</div>}
            <Button text="Створити" type="submit" />
        </form>
    );
};

export default CreateURL;