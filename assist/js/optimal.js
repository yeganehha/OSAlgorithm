var currentOptimalCount = 0 ;
var currentOptimalUsesId = [] ;
var currentOptimalUsesName = [] ;
var currentOptimalUsesValue = [] ;
function optimal() {
    if ( ListProcess.length != currentOptimalCount ) {
        ListProcess.sort(function (obj1, obj2) {
            return obj1.id - obj2.id;
        });
        var optimalBlock = $('.optimalBlock');
        for(var i = 0; i < page && currentOptimalUsesId.length < page ; i++) {
            currentOptimalUsesId.push(undefined);
            currentOptimalUsesName.push(undefined);
            currentOptimalUsesValue.push(undefined);
        }
        var html = '' ;
        for ( var ListProcessIndex = 0 ; ListProcessIndex <  ListProcess.length ; ListProcessIndex++ ){
            if ( currentOptimalUsesName.includes(undefined) ) {
                if ( currentOptimalUsesName.indexOf(ListProcess[ListProcessIndex].name) === -1 ) {

                    html = html + '<li class="time_line_item Js2ProcessId_' + ListProcess[ListProcessIndex].id + '" ><div class="time_line_item_description"><div class="title JsLRUFirstTitle">';
                    $.each(currentLRUUsesName, function (index, value) {
                        if (ListProcessIndex-1 < index)
                            return false;
                        if ( currentOptimalUsesName.indexOf(ListProcess[ListProcessIndex].name) > -1 )
                            return false ;
                        html = html + '<span class="JsTitle_' + currentLRUUsesId[index] + '" >' + value + ' , </span>';
                    });

                    var FirstEmptyRow = currentOptimalUsesName.indexOf(undefined);
                    currentOptimalUsesId[FirstEmptyRow] = ListProcess[ListProcessIndex].id;
                    currentOptimalUsesName[FirstEmptyRow] = ListProcess[ListProcessIndex].name;
                    currentOptimalUsesValue[FirstEmptyRow] = 0;

                    html = html + '<span class="JsTitle_' + ListProcess[ListProcessIndex].id + '" >' + ListProcess[ListProcessIndex].name + ' , </span>';


                    html = html + '</div></div><span class="number"><span><!--Misses--></span> <span>Inserted: ' + ListProcess[ListProcessIndex].name + '</span></span></li>';
                    continue;
                }
                else
                {
                    html = html + '<li class="time_line_item Js2ProcessId_' + ListProcess[ListProcessIndex].id + '" ><div class="time_line_item_description"><div class="title JsLRUFirstTitle">';
                    $.each(currentLRUUsesName, function (index, value) {
                        if (ListProcessIndex < index)
                            return false;
                        html = html + '<span class="JsTitle_' + currentLRUUsesId[index] + '" >' + value + ' , </span>';
                        if ( currentOptimalUsesName.indexOf(ListProcess[ListProcessIndex].name) === index )
                            return false ;
                    });
                    html = html + '</div></div><span class="number"><span><!--Hits--></span> <span>Inserted: ' + ListProcess[ListProcessIndex].name + '</span></span></li>';
                    continue;
                }
            }


            $.each(currentLRUUsesName, function (index, value) {
                currentOptimalUsesValue[index] = ListProcess.indexOf(value , ListProcessIndex ) ;
            });
            var maxValue = 0 ;
            var replaceId = 0 ;
            $.each(currentLRUUsesValue, function( index, value ) {
                currentLRUUsesValue[index] = value-1;
                if ( maxValue < value ){
                    maxValue = value ;
                    replaceId = index ;
                }
            });
            currentOptimalUsesId[replaceId] = ListProcess[ListProcessIndex].id;
            currentOptimalUsesName[replaceId] = ListProcess[ListProcessIndex].name;
            currentOptimalUsesValue[replaceId] = 0;

            html = html + '<li class="time_line_item Js2ProcessId_' + ListProcess[ListProcessIndex].id + '" ><div class="time_line_item_description"><div class="title JsLRUFirstTitle">';
            $.each(currentLRUUsesName, function (index, value) {
                html = html + '<span class="JsTitle_' + currentLRUUsesId[index] + '" >' + value + ' , </span>';
            });
            html = html + '</div></div><span class="number"><span><!--Hits--></span> <span>Inserted: ' + ListProcess[ListProcessIndex].name + '</span></span></li>';

        }
        optimalBlock.html(html);
        currentOptimalCount = ListProcess.length ;
    }
}