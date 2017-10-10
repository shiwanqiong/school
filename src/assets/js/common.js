/**
 * Created by qq on 2017/9/18 0018.
 */
export function loadRole(){
  let role='';
  global.hm.request({
    command: 'data://user/getuserinfo',
    success: function(data) {
      role = data.current_role;
      alert(role);
    },
    failure: function (error) {
    }
  });
}
/*global.hm.webRequest = function (requestId, command, params) {
  if (command == "titlebar://back") {
    if (history.length == 0 || document.referrer === '') {
      if (isAndroid) {
        window.bridge.webCallback(requestId, '{"code":0,"data":""}');
        hm.request({command: 'hm_window://close'});
      }
      if (isiOS) {
        window.webkit.messageHandlers.webCallback.postMessage(
          {'requestId': requestId, 'params': '{"code":0,"data":""}'}
        );
        hm.request({command: 'hm_window://close'});
      }
    } else {
      if (isAndroid) {
        window.bridge.webCallback(requestId, '{"code":0,"data":""}');
        hm.request({command: 'hm_window://back'});
      }
      if (isiOS) {
        window.webkit.messageHandlers.webCallback.postMessage({
          'requestId': requestId,
          'params': '{"code":0,"data":""}'
        });
        hm.request({command: 'hm_window://back'});
      }
    }
  }
  //传当前页面的title和右边文字
  if (command == "titlebar://load") {
    if (isAndroid) {
      window.bridge.webCallback(requestId,
        '{"code":0,"data":{"title_text":"学生发展课堂","right_text":""}}'
      );
    }
    if (isiOS) {
      window.webkit.messageHandlers.webCallback.postMessage(
        {
          'requestId': requestId,
          'params': '{"code":0,"data":{"title_text":"学生发展课堂","right_text":""}}'
        }
      );
    }
  }
}*/
