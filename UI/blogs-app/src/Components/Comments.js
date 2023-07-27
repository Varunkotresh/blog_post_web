import React,{ useEffect, useState }from 'react'
import comment from './Comments';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';

const Comments = ({posttransfer}) => {
    // var data=()=>{
    //     return JSON.parse(posttransfer);
    // }
    const [comm, setComm] = useState([]);
    // useEffect(()=>{
    //     const fetchData = async ()=>{
    //       const result = await fetch('http://localhost:7125/api/Posts');
    //       const jresult = await result.json();
    //       //setPost(jresult);
    //       //console.log(jresult);
    //     }
    //     fetchData();
        
    //   },[])
    useEffect(()=>{
        const url = 'http://localhost:7125/api/Posts/Comments/'+id;
        axios.get(url)
        .then((res)=>{
            setComm(res.data);
            console.log(res.data);
        })
    },[]);
    const { id } = useParams();
    //console.log(useParams());
    // var c = posts.find((p) => p.id === Number(id));
    //const s = data.find((p) => p._id === Number(id));
    

  return (
    <div>
        <Container>
            <Card className='my-3 p-3 rounded' style={{ width: '18rem' }}>Comments : 
            <Card.Body>
                {comm.map((c)=>(
                
                    <Card.Text>
                     {c.content}
                        </Card.Text>
                ))}
                </Card.Body>
            </Card>
        </Container>
       
        {/* {JSON.parse(posttransfer).map((co)=>(
            <>
             {co.content}<br/>
            
            </>
           ))} */}
    </div>
  )
}

export default Comments
