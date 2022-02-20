import moment from 'moment';

const convertTimestamp = timestamp => {
    return moment.unix(timestamp).format('[Ngày] DD [Tháng] MM [Năm] YYYY');
};

const convertTimestampToTime = timestamp => {
    return moment.unix(timestamp).format('HH:mm:ss - DD/MM/YYYY');
};

const convertStringDateToTimestamp = string => {
    return convertTimestampToTime(moment(string).unix());
};

export { convertTimestamp as default, convertStringDateToTimestamp };
