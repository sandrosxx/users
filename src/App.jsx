import { useEffect, useState } from 'react'
import './App.css'
import FormUsers from './components/FormUsers'
import axios from 'axios'
import UserCard from './components/UserCard'
import'./styles/userCard.css'
import './styles/modalDelete.css'
import ModalDelete from './components/ModalDelete'

function App() {
//update: para pasar info desde usercard hasta formUser
const BASEURL ='https://users-crud1.herokuapp.com'
  const [updateInfo, setUpdateInfo] =useState()

//console.log(updateInfo)

const updateUserById = (id,data) =>{
  const URL = `${BASEURL}/users/${id}/`
  axios.patch(URL,data)
  .then(res =>{console.log(res.date)
  getUsers() 
  })
  .catch(e => console.log('error',e))
}

  const [users, setUsers] = useState()
  const getUsers = () =>{
    const URL = `${BASEURL}/users/`
    axios.get(URL)
    .then(res =>setUsers(res.data))
    .catch(e => console.log('error',e))
  }
   useEffect(() => {
     getUsers()
    }, [])
    const createNewUser = data=>{
      const URL = `${BASEURL}/users/`
      data.first_name =data.first_name.toUpperCase()
      data.last_name =data.last_name.toUpperCase()
      axios.post(URL,data)
      .then(res =>{
        console.log(res.data)
        getUsers() 
      })
      .catch(e => console.log(e))
    }
    
    const deleteUserById =(id) =>{
        const URL = `${BASEURL}/users/${id}/`
        axios.delete(URL,id)
        .then(res =>{
          //   console.log(res.data)
          setDeleteIsClose(true)
          getUsers() 
        })
        .catch(
          e => {console.log('Error delete',e)
        
          })
    }
   
    const [formIsClose, setFormIsClose] = useState(true)
    const [deleteIsClose, setDeleteIsClose] = useState(true)
    const [idForDelete, setIdForDelete] = useState()
    const [yesNo, setYesNo] = useState(true)
    const handleOpenForm = () =>{
    setFormIsClose(false)
    }

  return (
    <div className="App">
      <div className="App__container-title">
          <h1 className='App__title'>USERS</h1>
          <button onClick={handleOpenForm} className='App__btn'> Create a New User </button>
      </div>
      <div className={`form-container ${formIsClose && 'form__dissable'}`} >
      <FormUsers 
         createNewUser={createNewUser}
         updateInfo={updateInfo}
         updateUserById={updateUserById}
         setUpdateInfo={setUpdateInfo}
         setFormIsClose={setFormIsClose}
         />
      </div>
      <div className={`delete-container ${deleteIsClose && 'delete__dissable'}`}>
          <ModalDelete
          user={idForDelete}
          deleteUserById={deleteUserById}
          setDeleteIsClose={setDeleteIsClose}
          />
      </div>
      <div className='users__containers'>
      {
        users?.map(user =>(
          <UserCard 
          key={user.id}
          user={user}
          setIdForDelete ={setIdForDelete}
       //   deleteUserById={deleteUserById}
          setUpdateInfo={setUpdateInfo}
          setFormIsClose={setFormIsClose}
          setDeleteIsClose={setDeleteIsClose}
          
          />
        ))
      }
      </div>
    </div>
  )
}

export default App
