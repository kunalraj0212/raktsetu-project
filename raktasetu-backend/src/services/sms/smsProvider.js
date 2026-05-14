/**
 * SMS Provider Interface
 * All future providers (Twilio, MSG91, etc.) must implement this contract.
 */
class SmsProvider {
  /**
   * Sends an OTP SMS to a given phone number.
   * @param {string} phone - Target phone number
   * @param {string} otp - The plaintext OTP to send
   * @returns {Promise<boolean>} True if successfully sent
   */
  async sendOtp(phone, otp) {
    throw new Error('Method sendOtp() must be implemented by the provider');
  }

  /**
   * Sends a general SMS to a given phone number.
   * @param {string} phone - Target phone number
   * @param {string} message - The message content
   * @returns {Promise<boolean>} True if successfully sent
   */
  async sendSms(phone, message) {
    throw new Error('Method sendSms() must be implemented by the provider');
  }
}

export default SmsProvider;
