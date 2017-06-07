$(function(){

  var $myForms = $(".forms-perso");
  $myForms.css("display", "none");
  $('.form-to-display').parent().parent().css("display", "block");

  // change the displayed form in function of the checkbox checked.
  $('input:radio').change(
    function(){
      if ($(this).is(':checked')) {
        $myForms.css("display", "none");
        $('#'+$(this).attr('value')).css("display", "block");
      } 
      else {
        $myForms.css("display", "none");
      }
    });

  $('.select-form-perso').change(
    function() {
      //alert('the value of the select has been set to : ' + $(this).find("option:selected").text());
      //alert($(this).attr('id'));

      $.ajax({
        type: 'POST' ,
        url: '/',
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        datatype: "json",
        async: true,
        data: { 
          'selected-id' : $(this).attr('id'),
          'value' : $(this).find('option:selected').text(),
        },

        success: function(json) {
          $(json.idTarget)
            .empty()
            .append('<option value selected="selected">---------</option>');
          $.each(json.elems, function(i, item){
            $(json.idTarget).append('<option value="'+item.id+'">'+item.Name+'</option>');
          });
        },
        error: function(){
          alert("error");
        }, 
        complete: function(){
//          alert("complete");
        } 
      });

    });
});
