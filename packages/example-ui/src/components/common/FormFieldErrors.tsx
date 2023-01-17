export const CheckoutFormErrors = {
  validationErrors: {
    address_line1_required: 'Enter street address',
    address_city_required: 'Enter city',
    address_state_required: 'Choose state',
    address_postal_code_required: 'Enter ZIP',
    address_postal_code_invalid: 'Enter a valid ZIP',
    email_required: 'Enter email address',
    name_required: 'Enter cardholder name',
    card: {
      expiration_date_invalid: 'Enter a valid expiration date',
      number_invalid: 'Enter a valid card number',
      number_required: 'Enter card number',
      verification_invalid: 'Enter a valid CVV security code',
      verification_required: 'Enter CVV security code',
    },
    bank: {
      routing_number_required: 'Enter a routing number',
      account_number_required: 'Enter an account number',
      account_owner_name_required: 'Enter an account owner name',
      account_owner_type_required: 'Select an Account Owner Type',
      account_type_required: 'Select an Account Type'
    }
  },
  serverErrors: {

  }
};

export type BankErrorCode = 'routing_number_required' | 'account_number_required';

export type CardErrorCode =
  'expiration_date_invalid' |
  'verification_required' |
  'verification_invalid' |
  'number_required' |
  'number_invalid';
