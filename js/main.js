(function(){

  "use strict";

  $(document).ready(initialize);

  function initialize(){
    $("#submit").click(calculateTotal);
    $("input, select").change(calculateTotal);
    $("#registration").change(setDefaultRegistrationValue);
    $(".fa.fa-venus-double").click(verifyAge);

  }


  function setDefaultRegistrationValue(){
    $("input[name=quantity]:checked").val(1);
    calculateTotal();
  }

  function verifyAge(){
    var age = prompt("Please verify your age");

    console.log("age1", age)
    if(age >= 18){
      window.location.href ="file:///Users/betteyouwill/Code/eddie_lane_dorsey/stories.html"
      // window.location.href ="http://www.eddielanedorsey.com/stories.html"
    }else{
      console.log("BUG")
      window.location.href ="http://www.google.com"
      // window.location.href ="http://www.eddielanedorsey.com/index.html"
      alert("Can not enter this area.")
    }
    console.log("age", age)
    return age
  }

  function showInMemory(){
    if($('input[name="in_memory"]:checked').val() == "Yes"){
      $('.memory_wrapper').show();
    }else{
      $('.memory_wrapper').hide();
    }
  }


  function showDonation(){
    if($('input[name="donation"]:checked').val() == "Yes"){
      $('.donation_wrapper').show();
      $('.additional_amount_wrapper').show();
    }else{
      $('.donation_wrapper').hide();
      $('.additional_amount_wrapper').hide();
    }
  }

  function showTShirt(){
    if($('input[name="participation_type"]:checked').val() == "Drummer"){
      $('.tshirt_wrapper').show();
      $('.additional_tshirt_wrapper').show();
      $('.equipment_wrapper').hide();
    }else if($('input[name="participation_type"]:checked').val() == "Drum Circle"){
      $('.tshirt_wrapper').show();
      $('.additional_tshirt_wrapper').show();
      $('.equipment_wrapper').show();
    }else{
      $('.tshirt_wrapper').hide();
      $('.additional_tshirt_wrapper').show();
      $('.equipment_wrapper').hide();
    }
  }

  function showOther(){
    if($('input[name="instrument"]:checked').val() == "other"){
      $('#other_instrument').show();
    }else{
      $('#other_instrument').hide();
    }
  }


  function calculateParticipation(){
    var price = 0;
    if($('input[name="participation_type"]:checked').val() == "Drummer"){
      var price = 75;
    }else if($('input[name="participation_type"]:checked').val() == "Drum Circle"){
      var price = 45;
    }else if($('input[name="participation_type"]:checked').val() == "Drum Circle Jr"){
      var price = 20;
    }else if($('input[name="participation_type"]:checked').val() == "Online Drum Circle"){
      var price = 25;
    }else{
      var price = 0;
    }
    return price;
  }

  function additionalTshirts(){
    var tShirstPrice = 0;
    if($('.additional_shirts option:selected').val() > 0){
      var tShirstPrice = (($('.additional_shirts option:selected').val() *1) * 15);
    }else{
      var tShirstPrice = 0;
    }
    return tShirstPrice;
  }

  function findOtherInstrument(){
    var instrument = '';
    if($('input[name="instrument"]:checked').val() == "other"){
      var instrument = ($('#other_instrument').val())
    }else{
      var instrument = ($('input[name="instrument"]:checked').val());
    }
    return instrument;
  }

  function calculateOtherContribution(){
    var otherContribution = 0;
    if($('input[name="donation_amount"]:checked').val() == "25"){
      $("#other_amount").hide();
      var otherContribution = 25;
    }else if($('input[name="donation_amount"]:checked').val() == "50"){
      $("#other_amount").hide();
      var otherContribution = 50
    }else if($('input[name="donation_amount"]:checked').val() == "100"){
      $("#other_amount").hide();
      var otherContribution =100
    }else if($('input[name="donation_amount"]:checked').val() == "500"){
      $("#other_amount").hide();
      var otherContribution = 500
    }else if($('input[name="donation_amount"]:checked').val() == "1000"){
      $("#other_amount").hide();
      var otherContribution = 1000
    }else if($('input[name="donation_amount"]:checked').val() == "custom"){
      $("#other_amount").show();
      $("#additional_donation_wrapper").show();
      var otherContribution = 0;
      var $amount = parseInt($("input[name=other_amount]").val().replace(/\$/g, ''));
      otherContribution = (isNaN($amount)) ? 0 : $amount;
    }else{
     var otherContribution = 0;
    }
    return otherContribution
  }

  function setAdditionalTShirtFields(){
    $('#additional_t_shirts_sizes').html(' ')
    $('#additional_t_shirts_sizes').html()
    var full_quantity = ($('.additional_shirts option:selected').val());
    if (full_quantity > 0){
      $('.walker-instructions').html('<em>Please fill out all the required information below.</em>')
    }else{
      $('.walker-instructions').html('')
    }
    var quantity = ($('.additional_shirts option:selected').val());
    if ( quantity != NaN && quantity > 0){
      var i = 0
       for (i; i < quantity; i++) {
          $('#additional_t_shirts_sizes').append('<div class="attendee-block adult_' + i + '">\
                 <div class="attendee-header">\
                   <h4>Add On T-Shirt ' + (i + 1 )+ '</h5>\
                 </div>\
                <div class="form-wrapper full">\
                  <label>Size *\
                    <select class="additional_t_shirt_size" id="'+ i +'_additional_t_shirt_size" name="'+ i +'_additional_t_shirt_size">\
                      <option value=""></option>\
                      <option value="large">Large</option>\
                      <option value="x-large">X-Large</option>\
                    </select>\
                    </label>\
              </div>')
      }

      //FORM VALIDATIONS
      $(".individual-type-form").find(".additional_t_shirt_size").each(function () {
        $(this).rules('add', {
          required: true
        });
      });
    }else{
       $('#additional_t_shirts_sizes').html('');
    }
  }

  function calculateTotal(){
    var participation   = calculateParticipation();
    var Tshirts         = additionalTshirts();
    var otherAmount     = calculateOtherContribution();
    var total           = (participation + Tshirts + otherAmount);

    $("#total").text(total);
  }




})();
