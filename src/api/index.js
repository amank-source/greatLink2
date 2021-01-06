

import axios from 'axios'
const BASE_URL = 'api'
export const getLinks = async () => {
  const url = `${BASE_URL}/links`
  const { data } = await axios.get(url)
  console.log('data is ', data)
  return data
}

export const getTags = async() =>{
    const url = `${BASE_URL}/tags`;
    const {data} = await axios.get(url)
    return data;
}

export const createLink = async (body) =>{
  const url =  `${BASE_URL}/links`
  const {data} = await axios.post(url, body)
  return data;
  
  
}

export const deleteLink = async(linkId) =>{
  console.log('hitting delete api');
  console.log('this is link id to delete at api', linkId)
  const url = `${BASE_URL}/links/${linkId}`;
  const del = await axios.delete(url);

  console.log('your link is deleted');
}

export const editLink = async(body, linkId)=>{
  const url = `${BASE_URL}/links/${linkId}`;
  const edit = await axios.patch(url, body);
  return edit;
  console.log('this is edited link');

}


