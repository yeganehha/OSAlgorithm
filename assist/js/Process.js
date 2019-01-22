var ListProcess = [] ;
var ProcessId = 0 ;

function insertProcess() {
    var JsProcessName = $('#JsProcessName') ;
    var JsProcessBurstTime = $('#JsProcessBurstTime') ;
    var JsNewProcessAlert = $('.JsNewProcessAlert') ;
    var thisProcess = [] ;
    thisProcess['name'] = JsProcessName.val();
    thisProcess['burst'] = JsProcessBurstTime.val();
    thisProcess['arrival'] = SECOND_FROM_START;
    thisProcess['finish'] = 0;
    thisProcess['id'] = ProcessId;
    JsNewProcessAlert.addClass('hidden');
    if ( thisProcess['name'] !== '' && thisProcess['burst'] > 0 ) {
        ListProcess.push(thisProcess);
        ProcessId++;
        JsProcessName.val('');
        JsProcessBurstTime.val('');
        $('#NewProcess').modal('hide');
    } else {
        JsNewProcessAlert.removeClass('hidden');
    }
}