let userIDAutoIncrement = 1000;

let medicineIDAutoIncrement=2000;
let orderIDAutoIncreament=3000;





let CurrentUser: UserInfo;

let CurrentmedicineID:number;



let current_MID:number;
let currentm_Name:string;
let currentm_Price:number;
let currentm_Count:number;
let currentm_Expiry:number;








//displaying singup form
function dis_singupform()
{
         let  Sign_up_form_display= document.getElementById('Sign_up_form') as HTMLDivElement;
               
        Sign_up_form_display.style.display = "block";

        let  homeform_display= document.getElementById('homeform') as HTMLDivElement;
       homeform_display.style.display = "none";

}

// //displaying sing ip form
function dis_singinform()
{
    

    let  homeform_display= document.getElementById('homeform') as HTMLDivElement;
   homeform_display.style.display = "none";

   let  Sign_ip_form_display= document.getElementById('Sign_in_form') as HTMLDivElement;
     Sign_ip_form_display.style.display = "block";
}




//creation of class and constructor
interface UserInfo {

    userID:number;
    userEmail: string;
    userPassword: string;
    userPhoneNumber: string;
    walletBalance:number;
    
}



//medical detal class
interface MedicineInfo {
    medicineID: number;
    medicineName: string;
    medicinePrice: number;
    medicineCount: number;
    medicineExpiry:Date;
    
}


interface OrderInfo{
    orderID:number;
    userName:string;
    medicinName:string;
    orderTotalPrice:number;
    orderStatus:string;  
}




// const traveDetailsList=await fetchTravel();


async function addDefaultmedicinedata()
 {

 const MedicineList=await fetchmedicineDetails();

     let a=(document.getElementById("medicinetable") as HTMLTableElement);
     a.innerHTML=`<tr><th>Medicine ID</th>
     <th>Medicine Name</th>
     <th> Price</th>
     <th>Quantity</th> 
     <th>Medicine Expiry</th>
     <th>choose</th>
 </tr> `

    MedicineList.forEach(function(medicine)
    {
        let date=medicine.medicineExpiry.toString().substring(0,10);
    
    a.innerHTML+=
    `<tr>
            <td>${medicine.medicineID}</td>   
            <td>${medicine.medicineName}</td>
            <td>${medicine.medicinePrice}</td>
            <td>${medicine.medicineCount}</td>
            <td>${date}</td>
            <td><input type="button" onclick="EditMedcine('${medicine.medicineID}')" id="Edit" value="edit    ">
            <input type="button" onclick="DeleteMedcine('${medicine.medicineID}')" id="Delete" value="delete"></td>
            
   </tr>` ;
   })
 }

 //Adddefault orderdetails

 async function Adddefaultorderdetails()
 {
    const orderdetailList=await fetchorderDetails();
    orderdetailList.forEach(function(order)
    {
        let b=(document.getElementById("orderdetails_table") as HTMLTableElement);

        if(CurrentUser.userEmail==order.userName)

            {
                b.innerHTML+=`<tr>  
    
                             <td>${order.orderID}</td> 
                             <td>${order.userName}</td> 
                             <td>${order.medicinName}</td> 
                             <td>${order.orderTotalPrice}</td> 
                             <td>${order.orderStatus}</td> 
                    </tr>`

            }

        
    })

 }
  




//sign up form validation and taking user details
async function signup_submitdetails()
{   
    const UserArrayList=await fetchuserDetails();

    let uservalidationStatus = true;


    let Email:any=(document.getElementById('email') as HTMLInputElement).value;
    let regex=/^([a-z 0-9\.-]+)@([a-z0-9\-]+).([a-z]{2,8})$/;

    if(!regex.test(Email))
        {
            alert("please enter valid email address......");
             uservalidationStatus = false;
      
        }

        
    let password1:string=(document.getElementById('password') as HTMLInputElement).value;
    let password2:string=(document.getElementById('Confirm_Password') as HTMLInputElement).value;
    let regex2=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
    if(password1!=password2 || !regex2.test(password1))
        {
            alert("please enter valid  password......");
            uservalidationStatus = false;

        }


        let userPhoneNumber:string=(document.getElementById('phonenumber') as HTMLInputElement).value;

        let regex3=/^[7-9]\d{9}$/
        if(!regex3.test(userPhoneNumber))
            {
                alert("please enter valid phone number......");
                uservalidationStatus = false;

            }
            
        if(uservalidationStatus)
            {
               
                const newuser:UserInfo={
                    userID:userIDAutoIncrement++,
                    userEmail:Email,
                    userPassword:password1,
                    userPhoneNumber:userPhoneNumber,
                    walletBalance:0,


                }
                //adding user
                addUserDetails(newuser)   

                alert(".......registration Successfull.......")

                let  homeform_display= document.getElementById('homeform') as HTMLDivElement;
                homeform_display.style.display = "block";

                let  Sign_up_form_display= document.getElementById('Sign_up_form') as HTMLDivElement;
               
                Sign_up_form_display.style.display = "none";


     }



}


