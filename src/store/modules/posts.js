export const postsModules = {
    namespaced: true,
    state: () => ({
        listPost: [
            {
                idUser: 1,
                nameUser: 'Nguyễn Thành Minh',
                idPost: 1,
                namePost: 'Vẽ Quốc kỳ Việt Nam bằng Flutter',
                shortContent:
                    'Vấn đề "Mình học Toán để làm gì vậy anh. Anh làm IT lâu rồi có bao giờ cần sử dụng đến sin cos tan không?". Thằng em mình đang học lớp 12 hỏi 😱. Biết trả lời nó sao bây giờ',
                content: '',
                timeCreated: '',
                lastUpdate: '',
                view: 2400,
                bookmark: 100,
                comment: 18,
                listTags: ['Flutter', 'Math', 'Custom View', 'Dart'],
            },
            {
                idUser: 1,
                nameUser: 'Nguyễn Thành Minh',
                idPost: 2,
                namePost: 'Học Flutter từ cơ bản đến nâng cao. Phần 7: Lột trần trụi GlobalKey',
                shortContent:
                    'Lời mở đầu Ở bài 6, chúng ta đã tìm hiểu xong khái niệm Key là gì và ta cũng biết class Key có 2 sub class là LocalKey và GlobalKey. Mình đã tập trung nói rất nhiều về LocalKey, đồng thời cũng có tiết lộ nhiều thông tin về GlobalKey',
                content: '',
                timeCreated: '',
                lastUpdate: '',
                view: 6800,
                bookmark: 200,
                comment: 199,
                listTags: ['Flutter', 'Math', 'Dart', 'Global Key'],
            },
        ],
        filter: {
            keyword: '',
            listTags: [],
        },
    }),
    mutations: {},
    actions: {},
    getters: {
        isFilter(state) {
            return state.filter.keyword && state.filter.listTags;
        },
    },
};
