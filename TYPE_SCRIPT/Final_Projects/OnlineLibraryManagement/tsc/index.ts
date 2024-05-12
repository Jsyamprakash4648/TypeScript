
let CurrentLoggedUser:UserDetails;
interface UserDetails{
    userID:any;
    userName:string;
    gender:string;
    department:string;
    mobileNumber:string;
    mailID:string;
    walletBalance:number;
    password:string;
    picture:string[];
    

}

interface BookDetails{

    bookID:any;
    bookName:string;
    authorName:string
    bookCount:number;

}

interface borrowDetails
{   
    borrowID:any;
    bookID:number;
    userID:number;
    borrowedDate:Date;
    borrowBookCount:number;
    status:string;
    paidFineAmount:number;

}


function newUserB()
{
    (document.getElementById("UserRegistrationdfeildset") as HTMLFieldSetElement).style.display="block";
    (document.getElementById("userloginfeildset")as HTMLFieldSetElement).style.display="none";

}

function existing_User_Button()
{
    (document.getElementById("UserRegistrationdfeildset") as HTMLFieldSetElement).style.display="none";
    (document.getElementById("userloginfeildset")as HTMLFieldSetElement).style.display="block";
    
}


let formm = (document.getElementById("asdf") as HTMLFormElement);
formm.addEventListener('submit',(event)=> {
  event.preventDefault();
    let Ipusername=(document.getElementById("inputUsername")as HTMLInputElement).value;
    let Ippassword=(document.getElementById("inputPassword")as HTMLInputElement).value;
    let IpGender=(document.getElementById("inputGender")as HTMLInputElement).value;
    let IpDepartment=(document.getElementById("inputDepartment")as HTMLInputElement).value;
    let IpPhoneNumber=(document.getElementById("inputPhoneNumber") as HTMLInputElement).value;
    let IpwalletBalance=Number((document.getElementById("inputwalletBalance") as HTMLInputElement).value);
    let IpMailID=(document.getElementById("inputMailID")as HTMLInputElement).value;
    let IPLPIC:any=(document.getElementById("inputpicture") as HTMLInputElement);

    const reader = new FileReader();
  reader.readAsDataURL(IPLPIC.files[0]);
    reader.onload = function(event){
      const base64string = event.target?.result as string;  
      const newuser:UserDetails={

        userID:undefined,
        userName:Ipusername,
        gender:IpGender,
        department:IpDepartment,
        mobileNumber:IpPhoneNumber,
        mailID:IpMailID,
        walletBalance:IpwalletBalance,
        password:Ippassword,
        picture:[base64string]
      }

      addUserDetails(newuser);
      alert("sucsedd")
    }
  
  }
)

async function registrationformsubmitB() {
  
}
  //const G=IPLPIC.files?.[0]
  
 
 


//   ReadableStream.onload=function(event)
//   {
//     const base64string=event.target?.result as string;

    
 

    



//   }

//   const adduser=await addUserDetails(newuser);
//   alert("registration Successfull");



// }

// FormData.addEventLi

async function loginsubmitB()
{
  const userList=await fetchUserDetails();
  let Iplusername=(document.getElementById("logininputusername")as HTMLInputElement).value;
  let Iplpassword=(document.getElementById("logininputpassword")as HTMLInputElement).value;
  let flag:boolean=true;

  let a=document.getElementById("222") as HTMLImageElement;



  userList.forEach(function(user)
  {
      if(user.userName==Iplusername && user.password==Iplpassword)
        {
          flag=false;
          CurrentLoggedUser=user;
          alert("login Successfull");
          a.src=user.picture[0];



          (document.getElementById("submenudiv")as HTMLDivElement).style.display="block";
          (document.getElementById("userloginfeildset")as HTMLFieldSetElement).style.display="none";

        }
  })
  if(flag)
    {
      alert("please check details");
    }


}

function walletrecharge()
{
  (document.getElementById("rechargeWalletDiv1")as HTMLDivElement).style.display="block";
  (document.getElementById("DisbookhistoryID") as HTMLDivElement).style.display="none";
  (document.getElementById("borrowbookdivID")as HTMLDivElement).style.display="none";
  alert(CurrentLoggedUser.walletBalance);

}


async function funInputrechargeAmountB()
{
  const UserDetailsList=await fetchUserDetails();

  let IPamount=parseInt((document.getElementById("InputrechargeAmount")as HTMLInputElement).value);
  UserDetailsList.forEach(function(user)
 {
  if(CurrentLoggedUser.userID==user.userID)
    {
      user.walletBalance=user.walletBalance+IPamount;

      const user2:UserDetails={
        userName:user.userName,
        userID:user.userID,
        walletBalance:user.walletBalance,
        password:user.password,
        mobileNumber:user.mobileNumber,
        mailID:user.mailID,
        gender:user.gender,
        department:user.department,
        picture:user.picture
      }

      updatUserInfo(user.userID,user2);
      alert("your recharge is Succesfully  and your current balance is  "+user.walletBalance);
    }

});

 
  (document.getElementById("rechargeWalletDiv1")as HTMLDivElement).style.display="none";


  
}



