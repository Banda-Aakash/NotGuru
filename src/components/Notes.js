import React, { useContext,useState, useEffect, useRef } from 'react'
import noteCotext from '../context/notes/noteContext'
import NoteIteam from './NoteIteam';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'


const Notes = () => {
  const context = useContext(noteCotext)
  const { notes, getNotes,editNote } = context;
  const ref = useRef(null)
  const refClose = useRef(null)

  let navigate = useNavigate()



  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"})


  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate("/login")
    }
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

  }
 
  const handleClick = (e) => {
    console.log("Updating",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <AddNote />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>


                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required/>
                edescription</div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-outline-danger" onClick={handleClick} disabled={note.etitle.length<5 ||note.edescription.length<5}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      {/* <EditNote/> */}
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length===0 && <h4>No notes to display</h4>}
        {notes.map((note) => {
          return <NoteIteam key={note._id} note={note} updateNote={updateNote} />
        })}
      </div>
    </div>
  )
}

export default Notes
