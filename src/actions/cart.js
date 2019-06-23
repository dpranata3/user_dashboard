import axios from '../config/axios'

export const onAddCart =(username,prod_id,qty,total_price)=>{
    return async dispatch=>{
        try {
            const res = await axios.post('/carts/add',{
                username,
                prod_id,
                qty,
                total_price
            })
            if(!res.data){
                dispatch({
                    type:"ADD_CART_ERROR",
                    payload:"cart not been added"
                  })
                //Menghilangkan pesan error setelah tiga detik
               return setTimeout(() => {
                 dispatch({
                   type: "TIMEOUT"
                 });
               }, 3000);
            }
            dispatch({
                type:"ADD_CART_SUCCESS",
                payload:"cart has been added"
              })
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const onSaveCarts=(cart_id,qty)=>{
 return async dispatch=>{
   try {
     const res = await axios.patch(`/carts/update/${cart_id}`,{
       qty
     })
     if (!res.data) {
       dispatch({
         type: "EDIT_CART_ERROR",
         payload: "cart not been edited"
       });
      
       return setTimeout(() => {
         dispatch({
           type: "TIMEOUT"
         });
       }, 3000);
     }
     dispatch({
       type: "EDIT_CART_SUCCESS",
       payload: "cart has been edited"
     });
   } catch (error) {
     console.log(error);
     
   }
 }
} 