async function signin_details()
{
    const UserArrayList=await fetchuserDetails();
    
    let userinputemail=(document.getElementById("userinput_email") as HTMLInputElement).value
    let userinputpassword=(document.getElementById("userinput_password") as HTMLInputElement).value;
    //alert(userinputemail);

    for(let i=0;i<UserArrayList.length;i++)
        {
            if(UserArrayList[i].userEmail==userinputemail && UserArrayList[i].userPassword==userinputpassword)
                {
                    
                    CurrentUser=UserArrayList[i];
                    addDefaultmedicinedata()
          
                alert("login...Succesfulll......");
                displayuserhome()

                }
            
        }
}



function displayuserhome()
{
    let  Sign_ip_form_display= document.getElementById('Sign_in_form') as HTMLDivElement;
    Sign_ip_form_display.style.display = "none";

    let showhome=(document.getElementById("user_home"))as HTMLDivElement;
    showhome.style.display="block";

}


function display_medicine_detail()
{
    let showhome=(document.getElementById("user_home"))as HTMLDivElement;
    showhome.style.display="block";
    let show_Medicine_Details_table=(document.getElementById("Medicine_Details_table") as HTMLDivElement);
    show_Medicine_Details_table.style.display="block";

    let showbalancedisplay=document.getElementById("balance_table") as HTMLInputElement;
    showbalancedisplay.style.display="none";


let showwalletrechargeportal=(document.getElementById("walletrecharge"))as HTMLDivElement;
    showwalletrechargeportal.style.display="none";

let showtableorderdetails=document.getElementById("orderdetails_table") as HTMLTableElement;
    showtableorderdetails.style.display="none";


let tableshow=document.getElementById("purchase_Medicine_Div") as HTMLDivElement;
    tableshow.style.display="none";


let CancelorderDiv=document.getElementById("Cancel_Medicine_Div") as HTMLDivElement;
    CancelorderDiv.style.display="none";





}

 function gotouserhome()
 {
    alert("balance diplayed successfully")
    let showhome=(document.getElementById("user_home"))as HTMLDivElement;
    showhome.style.display="block";

    let showbalancedisplay=document.getElementById("balance_table") as HTMLInputElement;
    showbalancedisplay.style.display="none";


 }


 function logout()
 {
    let  homeform_display= document.getElementById('homeform') as HTMLDivElement;
    homeform_display.style.display = "block";

    let showhome=(document.getElementById("user_home"))as HTMLDivElement;
    showhome.style.display="none";

    let showtableorderdetails=document.getElementById("orderdetails_table") as HTMLTableElement;
    showtableorderdetails.style.display="none";

    
   
    let showwalletrechargeportal=(document.getElementById("walletrecharge"))as HTMLDivElement;
    showwalletrechargeportal.style.display="none";

    let showbalancedisplay=document.getElementById("balance_table") as HTMLInputElement;
    showbalancedisplay.style.display="none";

    let show_Medicine_Details_table=(document.getElementById("Medicine_Details_table") as HTMLDivElement);
    show_Medicine_Details_table.style.display="none";

    let tableshow=document.getElementById("purchase_Medicine_Div") as HTMLDivElement;
    tableshow.style.display="none";

    let showtableorderdetails1=document.getElementById("orderdetails_table") as HTMLTableElement;
    showtableorderdetails1.style.display="none";

    let CancelorderDiv=document.getElementById("Cancel_Medicine_Div") as HTMLDivElement;
    CancelorderDiv.style.display="none";

    


 }



 function walletrechargebutton()
 {
    let showwalletrechargeportal=document.getElementById("walletrecharge") as HTMLDivElement;
    showwalletrechargeportal.style.display="block";



 }



 
 async function Rechargeamountinside(amount:number)
 {
    const UserArrayList=await fetchuserDetails();

   // CurrentUser.walletBalance+=amount;

    for(let i=0;i<UserArrayList.length;i++)
        {
            if(UserArrayList[i].userID==CurrentUser.userID)
                {
                    const newuser:UserInfo={
                        userID:CurrentUser.userID,
                        userEmail:CurrentUser.userEmail,
                        userPassword:CurrentUser.userPassword,
                        userPhoneNumber:CurrentUser.userPhoneNumber,
                        walletBalance:CurrentUser.walletBalance+amount
                    }

                    updateuserinfo(CurrentUser.userID,newuser)
                    
                  
                displayuserhome()

                }
            
        }

 }

 function walletRecharge()
 {
    let rechargeamount=parseInt((document.getElementById("input_amount") as HTMLInputElement).value);
    Rechargeamountinside(rechargeamount);


    alert("recharge succeessfull....");

    let showwalletrechargeportal=document.getElementById("walletrecharge") as HTMLDivElement;
    showwalletrechargeportal.style.display="none";

 }





 async function Show_Balancebutton()
 {
    
    const UserArrayList=await fetchuserDetails();
    let tableshow=document.getElementById("balance_table") as HTMLDivElement;
    tableshow.style.display="block";

    let balance=(document.getElementById("current_balance") as HTMLInputElement);


    UserArrayList.forEach(function(user)
{
    if(CurrentUser.userID==user.userID)
        {
            

            // const userr:UserInfo={
            //     userID:user.userID,
            //     userEmail:user.userEmail,
            //      userPassword:user.userPassword,
            //       userPhoneNumber: user.userPhoneNumber,
            //       walletBalance:user.walletBalance
            // }
            // updateuserinfo(user.userID,userr)

            balance.innerHTML=user.walletBalance.toString();
            alert(balance.innerHTML);
        }
})

   


 }


