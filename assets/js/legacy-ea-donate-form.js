
/******************
******************
******************
***
*** MWD - 07/19/2024.01
***
******************
******************
******************/

// var nvtag_callbacks = nvtag_callbacks || {};
// nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
// window.nvtag_callbacks.alterErrors = window.nvtag_callbacks.alterErrors || [];
// window.nvtag_callbacks.alterRequireValid = window.nvtag_callbacks.alterRequireValid || [];


window.nvtag_callbacks = window.nvtag_callbacks || {};
var nvtag_callbacks = window.nvtag_callbacks;
nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
nvtag_callbacks.alterFormDefinition= nvtag_callbacks.alterFormDefinition|| [];
nvtag_callbacks.alterErrors = nvtag_callbacks.alterErrors || [];
nvtag_callbacks.alterRequireValid = nvtag_callbacks.alterRequireValid || [];
nvtag_callbacks.preSegue = nvtag_callbacks.preSegue || [];
nvtag_callbacks.postContributionAmountChanged || [];

// Assign theme color to the selected amount button
const selectedAmtBtn = function () {
  $("input[name=SelectAmount]").each(function () {
    if ($(this).is(':checked')) {
      $(this).parent().addClass("selectAmount")
      setTimeout(() => { $(this).parent().css("color", "var(--amount-selected-color)") }, 10)
    } else {
      $(this).parent().removeClass("selectAmount")
      setTimeout(() => { $(this).parent().css("color", "var(--amount-selected-color-default)") }, 10)
    }
  });
};

// listeners for selectedAmtBtn
const applySelectedAmtBtn = function (args) {
  $(document).ready(function (e) {
    // Overwrite Place Holder = Other
    $(".edit-otheramount").attr('placeholder', 'Other'); 
    // selectedAmtBtn = applys the white color for buttons
    selectedAmtBtn();

    const updateSelectedAmtBtn = () => {
      selectedAmtBtn();
  };

  $(document).on('click change', '.label-amount, .label-otheramount, .edit-otheramount', updateSelectedAmtBtn);
  $(document).on('focus', '.edit-otheramount', updateSelectedAmtBtn);

  });
  return args;
};

// Adjust Prefix Field List
const editPrefix = function (args) {
  // Get the existing datalist with the id "at-prefixes"
  var datalistPrefix = document.getElementById('at-prefixes');

  var newOptionsHtml = '' +
    '<option value="Dr."></option>' +
    '<option value="Mr."></option>' +
    '<option value="Mr. & Mrs"></option>' +
    '<option value="Ms."></option>' +
    '<option value="Mrs."></option>' +
    '<option value="Miss."></option>' +
    '<option value="Dr. & Mrs."></option>' +
    '<option value="Dr. & Mr."></option>';

  // Update the existing datalist with new options
  datalistPrefix.innerHTML = newOptionsHtml;
  return args;
};

// Assigns the selected frequency button, EA does not assign it by default
const initpostRender = function (args) {
  $(document).ready(function (e) {
      // Function to apply background color to checked radio button's label
      function applyBackgroundColor() {
        $('input[name="SelectedFrequency"]').each(function () {
          if ($(this).is(':checked')) {
            $(this).parent('label').addClass("freqChecked");
            applySelectedAmtBtn(args);
          } else {
            $(this).parent('label').removeClass("freqChecked");
          }
        });
      }
  
      // Apply background color initially
      applyBackgroundColor();
      // Apply background color on change and click
      $('input[name="SelectedFrequency"]').on('change click', function () {
        applyBackgroundColor();
      });
  });
  return args;
};

// nvtag_callbacks.postRender
// nvtag_callbacks.postRender.push(editPrefix);
nvtag_callbacks.postRender.push(initpostRender);


let displayPayWithCreditCard = function(args) {

    if (args.form_definition && args.form_definition.type === 'ContributionForm' && args.thank === false) {  
      // @ts-ignore
      $(document).ready(function() {
        const cc_radio_id = $(`div.at-btn-radio-wrapper.at-credit-card-button-wrapper > label`);
        // const cc_radio_id = $(`#creditcard_radio_${window.formID} + label .at-btn-radio.large`);
      // console.log(cc_radio_id);
        setTimeout(() => {
          cc_radio_id.click();
        },500);  
      });
    } 
  return args;
}  

nvtag_callbacks.postRender.push(displayPayWithCreditCard);
