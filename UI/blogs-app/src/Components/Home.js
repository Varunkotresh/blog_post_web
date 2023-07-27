import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Comments from './Comments';

const Home = () => {
    const API = "http://localhost:7125/api/Posts";
    const [posts, setPost] = useState([]);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState(false);
   
    // const fetchApiData = async (url) => {
    //     try{
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         console.log(data);
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // };
    useEffect(()=>{
      const fetchData = async ()=>{
        const result = await fetch('http://localhost:7125/api/Posts');
        const jresult = await result.json();
        setPost(jresult);
        //console.log(jresult);
      }
      fetchData();
      
    },[])
    const handleComment = (e,id) =>{
      e.preventDefault();
      
    console.log(comment);
      const data ={
        id: 0,
    content: comment,
    createdAt: "2023-07-26T11:14:28.074Z",
    postId: id
      }
      const url = 'http://localhost:7125/api/Comments';
        axios.post(url, data)
        .then((result)=>{
            const dt = result.data;
            console.log(dt);
            //navigate('/Home');
            alert("Commented");
        })
    }
   console.log(posts);
    // useEffect(()=>{
    //   //getData();
    //    async function getPost(){
    //     const response = await fetch(API);
    //     const data = await response.json();
    //     setPost(data);
    //    }
    //    getPost();
    //    console.log(posts, "posts");
    // },[])
   
  return (
    <div>
      <Container>
      {/* <Row>
            {posts.map((p)=>{
              return(
                <Col sm={12} md={6} lg={4} xl={3}>
                    <Card className='my-3 p-3 rounded'>
                        <Link>
                        
                        </Link>
                    </Card>
                    <Card.Body>
                        <Card.Title>
                            <strong>{p.Title}</strong>
                        </Card.Title>
                        <Card.Text>
                            <p>Content:{p.Content}</p>
                            Author:{p.Author}
                        </Card.Text>
                        <Card.Text className='pt-2'>
                            Created At : {p.CreatedAt}
                        </Card.Text>
                    </Card.Body>
                </Col>
              )
})}
        </Row> */}
        <Row xs={1} md={3} className="g-4">
        {posts.map((p)=>(
          <Col> 
        <Card className='my-3 p-3 rounded' style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title><h3>Title : {p.title}</h3></Card.Title>
            <Card.Text>
              <p>{p.content}</p>
              {p.author}
            </Card.Text>
            <Card.Text>
             {p.CreatedAt}
            </Card.Text>
           Post Created Date : {p.createdAt}
           <div >
           {/* <a onClick={() => setShow(currentShow => !currentShow)}>Comments :</a> 
           { show ?<Comments  posttransfer={JSON.stringify(p.blogComments)} /> : null } */}
           
             <Link to={`/Comments/${p.id}`}>Comments</Link>
           </div>
           <input type="text" id="ip1" 
            onChange={(e)=> setComment(e.target.value)} onClick={() => setShow(currentShow => !currentShow)}/>
            {show ?
            <button type="submit" class="btn-block mb-4" 
            onClick={(e)=>handleComment(e,p.id)}>Send</button>: null}
                     
           
          </Card.Body> 
          </Card>
          </Col>
          
        
        ))}
        </Row>
      {/* <ul>
        {posts.map((post)=>(
            <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <h6>{post.author}</h6>
            </li>
        )
        )}
      </ul> */}
      </Container>
      
    </div>
    
  )
}

export default Home
