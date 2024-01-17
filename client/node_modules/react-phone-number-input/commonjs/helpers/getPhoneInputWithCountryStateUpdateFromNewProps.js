"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getPhoneInputWithCountryStateUpdateFromNewProps;

var _phoneInputHelpers = require("./phoneInputHelpers.js");

var _getInternationalPhoneNumberPrefix = _interopRequireDefault(require("./getInternationalPhoneNumberPrefix.js"));

var _countries = require("./countries.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getPhoneInputWithCountryStateUpdateFromNewProps(props, prevProps, state) {
  var metadata = props.metadata,
      countries = props.countries,
      newDefaultCountry = props.defaultCountry,
      newValue = props.value,
      newReset = props.reset,
      international = props.international,
      displayInitialValueAsLocalNumber = props.displayInitialValueAsLocalNumber,
      initialValueFormat = props.initialValueFormat;
  var prevDefaultCountry = prevProps.defaultCountry,
      prevValue = prevProps.value,
      prevReset = prevProps.reset;
  var country = state.country,
      value = state.value,
      hasUserSelectedACountry = state.hasUserSelectedACountry;

  var _getInitialPhoneDigits = function _getInitialPhoneDigits(parameters) {
    return (0, _phoneInputHelpers.getInitialPhoneDigits)(_objectSpread(_objectSpread({}, parameters), {}, {
      international: international,
      useNationalFormat: displayInitialValueAsLocalNumber || initialValueFormat === 'national',
      metadata: metadata
    }));
  }; // Some users requested a way to reset the component
  // (both number `<input/>` and country `<select/>`).
  // Whenever `reset` property changes both number `<input/>`
  // and country `<select/>` are reset.
  // It's not implemented as some instance `.reset()` method
  // because `ref` is forwarded to `<input/>`.
  // It's also not replaced with just resetting `country` on
  // external `value` reset, because a user could select a country
  // and then not input any `value`, and so the selected country
  // would be "stuck", if not using this `reset` property.
  // https://github.com/catamphetamine/react-phone-number-input/issues/300


  if (newReset !== prevReset) {
    return {
      phoneDigits: _getInitialPhoneDigits({
        value: undefined,
        defaultCountry: newDefaultCountry
      }),
      value: undefined,
      country: newDefaultCountry,
      hasUserSelectedACountry: undefined
    };
  } // `value` is the value currently shown in the component:
  // it's stored in the component's `state`, and it's not the `value` property.
  // `prevValue` is "previous `value` property".
  // `newValue` is "new `value` property".
  // If the default country changed
  // (e.g. in case of ajax GeoIP detection after page loaded)
  // then select it, but only if the user hasn't already manually
  // selected a country, and no phone number has been manually entered so far.
  // Because if the user has already started inputting a phone number
  // then they're okay with no country being selected at all ("International")
  // and they don't want to be disturbed, don't want their input to be screwed, etc.


  if (newDefaultCountry !== prevDefaultCountry) {
    var isNewDefaultCountrySupported = !newDefaultCountry || (0, _countries.isCountrySupportedWithError)(newDefaultCountry, metadata);

    var noValueHasBeenEnteredByTheUser = // By default, "no value has been entered" means `value` is `undefined`.
    !value || // When `international` is `true`, and some country has been pre-selected,
    // then the `<input/>` contains a pre-filled value of `+${countryCallingCode}${leadingDigits}`,
    // so in case of `international` being `true`, "the user hasn't entered anything" situation
    // doesn't just mean `value` is `undefined`, but could also mean `value` is `+${countryCallingCode}`.
    international && value === _getInitialPhoneDigits({
      value: undefined,
      defaultCountry: prevDefaultCountry
    }); // Only update the `defaultCountry` property if no phone number
    // has been entered by the user or pre-set by the application.


    var noValueHasBeenEntered = !newValue && noValueHasBeenEnteredByTheUser;

    if (!hasUserSelectedACountry && isNewDefaultCountrySupported && noValueHasBeenEntered) {
      return {
        country: newDefaultCountry,
        // If `phoneDigits` is empty, then automatically select the new `country`
        // and set `phoneDigits` to `+{getCountryCallingCode(newCountry)}`.
        // The code assumes that "no phone number has been entered by the user",
        // and no `value` property has been passed, so the `phoneNumber` parameter
        // of `_getInitialPhoneDigits({ value, phoneNumber, ... })` is `undefined`.
        phoneDigits: _getInitialPhoneDigits({
          value: undefined,
          defaultCountry: newDefaultCountry
        }),
        // `value` is `undefined` and it stays so.
        value: undefined
      };
    }
  } // If a new `value` is set externally.
  // (e.g. as a result of an ajax API request
  //  to get user's phone after page loaded)
  // The first part — `newValue !== prevValue` —
  // is basically `props.value !== prevProps.value`
  // so it means "if value property was changed externally".
  // The second part — `newValue !== value` —
  // is for ignoring the `getDerivedStateFromProps()` call
  // which happens in `this.onChange()` right after `this.setState()`.
  // If this `getDerivedStateFromProps()` call isn't ignored
  // then the country flag would reset on each input.


  if (!valuesAreEqual(newValue, prevValue) && !valuesAreEqual(newValue, value)) {
    var phoneNumber;
    var parsedCountry;

    if (newValue) {
      phoneNumber = (0, _phoneInputHelpers.parsePhoneNumber)(newValue, metadata);
      var supportedCountries = (0, _countries.getSupportedCountries)(countries, metadata);

      if (phoneNumber && phoneNumber.country) {
        // Ignore `else` because all countries are supported in metadata.

        /* istanbul ignore next */
        if (!supportedCountries || supportedCountries.indexOf(phoneNumber.country) >= 0) {
          parsedCountry = phoneNumber.country;
        }
      } else {
        parsedCountry = (0, _phoneInputHelpers.getCountryForPartialE164Number)(newValue, {
          country: undefined,
          countries: supportedCountries,
          metadata: metadata
        }); // In cases when multiple countries correspond to the same country calling code,
        // the phone number digits of `newValue` have to be matched against country-specific
        // regular expressions in order to determine the exact country.
        // Sometimes, that algorithm can't decide for sure which country does the phone number belong to,
        // for example when the digits of `newValue` don't match any of those regular expressions.
        // and the country of the phone number couldn't be determined.
        // In those cases, people prefer the component to show the flag of the `defaultCountry`
        // if the phone number could potentially belong to that `defaultCountry`.
        // At least that's how the component behaves when a user pastes an international
        // phone number into the input field: for example, when `defaultCountry` is `"US"`
        // and the user pastes value "+1 555 555 5555" into the input field, it keep showing "US" flag.
        // So when setting new `value` property externally, the component should behave the same way:
        // it should select the `defaultCountry` when the new `value` could potentially belong
        // to that country in cases when the exact country can't be determined.
        // https://github.com/catamphetamine/react-phone-number-input/issues/413#issuecomment-1536219404

        if (!parsedCountry) {
          if (newDefaultCountry) {
            if (newValue.indexOf((0, _getInternationalPhoneNumberPrefix["default"])(newDefaultCountry, metadata)) === 0) {
              parsedCountry = newDefaultCountry;
            }
          }
        }
      }
    }

    var hasUserSelectedACountryUpdate;

    if (!newValue) {
      // Reset `hasUserSelectedACountry` flag in `state`.
      hasUserSelectedACountryUpdate = {
        hasUserSelectedACountry: undefined
      };
    }

    return _objectSpread(_objectSpread({}, hasUserSelectedACountryUpdate), {}, {
      phoneDigits: _getInitialPhoneDigits({
        phoneNumber: phoneNumber,
        value: newValue,
        defaultCountry: newDefaultCountry
      }),
      value: newValue,
      country: newValue ? parsedCountry : newDefaultCountry
    });
  } // `defaultCountry` didn't change.
  // `value` didn't change.
  // `phoneDigits` didn't change, because `value` didn't change.
  //
  // So no need to update state.

}

function valuesAreEqual(value1, value2) {
  // If `value` has been set to `null` externally then convert it to `undefined`.
  //
  // For example, `react-hook-form` sets `value` to `null` when the user clears the input.
  // https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/164
  // In that case, without this conversion of `null` to `undefined`, it would reset
  // the selected country to `defaultCountry` because in that case `newValue !== value`
  // because `null !== undefined`.
  //
  // Historically, empty `value` is encoded as `undefined`.
  // Perhaps empty `value` would be better encoded as `null` instead.
  // But because that would be a potentially breaking change for some people,
  // it's left as is for the current "major" version of this library.
  //
  if (value1 === null) {
    value1 = undefined;
  }

  if (value2 === null) {
    value2 = undefined;
  }

  return value1 === value2;
}
//# sourceMappingURL=getPhoneInputWithCountryStateUpdateFromNewProps.js.map