function oder_historybutton()
{
    Adddefaultorderdetails();
    let showtableorderdetails=document.getElementById("orderdetails_table") as HTMLTableElement;
    showtableorderdetails.style.display="block";
}

async function showingPurchasemedinedetails()
{
    const MedicineList=await fetchmedicineDetails();
    MedicineList.forEach(function(medicine)
    {
        let date=medicine.medicineExpiry.toString().substring(0,10);

    let a=(document.getElementById("purchase_Medicine_Details_table") as HTMLTableElement);
    a.innerHTML+=
    `<tr>
            <td>${medicine.medicineID}</td>   
            <td>${medicine.medicineName}</td>
            <td>${medicine.medicinePrice}</td>
            <td>${medicine.medicineCount}</td>
            <td>${date}</td>
            <td><input type="button" onclick="BuyMedicine('${medicine.medicineID}')" id="Edit" value="Buy    "></td>
            
   </tr>` ;
   })

}

function PurchaseButton()
 {
    showingPurchasemedinedetails();
    let tableshow=document.getElementById("purchase_Medicine_Div") as HTMLDivElement;
    tableshow.style.display="block";

}



function BuyMedicine(medicineID:number)
 {
    let tableshow=document.getElementById("medicinecount_div") as HTMLDivElement;
    tableshow.style.display="block";
    CurrentmedicineID=medicineID;



    
}




// addUserDetails(newuser) 
async function medicinecountinputSubmit()
{
    const MedicineList=await fetchmedicineDetails();

    let flag1:number=0;
    let flag2:number=0;

    let Medicineinputcount=Number((document.getElementById("medicineinputcount") as HTMLInputElement).value);


   MedicineList.forEach(function(med)
  {
    if(med.medicineID==CurrentmedicineID  )
        {
             
           if(Medicineinputcount<=med.medicineCount)
            {
                 if(med.medicinePrice<=CurrentUser.walletBalance)
                 {      
                        med.medicineCount-=Medicineinputcount;
                        CurrentUser.walletBalance=CurrentUser.walletBalance-med.medicinePrice*Medicineinputcount;

                        const neworder:OrderInfo={
                            orderID:orderIDAutoIncreament++,
                            userName:CurrentUser.userEmail,
                            medicinName:med.medicineName,
                            orderTotalPrice:med.medicinePrice,
                            orderStatus:"Ordered"

                        }
                       addOrder(neworder)
                       
                       //MedicineList.push(new MedicineInfo(med.medicineName,med.medicinePrice,med.medicineCount,med.medicineExpiry));
                      
                       updatemedicineinfo(med.medicineID,med)
                       updateuserinfo(CurrentUser.userID,CurrentUser)
                       addDefaultmedicinedata();

                      alert("item Added Succesfully.....");


                      let medicineCountdiv=document.getElementById("medicinecount_div") as HTMLDivElement;
                      medicineCountdiv.style.display="none";

                      let tableshow1=document.getElementById("purchase_Medicine_Div") as HTMLDivElement;
                      tableshow1.style.display="none";

                }
                    else
                    {
                        alert("Insufficient Wallet_Balance please Rechange wallet.....");
                        walletrechargebutton();
                
                    }      
             }
            else
            {
                alert("___entered quantity is not available___");
            }
           
        }
   

 })

   


   

}


