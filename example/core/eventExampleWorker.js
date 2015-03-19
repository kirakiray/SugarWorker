onmessage = function (e) {
    var data = e.data,
        a = data.a,
        reCount = 0;
    for (; a > 0; a--) {
        reCount += a
    };
    postMessage({
        eventType: "haha",
        data: reCount
    });
};