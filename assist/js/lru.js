var currentLRUCount = 0 ;
var currentLRUUsesId = [] ;
var currentLRUUsesName = [] ;
var currentLRUUsesValue = [] ;
function lru() {
    if ( ListProcess.length != currentLRUCount ) {
        ListProcess.sort(function (obj1, obj2) {
            return obj1.id - obj2.id;
        });
        var rrBlock = $('.rrBlock');
        if ( ListProcess.length === 1 ) {
            currentLRUUsesId[0] = parseInt(ListProcess[0].id);
            currentLRUUsesName[0] = ListProcess[0].name;
            currentLRUUsesValue[0] = 0 ;
            rrBlock.append('<li class="time_line_item Js2ProcessId_' + ListProcess[0].id + '"  onclick="show(' + ListProcess[0].id + ');"><div class="time_line_item_description"><div class="title JsLRUFirstTitle"><span class="JsTitle_'+ListProcess[0].id+'" >' + ListProcess[tempI].name + ' , </span></div></div><span class="number"><span>Inserted</span> <span></span></span></li>')
        }
        var current = ListProcess.length  -1 ;
        if ( ListProcess.length < page  && ListProcess.length  > 1 ){
            currentLRUUsesId[current] = parseInt(ListProcess[current].id);
            currentLRUUsesName[current] = ListProcess[current].name ;
            currentLRUUsesValue[current] = current ;
            $('.JsLRUFirstTitle').append('<span class="JsTitle_'+ListProcess[current].id+'" >' + ListProcess[current].name + ' , </span>')
        }
        if ( ListProcess.length >= page ){
            var index = currentLRUUsesName.indexOf( ListProcess[current].name );
            if ( index >= 0 ){
                var maxValue = 0 ;
                $.each(currentLRUUsesValue, function( index, value ) {
                    currentLRUUsesValue[index] = value-1;
                    if ( maxValue < value ){
                        maxValue = value ;
                    }
                });
                currentLRUUsesId[index] = ListProcess[current].id ;
                currentLRUUsesName[index] = ListProcess[current].name ;
                currentLRUUsesValue[index] = maxValue ;
            } else {
                var minValue = 0 ;
                var minValueId = -1 ;
                var maxValue = 0 ;
                $.each(currentLRUUsesValue, function( index, value ) {
                    currentLRUUsesValue[index] = value-1;
                    if ( minValue > value ){
                        minValue = value ;
                        minValueId = index ;
                    }
                    if ( maxValue < value ){
                        maxValue = value ;
                    }
                });
                $('.JsTitle_'+currentLRUUsesId[minValueId]).html(ListProcess[current].name + ' , ').addClass('.JsTitle_'+ ListProcess[current].id ).removeClass('.JsTitle_'+currentLRUUsesId[minValueId]);
                currentLRUUsesId[minValueId] = ListProcess[current].id ;
                currentLRUUsesName[minValueId] = ListProcess[current].name ;
                currentLRUUsesValue[minValueId] = maxValue ;
            }
        }
    }
}