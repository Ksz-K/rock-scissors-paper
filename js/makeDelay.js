function makeDelay(milliseconds) {
    var start = new Date().getTime();
    for (let i = 0; i < 3600000; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
