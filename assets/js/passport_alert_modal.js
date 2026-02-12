// Passport Alert Modal for One-Time Donations between $5 and $59.99
// Ensure the global callback array exists
window.nvtag_callbacks = window.nvtag_callbacks || {};
window.nvtag_callbacks.postContributionAmountChanged = window.nvtag_callbacks.postContributionAmountChanged || [];

let passPortAlertCalled = false;

window.nvtag_callbacks.postContributionAmountChanged.push(function (args) {

  // Show Passport Alert Amount Alert for One-Time Donation
  // @ts-ignore
  const passPortAlertAmount = function (amnt) {
    $('#passPortAlertAmount').show();
    //  console.log('Passport Alert Amount:', amnt);
  };

  let hidePassportAlertModal = function(){
    $('#passPortAlertAmount').hide();
    //console.log('passportAlert')
   }

$('.passportAlert, .wne-modal').on('click', function (e) { e.preventDefault(); hidePassportAlertModal(); });

    // @ts-ignore
let otherTotalAmount = parseInt(args.totalAmount);
// @ts-ignore
let otherAmount = $('input[name="OtherAmount"]').val();

// Add blur event listener to the OtherAmount input field
$('input[name="OtherAmount"]').on('blur', function () {
    let otherAmount = $(this).val();
    let otherTotalAmount = parseInt(args.totalAmount);

    $("input[name=SelectedFrequency]").each(function () {
        // @ts-ignore
        if ($(this)[0].value === '0' && $(this).is(':checked') && otherAmount > 4.99 && otherAmount < 59.99) {
            if (!passPortAlertCalled) {
                passPortAlertAmount(otherTotalAmount);
                passPortAlertCalled = true;
            }
        }
    });
});

});

console.log('Passport Alert Modal: On');