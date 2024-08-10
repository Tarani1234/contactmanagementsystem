import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './App.css';
import { IoIosClose } from "react-icons/io";

import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8080/"
const App = () => {
 const[addSection, setAddSection] = useState(false);
 //update
 const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
 const[formData, setFormData] = useState({
   name : "",
   email : "",
   mobile :"",
 })
const[dataList, setDataList] = useState([])
 const handleOnChange = (e) =>{
    const {value, name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
 }
 const handleSubmit = async (e) => {
  e.preventDefault(); // Prevents the default form submission behavior
  try {
    const response = await axios.post("/create", formData);
    if (response.data.success) {
      setAddSection(false);
      alert(response.data.message);
      getFetchData(); // Refresh the data list
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  const getFetchData = async()=>{
    const data =  await axios.get("/" )
    console.log(data);
    
    if(data.data.success){
      setDataList(data.data.data)
      // alert(data.data.message)
     
    }
  }
 useEffect(()=>{
  getFetchData()
 }, [])
 console.log(dataList);



//  const handleDelete = async(id)=>{
//    const data = await axios.delete("/delete/"+id)

//    if(data.data.success){
//     getFetchData()
//     alert(data.data.message)
//    }
//  }
const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`/delete/${id}`);

    if (response.data.success) {
      getFetchData(); // Refresh the data list
      alert(response.data.message); // Show success message
    } else {
      alert("Failed to delete the item. It may have already been deleted.");
    }
  } catch (error) {
    console.error("Error deleting the item:", error);

    if (error.response) {
      // Server responded with a status other than 2xx
      alert(`Error: ${error.response.data.message || "Failed to delete the item."}`);
    } else if (error.request) {
      // Request was made but no response was received
      alert("Error: No response from the server. Please try again later.");
    } else {
      // Something else happened while setting up the request
      alert("Error: An unexpected error occurred.");
    }
  }
};

//update
const handleEdit = (item) => {
  setFormData({
    name: item.name,
    email: item.email,
    mobile: item.mobile,
  });
  setIsEditing(true);
  setEditId(item._id);
  setAddSection(true);
};
  return (
    <>
    <div className='container'>
      <button className='btn btn-add' onClick={()=>{setAddSection(true)}}>Add</button>
      {
        addSection && (
          <div className='addcontainer'>
      
        <form onSubmit={handleSubmit} >
        <div className='close-btn'onClick={()=>{setAddSection(false)}}><IoIosClose/></div>
          <label htmlFor='name'>Name :</label>
          <input type='text' id='name' onChange={handleOnChange} name='name'/>

          <label htmlFor='email'>Email :</label>
          <input type='text' id='email' onChange={handleOnChange} name='email'/>

          <label htmlFor='mobile'>Mobile :</label>
          <input type='text' id='mobile' onChange={handleOnChange} name='mobile'/>

      <button className='btn' >Submit</button>

        </form>
      </div>
        )
      }
     
      

      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className='row-names' sx={{ borderBottom: '2px solid black' }}>
                <TableCell align='center'><h3 className='heading-tag'>Name</h3></TableCell>
                <TableCell align="center"><h3 className='heading-tag'>Email</h3></TableCell>
                <TableCell align="center"><h3 className='heading-tag'>Phone Number</h3></TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              
              {dataList.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {/* <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell> */}
                  <TableCell align="center"><h4 className='heading-tag-row'>{row.name}</h4></TableCell>
                  <TableCell align="center"><h4  className='heading-tag-row'>{row.email}</h4></TableCell>
                  <TableCell align="center"><h4  className='heading-tag-row'>{row.mobile}</h4></TableCell>
                  <TableCell align="center">
                  <div className='button'>
              <button className='btn btn-edit' onClick={() => handleEdit(row)}>Edit</button>
              <button className='btn btn-delete' onClick={(e)=>handleDelete(row._id)}>Delete</button>
              </div>
                  </TableCell>
                  
                </TableRow>
                
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>

       
   

    </div>
    </>
  )
}

export default App


 {/* <div>
        <div className='heading-main-element'>
           <h1>Name</h1>
           <h1>Email</h1>
           <h1>Phone Number</h1>
        </div> */}
        
        {/* <div className="event-items-container">
           
             {dataList.length > 0 ? (
                    dataList.map((event, idex) => (
                        <div key={idex} className='event-item'>
                     
                          <h3>{event.name}</h3>
                            <h3 >{event.email}</h3>
                            <h3 >{event. mobile }</h3>
                            <button className='btn btn-edit'>Edit</button>
                            <button className='btn btn-delete' onClick={()=>handleDelete(event._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No events available.</p>
                )}
                      
     </div>
        <div> 

         </div>
      </div> */}