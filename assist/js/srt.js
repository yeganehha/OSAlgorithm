var flagSRTIsRun = false ;
var currentSRT = null ;
var currentSRTCount = 0 ;
function srt() {
    if (ListProcess.length > 0) {
        ListProcess.sort(function (obj1, obj2) {
            return obj1.realSRT - obj2.realSRT;
        });
        if (! flagSRTIsRun) {
            var tempI = -1;
            do {
                tempI++;
                if ( tempI === ListProcess.length )
                    return ;
            } while (ListProcess[tempI].finish === 1);


            if (currentSRT === ListProcess[tempI]['id'] && ! ( ListProcess.length === currentSRTCount )  ) {
                currentSRTCount = ListProcess.length ;
                var current = ListProcess[tempI].processed.srt.length  -1  ;
                ListProcess[tempI].processed.srt[current].finish = SECOND_FROM_START + parseInt(ListProcess[tempI]['realSRT'])  ;
                $('.JsProcessIdExitTime_' + currentSRT +'_SRT'+current).html("in process...");
                flagSRTIsRun = true;
                return;
            }

            var tempTime = [];
            tempTime["start"] = SECOND_FROM_START  ;
            tempTime["finish"] = SECOND_FROM_START + parseInt(ListProcess[tempI]['realSRT'])  ;

            if (!Array.isArray(ListProcess[tempI].processed)) {
                ListProcess[tempI].processed = [];
                ListProcess[tempI].processed['srt'] = [];
            }
            if (!Array.isArray(ListProcess[tempI].processed.srt)) {
                ListProcess[tempI].processed['srt'] = [];
            }
            ListProcess[tempI].processed.srt.push(tempTime);
            var current = ListProcess[tempI].processed.srt.length  -1  ;

            var srtBlock = $('.srtBlock');
            srtBlock.append('<li class="time_line_item JsProcessId_' + ListProcess[tempI].id + '" onclick="show(' + ListProcess[tempI].id + ');"><div class="time_line_item_description"><div class="title">' + ListProcess[tempI].name + '</div></div><span class="number"><span>' + tempTime["start"] + '"</span> <span class="JsProcessIdExitTime_' + ListProcess[tempI].id + '_SRT'+current+'">in process...</span></span></li>')
            flagSRTIsRun = true;
            currentSRT = ListProcess[tempI]['id'];
            currentSRTCount = ListProcess.length ;
        } else {
            var pos = ListProcess.map(function (e) {
                return e.id;
            }).indexOf(currentSRT);
            var current = Object.entries(ListProcess[pos].processed.srt).length  -1  ;
            if (ListProcess[pos].processed.srt[current].finish === SECOND_FROM_START) {
                flagSRTIsRun = false;
                currentSRT = null;
                ListProcess[pos].finish = 1;
                ListProcess[pos].realSRT = 0;
                ListProcess[pos].completionSTR = SECOND_FROM_START;
                $('.JsProcessIdExitTime_' + ListProcess[pos]['id'] + "_SRT" + current).html(SECOND_FROM_START + "\"");
                srt();
            } else {
                if ( ! ( ListProcess.length === currentSRTCount ) ) {
                    var diff = parseInt(SECOND_FROM_START) - parseInt(ListProcess[pos].processed.srt[current].start) ;
                    ListProcess[pos].processed.srt[current].finish = parseInt(SECOND_FROM_START) ;
                    ListProcess[pos].realSRT = diff ;
                    flagSRTIsRun = false;
                    $('.JsProcessIdExitTime_' + ListProcess[pos]['id']+'_SRT'+current).html(SECOND_FROM_START + "\"");
                    srt();
                }
            }
        }
    }
}