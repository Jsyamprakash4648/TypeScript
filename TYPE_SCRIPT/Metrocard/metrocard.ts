 let UserCradNumIncrement=1000;
 let travelIDIncrement=2000;
 let ticketIDIdIncrement=3000;

 let currentUser22: UserDetails;

 interface UserDetails {
   
    userCardNumber:number,
    userName:string,
    phoneNumber:string,
    walletBalance:number

}





interface TravelDetails {

    travelID:number,
    cardNumber:number,
    fromLocation:string,
    toLocation:string,
    date:Date,
    travelCost:number
   
}



interface TicketFair{
    
    ticketID:number,
    fromLocation:string,
    toLocation:string,
    ticketPrice:number

    
}

//CMRL1001	Ravi	9848812345	1000
//CMRL1002	Baskaran	9948854321	1000

//
////Add Default Data
   


function newUserButtonn()
{
    let diplayuserregform=(document.getElementById("newuserregistrationformDiv") as HTMLDivElement);
    diplayuserregform.style.display="block";
    let diplayloginform=(document.getElementById("ExistinguserDiv") as HTMLDivElement);
    diplayloginform.style.display="none";

}

function fun_existing_User_Button()
{
    
    let diplayloginform=(document.getElementById("ExistinguserDiv") as HTMLDivElement);
    diplayloginform.style.display="block";
    let diplayuserregform=(document.getElementById("newuserregistrationformDiv") as HTMLDivElement);
    diplayuserregform.style.display="none";

   

}


async function funnewuserformSubmitbutton()
{
    const UserDetailsList=await fetchuser();
    let inputnewusername=(document.getElementById("username") as HTMLInputElement).value;
    let inputnewPhonenumber=(document.getElementById("UserPhoneNumber") as HTMLInputElement).value;
    let inputnewBalance=Number((document.getElementById("UserBalance") as HTMLInputElement).value);

    let regex3=/^[7-9]\d{9}$/
    if(!regex3.test(inputnewPhonenumber))
        {
            alert("please enter valid phone number......");
            

        }
    else
    {
        //0const User1=new UserDetails(inputnewusername,parseInt(inputnewPhonenumber),inputnewBalance)
        //UserDetailsList.push(User1);
        const user: UserDetails = {
            userCardNumber: 4,
            userName: inputnewusername,
            phoneNumber:inputnewPhonenumber ,
            walletBalance: inputnewBalance,
        }
        addUser(user)
        alert("Succesfully registeered.....your card number is "+user.userCardNumber);
        (document.getElementById("username") as HTMLInputElement).value="";
        (document.getElementById("UserPhoneNumber") as HTMLInputElement).value="";
        (document.getElementById("UserBalance") as HTMLInputElement).value="";
        
        let diplayuserregform=(document.getElementById("newuserregistrationformDiv") as HTMLDivElement);
        diplayuserregform.style.display="none";
        
        
    }

       

    
}


async function funsubmitExistingusercardNumberButton()
{
    const UserDetailsList = await fetchuser();
    let inputesixtingCardnumber=(document.getElementById("ExistingusercardNumber") as HTMLInputElement).value;
    

      UserDetailsList.forEach(function(userr)
  {  
        
        if(userr.userName==inputesixtingCardnumber)
        {
           
            currentUser22=userr;
            addDefaulticketdetails();
            greetings();
            
            let displayusersubmenu=document.getElementById("UserSubmenu") as HTMLDivElement
            displayusersubmenu.style.display="block"; 
            

            let displaymainMenuDiv=document.getElementById("mainMenuDiv") as HTMLDivElement
            displaymainMenuDiv.style.display="none";

            let diplayloginform=(document.getElementById("ExistinguserDiv") as HTMLDivElement);
            diplayloginform.style.display="none";

        }
  })

}


function funTravelButton()
{
    
    let dis=document.getElementById("ticketfairdetailstable")as HTMLTableElement;
    dis.style.display="block"

    let displayhistory=document.getElementById("travelHistory") as HTMLDivElement
    displayhistory.style.display="none";

    let ballancepotal=document.getElementById("ballance") as HTMLDivElement;
    ballancepotal.style.display="none";

    let displrechargpotal=document.getElementById("rechargeWalletDiv1") as HTMLDivElement;
    displrechargpotal.style.display="none";

    


}




