import axios from "axios"
import { ServerUrl } from "../App"
import { setUserData } from "../redux/usersice"
export const getCurrentUser = async (dispatch) => {
    try{
     const result =await axios.get(ServerUrl + "/api/user/currentuser",{withCredentials:true})
       
        dispatch(setUserData(result.data));
    }
    catch(error){
console.log(error.response?.data || error.message)
    }
}
export const generateNotes = async(payload) =>{
try{
const result = await axios.post(ServerUrl + "/api/notes/generate-notes",payload ,{withCredentials:true})
console.log(result.data);
return result.data
}catch(error){
console.log(error)
}
}
export const generatePDF = async(payload) =>{
    try{
    const result = await axios.post(ServerUrl + "/api/pdf/generate-pdf",{ result: payload } ,{withCredentials:true,responseType:"blob"})
  
    const blob = new Blob([result.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download ="ExamNotes.pdf";
    link.click();
    window.URL.revokeObjectURL(url);
    }
    catch(error){
throw new Error("Pdf download failed")
    }
}