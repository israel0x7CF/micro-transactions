import axios from 'axios';
import { paymentInsertType, paymentSelectType } from '../db/schema/paymentSchema';
import { userSelectType } from '../db/schema/userSchema';
import { v4 as uuidv4 } from 'uuid';
import { paymentResponse } from '../types/types';
export async function initializeChapaTransaction(transactionData:paymentInsertType,user:userSelectType):Promise<paymentResponse> {
    const secretKey = process.env.CHAPPA_SECRETKEY
    const txRef = uuidv4();
    const transactionResponse:paymentResponse  ={
        status:false,
        txRef:txRef
    } 
    const paymentData = {
        amount: transactionData.amount,
        currency: "ETB",
        email: "abebech_bekele@gmail.com",
        first_name: user.name,
        last_name: "Gizachew",
        phone_number: user.phone,
        tx_ref: txRef,
        callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
        return_url: "https://www.google.com/",
        customization: {
          title: "Payment for my favourite merchant",
          description: "I love online payments"
        },
        meta: {
          hide_receipt: "true"
        }
      };
      
  const options = {
    method: 'POST',
    url: 'https://api.chapa.co/v1/transaction/initialize',
    headers: {
      'Authorization': `Bearer ${secretKey}`, // Replace with your API Key
      'Content-Type': 'application/json'
    },
    data: paymentData
  };

  try {
    const response = await axios(options);
    const chappaResponse =  response.data
    console.log('Transaction Response:', response.data);
    if(chappaResponse.status === 'success'){
        transactionResponse.status = true

    }
    transactionResponse.status = false
    return transactionResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Chapa Transaction Error:', error.response ? error.response.data : error.message);
    } else {
      console.error('Chapa Transaction Error:', error);
    }
    transactionResponse.status = false
    return  transactionResponse

  }
}

