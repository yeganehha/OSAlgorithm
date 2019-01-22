var currentLRUCount = 0 ;
var currentLRUUsesId = [] ;
var currentLRUUsesName = [] ;
var currentLRUUsesValue = [] ;
function lru() {
    if ( ListProcess.length != currentLRUCount ) {
        ListProcess.sort(function (obj1, obj2) {
            return obj1.id - obj2.id;
        });
        var lruBlock = $('.lruBlock');
        if ( ListProcess.length === 1 ) {
            currentLRUUsesId[0] = parseInt(ListProcess[0].id);
            currentLRUUsesName[0] = ListProcess[0].name;
            currentLRUUsesValue[0] = 0 ;
            lruBlock.append('<li class="time_line_item Js2ProcessId_' + ListProcess[0].id + '" ><div class="time_line_item_description"><div class="title JsLRUFirstTitle"><span class="JsTitle_'+ListProcess[0].id+'" >' + ListProcess[0].name + ' , </span></div></div><span class="number"><span>Misses</span> <span>Inserted: '+ ListProcess[0].name + '</span></span></li>')
        }
        var current = ListProcess.length  -1 ;
        if ( ListProcess.length <= page  && ListProcess.length  > 1 ){
            var index = currentLRUUsesName.indexOf( ListProcess[current].name );
            if ( index >= 0 ) {
                var html = '';
                $.each(currentLRUUsesName, function( index, value ) {
                    html = html + '<span class="JsTitle_'+currentLRUUsesId[index]+'" >' + value + ' , </span>' ;
                });
                currentLRUUsesId[current] = parseInt(ListProcess[current].id);
                currentLRUUsesName[current] = ListProcess[current].name;
                currentLRUUsesValue[current] = current*-1;
                lruBlock.append('<li class="time_line_item Js2ProcessId_' + ListProcess[0].id + '" ><div class="time_line_item_description"><div class="title JsLRUFirstTitle">'+html+'</div></div><span class="number"><span>Hits</span> <span>Inserted: '+ ListProcess[current].name + '</span></span></li>')
            } else {
                currentLRUUsesId[current] = parseInt(ListProcess[current].id);
                currentLRUUsesName[current] = ListProcess[current].name;
                currentLRUUsesValue[current] = current;
                var html = '';
                $.each(currentLRUUsesName, function (index, value) {
                    html = html + '<span class="JsTitle_' + currentLRUUsesId[index] + '" >' + value + ' , </span>';
                });
                lruBlock.append('<li class="time_line_item Js2ProcessId_' + ListProcess[0].id + '" ><div class="time_line_item_description"><div class="title JsLRUFirstTitle">' + html + '</div></div><span class="number"><span>Misses</span> <span>Inserted: '+ ListProcess[current].name + '</span></span></li>')

            }
        }
        if ( ListProcess.length > page ){
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
                var html = '';
                $.each(currentLRUUsesName, function( index, value ) {
                    html = html + '<span class="JsTitle_'+currentLRUUsesId[index]+'" >' + value + ' , </span>' ;
                });
                lruBlock.append('<li class="time_line_item Js2ProcessId_' + ListProcess[0].id + '" ><div class="time_line_item_description"><div class="title JsLRUFirstTitle">'+html+'</div></div><span class="number"><span>Hits</span> <span>Inserted: '+ ListProcess[current].name + '</span></span></li>')
            } else {
                var minValue = 9999999999;
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
                currentLRUUsesId[minValueId] = ListProcess[current].id ;
                currentLRUUsesName[minValueId] = ListProcess[current].name ;
                currentLRUUsesValue[minValueId] = maxValue ;
                var html = '';
                $.each(currentLRUUsesName, function( index, value ) {
                    html = html + '<span class="JsTitle_'+currentLRUUsesId[index]+'" >' + value + ' , </span>' ;
                });
                lruBlock.append('<li class="time_line_item Js2ProcessId_' + ListProcess[0].id + '" ><div class="time_line_item_description"><div class="title JsLRUFirstTitle">'+html+'</div></div><span class="number"><span>Misses</span> <span>Inserted: '+ ListProcess[current].name + '</span></span></li>')
            }
        }
        currentLRUCount = ListProcess.length ;
    }
}