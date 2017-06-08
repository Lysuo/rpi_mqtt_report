$(function(){

  var currDate = new Date();
  console.log(currDate);

  function getNextDate(d, dir) {
    d.setDate(d.getDate()+dir);
    return d;
  }

  $('#date-visu').empty();
  $('#date-visu').append(currDate);

  $('#button-test').click(
    function () {
      getData (currDate);
    });

  $('#previous-date').click(
    function () {
      currDate = getNextDate(currDate, -1);
      $('#date-visu').empty();
      $('#date-visu').append(currDate);
      getData (currDate);
    });

  $('#next-date').click(
      function () {
        currDate = getNextDate(currDate, 1);
        $('#date-visu').empty();
        $('#date-visu').append(currDate);
        getData (currDate);
      });

  function getData (date) {
    dataToSend = { 'reqdatey' : date.getFullYear(), 'reqdatem' : date.getMonth()+1, 'reqdated' : date.getDate(), 'tzinfo': 'America/Argentina/Buenos_Aires' };
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

});
