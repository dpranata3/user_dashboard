import React, {Component} from 'react'
import axios from '../config/axios';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { Link } from "react-router-dom";

class WishList extends Component {

    state={
        wishlists:[]
    }

    componentDidMount(){
        this.getWishList()
    }

    getWishList=()=>{
        const username = this.props.match.params.username
        axios.get(`/wishlists/view/${username}`)
         .then(res=>{
             this.setState({wishlists:res.data})
         })
    }

    onWishDel=id=>{
        axios.delete(`/wishlists/del/${id}`)
            .then(res=>{
                if(res.data){
                    this.getWishList()
                }
                
            })
    }
    renderList=()=>{
        return this.state.wishlists.map(wish=>{
            return(
                <tr key={wish.id}>
                    <td className="text-center" >{wish.id}</td>
                    <td className="text-center" >{wish.prod_name}</td>
                    <td className="text-center" >
                        <Link to={`/productDetail/${wish.prod_id}`}><img src={`http://localhost:2019/products/images/${wish.prod_image}`} alt={wish.prod_name} style={{width:'50px', height:'50px'}}></img></Link>
                    </td>
                    <td className="text-center" >{wish.prod_price}</td>
                    <td className="text-center" >{wish.curr_stock}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.onWishDel(wish.id);
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
                    <h2 className="my-3 h2 text-center">{user.username} WishList</h2>
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
                        <th className="text-center">Stock</th>
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

export default connect(mapStateToProps)(WishList)