async function addDefaulticketdetails()
 {  
    const  ticketDetailsList=await fetchTicket();
    let num:number=0;


 
     let displayticketsdetails=document.getElementById("ticketfairdetailtable222") as HTMLTableElement;

     ticketDetailsList.forEach(function(ticket)
    {
        num++;
        displayticketsdetails.innerHTML+=`<tr>
        <td>${num}</td>
        <td>${ticket.fromLocation}</td>
        <td>${ticket.toLocation}</td>
        <td>'${ticket.ticketPrice}'</td>
        <td> <input type="button"  id="buyticket" onclick="Userbuyticket('${ticket.ticketID}')"   value="Buy  ">
        </tr>
        `

    });

   
 }

 async function Userbuyticket(ticket:string)
 {  
    const ticketDetailsList=await fetchTicket();
   const traveDetailsList=await fetchTravel();
    
    let flag:boolean=true;
    ticketDetailsList.forEach(function(tic)
 {
    if(tic.ticketID==(Number(ticket)))
        {

    // travelID:number,
    // cardNumber:number,
    // fromLocation:string,
    // toLocation:string,
    // date:Date,
    // travelCost:number

            if(currentUser22.walletBalance>=tic.ticketPrice)

                {
                    flag=false;
                    const travel: TravelDetails = {
                        travelID:5,
                        cardNumber: currentUser22.userCardNumber,
                        fromLocation:tic.fromLocation,
                        toLocation:tic.toLocation,
                        date:new Date(),
                        travelCost:tic.ticketPrice}

                    addtravel(travel);

                    currentUser22.walletBalance=currentUser22.walletBalance-tic.ticketPrice;
                    alert("succesfullu purachsed ticket....");
                    
                    let dis=document.getElementById("ticketfairdetailstable")as HTMLTableElement;
                    dis.style.display="none"
                
                    let displayusersubmenu=document.getElementById("UserSubmenu") as HTMLDivElement     
                    displayusersubmenu.style.display="block" ;
                }

        }

  })
  if(flag)
    {
        alert("Insufiiecient Balance please recharge your wallet..");
        funRecharge();

    }


 }

 function funRecharge()
 {
    let displrechargpotal=document.getElementById("rechargeWalletDiv1") as HTMLDivElement;
    displrechargpotal.style.display="block";

    let dis=document.getElementById("ticketfairdetailstable")as HTMLTableElement;
    dis.style.display="none";

    let displayhistory=document.getElementById("travelHistory") as HTMLDivElement
    displayhistory.style.display="none";

    let ballancepotal=document.getElementById("ballance") as HTMLDivElement;
    ballancepotal.style.display="none";

    

    
}



 function funInputrechargeAmountbutton()
    {
       
        let rechargeAmount=(document.getElementById("InputrechargeAmount") as HTMLInputElement);
        let a=parseInt(rechargeAmount.value);
        

        
        currentUser22.walletBalance=currentUser22.walletBalance+a;

        

        let displrechargpotal=document.getElementById("rechargeWalletDiv1") as HTMLDivElement;
        displrechargpotal.style.display="none";
    
        let displayusersubmenu=document.getElementById("UserSubmenu") as HTMLDivElement     
        displayusersubmenu.style.display="block" ;

    }


function funBalance_Check()
{
    
    let ballancepotal=document.getElementById("ballance") as HTMLDivElement;
    ballancepotal.style.display="block";

    let displrechargpotal=document.getElementById("rechargeWalletDiv1") as HTMLDivElement;
    displrechargpotal.style.display="none";

    let dis=document.getElementById("ticketfairdetailstable")as HTMLTableElement;
    dis.style.display="none";

    let displayhistory=document.getElementById("travelHistory") as HTMLDivElement
    displayhistory.style.display="none";

    

    

    (document.getElementById("ballancespan") as HTMLDivElement).innerHTML="Your Current Wallet Balance: "+currentUser22.walletBalance;
}


function Balancebackbutton()
{

    let ballancepotal=document.getElementById("ballance") as HTMLDivElement;
    ballancepotal.style.display="none";

    let displayusersubmenu=document.getElementById("UserSubmenu") as HTMLDivElement     
    displayusersubmenu.style.display="block" ;

}


