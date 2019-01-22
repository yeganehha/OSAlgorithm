var flagSJFIsRun = false ;
var currentSJF = null ;
function sjf() {
    if (ListProcess.length > 0) {
        if (! flagSJFIsRun) {
            ListProcess.sort(function (obj1, obj2) {
                return obj1.burst - obj2.burst;
            });

            var tempI = -1;
            do {
                tempI++;
                if ( tempI === ListProcess.length )
                    return ;
            } while (ListProcess[tempI].finish === 1);

            var tempTime = [];
            tempTime["start"] = SECOND_FROM_START  ;
            tempTime["finish"] = SECOND_FROM_START + parseInt(ListProcess[tempI]['burst'])  ;

            if (!Array.isArray(ListProcess[tempI].processed)) {
                ListProcess[tempI].processed = [];
                ListProcess[tempI].processed['sjf'] = [];
            }
            if (!Array.isArray(ListProcess[tempI].processed.sjf)) {
                ListProcess[tempI].processed['sjf'] = [];
            }
            ListProcess[tempI].processed.sjf.push(tempTime);

            var sjfBlock = $('.sjfBlock');
            sjfBlock.append('<li class="time_line_item JsProcessId_' + ListProcess[tempI].id + '"  onclick="show(' + ListProcess[tempI].id + ');"><div class="time_line_item_description"><div class="title">' + ListProcess[tempI].name + '</div></div><span class="number"><span>' + tempTime["start"] + '"</span> <span class="JsProcessIdExitTime_' + ListProcess[tempI].id + '">in process...</span></span></li>')
            flagSJFIsRun = true;
            currentSJF = ListProcess[tempI]['id'];
        } else {
            var pos = ListProcess.map(function (e) {
                return e.id;
            }).indexOf(currentSJF);
            if (ListProcess[pos].processed.sjf[0].finish === SECOND_FROM_START) {
                flagSJFIsRun = false;
                currentSJF = null;
                ListProcess[pos].finish = 1 ;
                ListProcess[pos].real = 0 ;
                ListProcess[pos].completion = SECOND_FROM_START ;
                $('.JsProcessIdExitTime_' + ListProcess[pos]['id']).html(SECOND_FROM_START + "\"");
                sjf();
            }
        }
    }
}