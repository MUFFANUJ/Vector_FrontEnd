import api from "../../config/api"

export const createPayment = async({planType,jwt}) => {
    try {
        const {data} = api.post(`/api/payments/${planType}`)
        if(data.data_payment_link_url){
            window.location.href = data.data_payment_link_url;
        }
    } catch (error) {
        console.log("error while generating the payment link",error)
    }
}