import React, { Component } from 'react'
import axios from 'axios'

export default class CrudFunctions extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            //$url: process.env.REACT_APP_BACKEND_API_URL,
            $url: "http://[::1]:3000",
            config : {
                headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
            },
            data : {
                key: "value"
            },
        }
    }    
    //vars & const

    //functions
    get ($urlExtend){
        axios
        .get(this.state.$url+$urlExtend)
        .then(response=>{
            return response
        })
        .catch(error => {
            return error.response
        })
    }
    post($urlExtend, $data){
        axios
        .post(`${this.state.url}${$urlExtend}`, $data, this.state.config)
        .then(response => {
            return response          
        })
        .catch(error => {
            return error.response
        });
    }
    render() {
        return (
            <>                
            </>
        )
    }
}
