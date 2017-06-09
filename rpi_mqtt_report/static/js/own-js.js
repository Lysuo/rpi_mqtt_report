$(function(){

  var currDate = new Date();
  console.log(currDate);

  function getNextDate(d, dir) {
    d.setDate(d.getDate()+dir);
    return d;
  }

  $('#previous-date').click(
    function () {
      getData (-1);
    });

  $('#next-date').click(
    function () {
      getData (1);
    });

  function getData (dir) {

    currDate = getNextDate(currDate, dir);
    $('#date-visu').empty();
    $('#date-visu').append(currDate.toString());

    dataToSend = { 'reqdatey' : currDate.getFullYear(),
      'reqdatem' : currDate.getMonth()+1,
      'reqdated' : currDate.getDate(),
      'tzinfo': 'America/Argentina/Buenos_Aires',
      'npph' : 2
    };
    console.log(dataToSend);

    $.ajax({
      type: 'POST',
      cache: false,
      url: '/restapi/sensorData/',
      datatype: "json",
      async: true,
      data: dataToSend,

      success: function(json) {

        dataBarChart = json;
        drawBarChart();

        if (dataBarChart != []) {
        }

        /*    $.each(arr, function(i, item){	
              html += '<tr name="'+i+'"><td>'+item.mId+'</td><td>'+item.mOriginalTitleTP+'</td></tr>';
              });
              */

        console.log("success");
      },
      error: function(){
        console.log("error");
      }, 
      complete: function(){
        console.log("complete");
      } 
    })
  };

  getData(0);

});
