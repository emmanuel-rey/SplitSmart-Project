import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();


const USSD_CODE = '*242*1#';

const PAGA_CONFIG = {
    baseUrl: process.env.PAGA_ENV === 'production' 
        ? 'https://collect.paga.com' 
        : 'https://beta-collect.paga.com',
    auth: {
        publicKey: process.env.PAGA_PUBLIC_KEY,
        secretKey: process.env.PAGA_SECRET_KEY,
        hashKey: process.env.PAGA_HASH_KEY
    }
};

// Helper function to generate authentication headers
const getAuthHeaders = (paramsForHash = []) => {
  // Generate Basic Auth
    const authString = `${PAGA_CONFIG.auth.publicKey}:${PAGA_CONFIG.auth.secretKey}`;
    const base64Auth = Buffer.from(authString).toString('base64');
    
    // Generate Hash if needed
    let hash = '';
    if (paramsForHash.length > 0) {
        const hashString = paramsForHash.join('') + PAGA_CONFIG.auth.hashKey;
        hash = crypto.createHash('sha512').update(hashString).digest('hex');
    }

    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${base64Auth}`,
        ...(hash && { 'hash': hash })
    };
    };

/**
 * Initiate USSD Payment Request
 * @param {Object} paymentData - Payment details
 * @param {string} paymentData.referenceNumber - Unique transaction reference
 * @param {number} paymentData.amount - Payment amount
 * @param {Object} paymentData.payer - Payer details
 * @param {string} paymentData.payer.phoneNumber - Payer's phone number
 * @param {string} paymentData.payer.name - Payer's name
 * @param {Object} paymentData.payee - Payee details
 * @param {string} paymentData.payee.name - Payee's name
 * @param {string} callbackUrl - Callback URL for notifications
 * @returns {Promise<Object>} Payment response
 */
export const requestUssdPayment = async ({ referenceNumber, amount, payer, payee, callbackUrl }) => {
    try {
        // Parameters to include in hash
        const hashParams = [
        referenceNumber,
        amount.toString(),
        'NGN', // Default currency
        payer.phoneNumber || '',
        '', // email (not needed for USSD)
        '', // accountNumber (not needed for USSD)
        '', // payee phoneNumber (optional)
        '', // bankId (not needed for USSD)
        ''  // bankAccountNumber (not needed for USSD)
        ];

        const requestData = {
        referenceNumber,
        amount,
        currency: 'NGN',
        payer: {
            name: payer.name,
            phoneNumber: payer.phoneNumber // Critical for USSD
        },
        payee: {
            name: payee.name
        },
        isSuppressMessages: false, // Allow Paga to send USSD prompt
        payerCollectionFeeShare: 1.0, // Payer bears all charges
        payeeCollectionFeeShare: 0.0,
        isAllowPartialPayments: false,
        callBackUrl: callbackUrl,
        paymentMethods: ['FUNDING_USSD'] // USSD only
        };

        const response = await axios.post(
        `${PAGA_CONFIG.baseUrl}/paymentRequest`,
        requestData,
        {
            headers: getAuthHeaders(hashParams)
        }
        );

        return {
        success: true,
        data: {
            ...response.data,
            ussdCode: USSD_CODE, // Standard Paga USSD code
            paymentInstructions: `To pay ₦${amount} to ${payee.name}:\n1. Dial ${USSD_CODE}\n2. Select "Pay Bills"\n3. Enter reference: ${referenceNumber}\n4. Confirm payment`,
            referenceNumber
        }
        };
    } catch (error) {
        console.error('Paga USSD payment error:', error.response?.data || error.message);
        return {
        success: false,
        error: error.response?.data?.statusMessage || 'Failed to initiate USSD payment',
        details: error.response?.data || null
        };
    }
    };

    /**
     * Check Payment Status
     * @param {string} referenceNumber - Original transaction reference
     * @returns {Promise<Object>} Status response
     */
    export const checkPaymentStatus = async (referenceNumber) => {
    try {
        const response = await axios.post(
        `${PAGA_CONFIG.baseUrl}/status`,
        { referenceNumber },
        {
            headers: getAuthHeaders([referenceNumber])
        }
        );

        return {
        success: true,
        status: response.data.statusCode === '0' ? 'completed' : 'pending',
        data: response.data
        };
    } catch (error) {
        console.error('Payment status check error:', error.response?.data || error.message);
        return {
        success: false,
        error: error.response?.data?.statusMessage || 'Failed to check payment status'
        };
    }
    };

export default {
    requestUssdPayment,
    checkPaymentStatus
};