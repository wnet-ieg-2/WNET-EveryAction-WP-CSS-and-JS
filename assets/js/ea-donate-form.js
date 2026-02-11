/******************
******************
******************
***
*** 2026_WNET_Main_Theme_Form_Initializer - 07/19/2024.01
***
******************
******************
******************/
// @ts-nocheck
window.nvtag_callbacks = window.nvtag_callbacks || {};
var nvtag_callbacks = window.nvtag_callbacks;
nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
nvtag_callbacks.alterFormDefinition= nvtag_callbacks.alterFormDefinition|| [];
nvtag_callbacks.alterErrors = nvtag_callbacks.alterErrors || [];
nvtag_callbacks.alterRequireValid = nvtag_callbacks.alterRequireValid || [];
nvtag_callbacks.preSegue = nvtag_callbacks.preSegue || [];

function initializeFormVariables(args) {
      let formID = null;
      let additionalQuestion = [];
    
      // Check if args exists and has the nested structure we need
      if (args && 
          args.form_definition && 
          args.form_definition.formId) {
        formID = args.form_definition.formId;
      }
    
      // Check if form_elements exists before iterating
      if (args && 
          args.form_definition && 
          args.form_definition.form_elements && 
          Array.isArray(args.form_definition.form_elements)) {
        
        // @ts-ignore
        _.each(args.form_definition.form_elements, function (child) {
          if (child && 
              child.name === 'AdditionalInformation' && 
              child.children && 
              Array.isArray(child.children)) {
            additionalQuestion = child.children.slice(); // Use slice to copy the array
          }
        });
      }
      return { formID, additionalQuestion };
}

// Make initializeFormVariables globally accessible
window.initializeFormVariables = initializeFormVariables;


const _pageInfo = function(args) {

  if (args && args.thank === false) {
    // Initialize and set global variables
    const { formID, additionalQuestion } = initializeFormVariables(args);
    // Make them global by assigning to window
    // @ts-ignore
    window.formID = formID;
    // @ts-ignore
    window.additionalQuestion = additionalQuestion;
  }
  // console.log('Page Info', args);
  return args;
}

window.nvtag_callbacks.postRender.push(_pageInfo);


// Assign theme color to the selected amount button
const selectedAmtBtn = function () {
  // @ts-ignore
  const selectAmountInputs = $("input[name=SelectAmount]");
  if (selectAmountInputs.length > 0) {
    selectAmountInputs.each(function () {
      // @ts-ignore
      if ($(this).is(':checked')) {
        // @ts-ignore
        $(this).parent().addClass("selectAmount")
        // @ts-ignore
        setTimeout(() => { $(this).parent().css("color", "var(--color-white)") }, 10)
      } else {
        // @ts-ignore
        $(this).parent().removeClass("selectAmount")
        // @ts-ignore
        setTimeout(() => { $(this).parent().css("color", "var(--color-black)") }, 10)
      }
    });
  }
};

// listeners for selectedAmtBtn
const applySelectedAmtBtn = function (args) {
  // @ts-ignore
  $(document).ready(function (e) {
    // Overwrite Place Holder = Other
    // @ts-ignore
    $(".edit-otheramount").attr('placeholder', 'Other'); 
    // selectedAmtBtn = applys the white color for buttons
    selectedAmtBtn();
    const updateSelectedAmtBtn = () => {
      selectedAmtBtn();
  };

  // @ts-ignore
  $(document).on('click change', '.label-amount, .label-otheramount, .edit-otheramount', updateSelectedAmtBtn);
  // @ts-ignore
  $(document).on('focus', '.edit-otheramount', updateSelectedAmtBtn);

  });
  return args;
};


// Assigns the selected frequency button, EA does not assign it by default
 const initpostRender = function (args) {
    
  if (args.form_definition && args.form_definition.type === 'ContributionForm' && args.thank != true) {

        // @ts-ignore
        $(document).ready(function (e) {

        // Function to apply background color to checked radio button's label
        function applyBackgroundColor() {
            // @ts-ignore
            $('input[name="SelectedFrequency"]').each(function () {
            // @ts-ignore
            if ($(this).is(':checked')) {
                // @ts-ignore
                $(this).parent('label').addClass("freqChecked");
                applySelectedAmtBtn(args);
            } else {
                // @ts-ignore
                $(this).parent('label').removeClass("freqChecked");
            }
            });
        }
    
        // Apply background color initially
        applyBackgroundColor();
        // Apply background color on change and click
        // @ts-ignore
        $('input[name="SelectedFrequency"]').on('change click', function () {
            applyBackgroundColor();
        });
    });
    }
  return args;
};

nvtag_callbacks.postRender.push(initpostRender);

let displayPayWithCreditCard = function(args) {

    if (args.form_definition && args.form_definition.type === 'ContributionForm' && args.thank === false) {  
      // @ts-ignore
      $(document).ready(function() {
        const cc_radio_id = $(`#creditcard_radio_${window.formID} + label.at-btn-radio.large`);
        // console.log(cc_radio_id);
        setTimeout(() => {
          cc_radio_id.click();
        }, 0.5);  
      });
    } 
  return args;
}  

nvtag_callbacks.postRender.push(displayPayWithCreditCard);