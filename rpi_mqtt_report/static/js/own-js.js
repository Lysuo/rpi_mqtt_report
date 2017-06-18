$(function(){

  var currDate = new Date();
  var today = new Date();
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  $('#date-visu').append(currDate.toString());
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

  function displayTempHum (t, h) {
    var html = "TEMP: "+t+"°C";
    html += "RH: "+h+"%";
    $('#tempHumDisplay').append(html);
  };

  startMQTT();

  function getData (dir) {

    // date for retrieving data
    currDate = getNextDate(currDate, dir);
    $('#date-visu-graph').empty();
    $('#date-visu-graph').append(dayNames[currDate.getDay()]+" "+currDate.getDate().toString()+" "+monthNames[currDate.getMonth()]+" "+currDate.getFullYear().toString());

    // disable/enable next button dep on date (user cannot ask for future dates)
    if (today.getDate() == currDate.getDate() && today.getFullYear() == currDate.getFullYear() && today.getMonth() == currDate.getMonth()) {
      $('#next-date').prop('disabled', 'true');
    } else {
      $('#next-date').removeAttr('disabled');
    }


    // postData
    dataToSend = { 'reqdatey' : currDate.getFullYear(),
      'reqdatem' : currDate.getMonth()+1,
      'reqdated' : currDate.getDate(),
      'tzinfo': 'America/Argentina/Buenos_Aires',
      'npph' : 2
    };

    $.ajax({
      type: 'POST',
      cache: false,
      url: '/restapi/sensorData/',
      datatype: "json",
      async: true,
      data: dataToSend,

      success: function(json) {

        dataBarChart = json;

        if (dataBarChart.length != 0) {
          $('#data-visualisation').empty();
          $('#data-visualisation').append('<svg id="visualisation" width="'+fWidth+'" height="'+fHeight+'"></svg>');
          drawBarChart();
        } else {
          cleanBarChart();
          $('#data-visualisation').empty();
          $('#data-visualisation').append('<h3>NO DATA FOR THIS DATE</h3>');
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
