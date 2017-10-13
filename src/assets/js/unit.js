global.hm = { mapping: {} };
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isClose = true;
var rightUrl = "";
var router;
hm.dataPickerCallback = null;

hm.request = function (obj) {
  var requestId = generateRequestId();
  hm.mapping[requestId] = {
    success: obj.success,
    failure: obj.failure
  }
  if (isAndroid) {
    window.bridge.request(requestId, obj.command, obj.params);
  }
  if (isiOS) {
    window.webkit.messageHandlers.request.postMessage(
      { 'requestId': requestId, 'command': obj.command, 'params': obj.params }
    );
  }
}

hm.callback = function (requestId, data) {
  data = data.replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/<br\/>/g, "\\n");

  // JSON套JSON字符串时的处理
  data = data.replace(/"{/g, "{")
    .replace(/}"/g, "}");

  if (data.indexOf("ssid") > 0) {
    data = data.replace(/\\n/g, "");
  }

  var resp = JSON.parse(data);

  var info = this.mapping[requestId];
  if (resp.code === 0) {
    info.success(resp.data);
  }
  else {
    info.failure(resp.error);
  }
}

hm.isAndroid = function () {
  if (isAndroid) {
    return true;
  } else {
    return false;
  }
}

hm.webRequest = function (requestId, command, params) {
  if (command == "titlebar://back") {
    if (isClose === true) {
      if (isAndroid) {
        window.bridge.webCallback(requestId, '{"code":0,"data":""}');
        hm.request({ command: 'hm_window://close' });
      }
      if (isiOS) {
        window.webkit.messageHandlers.webCallback.postMessage(
          { 'requestId': requestId, 'params': '{"code":0,"data":""}' }
        );
        hm.request({ command: 'hm_window://close' });
      }
    } else {
      if (isAndroid) {
        // window.alert("back");
        window.bridge.webCallback(requestId, '{"code":0,"data":""}');
        hm.request({ command: 'hm_window://back' });
      }
      if (isiOS) {
        window.webkit.messageHandlers.webCallback.postMessage({
          'requestId': requestId,
          'params': '{"code":0,"data":""}'
        });
        hm.request({ command: 'hm_window://back' });
      }
    }
  }
  if (command === "titlebar://rigthClick") {
    //可加参数，判断操作类型
    if (hm.dataPickerCallback != null) {
      hm.dataPickerCallback();
    }
  }
}
hm.setRouter = function (router) {
  this.router = router;
}

hm.setTitle = function (title, right, url, close) {
  rightUrl = url;
  isClose = close;
  hm.request({
    command: 'hm_window://titlebar/load',
    params: '{"title_text":"' + title + '","right_text":"' + right + '"}'
  });
}

var generateRequestId = function () {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export default hm;
