// MWD - 07/09/2024
var nvtag_callbacks = nvtag_callbacks || {};
nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
window.nvtag_callbacks.alterErrors = window.nvtag_callbacks.alterErrors || [];
window.nvtag_callbacks.alterRequireValid = window.nvtag_callbacks.alterRequireValid || [];
window.nvtag_callbacks.postContributionAmountChanged = window.nvtag_callbacks.postContributionAmountChanged || [];

// Global variables
let formID = null;
let additionalChildren = []; // Temporary array to store children from AdditionalInformation

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
}

// listeners for selectedAmtBtn
const applyDefault = function (args) {
  $(document).ready(function (e) {
    // Overwrite Place Holder = Other
    $(".edit-otheramount").attr('placeholder', 'Other'); 
    // selectedAmtBtn = applys the white color for buttons
    $(document).on('click', '.label-amount', function () { selectedAmtBtn();});
    $(document).on('change', '.label-amount', function () { selectedAmtBtn();});
    $(document).on('click', '.label-amount', function () { selectedAmtBtn();});
    $(document).on('change', '.label-amount', function () { selectedAmtBtn();});
    $(document).on('click', '.label-otheramount', function () { selectedAmtBtn();});
    $(document).on('change', '.label-otheramount', function () { selectedAmtBtn();});
    $(document).on('change', '.edit-otheramount', function () { selectedAmtBtn();});
    $(document).on('click', '.edit-otheramount', function () { selectedAmtBtn();});
    $(document).on('change', '.edit-otheramount', function () { selectedAmtBtn();});
    $(document).on('focus', '.edit-otheramount', function () { selectedAmtBtn();});
    selectedAmtBtn();
    return args;
  });
  
}

// Get FormID for Additional Questions
const getFormId = function(args){
  // console.log(args)
  if (args && args.form_definition ) {
     formID = args.form_definition.formId;
  }
  return args;
}

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
}


