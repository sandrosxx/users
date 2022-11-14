import React from 'react'
const ModalDelete = ({user,deleteUserById,setDeleteIsClose}) => {
  
const handleYes = () =>{
    deleteUserById(user.id)
}
const handleNo =() =>{
    setDeleteIsClose(true)
}

  return (
    <article className='delete__card'>
        <h1  className='delete__title'>Delete User ?</h1>
        <p className='delete__text'> Sure delete at user {`${user?.first_name} ${user?.last_name}`}</p>
        <div className='delete__div' >
        <button className='delete__btn' onClick={handleYes}>YES</button>
        <button className='delete__btn' onClick={handleNo}>NO</button>
        </div>
    </article>
  )
}

export default ModalDelete