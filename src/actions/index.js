import axios from '../config/axios'
import cookies from 'universal-cookie';

const cookie = new cookies();

export const onLoginClick =(username,password)=>{
    return  async dispatch => {
        try {
          const res= await axios.post('/login',{
            username,
            user_password:password
          })
    
              console.log(res.data);
              
              if(res.data ===101 || res.data ===102){
                dispatch({
                  type:"LOGIN_ERROR",
                  payload:"username or password are wrong"
                })
    
                 //Menghilangkan pesan error setelah tiga detik
              return setTimeout(() => {
                 dispatch({
                      type: "TIMEOUT"
                  })
                }, 3000);
                
              }
              cookie.set('masihLogin', res.data.username, {path:'/'})
              
              dispatch({
                type:"LOGIN_SUCCESS",
                payload:res.data
                })
          
        } catch (error) {
          console.log(error);
          
        }
        
       };
}

export const onRegisterUser = (username,firstname,lastname,email,password) => {
    return dispatch => {
      axios.post('/register', {
            username,
            first_name:firstname,
            last_name:lastname,
            email,
            user_password:password
        })
        .then(res => {
          console.log(res.data.sqlMessage);
          
            if(res.data.sqlMessage.includes('duplicate')){
              dispatch({
                type:"AUTH_ERROR",
                error:"duplicate username"
              })
            } else if(res.data.sqlMessage.includes('email')){
              dispatch({
                type:"AUTH_ERROR",
                error:"Mail not valid"
              })
            }
            
          dispatch({
            type: "AUTH_SUCCESS",
            payload: "Registered Successfully"
          });
        });
    };
  };

  // On Logout
export const onLogoutUser = () => {
    cookie.remove("masihLogin");

    return {
      type: "LOGOUT"
    };
  };

//Stay login
export const keepLogin = (username) => {
    if(username === undefined){
      return{
        type:"KEEP_LOGIN",
        payload:{
          username:''
        }
      }
    }
    
    return{
      type:"KEEP_LOGIN",
      payload:{
        username
      }

    }
     
  };

// edit profile
export const onSaveProfile=(username,first_name,last_name,address,phone,email,user_password,avatar)=>{
  return async dispatch =>{
    try {
       const formData = new FormData()

       formData.append("first_name", first_name)
       formData.append("last_name", last_name)
       formData.append("address", address)
       formData.append("telephone", phone)
       formData.append("email", email)
       formData.append("user_password", user_password)

       if(avatar){
         formData.append("avatar", avatar)
       }
       
       const res = await axios.patch(`/profile/${username}`, formData,{
         headers:{
           "Content-Type": "multipart/form-data"
         }
       });
      console.log(res.data);
      
       dispatch({
         type:'EDIT_PROFILE_SUCCESS',
         payload:'Profile has been edited successfully'
       })
       
    } catch (error) {
      console.log(error);
      
    }
  }
}