import React, {Component} from 'react'
import axios from '../config/axios';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { Link } from "react-router-dom";
import cookies from 'universal-cookie';

const cookie = new cookies()

class Cart extends Component {

    state={
        carts:[]
    }

    componentDidMount(){
        this.getCartList()
    }

    getCartList=()=>{
        const username = cookie.get('masihLogin')
        axios.get(`/carts/view/${username}`)
         .then(res=>{
             this.setState({carts:res.data})
         })
    }

   
    onCartDel=id=>{
        axios.delete(`/carts/del/${id}`)
            .then(res=>{
                if(res.data){
                    this.getCartList()
                }
                
            })
    }
    renderList=()=>{
        return this.state.carts.map(cart=>{
            return(
                <tr key={cart.cart_id}>
                    <td className="text-center" >{cart.cart_id}</td>
                    <td className="text-center" >{cart.prod_name}</td>
                    <td className="text-center" >
                        <Link to={`/productDetail/${cart.prod_id}`}><img src={`http://localhost:2019/products/images/${cart.prod_image}`} alt={cart.prod_name} style={{width:'50px', height:'50px'}}></img></Link>
                    </td>
                    <td className="text-center" >{cart.prod_price}</td>
                    <td className="text-center" >{cart.qty}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.onWishDel(cart.cart_id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
            )
        })
    }
    render(){
        let user = this.props.user;
        if(user.username !==""){
            return (
              <main className="mt-5 pt-4">
                <div className="container wow fadeIn">
                    <h2 className="my-3 h2 text-center">{user.username} Cart</h2>
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">Id</th>
                        <th className="text-center">
                          Product Name
                        </th>
                        <th className="text-center">
                          Product Image
                        </th>
                        <th className="text-center">
                          Product Price
                        </th>
                        <th className="text-center">Qty</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderList()}</tbody>
                  </table>
                </div>
              </main>
            );
        }
        return(
            <Redirect to='/login' />
        )
        
    }
}

const mapStateToProps = state => {
    return {
      user: state.auth
    };
  };

export default connect(mapStateToProps)(Cart)