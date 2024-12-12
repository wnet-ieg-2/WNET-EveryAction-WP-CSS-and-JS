/* shim for working with an EveryAction donation form
 * requires the EA form to have custom fields with
 * titles 'PCodes' and 'Your Selected Premiums'
 * to store that info and pass it along to the EA backend
 */

jQuery(document).ready(function($) {


	var shopping_cart = Cookies.get('shopping_cart');
    if (typeof shopping_cart !== 'undefined') { shopping_cart = JSON.parse( shopping_cart ); }
    else { shopping_cart = []; }

	var required_donation_amount = 0;
	var required_installment_amount = 0;
	var current_frequency = 0;
	var pcode_field = '';
	var premium_field = '';
	var premium_display = '';

	function setup_pcode_and_premium_fields() {
		pcode_field = $("input[title='PCodes']");
		premium_field = $("textarea[title='Your Selected Premiums']");
		$(pcode_field).parent().hide();
		$(premium_field).parent().hide();
		$(premium_field).parent().parent().append('<div class="premium_list"></div>');
	}


	function update_pcode_and_premium_and_value_fields() {
		if (shopping_cart.length == 0) {
			return;
		}
		var pcodestring = '';
		var premiumstring = '';
		var premiumhtml = '';
		required_donation_amount = 0;
		$.each(shopping_cart, function( index, item ) {
			pcodestring += item.pcode + ':' + item.quantity + '|';
			var this_item_value = Number(item.quantity) + Number(item.required_amount);
			premiumstring += item.title + ' | Premium Code: ' + item.pcode + ' | Price: $' + item.required_amount + ' | Quantity: ' +  item.quantity + "\n" ;
			premiumhtml += '<li><strong>' + item.title + '</strong> | Premium Code: ' + item.pcode + ' | Price: $' + item.required_amount + ' | Quantity: ' +  item.quantity + "</li>" ;
			required_donation_amount += this_item_value;
		});
		pcode_field.val(pcodestring);
		premium_field.val(premiumstring);
		$('.premium_list').html('<h4>Your order: <em><a href="/support/pledge-premiums/cart/">edit items</a></em></h4><ul>' + premiumhtml + '</ul>');
		set_required_amount();
	}

	function check_frequency() {
		$('input[name="SelectedFrequency"]').each(function () {
			if ($(this).is(':checked')) {
				current_frequency = $(this).val();
			}
		});
		set_required_amount();
	}

	function set_required_amount() {
		if (!required_donation_amount) {
			return;
		}
		required_installment_amount = (required_donation_amount/12);
		required_installment_amount = Math.round((required_installment_amount + Number.EPSILON) * 100) / 100;
		console.log(required_installment_amount);
		console.log(required_donation_amount);
		console.log(current_frequency);
		if (current_frequency == 4) {
            $("input[name='OtherAmount']").val(required_installment_amount);
        } else {
            $("input[name='OtherAmount']").val(required_donation_amount);
        }
	}

	let initialize_form_when_ready = function () {
		if (!$("input[title='PCodes']").length) {
			setTimeout(initialize_form_when_ready, 100);
		} else {
			setup_pcode_and_premium_fields();
			check_frequency();
			update_pcode_and_premium_and_value_fields();
			$('input[name="SelectedFrequency"]').on('change click', function () {
				check_frequency();
			});
		}

	}
	//setTimeout(initialize_form_when_ready, 100);
	
	nvtag_callbacks = nvtag_callbacks || {};
	nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
	nvtag_callbacks.postRender.push(initialize_form_when_ready);
	
});
