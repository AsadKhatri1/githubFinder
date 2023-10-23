import React, { useEffect, useState } from 'react';

import Layout from '../../ui/layout';
import { Box, Grid, Typography, Button } from '@mui/material';
import axios from 'axios';
import spinner from '../../../assets/images/Spinner.gif'
import Users from './users';


const HomeDefault = () => {
  const [data, setData] = useState({
    loading: true,
    users: [],

  })

  // fetching APIs through axios:

  useEffect(() => {
    const getAllData=async()=>{
     try{
      setData((prevdata)=>({...prevdata, loading:true}))
      const response= await axios.get('https://api.github.com/users?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}')
      setData({users:response.data, loading:false})
     }
     catch(err){
      console.log(err)
      setData({ loading:false})

     }
    }
    getAllData()
  }, [])

 

  return (
    <div>
      <Layout>
        <Grid container spacing={5} rowSpacing={10} >

          {
            data.loading && (
              <Box sx={{display:'flex',
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'center',
              width:'100vw'}}>
              <Box component="img" src={spinner} alt="Loading..." height='150px' marginTop="100px">
               
              </Box>
              </Box>
            )
          }
      
          {
            data.users && data.users.length > 0 ? data.users.map((user) => (
              <>
              <Users key={user.id} user={user}/>
              </>
            )) :
              (
                <>
                
                </>
              )

          }
        </Grid>
      </Layout>

    </div>
  );
}

export default HomeDefault;