async function funView_Travel_History()
{ 
    const traveDetailsList=await fetchTravel();
    
    let displayhistory=document.getElementById("travelHistory") as HTMLDivElement
    displayhistory.style.display="block";

    let ballancepotal=document.getElementById("ballance") as HTMLDivElement;
    ballancepotal.style.display="none";

    let displrechargpotal=document.getElementById("rechargeWalletDiv1") as HTMLDivElement;
    displrechargpotal.style.display="none";

    let dis=document.getElementById("ticketfairdetailstable")as HTMLTableElement;
    dis.style.display="none";
    
    
    traveDetailsList.forEach(function(travel)
    {    

        
                
        
        
        if(travel.cardNumber==currentUser22.userCardNumber)
            {   
               

               // let displayhistoryy=document.getElementById("travelHistorytable222") as HTMLTableElement;
               let d=document.getElementById("travelHistorytable222")as HTMLTableElement

    

                d.innerHTML+=`<tr>
                
                <td>${travel.travelID}</td>
                <td>${travel.cardNumber}</td>
                <td>${travel.fromLocation}</td>
                <td>${travel.toLocation}</td>
                <td>${travel.date.toString()}</td>
                <td>${travel.travelCost}</td>
                </tr>`
                

                
            }
    

    })



}


function funHome()
{   
    
    let displayusersubmenu=document.getElementById("UserSubmenu") as HTMLDivElement     
     displayusersubmenu.style.display="block" ;

    let displayhistory=document.getElementById("travelHistory") as HTMLDivElement
    displayhistory.style.display="none";

    let ballancepotal=document.getElementById("ballance") as HTMLDivElement;
    ballancepotal.style.display="none";

    let displrechargpotal=document.getElementById("rechargeWalletDiv1") as HTMLDivElement;
    displrechargpotal.style.display="none";

    let dis=document.getElementById("ticketfairdetailstable")as HTMLTableElement;
    dis.style.display="none"


}

function funExit()
{
    
    let mainMenu=document.getElementById("mainMenuDiv")as HTMLDivElement;
    mainMenu.style.display="block";

    let displayusersubmenu=document.getElementById("UserSubmenu") as HTMLDivElement     
     displayusersubmenu.style.display="none" ;

     let displayhistory=document.getElementById("travelHistory") as HTMLDivElement
     displayhistory.style.display="none";
 
     let ballancepotal=document.getElementById("ballance") as HTMLDivElement;
     ballancepotal.style.display="none";
 
     let displrechargpotal=document.getElementById("rechargeWalletDiv1") as HTMLDivElement;
     displrechargpotal.style.display="none";
 
     let dis=document.getElementById("ticketfairdetailstable")as HTMLTableElement;
     dis.style.display="none"
}
function greetings()
{
    let greet=document.getElementById("greetings") as HTMLSpanElement;

    greet.innerHTML="Welcome "+currentUser22.userName;
}


async function addUser(user:UserDetails):Promise<void> {
    const response=await fetch('http://localhost:5072/api/userdetails' ,{
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

async function addtravel(Travel:TravelDetails):Promise<void> {
    const response=await fetch('http://localhost:5072/api/TravelDetailsControllers' ,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(Travel)
    });
    if(!response.ok)
        {
            throw new Error ('Failed To add travel');
            
        }
    
}

async function addticket(Ticket:TicketFair):Promise<void> {
    const response=await fetch('http://localhost:5072/api/TicketFairControllers' ,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(Ticket)
    });
    if(!response.ok)
        {
            throw new Error ('Failed To add travel');
            
        }
    
}


/*

async function update(id: number, contact: TravelDetails): Promise<void> {
    const response = await fetch(`http://localhost:5170/api/Contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    
  }
  */

  async function fetchuser(): Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5072/api/userdetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }


  async function fetchTravel(): Promise<TravelDetails[]> {
    const apiUrl = 'http://localhost:5072/api/TravelDetailsControllers';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }

  async function fetchTicket(): Promise<TicketFair[]> {
    const apiUrl = 'http://localhost:5072/api/TicketFairControllers';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }












