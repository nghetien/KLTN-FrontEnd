export function debounce(func, timeout = 300) {
    console.log('vao day chua');
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
        console.log('run');
        func();
    }, timeout);
}
