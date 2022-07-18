import React, { useState,useRef } from 'react'; 
import { useFormik } from 'formik';
import * as yup from "yup"
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast'; 
import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
import { BlockUI } from 'primereact/blockui';
import {Panel} from 'primereact/panel'

 import {useNavigate} from "react-router-dom"
import "./Profile.css"

function Profile() {  

   const navigate = useNavigate()

  let [ProfileVisible,SetProfileVisible]=useState(true)
  let [EducateVisible,SetEducateVisible]=useState(false)
   let [DeclareVisible,SetDeclareVisible]=useState(false)
   let [SubmittedData,SetSubmitData]=useState([])
   let [DisplayDialog,SetDisplayDialog]=useState(false)
    
   const toast = useRef(null)
   const msgs1 = useRef(null);

  //  SubmittedData=[{
  //   "FirstName":"Shyam Prakash",
  //   "LastName":"M", 
  //   "Email":"demo@gmail.com", 
  //   "Gender":"Male"
  //  },{
  //    "Sslcmark":"100", 
  //    "Hsemark":"98.12", 
  //    "Bemark":"90.22"
  //  }]

  

  const ProfileValidate = values =>{ 
    var errors ={}
    if(!values.FirstName){
       errors.FirstName = "First Name is Required"
    } 
    else if(values.FirstName.trim().length===0 || values.FirstName.trim().length>40){
      errors.FirstName = "max length should be within 40 and null values are not accepted."
    }
    
   if(!values.Email){
    errors.Email = "Email field is Required"
 } 

    

    return errors
  } 
  
  
   
  
 
  const EducateFormik = useFormik({
    initialValues:{
       Sslcmark:"", 
       Hsemark:"", 
       Bemark:""
    }, 
    validationSchema:yup.object({
      Sslcmark:yup.string().required("your 10th class mark is required").max(7,"maxlength exceeded").trim().matches(/^\d*\.?\d*$/,"Enter the marks in number or decimal format"), 
      Hsemark:yup.string().required("your 12th class mark is required").max(7,"maxlength exceeded").trim().matches(/^\d*\.?\d*$/,"Enter the marks in number or decimal format"), 
      Bemark:yup.string().required("Enter your Bachelors mark").max(7,"maxlength exceeded").trim().matches(/^\d*\.?\d*$/,"Enter the marks in number or decimal format")
    }),
    onSubmit:(EducateFormData)=>{
      console.log(EducateFormData); 
      SetSubmitData([...SubmittedData,EducateFormData]); 
      SetDeclareVisible(true); 
      SetEducateVisible(false); 
      msgs1.current.show({severity: 'success', summary: 'Education Data Submitted', 
      detail: 'Please fill Declarative details'});
    }
  })

  const ProfileFormik = useFormik({
       initialValues:{
          FirstName : "",
          LastName:"", 
          Email:"demo@xyz.com", 
          Gender:'' 

       }, 

       validate: ProfileValidate,
       validationSchema:yup.object({
        FirstName:yup.string().min(1,"minimum characters should be length 1").max(30,"max characters length should not be 30"), 
        LastName:yup.string().trim().max(20,"maxlen should be 20").required("Last Name is required and should be max of length 20").matches(/^[a-zA-Z ]*$/,"enter in valid name format"), 
        Email:yup.string().email().required("Email Field is required") ,
        Gender:yup.string().required("select your gender field")
       }),

       onSubmit:(ProfileFormData)=>{
          console.log(ProfileFormData); 
          SetSubmitData([...SubmittedData,ProfileFormData]); 
          SetProfileVisible(false); 
          SetEducateVisible(true); 
          msgs1.current.show({severity: 'success', summary: 'Profile Data Submitted', 
          detail: 'Profile Data Submiited Please fill education details'});
         
       }
  }); 
  
 
  const HandleDeclareChange=(evt)=>{
     
  }
  
  const HandleDeclareSubmit=(evt)=>{
    evt.preventDefault(); 
   
    var accept = evt.target[0].checked;  
    if(accept===true){
     SetDeclareVisible(false);   
     SetDisplayDialog(true)
     console.log(SubmittedData); 
     msgs1.current.show({severity: 'success', summary: 'Declaration Submitted', 
     detail: 'Wait for upcoming results'}); 

     toast.current.show({severity: 'success', summary: 'Profile Detail', detail: 'Successfully Added your Profile'});

     
    }
    else{
      msgs1.current.show([{ severity: 'error', summary: 'Error', detail: 'Please read and tick the declarative form', sticky: true }])

    }
  }
  
  const onHide = (name) => {
    console.log(name); 
    SetDisplayDialog(false);  
    navigate("/")
}

const renderFooter = (name) => {
    return (
        <div>
          
            <Button label="Ok" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
        </div>
    );
}


  return (
    
   <div> 

   <Toast ref={toast}></Toast>
   <Messages ref={msgs1} />
   
   {ProfileVisible&& <div className='profdiv card-footer' style={ProfileVisible===true?{visibility: "visible"}:{visibility: "hidden"}} > 
      <h3 className='card-header text-center proftitle '>Profile Details</h3> 
      <form className='profform' onSubmit={ProfileFormik.handleSubmit}> 


      <div className="form-group">
        <label htmlFor="exampleInputEmail1">First Name</label>
        <input type="text" className="form-control" id="firnam" name="FirstName" autoComplete='off' style={{
          border : ProfileFormik.errors.FirstName ? '2px solid red' : 'none'
        }}
         aria-describedby="emailHelp" onChange={ProfileFormik.handleChange} value={ProfileFormik.values.FirstName} placeholder="Enter your name"/> 
         {
           ProfileFormik.errors.FirstName? <h4 id="emailHelp" className="form-text  text-danger card-footer">{ProfileFormik.errors.FirstName}</h4>:null 
         }
       
      </div> 

      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Last Name</label>
        <input type="text" className="form-control" id="lasnam" name="LastName" autoComplete='off' style={{
          border : ProfileFormik.errors.LastName ? '2px solid red' : 'none'
        }}
        onChange={ProfileFormik.handleChange} value={ProfileFormik.values.LastName} placeholder="Enter your last name"/> 
        {
          ProfileFormik.errors.LastName? <h5 id="emailHelp" className="form-text  text-danger card-footer">{ProfileFormik.errors.LastName}</h5>:null 
        }
      </div>
      
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="mail" aria-describedby="emailHelp" autoComplete='off' style={{
          border : ProfileFormik.errors.Email ? '2px solid red' : 'none'
        }}
        onChange={ProfileFormik.handleChange} value={ProfileFormik.values.Email} name="Email" placeholder="Enter your email"/>
        {
          ProfileFormik.errors.Email? <h3 id="emailHelp" className="form-text  text-danger card-footer">{ProfileFormik.errors.Email}</h3>:null 
        }
    </div> 

    <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Choose Your Gender</label>
    <select className="form-control" id="exampleFormControlSelect1" name='Gender' onChange={ProfileFormik.handleChange} value={ProfileFormik.values.Gender}>  
    
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Transgender">Transgender</option>
      <option value="prefer not to say" >Prefer not to say</option>
     
    </select> 
    {
      ProfileFormik.errors.Gender? <h3 id="emailHelp" className="form-text  text-danger card-footer">{ProfileFormik.errors.Gender}</h3>:null 
    }
  </div>
    
      <button type="submit" className="btn btn-primary">Submit</button>
    </form> 

    </div> }




 { EducateVisible && <div className='educatediv card-footer' style={EducateVisible===true?{visibility: "visible"}:{visibility: "hidden"}}>
    <h3 className='card-header text-center proftitle'>Education Marks Details</h3> 
    <form className='profform' onSubmit={EducateFormik.handleSubmit}> 


      <div className="form-group">
        <label htmlFor="exampleInputEmail1">SSLC Mark Percentage</label>
        <input type="text" className="form-control" id="sslc" name="Sslcmark" autoComplete='off' style={{
          border : EducateFormik.errors.Sslcmark ? '2px solid red' : 'none'
        }}
         aria-describedby="emailHelp" onChange={EducateFormik.handleChange}  value={EducateFormik.values.Sslcmark} placeholder="Enter your SSLC Mark"/> 
         {
          EducateFormik.errors.Sslcmark? <h4 id="emailHelp" className="form-text  text-danger card-footer">{EducateFormik.errors.Sslcmark}</h4>:null 
         }
       
      </div> 

      <div className="form-group">
        <label htmlFor="exampleInputPassword1">HSE Mark Percentage</label>
        <input type="text" className="form-control" id="hse" name="Hsemark" autoComplete='off' style={{
          border :EducateFormik.errors.Hsemark ? '2px solid red' : 'none'
        }}
        onChange={EducateFormik.handleChange} value={EducateFormik.values.Hsemark} placeholder="Enter your Higher Secondary Class Mark"/> 
        {
          EducateFormik.errors.Hsemark? <h5 id="emailHelp" className="form-text  text-danger card-footer">{EducateFormik.errors.Hsemark}</h5>:null 
        }
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Bachelor Graduation Degree Mark Percentage</label>
        <input type="text" className="form-control" id="hse" name="Bemark" autoComplete='off' style={{
          border :EducateFormik.errors.Bemark ? '2px solid red' : 'none'
        }}
        onChange={EducateFormik.handleChange} value={EducateFormik.values.Bemark} placeholder="Enter your Bachelors Degree  Mark"/> 
        {
          EducateFormik.errors.Bemark? <h5 id="emailHelp" className="form-text  text-danger card-footer">{EducateFormik.errors.Bemark}</h5>:null 
        }
      </div>
      
      

    
      <button type="submit" className="btn btn-primary">Submit</button>
    </form> 

  </div> 
      }

   {
    DeclareVisible && 
    
    <div className='declarediv card-footer' > 
    <form className='profform' onSubmit={HandleDeclareSubmit} > 
    <span> 
    <input type="checkbox" name="Declare" aria-label="Checkbox for following text input" onChange={HandleDeclareChange} />
    <p className='decpar'> I hereby declare that information furnished above is true and 
    correct in every respect and in case any information 
    is found incorrect even partially the candidature shall be liable to be rejected. </p>

    </span>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
      
    </div>
   }

   {
    DeclareVisible===false && EducateVisible===false && ProfileVisible===false &&
    <div className='submitted'>
   
    <Dialog header="Your Submitted Details" visible={DisplayDialog} style={{ width: '50vw' }} 
    footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}> 

    <BlockUI >
    <Panel header="Profile Informations">
     
            <div>

           <div className='item flex-lg-row card-footer'>
             <h3 className=''>First Name : </h3>
             <h4 className='res'>{SubmittedData[0].FirstName}</h4>
           </div> 

           <div className='item flex-lg-row card-footer'>
           <h3 className=''>Last Name : </h3>
           <h4 className='res'>{SubmittedData[0].LastName}</h4>
         </div>  

         <div className='item flex-lg-row card-footer'>
         <h3 className=''>Email Address : </h3>
         <h4 className='res'>{SubmittedData[0].Email}</h4>
        </div>
        
        <div className='item flex-lg-row card-footer'>
        <h3 className=''>Gender : </h3>
        <h4 className='res'>{SubmittedData[0].Gender}</h4>
       </div>


         </div>
       
         
         
       
    </Panel> 

    <Panel header="Educational Marks Informations">
     
    <div>

   <div className='item flex-lg-row card-footer'>
     <h3 className=''>SSLC Mark Percentage : </h3>
     <h4 className='res'>{SubmittedData[1].Sslcmark}</h4>
   </div> 

   <div className='item flex-lg-row card-footer'>
   <h3 className=''>HSE Mark percentage: </h3>
   <h4 className='res'>{SubmittedData[1].Hsemark}</h4>
 </div>  

 <div className='item flex-lg-row card-footer'>
 <h3 className=''>Bachelor Degree CGPA/Percentage : </h3>
 <h4 className='res'>{SubmittedData[1].Bemark}%</h4>
</div>



 </div>


</Panel>
</BlockUI>
   
</Dialog>

</div>
   }
   
  </div>
  )
  
  

 


}

export default Profile