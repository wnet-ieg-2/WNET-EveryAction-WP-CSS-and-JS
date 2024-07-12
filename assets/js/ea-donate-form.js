// MWD - 07/11/2024
var nvtag_callbacks = nvtag_callbacks || {};
nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
window.nvtag_callbacks.alterErrors = window.nvtag_callbacks.alterErrors || [];
window.nvtag_callbacks.alterRequireValid = window.nvtag_callbacks.alterRequireValid || [];
window.nvtag_callbacks.postContributionAmountChanged = window.nvtag_callbacks.postContributionAmountChanged || [];

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
  });
  return args;
};

// nvtag_callbacks.postRender
nvtag_callbacks.postRender.push(editPrefix);
nvtag_callbacks.postRender.push(initpostRender);

// Additional Questions to move
// Move I'm a current sustaining member and I'm updating my information
const moveSustainerMemberField = function (args) {
  let formID;
  let additionalChildren = []; // Temporary array to store children from AdditionalInformation
  if (args && args.form_definition ) {
    formID = args.form_definition.formId;
  }
  _.each(args.form_definition.form_elements, function (child) {
    if (child.name === 'AdditionalInformation') {
      // Store children of AdditionalInformation
      additionalChildren = child.children.slice(); // Use slice to copy the array
    }
  });

  $(document).ready(function (){
    let sustainerMember = $('.'+ additionalChildren[0].name);
    let prefixField = $('input[name="Prefix"]').closest('.at-row');

    if (sustainerMember.length && prefixField.length) {
      sustainerMember.insertBefore(prefixField);
    }

    // Function to handle frequency changes
    function handleFrequencyChange() {
      let frequency = $('input[name="SelectedFrequency"]');
      frequency.each(function () {
        if ($(this).is(':checked')) {
          let frequencyValue = $(this).val();
        
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
  }); // End of document ready

  return args;
};

// Move Yes, I would like to receive emails from WNET/ALL ARTS
const moveRecieveEmailsField = function(args){
  let formID;
  let additionalChildren = []; // Temporary array to store children from AdditionalInformation
  if (args && args.form_definition ) {
    formID = args.form_definition.formId;
  }
  _.each(args.form_definition.form_elements, function (child) {
    if (child.name === 'AdditionalInformation') {
      // Store children of AdditionalInformation
      additionalChildren = child.children.slice(); // Use slice to copy the array
    }
  });

  $(document).ready(function (){
    let receiveEmails = $('.'+ additionalChildren[1].name);
    let targetField = $('#NVContributionForm' + formID + '-ContactInformation .at-fields');

    if (receiveEmails.length && targetField.length) {
        receiveEmails.insertAfter(targetField);
     }
  }); // End of document ready

  return args;
};

// Move Yes, I would like to receive texts from WNET/ALL ARTS
const moveReceiveTextsField = function(args){
  let formID;
  let additionalChildren = []; // Temporary array to store children from AdditionalInformation
  if (args && args.form_definition ) {
    formID = args.form_definition.formId;
  }
  _.each(args.form_definition.form_elements, function (child) {
    if (child.name === 'AdditionalInformation') {
      // Store children of AdditionalInformation
      additionalChildren = child.children.slice(); // Use slice to copy the array
    }
  });

  $(document).ready(function (){
    let receiveTexts = $('.'+ additionalChildren[2].name);
    let targetField = $('#NVContributionForm' + formID + '-ContactInformation .at-fields');

    if (receiveTexts.length && targetField.length) {
        receiveTexts.insertAfter(targetField);
     }

  }); // End of document ready

  return args;
};

// Yes, I would like to be connected to my local PBS station
const moveBeConnectedField = function(args){
  let formID;
  let additionalChildren = []; // Temporary array to store children from AdditionalInformation
  if (args && args.form_definition ) {
    formID = args.form_definition.formId;
  }
  _.each(args.form_definition.form_elements, function (child) {
    if (child.name === 'AdditionalInformation') {
      // Store children of AdditionalInformation
      additionalChildren = child.children.slice(); // Use slice to copy the array
    }
  });

  $(document).ready(function (){
    let beConnected = $('.'+ additionalChildren[3].name);
    let targetField = $('#NVContributionForm' + formID + '-ContactInformation .at-fields');

    if (beConnected.length && targetField.length) {
        beConnected.insertAfter(targetField);
     }
    // console.log(formID)
    // console.log(additionalChildren[3])
    // console.log(additionalChildren[3].name)
    // console.log(additionalChildren[3].title)
    // console.log(beConnected)
  }); // End of document ready

  return args;
};

const updateAutoRenewalSubscriptionCopy = function (args) {
  // Update the text for the auto renewal subscription
  let formID;
  let additionalChildren = []; // Temporary array to store children from AdditionalInformation
  if (args && args.form_definition ) {
    formID = args.form_definition.formId;
  }
  _.each(args.form_definition.form_elements, function (child) {
    if (child.name === 'AdditionalInformation') {
      // Store children of AdditionalInformation
      additionalChildren = child.children.slice(); // Use slice to copy the array
    }
  });

  $(document).ready(function (){
    let emailCopy = `or emailing <a href='mailto:membership@wnet.org'>membership@wnet.org</a>.`;
    let urlAdd = `You also acknowledge and agree to the full Terms of Service located at <a href='https://www.wnet.org/about/terms-of-service/' target='_blank'>https://www.wnet.org/about/terms-of-service/</a>`;
    let mainCopy = $('#'+ 'NVContributionForm' + formID +'-AdditionalInformation-' +  additionalChildren[4].name + '-label').html();
    let label = $('#'+ 'NVContributionForm' + formID +'-AdditionalInformation-' +  additionalChildren[4].name + '-label');
    // Update the HTML content of the label element
    label.html(mainCopy+ ' '+ emailCopy + ' ' + urlAdd);
    }); // End of document ready

  return args;
};

// Handle Auto Renewal Subscription Checkbox
window.nvtag_callbacks.alterRequireValid.push(function (args) {
 
  // let formID;
  // let additionalChildren = []; // Temporary array to store children from AdditionalInformation
  // if (args && args.form_definition ) {
  //   formID = args.form_definition.formId;
  // }

  // _.each(args.form_definition.form_elements, function (child) {
  //   if (child.name === 'AdditionalInformation') {
  //     // Store children of AdditionalInformation
  //     additionalChildren = child.children.slice(); // Use slice to copy the array
  //   }
  // });

      // console.log(formID)
    // console.log(additionalChildren[3])
    // console.log(additionalChildren[3].name)
    // console.log(additionalChildren[3].title)
    // console.log(beConnected)

  // console.log(args)
  // let autoRenewalSubscriptionCheckbox = $('input[name=' + additionalChildren[4].name + ']').closest('.at-row');
  // let fieldSet = autoRenewalSubscriptionCheckbox.children();

  // $("input[name=SelectedFrequency]").each(function () {
  //   // One-Time
  //   if ($(this)[0].value === '0' && $(this).is(':checked')) {
  //     if (fieldSet[0]) {
  //     let fieldStatus = fieldSet[0].children[0].checked;
  //       fieldSet[0].style.display = 'none';
  //       fieldSet[0].children[0].checked = false; // Uncheck the checkbox
  //       $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
  //       }
  //   }
  //   // Monthly
  //   if ($(this)[0].value === '4' && $(this).is(':checked')) {
  //     if (fieldSet[0]) {
  //     let fieldStatus = fieldSet[0].children[0].checked;
  //         fieldSet[0].style.display = 'block';
  //       if(fieldStatus === false) {
  //        $('input.at-submit.btn-at.btn-at-primary').prop('disabled', true);
  //       }
  //     }
  //   }

  // })

  // function handleCheckBox() {
  //   let isChecked = $(this)[0].children[0].checked;
  //   if (isChecked === false) {
  //     $('input.at-submit.btn-at.btn-at-primary').prop('disabled', true);
  //   } else {
  //     $('input.at-submit.btn-at.btn-at-primary').prop('disabled', false);
  //   }
  // }

  // $('label.' + additionalChildren[4].name).on('click', handleCheckBox)
  console.log(args)
  return args;
})

nvtag_callbacks.postRender.push(moveBeConnectedField);
nvtag_callbacks.postRender.push(moveReceiveTextsField);
nvtag_callbacks.postRender.push(moveRecieveEmailsField);
nvtag_callbacks.postRender.push(moveSustainerMemberField);
nvtag_callbacks.postRender.push(updateAutoRenewalSubscriptionCopy);

// nvtag_callbacks.postRender.push(addAutoRenewalSubscriptionCopy);
// nvtag_callbacks.alterFormDefinition.push(getAdditionalQuestions);
// nvtag_callbacks.alterFormDefinition.push(moveSustainerMemberField);
// nvtag_callbacks.alterFormDefinition.push(moveBeConnectedField);
// nvtag_callbacks.alterFormDefinition.push(moveReceiveTextsField);
// nvtag_callbacks.alterFormDefinition.push(addReceiveEmailsField);

// Show Passport Alert Amount Alert for One-Time Donation
const passPortAlertAmount = function (amnt) {
  let shown = false;
  let otherAmount = amnt;
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
});