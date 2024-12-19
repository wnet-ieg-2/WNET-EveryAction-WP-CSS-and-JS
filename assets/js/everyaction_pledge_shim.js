/* shim for working with an EveryAction donation form
 * requires the EA form to have custom fields with
 * titles 'PCodes' and 'Your Selected Premiums'
 * to store that info and pass it along to the EA backend
 */

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
		$(pcode_field).parent().parent().hide();
		$(premium_field).parent().parent().hide();
		$('header.at-markup.HeaderHtml').append('<div class="premium_list"></div>');
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
			var this_item_value = Number(item.quantity) * Number(item.required_amount);
			premiumstring += item.title + ' | Premium Code: ' + item.pcode + ' | Price: $' + item.required_amount + ' | Quantity: ' +  item.quantity + "\n" ;
			premiumhtml += '<li><strong>' + item.title + '</strong> | Premium Code: ' + item.pcode + ' | Price: $' + item.required_amount + ' | Quantity: ' +  item.quantity + "</li>" ;
			required_donation_amount += this_item_value;
		});
		pcode_field.val(pcodestring);
		premium_field.val(premiumstring);
		$('.premium_list').html('<h4>Your order: <em><a href="/support/pledge-premiums/cart/">edit items</a></em></h4><ul>' + premiumhtml + '</ul><p class="contribution_message">Minimum contribution: $<span class="required_contribution">'+required_donation_amount+'</span></p>');
		set_required_amount();
	}

	function check_frequency() {
		$('input[name="SelectedFrequency"]').each(function () {
			if ($(this).is(':checked')) {
				current_frequency = $(this).val();
			}
		});
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
			$("span.required_contribution").html(required_installment_amount + " per month for 12 months");
        } else {
            $("input[name='OtherAmount']").val(required_donation_amount);
			$("span.required_contribution").html(required_donation_amount);
        }
		$("input[name='OtherAmount']").attr("readonly", true);
		$("input[name='OtherAmount']").focus();
	}

	/* TK;  A function to compare the required_donation_amount value
	 * (or if frequency is 4, required_installment_amount value)
	 * to each of the visible giving levels and disable any that are 
	 * less than that value. 
	 */


	/* TK: a function to to clear the shopping_cart cookie on successful form donation
	*/

	let initialize_form_when_ready = function () {
		setup_pcode_and_premium_fields();
		check_frequency();
		update_pcode_and_premium_and_value_fields();
		$('input[name="SelectedFrequency"]').on('change click', function () {
			check_frequency();
			set_required_amount();
		});

	}

	var nvtag_callbacks = nvtag_callbacks || {};
	nvtag_callbacks.postRender = nvtag_callbacks.postRender || [];
	nvtag_callbacks.postRender.push(initialize_form_when_ready);
