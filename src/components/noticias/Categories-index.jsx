import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../header/Header'
import NavbarApp from '../NavBar/NavbarApp'
import Articles from './articles'
import Layout from './layout'
import '../../css/noticias.css'
import { useParams } from 'react-router'

const CategoriesIndex = () => {
    //Const & Lets
    const url= process.env.REACT_APP_BACKEND_API_URL
    let config ={
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    const {id} = useParams()

//usestyles
//useContext
//useState
const [categories, setCategories] = useState([])
const [articles, setArticles] = useState([])
const [category, setCategory] = useState({
    id:'',
    name:'Categoria'
})

//useEffect
useEffect(() => {
    // getCategories()
    getCategory()
    getArticles()
}, [])

useEffect(() => {
    getArticles()
    getCategory()
}, [id])


useEffect(() => {
    console.log('categoria: ',category)
}, [category])
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

const getCategory =async()=>{
    try {    
        const response = await axios.get(`${url}/categoria-noticias-cpli/${id}`,config)
        //const response = await axios.get(`${url}/poa?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22ownerId%22%3A%20%22${usuario.id}%22%0A%20%20%7D%0A%7D`,config)
        setCategory(response.data);
    }
    catch (error) {
        console.log(error.response)
    }
    
}


const getArticles =async()=>{
    try {    
        const response = await axios.get(`${url}/categoria-noticias-cpli/${id}/noticias-cpli`,config)
        // const response = await axios.get(`${url}/categoria-nuestra-palabras/${id}/nuestra-palabras`,config)
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
                <div className="container d-flex justify-content-between mt-3 align-items-center">
                    <h3 className="m-0"> {category.nombre}</h3>
                </div>
                <hr className="d-flex justify-content-between align-items-center divisor"></hr> 
                <div className="row m-auto">
                    <div className="container">
                    <Articles articles={articles} />
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default CategoriesIndex
