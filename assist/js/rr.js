var flagRRIsRun = false ;
var currentRR = -1 ;
function rr() {
    if (ListProcess.length > 0) {
        ListProcess.sort(function (obj1, obj2) {
            return obj1.id - obj2.id;
        });
        if (! flagRRIsRun) {
            var tempI = currentRR;
            var timeChange = 0 ;
            do {
                tempI++;
                if ( tempI === ListProcess.length ) {
                    tempI = 0;
                    timeChange++;
                    if ( timeChange === 2 )
                        return ;
                }
            } while (ListProcess[tempI].finishRR === 1);

            var finish = parseInt(ListProcess[tempI]['realRR']) ;
            if ( finish > quantum )
                finish = quantum;

            var tempTime = [];
            tempTime["start"] = SECOND_FROM_START  ;
            tempTime["finish"] = parseInt(SECOND_FROM_START) + parseInt(finish) ;

            if (!Array.isArray(ListProcess[tempI].processed)) {
                ListProcess[tempI].processed = [];
                ListProcess[tempI].processed['rr'] = [];
            }
            if (!Array.isArray(ListProcess[tempI].processed.rr)) {
                ListProcess[tempI].processed['rr'] = [];
            }

            ListProcess[tempI].processed.rr.push(tempTime);
            var current = ListProcess[tempI].processed.rr.length  -1  ;

            var rrBlock = $('.rrBlock');
            rrBlock.append('<li class="time_line_item JsProcessId_' + ListProcess[tempI].id + '"  onclick="show(' + ListProcess[tempI].id + ');"><div class="time_line_item_description"><div class="title">' + ListProcess[tempI].name + '</div></div><span class="number"><span>' + tempTime["start"] + '"</span> <span class="JsProcessIdExitTime_' + ListProcess[tempI].id + '_RR'+current+'">in process...</span></span></li>')
            flagRRIsRun = true;
            currentRR = tempI;
        } else {
            var current = Object.entries(ListProcess[currentRR].processed.rr).length  -1  ;
            if (ListProcess[currentRR].processed.rr[ current ].finish === SECOND_FROM_START) {
                flagRRIsRun = false;
                var real = parseInt(ListProcess[currentRR].realRR) - parseInt(quantum);
                if ( real <= 0 ) {
                    real = 0;
                    ListProcess[currentRR].finishRR = 1;
                }
                ListProcess[currentRR].realRR = real ;
                ListProcess[currentRR].completionRR = SECOND_FROM_START ;
                $('.JsProcessIdExitTime_' + ListProcess[currentRR]['id']+'_RR'+current).html(SECOND_FROM_START + "\"");
                rr();
            }
        }
    }
}