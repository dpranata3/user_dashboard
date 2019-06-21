import axios from '../config/axios'


export const savePayment =(id_order,order_no,transaction_date,sender_name,amount,payment_to,pay_image)=>{
    return async dispatch =>{
        try {

            const formData = new FormData()

            formData.append("id_order", id_order)
            formData.append("order_no", order_no)
            formData.append("transaction_date", transaction_date)
            formData.append("sender_name", sender_name)
            formData.append("amount", amount)
            formData.append("payment_to", payment_to)
            formData.append("pay_image", pay_image)

            const res = await axios.post("/orders/payment/conf",formData,{
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              }
            );
            if (!res.data) {
              dispatch({
                type: "ADD_PAY_ERROR",
                payload: res
              });
              //Menghilangkan pesan error setelah tiga detik
              return setTimeout(() => {
                dispatch({
                  type: "TIMEOUT"
                });
              }, 3000);
            }
            dispatch({
                type:"ADD_PAY_SUCCESS",
                payload:res.data,

                })
                
        } catch (error) {
            console.log(error);
            
        }
    }
    
    
}