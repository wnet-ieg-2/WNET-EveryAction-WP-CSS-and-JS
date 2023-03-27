// MWD - ea-donate-form.js

var nvtag_callbacks = window.nvtag_callbacks = window.nvtag_callbacks || {};
nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
nvtag_callbacks.alterFormDefinition = nvtag_callbacks.alterFormDefinition || [];
window.nvtag_callbacks.alterErrors = window.nvtag_callbacks.alterErrors || [];

var wnePostRender = function (args) {

  $(".PremiumGift").append("<div id='gift-overlay'><div id='g-overlay-copy'></div></div>");
  $("#g-overlay-copy").append("<h4>For Monthly Donors</h4>")
  // console.log( $('[id*="_NVContributionForm_"]'))
  var applyCss;
  var timeout;


  $(document).scroll(function () {
    var height = $(window).scrollTop();
    // console.log( height)
    if (height > 0) {
      $("span span.text i").css("font-weight", "bold");
      $("span span.text b").css("font-weight", "bold");
    }
  });

  $("fieldset.at-fieldset.AdditionalInformation").prependTo("fieldset.at-fieldset.ContactInformation");

  function callTimeout() {
    timeout = setTimeout(otherInput, 0);
  }

  function otherInput() {
    $(".edit-otheramount").attr('placeholder', 'Other');
  }

  function callCSSStyles() {
    applyCss = setTimeout(cssApplied, 0.50)
  }
 
  function cssApplied() {
    $("div.at-radio").css("margin", "0");
  }
  
  var SelectedFrequencyBtn = function () {
    cssApplied();
    $("input[name=SelectedFrequency]").each(function () {
      displayPremium()
      if ($(this).is(':checked')) {
        $(this).parent().css("background-color", "#007DA3")
        $(this).parent().css("border", "2px solid #007DA3")
        $(this).parent().css("color", "#ffffff")
        callTimeout()
      } else {
        $(this).parent().css("background-color", "#ffffff")
        $(this).parent().css("border", "2px solid #8f8f8f")
        $(this).parent().css("color", "#000000")
        callTimeout()
      }
    });
  }

  var selectedButton = function(){
    cssApplied()
    $("input[name=SelectAmount]").each(function () {
      if ($(this).is(':checked')) {
        $(this).parent().css("color", "#ffffff")
        
      } else {
        $(this).parent().css("color", "#000000")
      }
    });
  }

  var displayPremium = function () {
    selectedButton()
    cssApplied()
    var def = args.form_definition;
    if (def.type !== 'ContributionForm') return;

    var one_time = $("label.at-radio-label-0").children().is(':checked');
    if (one_time) {
      $("fieldset.at-fieldset.Premiums").hide();
      $('#gift-0').click();
      $('div#gift-overlay').show();
    } else {
      $("fieldset.at-fieldset.Premiums").show();
      $('div#gift-overlay').hide();
    }
  }


  $(document).ready(function (e) {
    selectedButton();
    // Apply True to gift, it's not checked even when set in page builder
    $(function () {
      var $radios = $('input:radio[name=gift]');
      if ($radios.is(':checked') === false) {
        $radios.filter('[value=0]').prop('checked', true);
      }
      // Same for Frequency
      var $SelectedFrequency = $('input:radio[name="SelectedFrequency"]');
      if ($SelectedFrequency.is(':checked') === false) {
        $SelectedFrequency.filter('checked').prop('checked', true);
      }
      SelectedFrequencyBtn();
      $("input[name=SelectedFrequency]").change(SelectedFrequencyBtn);
    
    });
      // Modify title or Prefix and add to datalist
  var dataList = jQuery('#at-prefixes');
  dataList[0].options[0].value = "--Select--";
  dataList[0].options[0].disabled = true;
  dataList[0].options[1].value = "Mr.";
  dataList[0].options[2].value = "Mr. & Mrs";
  dataList[0].options[3].value = "Mr. & Mr.";
  dataList[0].options[4].value = "Mrs. & Mrs.";
  dataList[0].options[5].value = "Ms.";
  var prefixAdd = ['Mrs.', 'Miss.', 'Dr.', 'Dr.& Mrs.', 'Dr. & Mr.'];

    $.each(prefixAdd, function (i, item) {
      $("input[name=Prefix]").addClass('preDD');
      $("#at-prefixes").append($("<option>").attr('value', item));
    });

    callTimeout()
    callCSSStyles()
  });

  // Page Builder Custom Footer CTA's links for Modals 
  $('span#footerCTA-1').click(function (e) { e.preventDefault(); $('div#cta-01').show(); });
  $('span#footerCTA-2').click(function (e) { e.preventDefault(); $('div#cta-02').show(); });
  $('.w3-modal').click(function (e) { e.preventDefault(); $(this).hide(); });

// console.log(selectAmount)
  return args;
}