async function showcancelordertable()
{
    const orderdetailList=await fetchorderDetails();
    orderdetailList.forEach(function(order)
    {
        let b=(document.getElementById("Cancel_Medicine_Details_table") as HTMLTableElement);

        if(CurrentUser.userEmail==order.userName)

            {
                b.innerHTML+=`<tr>  
    
                             <td>${order.orderID}</td> 
                             <td>${order.userName}</td> 
                             <td>${order.medicinName}</td> 
                             <td>${order.orderTotalPrice}</td> 
                             <td>${order.orderStatus}</td>
                             <td><input type="button" onclick="CancelorderID('${order.orderID}')" id="Edit" value="cancel    "></td>

                    </tr>`

            }

        
    })


}


// addOrder(neworder)


async function CancelorderID(tableorderID:number)
{
    const orderdetailList=await fetchorderDetails();

    orderdetailList.forEach(function(order)
{ 
    if(tableorderID==order.orderID)
        {
            if(order.orderStatus=="Ordered")
                {
                    

                    const neworder:OrderInfo={
                        orderID:orderIDAutoIncreament++,
                        userName:order.userName,
                        medicinName:order.medicinName,
                        orderTotalPrice:order.orderTotalPrice,
                        orderStatus:"cancelled"
                    
                    }

                    updateorderinfo(order.orderID,neworder)


                    alert("your order has been cancelled");

                    let CancelorderDiv=document.getElementById("Cancel_Medicine_Div") as HTMLDivElement;
                    CancelorderDiv.style.display="none";
                    

                    


                }
            
        }


})



}

function cancelbutton()
{
    let CancelorderDiv=document.getElementById("Cancel_Medicine_Div") as HTMLDivElement;
    CancelorderDiv.style.display="block";

    let showbalancedisplay=document.getElementById("balance_table") as HTMLInputElement;
    showbalancedisplay.style.display="none";

    
    let showwalletrechargeportal=(document.getElementById("walletrecharge"))as HTMLDivElement;
    showwalletrechargeportal.style.display="none";
    
    let showtableorderdetails=document.getElementById("orderdetails_table") as HTMLTableElement;
    showtableorderdetails.style.display="none";
    
    
    let tableshow=document.getElementById("purchase_Medicine_Div") as HTMLDivElement;
    tableshow.style.display="none";
    
    
    let show_Medicine_Details_table=(document.getElementById("Medicine_Details_table") as HTMLDivElement);
    show_Medicine_Details_table.style.display="none";



    showcancelordertable();




}









function Home()
{

    let showhome=(document.getElementById("user_home"))as HTMLDivElement;
    showhome.style.display="block";

    let showbalancedisplay=document.getElementById("balance_table") as HTMLInputElement;
    showbalancedisplay.style.display="none";

    let CancelorderDiv=document.getElementById("Cancel_Medicine_Div") as HTMLDivElement;
    CancelorderDiv.style.display="none";

    let tableshow=document.getElementById("medicinecount_div") as HTMLDivElement;
    tableshow.style.display="none";

    let showtableorderdetails=document.getElementById("orderdetails_table") as HTMLTableElement;
    showtableorderdetails.style.display="none";

    let tableshow2=document.getElementById("purchase_Medicine_Div") as HTMLDivElement;
    tableshow2.style.display="none";

    let showwalletrechargeportal=document.getElementById("walletrecharge") as HTMLDivElement;
    showwalletrechargeportal.style.display="none";

    let show_Medicine_Details_table=(document.getElementById("Medicine_Details_table") as HTMLDivElement);
    show_Medicine_Details_table.style.display="none";

    let displayeditmedicineform=(document.getElementById("Editmedicinediv")as HTMLDivElement );
    displayeditmedicineform.style.display="none";

}


