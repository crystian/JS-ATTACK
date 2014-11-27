onmessage = function (oEvent) {
  try {
    var result = eval(oEvent.data);
    postMessage({ type: 'result', content : result });
  } catch(e) {
    if(e.lineNumber) {
      postMessage({ type: 'error', content: e.message + " on line " + (e.lineNumber-2) });
    } else {
      postMessage({ type: 'error', content: e.message });
    }
  }
};

function alert(msg) {

  console.log(msg);

}

var console = { log: function(x) {

  if ((typeof x !== 'string') && (typeof x !== 'number')) { x = JSON.stringify(x); }

  postMessage({ type: 'log', content : x }) }
  
};