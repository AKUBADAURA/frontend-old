import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../header/Header'
import NavbarApp from '../NavBar/NavbarApp'
import Articles from './articles'
import Layout from './layout'
import '../../css/noticias.css'

const NoticiasIndex = () => {
    //Const & Lets
    const url= process.env.REACT_APP_BACKEND_API_URL
    let config ={
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }

//usestyles
//useContext
//useState
const [categories, setCategories] = useState([])
const [articles, setArticles] = useState([])

//useEffect
useEffect(() => {
    // getCategories()
    getArticles()
}, [])

//functions

const getCategories =async()=>{
    try {    
        const response = await axios.get(`${url}/categoria-noticias-cpli`,config)
        //const response = await axios.get(`${url}/poa?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22ownerId%22%3A%20%22${usuario.id}%22%0A%20%20%7D%0A%7D`,config)
        setCategories(response.data);
    }
    catch (error) {
        console.log(error.response)
    }
} 


const getArticles =async()=>{
    try {    
        const response = await axios.get(`${url}/noticias-cpli?filter[where][status]=Publicado&filter[order]=fechaPublicacion%20DESC`,config)
        console.log(response)
        //const response = await axios.get(`${url}/poa?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22ownerId%22%3A%20%22${usuario.id}%22%0A%20%20%7D%0A%7D`,config)
        setArticles(response.data);
    }
    catch (error) {
        console.log(error.response)
    }
} 


    return (
        <div className="row m-0" >
            <Header />
            <NavbarApp />
            <Layout categories={categories}>
                <div className="row m-auto">
                    <div className="col-12">                        
                        <div className="row px-1">
                            <div className="col-12 d-flex justify-content-end mt-2  align-items-center">
                                <h3 className="m-0">Noticias CPLI</h3>
                            </div>
                            <hr className="d-flex justify-content-between  align-items-center divisor"></hr> 
                            <Articles articles={articles} />
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default NoticiasIndex
