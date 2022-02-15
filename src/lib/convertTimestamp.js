import moment from 'moment';

const convertTimestamp = timestamp => {
    return moment.unix(timestamp).format('[Ngày] DD [Tháng] MM [Năm] YYYY');
};

export default convertTimestamp;