// Function to handle postRender logic
const initpostRender = function (args) {

  if (args && args.form_definition && args.form_definition.form_elements) {
    var contributionInfo;

    // Loop through form elements to find ContributionInformationn
    for (var i = 0; i < args.form_definition.form_elements.length; i++) {
      var topLevel = args.form_definition.form_elements[i];
      if (topLevel && topLevel.name === 'ContributionInformation') {
        contributionInfo = topLevel;
      }
    }

    // Handle ContributionInformation children
    if (contributionInfo && contributionInfo.children) {
      var selectedFrequency;
      for (var j = 0; j < contributionInfo.children.length; j++) {
        var child = contributionInfo.children[j];
        // console.log(child)
        if (child && child.name === "SelectedFrequency") {
          selectedFrequency = child;
         
        }
      }

      // If SelectedFrequency is found, apply background color on change
      if (selectedFrequency) {
        // Function to apply background color to checked radio button's label
        function applyBackgroundColor() {
          $('input[name="SelectedFrequency"]').each(function () {
            if ($(this).is(':checked')) {
              $(this).parent('label').addClass("freqChecked");
              applyDefault(args);
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
      }
    }
  }

  return args;
}

// Get Additional Questions
const getAdditionalQuestions = function (args){
  // First pass: Collect children from AdditionalInformation
  _.each(args.form_definition.form_elements, function (child) {
    if (child.name === 'AdditionalInformation') {
      // Store children of AdditionalInformation
      additionalChildren = child.children.slice(); // Use slice to copy the array
    }
  });
}

// Move Sustainer Member Field
var moveSustainerMemberField = function (args) {
  $(document).ready(function () {
    var sustainerMember = $('input[name='+additionalChildren[0].name+']').closest('.at-row');
    var prefixField = $('input[name="Prefix"]').closest('.at-row');

    if (sustainerMember.length && prefixField.length) {
      sustainerMember.insertBefore(prefixField);
    }

    // Function to handle frequency changes
    function handleFrequencyChange() {
      var frequency = $('input[name="SelectedFrequency"]');
      frequency.each(function () {
        if ($(this).is(':checked')) {
          var frequencyValue = $(this).val();
        
          if (frequencyValue === '4') {
            sustainerMember.show();
            sustainerMember.find('input').prop('checked', false);
          } else if (frequencyValue === '0') {
            sustainerMember.hide();
            sustainerMember.find('input').prop('checked', false);
          }
        }
      });
    }

    // Initial check
    handleFrequencyChange();
    // Bind change event
    $('input[name="SelectedFrequency"]').on('change', handleFrequencyChange);
  });

  return args;
}

// Move Yes, I would like to receive emails from WNET/ALL ARTS
var addReceiveEmailsField = function (args) {
  $(document).ready(function () {
    var addReceiveEmailsField = $('input[name=' + additionalChildren[1].name + ']').closest('.at-row');
    var targetField = $('#NVContributionForm' + formID + '-ContactInformation .at-fields');
    if (addReceiveEmailsField.length && targetField.length) {
        addReceiveEmailsField.insertAfter(targetField);
    }
  });
  return args;
}

// Move Yes, I would like to receive texts from WNET/ALL ARTS
var moveReceiveTextsField = function (args) {
  $(document).ready(function () {
    var moveReceiveTextsField = $('input[name=' + additionalChildren[2].name + ']').closest('.at-row');
    var targetField = $('#NVContributionForm' + formID + '-ContactInformation .at-fields');
    if (moveReceiveTextsField.length && targetField.length) {
      moveReceiveTextsField.insertAfter(targetField);
    }
  });
  return args;
}

// Move Yes, I would like to be connected to my local PBS station
var moveBeConnectedField = function (args) {
  $(document).ready(function () {
    var moveBeConnectedField = $('input[name=' + additionalChildren[3].name + ']').closest('.at-row');
    var targetField = $('#NVContributionForm' + formID + '-ContactInformation .at-fields');
    if (moveBeConnectedField.length && targetField.length) {
      moveBeConnectedField.insertAfter(targetField);
    }
  });
  return args;
}

// Modify the AdditionalInformation checkbox copy
var addAutoRenewalSubscriptionCopy = function (args) {
  let emailCopy = `or emailing <a href='mailto:membership@wnet.org'>membership@wnet.org</a>.`;
  let urlAdd = `You also acknowledge and agree to the full Terms of Service located at <a href='https://www.wnet.org/about/terms-of-service/' target='_blank'>https://www.wnet.org/about/terms-of-service/</a>`;
  let mainCopy = $('#'+ 'NVContributionForm' + formID +'-AdditionalInformation-' +  additionalChildren[4].name + '-label').html();
  let label = $('#'+ 'NVContributionForm' + formID +'-AdditionalInformation-' +  additionalChildren[4].name + '-label');
  // Update the HTML content of the label element
  label.html(mainCopy + emailCopy + urlAdd);

  return args;
};


// Handle Auto Renewal Subscription Checkbox
window.nvtag_callbacks.alterRequireValid.push(function (args) {
  // console.log(args)
  let autoRenewalSubscriptionCheckbox = $('input[name=' + additionalChildren[4].name + ']').closest('.at-row');
  let fieldSet = autoRenewalSubscriptionCheckbox.children();

  $("input[name=SelectedFrequency]").each(function () {
    // One-Time
    if ($(this)[0].value === '0' && $(this).is(':checked')) {
      if (fieldSet[0]) {
      let fieldStatus = fieldSet[0].children[0].checked;
        fieldSet[0].style.display = 'none';
        fieldSet[0].children[0].checked = false; // Uncheck the checkbox
        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
        }
    }
    // Monthly
    if ($(this)[0].value === '4' && $(this).is(':checked')) {
      if (fieldSet[0]) {
      let fieldStatus = fieldSet[0].children[0].checked;
          fieldSet[0].style.display = 'block';
        if(fieldStatus === false) {
         $('input.at-submit.btn-at.btn-at-primary').prop('disabled', true);
        }
      }
    }

  })

  function handleCheckBox() {
    let isChecked = $(this)[0].children[0].checked;
    if (isChecked === false) {
      $('input.at-submit.btn-at.btn-at-primary').prop('disabled', true);
    } else {
      $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
    }
  }

  $('label.' + additionalChildren[4].name).on('click', handleCheckBox)

  return args;
})

// Show Passport Alert Amount Alert for One-Time Donation
var passPortAlertAmount = function (amnt) {
  var shown = false;
  var otherAmount = amnt;
  // console.log(otherAmount)
  if (shown === false) {
    $("input[name=SelectedFrequency]").each(function () {
      if ($(this)[0].value === '0' && $(this).is(':checked')) {
        $("input[name=SelectAmount]").each(function () {
          if ((otherAmount <= 59.00) && $(this).is(':checked')) {
            console.log(otherAmount)
            $('#passPortAlertAmount').show();
            shown = true;
          } else {
            $('#passPortAlertAmount').hide();
          }
        });
      }
    });
  }
}


// Call passPortAlertAmount for Other OT value
window.nvtag_callbacks.alterErrors.push(function (args) {
   if (passPortOneTimeError === true) {
    if (args.field_name === 'SelectAmount') {
      // Other Amount
      otherAmt = args.val
      otherNumVal = parseInt(otherAmt)
      $("input[name=SelectedFrequency]").each(function () {
        if ($(this)[0].value === '0' && $(this).is(':checked') && otherNumVal !== 0) {
          passPortAlertAmount(otherNumVal)
        }
      });
    }
   }
  // console.log(args)
  return args;
})


// Register functions to callbacks
// nvtag_callbacks.postRender
nvtag_callbacks.postRender.push(getFormId);
nvtag_callbacks.postRender.push(editPrefix);
nvtag_callbacks.postRender.push(initpostRender);
nvtag_callbacks.postRender.push(addAutoRenewalSubscriptionCopy);
// nvtag_callbacks.alterRequireValid
nvtag_callbacks.alterFormDefinition.push(getAdditionalQuestions);
nvtag_callbacks.alterFormDefinition.push(moveSustainerMemberField);
nvtag_callbacks.alterFormDefinition.push(moveBeConnectedField);
nvtag_callbacks.alterFormDefinition.push(moveReceiveTextsField);
nvtag_callbacks.alterFormDefinition.push(addReceiveEmailsField);