function ajax(opt) {
    //1.格式化参数
    var json = opt || {};
    var url = json.url;
    if (!url) {
        return;
    }
    var type = json.type || 'get';
    var dataType = json.dataType || 'text';
    var async = json.async === false ? json.async : true;
    var data = json.data || {};
    //2.创建对象
    var xml = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var arr = [];
    for (var i in data) {
        arr.push(i + '=' + data[i]);
    }
    data = arr.join('&');


    xml.onreadystatechange = function() {
        if (xml.readyState === 4) {
            if (xml.status === 200 || xml.status === 304) {
                if (dataType === 'json') {
                    typeof json.success === 'function' && json.success(JSON.parse(xml.responseText))
                } else {
                    typeof json.success === 'function' && json.success(xml.responseText);
                }
            } else {
                typeof json.success === 'function' && json.error('error')
            }
        }
    }
    switch (type.toLowerCase()) {
        case 'get':
            url = data ? url + '?' + data : url;
            xml.open(type, url, async);
            xml.send();
            break;
        case 'post':
            xml.open(type, url, async);
            xml.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xml.send(data);
    }
}