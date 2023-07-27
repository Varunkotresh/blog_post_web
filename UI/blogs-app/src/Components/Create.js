import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const handleSave = (e) => {
        e.preventDefault();
        console.log(title, content, author);
        const data ={
            id: 0,
  title: title,
  content: content,
  author: author,
  createdAt: "2023-07-25T12:27:09.008Z",
  blogComments: [
    {
      id: 0,
      content: "string",
      createdAt: "2023-07-25T12:27:09.008Z"
    }
  ]
        }
        const url = 'http://localhost:7125/api/Posts';
        axios.post(url, data)
        .then((result)=>{
            const dt = result.data;
            console.log(dt);
            navigate('/Home');
            alert("Post Created");
        })
    }
  return (
    <form>
    <div className="form-outline mb-4">
    <label className="form-label" for="form2Example1">Title</label>
    <input type="text" 
    id="form2Example1" 
    className="form-control"
    onChange={(e)=> setTitle(e.target.value)} />
  </div>
  <div className="form-outline mb-4">
    <label className="form-label" for="form2Example1">Content</label>
    <input type="text" 
    id="form2Example1" 
    className="form-control"
    onChange={(e)=> setContent(e.target.value)} />
  </div>
  <div className="form-outline mb-4">
    <label className="form-label" for="form2Example1">Author</label>
    <input type="text" 
    id="form2Example1" 
    className="form-control"
    onChange={(e)=> setAuthor(e.target.value)} />
  </div>
  
  <button type="submit" className="btn btn-primary btn-block mb-4" 
  onClick={(e)=>handleSave(e)}
  >Add Post</button>
                         
    </form>
  )
}

export default Create