function Addmedicinebutton()
{
    let displayAddmedcineform=document.getElementById("Addmedicinediv") as HTMLDivElement;
    displayAddmedcineform.style.display="block";

    let show_Medicine_Details_table=(document.getElementById("Medicine_Details_table") as HTMLDivElement);
    show_Medicine_Details_table.style.display="none";


}

async function Addmedicine()
{
    const MedicineList=await fetchmedicineDetails();
   

    let M_name=(document.getElementById("input_medicineName") as  HTMLInputElement);
    let M_price=(document.getElementById("Medcine_price") as  HTMLInputElement);
    let M_count=(document.getElementById("Medcine_Count") as  HTMLInputElement);
    let M_EDate=(document.getElementById("medicine_Expiry_Date") as  HTMLInputElement);
   // let date=M_EDate
    


    
    const medicine:MedicineInfo={
        medicineID:medicineIDAutoIncrement++,
        medicineName:String(M_name.value),
        medicinePrice:parseInt(M_price.value),
        medicineCount:parseInt(M_count.value),
        medicineExpiry:new Date(M_EDate.value.toString())
       
        }
    const MedicineListt=await addMedicine(medicine);
        
    addMedicine(medicine)
    //fetchmedicineDetails()


    let a=(document.getElementById("medicinetable") as HTMLTableElement);
    a.innerHTML="";
    
    alert(new Date(M_EDate.value.toString()));
    addDefaultmedicinedata();
    
    
//     MedicineList.forEach(function(medicine)
//     {
//         let date=medicine.medicineExpiry.toString().substring(0,10);

//     let a=(document.getElementById("medicinetable") as HTMLTableElement);
//     a.innerHTML+=
//     `<tr>
//             <td>${medicine.medicineID}</td>   
//             <td>${medicine.medicineName}</td>
//             <td>${medicine.medicinePrice}</td>
//             <td>${medicine.medicineCount}</td>
//             <td>${date}</td>
//             <td><input type="button" onclick="EditMedcine('${medicine.medicineID}')" id="Edit" value="edit    ">
//             <input type="button" onclick="DeleteMedcine('${medicine.medicineID}')" id="Delete" value="delete"></td>
            
//    </tr>` ;
//    })

   
   let displayAddmedcineform=document.getElementById("Addmedicinediv") as HTMLDivElement;
   displayAddmedcineform.style.display="none";

   let show_Medicine_Details_table=(document.getElementById("Medicine_Details_table") as HTMLDivElement);
    show_Medicine_Details_table.style.display="block";
   alert("Succesfully Added");
   

}
   



async function EditMedcine(m_Id:number)
    {
        const MedicineList=await fetchmedicineDetails();
        current_MID=m_Id;
        let displayeditmedicineform=(document.getElementById("Editmedicinediv")as HTMLDivElement );
        displayeditmedicineform.style.display="block";

        let show_Medicine_Details_table=(document.getElementById("Medicine_Details_table") as HTMLDivElement);
        show_Medicine_Details_table.style.display="none";

       
       MedicineList.forEach(function(medicine)
        {
            if(medicine.medicineID==m_Id)
                {
                    (document.getElementById("edit_input_medicineName")as HTMLInputElement).value=medicine.medicineName;

                    let A=((document.getElementById("edit_Medcine_price")as HTMLInputElement));
                    A.value=medicine.medicinePrice.toString();

                    let B=((document.getElementById("edit_Medcine_Count")as HTMLInputElement));
                    B.value=medicine.medicineCount.toString();

                    let c = document.getElementById("edit_medicine_Expiry_Date")as HTMLInputElement ;

                    c.value=medicine.medicineExpiry.toString().substring(0,10);
                    //addDefaultmedicinedata();
                
                }

        })

        

}



