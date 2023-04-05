import { Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { POAContext } from '../../../context/POAContext'

const POAindexModalDetailsTabComunidades = () => {
  //lets and const
  const url = process.env.REACT_APP_BACKEND_API_URL
  let response
  //useContext
  const { POA } = useContext(POAContext)
  //useState
  const [comunidadesSameProject, setComunidadesSameProject] = useState([])
  //useeffect
  useEffect(() => {
    getComunidadesSameProject()

    return () => {
      setComunidadesSameProject([])
    }
  }, [])

  useEffect(() => {
    console.log('comunidadesSameProject: ', comunidadesSameProject)
    return () => {
    }
  }, [comunidadesSameProject])


  //functions
  const getComunidadesSameProject = async () => {
    response = await axios.get(`${url}/poa?filter[where][codigo]=${POA.codigo}`)
    console.log('poas same codigo: ', response.data)
    let comunidadesSameProjectLet = [];
    response.data.map((item) => {
      if (
        comunidadesSameProjectLet.find(
          (element) => element.comunidad === item.comunidad
        ) === undefined
      ) {
        comunidadesSameProjectLet.push(item);
      }
    });
    setComunidadesSameProject(comunidadesSameProjectLet)
  }

  return (
    <div className="row TabsModalDetailPOA">
      <div className="col-12">
        <Typography className="my-1">Comunidades consultadas en este proyecto:</Typography>
        <hr className="d-flex justify-content-between  align-items-center divisor"></hr>
        {
          comunidadesSameProject.map((item) => {
            return (
              <div key={item.id}>
                <Link to={'/poas/' + item.id}>{item.comunidad}</Link>
                <br />
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default POAindexModalDetailsTabComunidades