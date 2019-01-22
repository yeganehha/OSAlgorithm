var flagSJFIsRun = false ;
var currentSJF = null ;
function sjf() {
    if (flagSJFIsRun) {
        if (ListProcess.length > 0)
            ListProcess.sort(function (obj1, obj2) {
                return obj1.burst - obj2.burst;
            });

        var tempI = 0;
        do {
            tempI++;
        } while (ListProcess[tempI]['finish'] === 0) ;

        var tempTime = [];
        tempTime["start"] = SECOND_FROM_START;
        tempTime["finish"] = SECOND_FROM_START + ListProcess[tempI]['burst'];

        if (!Array.isArray(ListProcess[tempI]['processed']))
            ListProcess[tempI]['processed'] = [];

        ListProcess[tempI]['processed']['sjf'] = [];
        ListProcess[tempI]['processed']['sjf'].push(tempTime);

        var sjfBlock = $('.sjfBlock');
        sjfBlock.append('<li class="time_line_item JsProcessId_' + ListProcess[tempI]['id'] + '"><div class="time_line_item_description"><div class="title">' + ListProcess[tempI]['name'] + '</div></div><span class="number"><span>' + tempTime["start"] + '"</span> <span class="JsProcessIdExitTime_' + ListProcess[tempI]['id'] + '">' + tempTime["finish"] + '"</span></span></li>')
        flagSJFIsRun = true ;
        currentSJF = ListProcess[tempI]['id'] ;
    } else {
        var pos = ListProcess.map(function(e) { return e.id; }).indexOf(currentSJF);
        if ( ListProcess[pos]['processed']['sjf'][0]['finish'] == SECOND_FROM_START ){
            flagSJFIsRun = false ;
            currentSJF = null ;
            $('.JsProcessIdExitTime_'+ListProcess[pos]['id']).html(SECOND_FROM_START+"\"");
        }
    }
}