async function EditMedicineSubmitbutton()
{
    const MedicineList=await fetchmedicineDetails();

    let ab=(document.getElementById("edit_input_medicineName")as HTMLInputElement).value;

    let b=((document.getElementById("edit_Medcine_price")as HTMLInputElement).value);
    let pric:number=Number(b);
   

    let c=((document.getElementById("edit_Medcine_Count")as HTMLInputElement).value);
    let countt:number=Number(c);

    let M_EDate=(document.getElementById("edit_medicine_Expiry_Date") as  HTMLInputElement);
    //let dat11=new Date(M_EDate.value);
   // console.log(M_EDate.value);
    
    MedicineList.forEach( function(medicine)
    {
        if(medicine.medicineID==current_MID)
            {
        
                let datearray:string[]=M_EDate.value.split('-');
                console.log(datearray);
                const medicinee:MedicineInfo=
                {
                    medicineID:medicine.medicineID,
                    medicineName:ab,
                    medicinePrice:pric,
                    medicineCount:countt,
                    medicineExpiry:new Date(Number(datearray[0]),Number(datearray[1]),Number(datearray[2]))
                    //new date(2024-12-2)

                 }
                 //"medicineID":2003,"medicineName":"tab","medicinePrice":16,"medicineCount":32,"medicineExpiry":"2024-05-16T00:00:00

                 console.log(medicinee);
                 updatemedicineinfo(medicine.medicineID,medicinee)

                addDefaultmedicinedata();
                let displayeditmedicineform=(document.getElementById("Editmedicinediv")as HTMLDivElement );
                displayeditmedicineform.style.display="none";
                let show_Medicine_Details_table=(document.getElementById("Medicine_Details_table") as HTMLDivElement);
                show_Medicine_Details_table.style.display="block";
                               
            }

    })

    alert("Succuss fully Edited");


}


//DeleteMedcine('${medicine.medicineID}')"
async function DeleteMedcine(medId:number)
{
    const MedicineList=await fetchmedicineDetails();

    MedicineList.forEach(function(medi){
        if(medi.medicineID==medId)
            {
                deletemedicineinfo(medId);
                //updatemedicineinfo(medId,medi);
                //addDefaultmedicinedata();
                let show_Medicine_Details_table=(document.getElementById("Medicine_Details_table") as HTMLDivElement);
                show_Medicine_Details_table.style.display="block";
                       
            }

    });

}



/*---------------------------------------------------------------------------------------------------------------------*/
//add
async function addUserDetails(user:UserInfo):Promise<void> {
    const response=await fetch('http://localhost:5230/api/UserInfo' ,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    });
    if(!response.ok)
        {
            throw new Error ('Failed To add user');
            
        }
    
}

//add method for order
async function addOrder(order:OrderInfo):Promise<void> {
    const response=await fetch('http://localhost:5230/api/OrderInfo' ,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(order)
    });
    if(!response.ok)
        {
            throw new Error ('Failed To add order');
            
        }
    
}

//add method for medicine

async function addMedicine(medicine:MedicineInfo):Promise<void> {
    const response=await fetch('http://localhost:5230/api/MedicineInfo' ,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(medicine)
    });
    if(!response.ok)
        {
            throw new Error ('Failed To add order');
            
        }
    
}

/*-----------------------------------------------------------------------------------------------------------------*/

//show
async function fetchuserDetails(): Promise<UserInfo[]> {
    const apiUrl = 'http://localhost:5230/api/UserInfo';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }


async function fetchorderDetails(): Promise<OrderInfo[]> {
    const apiUrl = 'http://localhost:5230/api/OrderInfo';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }

  async function fetchmedicineDetails(): Promise<MedicineInfo[]> {
    const apiUrl = 'http://localhost:5230/api/MedicineInfo';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }

/*_________________________________________________________________________________________________________________________*/

//update

async function updatemedicineinfo(id: number, medicine: MedicineInfo): Promise<void> {
    const response = await fetch(`http://localhost:5230/api/MedicineInfo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(medicine)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    addDefaultmedicinedata();
  }


  async function updateuserinfo(id: number, user: UserInfo): Promise<void> {
    const response = await fetch(`http://localhost:5230/api/UserInfo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    //addDefaultmedicinedata();
    
  }


  async function updateorderinfo(id: number, order: OrderInfo): Promise<void> {
    const response = await fetch(`http://localhost:5230/api/OrderInfo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    
  }

  /*_____________________________________________________________________________________________________________________________*/
  //delete
  
  async function deleteorderinfo(id: any): Promise<void> {
    const response = await fetch(`http://localhost:5230/api/OrderInfo/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete Order');
    }
    
  }



  async function deleteuserinfo(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5230/api/UserInfo/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    
  }


  async function deletemedicineinfo(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5230/api/MedicineInfo/${id}`, {
      method: 'DELETE',
      
    });
    if (!response.ok) {
      throw new Error('Failed to delete medicine');
    }
    addDefaultmedicinedata();
    
  }




