async function showBorrowedhistory()
{
  (document.getElementById("DisbookhistoryID") as HTMLDivElement).style.display="block";
  (document.getElementById("rechargeWalletDiv1")as HTMLDivElement).style.display="none";
  (document.getElementById("borrowbookdivID")as HTMLDivElement).style.display="none";

  const BorrowDetailsList=await fetchBorrowDetails()


  let IPTborrowlist=(document.getElementById("borrowlist")as HTMLTableElement);
  IPTborrowlist.innerHTML="";

  BorrowDetailsList.forEach(function(borrow)
 {

  if(CurrentLoggedUser.userID==borrow.userID )
    {
      const row=document.createElement('tr');
      row.innerHTML=
             `<td>${borrow.borrowID}</td>
             <td>${borrow.bookID}</td>
             <td>${borrow.userID}</td>
             <td>${borrow.borrowedDate.toString().substring(0,10)}</td>
             <td>${borrow.borrowBookCount}</td>
             <td>${borrow.status}</td>
             <td>${borrow.paidFineAmount}</td>`;
  
             IPTborrowlist.appendChild(row);
    }
    
 });
}



function Borrowbook()
{
    (document.getElementById("borrowbookdivID")as HTMLDivElement).style.display="block";
    (document.getElementById("DisbookhistoryID") as HTMLDivElement).style.display="none";
    (document.getElementById("rechargeWalletDiv1")as HTMLDivElement).style.display="none";


    displaybookdetails();
    


}

async function displaybookdetails()
{
  const bookdeatailsList=await fetchBookDetails()

  const ShowbookTable=(document.getElementById("bookdetailstable")as HTMLTableElement);
  ShowbookTable.innerHTML="";

  bookdeatailsList.forEach(function(book)
 {
  const row=document.createElement('tr');
     row.innerHTML=
                     `<td>${book.bookID}</td>
                     <td>${book.bookName}</td>
                     <td>${book.authorName}</td>
                     <td>${book.bookCount}</td>
                     <td><input type="button" name="showbutton" onclick="Borrowbookfrmtable(${book.bookID})" value="select" id="addingbook"></td>

                     `
                    ShowbookTable.appendChild(row);

      
 })


}


  function Borrowbookfrmtable(id:any)
  {

  }


  async function download()
  {
    const userList=await fetchUserDetails();
    //let str:string="UserID,Username,Gender,Department,MobileNumber,UserEmail,UserPassword,WalletBalance,Profiele Picture/n";
    let str:string="";

    userList.forEach(function(user){

      str+=`${user.userID},${user.userName},${user.gender},${user.department},${user.mobileNumber},${user.mailID},${user.password},${user.walletBalance}\n`
    })
    var blob=new Blob([str],{type:"text/csv"});
    var Url=URL.createObjectURL(blob);
   
    var link=document.createElement('a');
    document.body.appendChild(link);

    
    link.href=Url;
    link.click();
    link.download="file.CSV";
    URL.revokeObjectURL(Url);


    // var Url=URL.createObjectURL(blob);
    // link.href="Url";
    // link.download="file.csv";
   


  }

  



























/*__________________________________________________________________________________________________________________________*/
//Add user 

async function addUserDetails(user:UserDetails):Promise<void> {
    const response=await fetch('http://localhost:5182/api/UserDetails' ,{
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

async function addBookDetails(book:BookDetails):Promise<void> {
    const response=await fetch('http://localhost:5182/api/BookDetails' ,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(book)
    });
    if(!response.ok)
        {
            throw new Error ('Failed To add book');
            
        }
    
}

async function addBorrowDetails(borrow:borrowDetails):Promise<void> {
    const response=await fetch('http://localhost:5182/api/BorrowDetails' ,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(borrow)
    });
    if(!response.ok)
        {
            throw new Error ('Failed To add book');
            
        }
    
}


/*_________________________________________________________________________________________________________________________________*/

////show getting details
async function fetchUserDetails(): Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5182/api/UserDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }

  async function fetchBookDetails(): Promise<BookDetails[]> {
    const apiUrl = 'http://localhost:5182/api/BookDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch userinfo');
    }
    return await response.json();
  }

  async function fetchBorrowDetails(): Promise<borrowDetails[]> {
    const apiUrl = 'http://localhost:5182/api/BorrowDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch bookdeatails');
    }
    return await response.json();
  }

/*_________________________________________________________________________________________________________________________________*/

//update

async function updatUserInfo(id: number, user: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5182/api/UserDetails/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    
  }

  async function updatBookInfo(id: number, book: BookDetails): Promise<void> {
    const response = await fetch(`http://localhost:5182/api/BookDetails/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    
  }

  async function updatBorrowInfo(id: number, borrow: borrowDetails): Promise<void> {
    const response = await fetch(`http://localhost:5182/api/BookDetails/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(borrow)
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    
  }


  /*_________________________________________________________________________________________________________________________________*/
 //delete
  
 async function deleteUseriInfo(id: any): Promise<void> {
    const response = await fetch(`http://localhost:5182/api/UserDetails/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    
  }


  async function deleteBookIInfo(id: any): Promise<void> {
    const response = await fetch(`http://localhost:5182/api/BookDetails/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
    
  }


  async function deleteBorrowIInfo(id: any): Promise<void> {
    const response = await fetch(`http://localhost:5182/api/BookDetails/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete borrow');
    }
    
  }




