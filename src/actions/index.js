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
          
              if(!res.data){
                dispatch({
                  type:"LOGIN_ERROR",
                  payload:res
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
            console.log(res.data);
            
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