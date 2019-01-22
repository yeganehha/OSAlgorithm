var ListProcess = [] ;
var quantum = 0 ;
var ProcessId = 0 ;

function insertProcess() {
    var JsProcessName = $('#JsProcessName') ;
    var JsProcessBurstTime = $('#JsProcessBurstTime') ;
    var JsNewProcessAlert = $('.JsNewProcessAlert') ;
    var thisProcess = [] ;
    thisProcess['name'] = JsProcessName.val();
    thisProcess['burst'] = parseInt(JsProcessBurstTime.val());
    thisProcess['arrival'] = SECOND_FROM_START;
    thisProcess['real'] = parseInt(thisProcess['burst']);
    thisProcess['realRR'] = parseInt(thisProcess['burst']);
    thisProcess['finish'] = 0;
    thisProcess['finishRR'] = 0;
    thisProcess['completion'] = -1;
    thisProcess['completionRR'] = -1;
    thisProcess['id'] = ProcessId;
    JsNewProcessAlert.addClass('hidden');
    if ( thisProcess['name'] !== '' && parseInt(thisProcess['burst']) > 0 ) {
        ListProcess.push(thisProcess);
        ProcessId++;
        JsProcessName.val('');
        JsProcessBurstTime.val('');
        $('#NewProcess').modal('hide');
    } else {
        JsNewProcessAlert.removeClass('hidden');
    }
}

function getQuantum() {
    do {
        var person = prompt("Please enter the quantum", "3");
    } while ( ! parseInt(person) > 0 ) ;
    quantum = person ;
}
getQuantum();