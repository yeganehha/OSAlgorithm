var SECOND_FROM_START = 0 ;
function countSecond() {
    setTimeout( function () {
        sjf();
        SECOND_FROM_START++ ;
        $('.JsSecondCounter').html(SECOND_FROM_START+"\"");
        countSecond() ;
    } , 1000 ) ;
}
countSecond();