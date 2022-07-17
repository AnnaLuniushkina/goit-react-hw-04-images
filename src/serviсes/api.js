import axios from 'axios';

const API = (q, page) => {
    const options = {
        params: {
            key: '28497744-dc82383c41a717d6415aeb6f5',
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            q,
            page,
        },
    };

    return axios.get('https://pixabay.com/api/', options);
}

export { API };