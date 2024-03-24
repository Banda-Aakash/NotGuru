import React, { useContext, useState } from 'react'
import noteCotext from '../context/notes/noteContext'


const AddNote = () => {
    const context=useContext(noteCotext)
    const {addNote}=context;

    const [note,setNote]=useState({title:"",description:"",tag:"default"})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
      <h2>Add Your Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
        </div>


        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} minLength={5} required/>
        </div>
        
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange} minLength={5} required/>
        </div>

        <button disabled={note.title.length<5 ||note.description.length<5 } type="submit" className="btn btn-outline-danger" onClick={handleClick}>Add Note</button>
      </form>
      </div>
    </div>
  )
}

export default AddNote
