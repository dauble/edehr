import { validTimeStr, validDayStr, validNumberStr, validRangeStr } from '../../../helpers/ehr-utils'

/**
 * Export a dictionary of validators. Each key is the input type as set from the generated ehr definitions.
 * Each validator is a function that takes the field name (for error message) and the input value to be validated.
 * The function returns an error message if the input value is not valid. Return nothing otherwise.
 * ** Note that validation accepts empty inputs because the mandatory test is done elsewhere. **
 */
export default {
  /**
   * Time in 24 hour format.  00:00 to 23:59
   * @param fieldName: the name of the input field for error messages
   * @param value: the input value
   * @return {string} If valid return's nothing. Otherwise returns error message.
   */
  time24: function (fieldName, time) {
    if (time) {
      const valid = validTimeStr(time)
      if (!valid) {
        return `${fieldName} must be a time value in 24 hour format; e.g. 08:45`
      }
    }
  },
  /**
   * Day as in days in the hospital. Expect the value to be 0,1,2,...9
   * @param fieldName: the name of the input field for error messages
   * @param value: the input value
   * @return {string} If valid return's nothing. Otherwise returns error message.
   */
  day: function (fieldName, dayString) {
    if (dayString) {
      const valid = validDayStr(dayString)
      if (!valid) {
        return `${fieldName} must be a day number 0 to 9`
      }
    }
  },
  numeric: function (fieldName, value) {
    // console.log('in number validator', fieldName, value)
    if (value) {
      const valid = validNumberStr(value)
      if (!valid) {
        return `${fieldName} must be a numeric value`
      }
    }
  },
  /**
   * Central Venous Pressure. A measure of the flow through the heart.  Expect a value between 0 and 30.
   * @param fieldName: the name of the input field for error messages
   * @param value: the input value
   * @return {string} If valid return's nothing. Otherwise returns error message.
   */
  cvp: function (fieldName, value) {
    const MAX_CVP_VALUE = 30
    const MIN_CVP_VALUE = 0
    if (value)  {
      const valid = validNumberStr(value)
      if (!valid) {
        return `${fieldName} must be a number`
      }
      const isValidRange = validRangeStr(value, MIN_CVP_VALUE, MAX_CVP_VALUE)
      if (!isValidRange)
        return `${fieldName} must be a positive number in the range of ${MIN_CVP_VALUE} to ${MAX_CVP_VALUE}` 
    }
  },
  /**
   * Validate an input is within a given range.
   * @param fieldName: the name of the input field for error messages
   * @param value: the input value
   * @param min: the input must be >= than min
   * @param max: the input must be <= than max
   * @return {string} If valid return's nothing. Otherwise returns error message.
   */
  range: function (fieldName, value, min, max) {
    if (value)  {
      const valid = validNumberStr(value)
      if (!valid) {
        return `${fieldName} must be a number`
      }
      const isValidRange = validRangeStr(value, min, max)
      if (!isValidRange)
        return `${fieldName} must be within the range of ${min} to ${max}`
    }
  },
}