// function addSusUpdateCheckBox(args) {
//   _.each(args.form_definition.form_elements, function (child) {
//     if (child.name === 'ContactInformation') {
//       susUpdate = {
//         name: 'SustainerUpdate',
//         title: "I'm a current sustaining member and I'm updating my information",
//         default_value: true,
//         type: 'checkbox',
//         queryString: '',
//         checked: true,
//         id: '_susUpdate',
//         required: false
//       };
//       child.children.push(susUpdate);
//       return;
//     }
//   });
//   return args;
// }


// Implementation of an alterFormDefinition Callback
// var alterFormEmailCheckBox = function (args) {
//   console.log(args.form_definition.form_elements[5].children[11])
//   // args.form_definition.form_elements[5].children[11].title = "Yes, I would like to receive emails from WNET/THIRTEEN";
//   return args;
// };

nvtag_callbacks.postRender.push(wnePostRender);
// nvtag_callbacks.alterFormDefinition.push(addSusUpdateCheckBox);
// nvtag_callbacks.alterFormDefinition.push(alterFormEmailCheckBox);


var nvtag_callbacks = nvtag_callbacks || {};
nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
window.nvtag_callbacks.alterRequireValid = window.nvtag_callbacks.alterRequireValid || [];
var showModal = false;
var hideGiftAdd = true;
var freq;
var otherAmt;

$(document).on('click','input[name="SelectAmount"]',function(){

  var target = $(this).prop("defaultValue")
  if(showModal){
    if( target === '5.00' && freq === '4'){
      $('#giftSug').show()
     }
     if(target === '10.00' && freq === '4'){
      $('#giftSug').show()
     }
  }
});

$(document).on('click','#yesplease',function(e){
 e.preventDefault();
 $('#gift-9').click()
});

var checkFreqAndBtn = function(){
  setTimeout(function() {
    $("input[name=SelectAmount]").each(function () {
      if ($(this).is(':checked')) {
        $(this).parent().css("color", "#ffffff")
        $("div.at-radio").css("margin", "0");
      } else {
        $(this).parent().css("color", "#000000")
      }
    });
  }, 10);
  $("div.at-radio").css("margin", "0");
}

var selectedGift = function () {

  if(hideGiftAdd === true){
    $("fieldset.ShippingInformation").hide();
    // console.log($("fieldset.ShippingInformation"))
  }

  setTimeout(function() {
    $("input[name=gift]").each(function () {
      if ($(this).is(':checked')) {
        $(this).parent().css("border", "2px solid #007DA3")
      } else {
        $(this).parent().css("border", "2px solid #8f8f8f")
      }
    });
  }, 5);
}

$(document).on('click','.label-amount',function(){
  checkFreqAndBtn();
 });

 $(document).on('change','.label-amount',function(){
  checkFreqAndBtn();
 });
 
 $(document).on('click','.at-radio-label-0',function(){
  checkFreqAndBtn();
});

$(document).on('click','.at-radio-label-4',function(){
  checkFreqAndBtn();
  $('div#gift-overlay').hide();
});

$(document).on('click','input[name=SelectedFrequency]',function(){
  checkFreqAndBtn();
});

$(document).on('click','.label-otheramount',function(){
  checkFreqAndBtn();
});
$(document).on('click','.edit-otheramount',function(){
  checkFreqAndBtn();
});

$(document).on('click','.gift-description',function(){
  checkFreqAndBtn();
});

$(document).on('click','.description',function(){
  checkFreqAndBtn();
});

// $(document).on('click','.at-gift',function(){
//   selectedGift();
// });

// $(document).on('change','.at-gift',function(){
//   selectedGift();
// });

window.nvtag_callbacks.alterRequireValid.push(function(args) {
  // selectedGift()
 freq = args.val;
 return args;
});


window.nvtag_callbacks.alterErrors = window.nvtag_callbacks.alterErrors || [];

window.nvtag_callbacks.alterErrors.push(function (args) {
    if (args.field_name === 'SelectAmount') {
      otherAmt = args.val
      checkFreqAndBtn();
    }
    return args;
});

