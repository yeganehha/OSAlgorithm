var SECOND_FROM_START = 0 ;
function countSecond() {
    setTimeout( function () {
        sjf();
        rr();
        SECOND_FROM_START++ ;
        $('.JsSecondCounter').html(SECOND_FROM_START+"\"");
        $('.JsQuantum').html(quantum);
        countSecond() ;
    } , 1000 ) ;
}
countSecond();