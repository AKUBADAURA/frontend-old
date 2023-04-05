
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./layout";
import { useParams } from "react-router";
import '../../css/noticias.css'
import Header from "../header/Header";
import NavbarApp from "../NavBar/NavbarApp";


const Article = () => {

    ///vars and const 
    const url= process.env.REACT_APP_BACKEND_API_URL
    let config ={
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
  }
  const {id} = useParams()


    //useContext

    //useState    
    const [categories, setCategories] = useState([])
    const [article, setArticle] = useState(
      {
        id: '',
        title: '',
        description: '',
        content: '',
        publishedAt: '',
        status: '',
        author: '',
        image: '',
        createAt: '',
        categoriaNoticiasId: ''
      }
    )


    //useeffect
    useEffect(() => {
        getArticle()
        getCategories()
    }, [])

    //function
    
    const getArticle =async()=>{
        try {    
            const response = await axios.get(`${url}/articulos-noticias/${id}`,config)
            console.log('el articulo', response.data)
            setArticle(response.data);
        }
        catch (error) {
            console.log(error.response)
        }
    } 

    const getCategories =async()=>{
        try {    
            const response = await axios.get(`${url}/categorias-noticias`,config)
            console.log(response)
            //const response = await axios.get(`${url}/poa?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22ownerId%22%3A%20%22${usuario.id}%22%0A%20%20%7D%0A%7D`,config)
            setCategories(response.data);
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
        <div
          id="banner"
          className="row w-100"
        >
          <img src={article.image} alt={article.title} className="w-100"/>
          <h1 className="titleArticle">{article.title}</h1>
        </div>
          <div className="container text-justify">
            {article.content}
            <hr className="divider-small divisor" />
  {/*             <div>
                {article.author.picture && (
                  <Image
                    image={article.author.picture}
                    style={{
                      position: "static",
                      borderRadius: "50%",
                      height: 30,
                    }}
                  />
                )}
              </div> */}
              <div className="width-expand">
                <p className="mb-0">
                  Por {article.author}
                </p>
                <p className="text-meta mt-0">Publicado: {article.publishedAt.toString()}
                  {/* <Moment format="MMM Do YYYY">{article.published_at}</Moment> */}
                </p>
              </div>
          </div>
      </Layout>
    </div>
  );
};

export default Article;
