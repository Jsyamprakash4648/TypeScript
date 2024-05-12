
let CurrenLoggerUser:UserDetails;
interface UserDetails{

     userID:any, 
    userName:string
    password:string, 
     mailID:string
    phoneNumber:string
    address:string,
    walletBalance:number,
    photo:string[]

}

interface OrderDetails{

    orderID:any,
    userID:number,
    priceOfOrder:number
}

interface ProductDetails{
    productID:any,
    productName:string,
    quantityAvailable:number,
    productDescription:string,
    pricePerQuantity:number,
    productImage:string[],
    expiryDate:Date,
    Purchasedate:Date,
}


interface  cartitems{
  
  cartID:any,
  userID:number,
  orderId:number,
  productID:number,
  productname:string,
  price:number

}

// CartID" serial primary key,
//   "UserID" int,
//   "OrderId" int,
//   "ProductID" int,
//   "Productname" varchar(250),
//   "Price" numeric(10,2))


function newUserB()
{
        (document.getElementById("UserRegistrationdfeildset")as HTMLFieldSetElement).style.display="block";
        (document.getElementById("userloginfeildset")as HTMLFieldSetElement).style.display="none"

}

function existing_User_Button()
{
    (document.getElementById("UserRegistrationdfeildset")as HTMLFieldSetElement).style.display="none";
    (document.getElementById("userloginfeildset")as HTMLFieldSetElement).style.display="block"

}


let formm = (document.getElementById("formID") as HTMLFormElement);

formm.addEventListener('submit',(event)=>
     {
        event.preventDefault();
        let Ipusername=(document.getElementById("inputUsername")as HTMLInputElement).value;
        let Ippassword=(document.getElementById("inputPassword")as HTMLInputElement).value;
        let IpMailID=(document.getElementById("inputMailID")as HTMLInputElement).value;
        let IpPhoneNumber=(document.getElementById("inputPhoneNumber")as HTMLInputElement).value;
        let IpAddress=(document.getElementById("inputAddress")as HTMLInputElement).value;
        let IpwalletBalance=Number((document.getElementById("inputwalletBalance")as HTMLInputElement).value);

        let IpPic:any=(document.getElementById("inputpicture") as HTMLInputElement);

        const reader = new FileReader()

        reader.readAsDataURL(IpPic.files[0]);

      reader.onload = function(event){
                                    const base64string = event.target?.result as string;
                                    const newuser:UserDetails={

                                     userID:undefined,
                                     userName:Ipusername,
                                     phoneNumber:IpPhoneNumber,
                                     mailID:IpMailID,
                                     walletBalance:IpwalletBalance,
                                     password:Ippassword,
                                     address:IpAddress,
                                     photo:[base64string]
                                   }

                                     addUserDetails(newuser);
                                     alert("successfully registred")
                                     }
  
  }
);



async function loginsubmitB()
{
    const userList=await fetchUserDetails();
    let Ipusername=(document.getElementById("logininputusername")as HTMLInputElement).value;
    let Ippassword=(document.getElementById("logininputpassword")as HTMLInputElement).value;
    let flag:boolean=true;

    userList.forEach(function(user)
    {
                if(user.userName==Ipusername && user.password==Ippassword)
                    {
                        flag=false;
                        displaysubmenu();
                        let greet=(document.getElementById("greetings")as HTMLHeadingElement);
                        greet.innerHTML=`<span><img src="${user.photo[0]}" alt="myself" id="profileimage"></span><h1 id="greetings">${user.userName}</h1>`;
                        
                        CurrenLoggerUser=user;
                        alert("logged Succesfully");
                    }
    })

    if(flag)
        {
            alert("please check details properly");
        }
}



function displaysubmenu()
{
    (document.getElementById("SubMenuheaderID")as HTMLDivElement).style.display="block";
    (document.getElementById("mainMenuID")as HTMLDivElement).style.display="none";
    (document.getElementById("userloginfeildset")as HTMLFieldSetElement).style.display="none"
}    



function funaddstacok()
{
    (document.getElementById("stockinputfieldset")as HTMLFieldSetElement).style.display="block";
    (document.getElementById("produsctdisDIv")as HTMLDivElement).style.display="none";
}


 let formm22 = (document.getElementById("stockinputform") as HTMLFormElement);
 formm22.addEventListener('submit',(event)=>{
    event.preventDefault();

    let Ippname=(document.getElementById("inputmaterilname")as HTMLInputElement).value;
    let Ipavailablequantity=Number((document.getElementById("inputavailablequantity")as HTMLInputElement).value);
    let Ipunitprice=Number((document.getElementById("inputunitprice")as HTMLInputElement).value);
    let ippurchasedate=(document.getElementById("inputpurchasedate")as HTMLInputElement).value;
    let Ipexpairydate=(document.getElementById("inputexpairydate")as HTMLInputElement).value;
   
    let Ipdesci=(document.getElementById("inputmaterialdesciption")as HTMLInputElement).value;

    let Ippicture:any=(document.getElementById("inputpicture22")as HTMLInputElement);

/////////////////////////////////////////////////////////////////

    const reader = new FileReader();
    reader.readAsDataURL(Ippicture.files[0]);
    reader.onload = function(event){
   
        const base64string2 = event.target?.result as string;
        const newproduct:ProductDetails={
                                            productID:undefined,
                                            productName:Ippname,
                                            productDescription:Ipdesci,
                                            productImage:[base64string2],
                                            quantityAvailable:Ipavailablequantity,
                                            pricePerQuantity:Ipunitprice,
                                            expiryDate:new Date(Ipexpairydate.toString()),
                                            Purchasedate:new Date(ippurchasedate.toString()),

        
                                           }
                                    addProductDetails(newproduct);
                                    alert("product added Successfully");

    }

  });



  async function displayproducttable()
  {
    const producList=await fetchProductDetails();

    let displaydetails=(document.getElementById("tbody1")as HTMLTableElement);
    displaydetails.innerHTML="";

    producList.forEach(function(p)
    {
        // let date1=p.Purchasedate.toString().substring(0,10);
        // let date12=p.expiryDate.toString().substring(0,10);

        const row=document.createElement('tr');
        row.innerHTML=`
                         <td>${p.productName}</td>
                         <td>${p.quantityAvailable}</td>
                         <td>${p.productDescription}</td>
                         <td>${p.pricePerQuantity}</td>
                         <td>${p.Purchasedate}</td>
                         <td>${p.expiryDate}</td>
                         <td><img src="${p.productImage[0]}" alt="picture" id="productimage" ></td>
                         <td><button type="button" class="tablebutton" onclick="fundeleteproduct(${p.productID})">Delete</button>
                         <button type="button" class="tablebutton" onclick="funeditproduct(${p.productID})">Edit</button></td>`;
                         displaydetails.appendChild(row);   
    })
  }


  async function displayproduct22()
  {
    const producList=await fetchProductDetails();

    const car=(document.getElementById("bodyconatiner") as HTMLDivElement);

    car.innerHTML="";

    producList.forEach(function(B)
  {
    const row=document.createElement('div')
    row.innerHTML+=`
                             <div id="card">
                                 <img src="${B.productImage[0]}" alt="">
                                 <p>Price: ${B.productName}</p>
                                 <p>price: ${B.pricePerQuantity}</p>
                                 
                                 <input type="button" value="AddtoCart" onclick="AddtocartB(${B.productID})">

                            
                               </div>`;

                               car.appendChild(row);

  })
  }

  function funshowstacok()
  {
    displayproducttable();
    (document.getElementById("produsctdisDIv")as HTMLDivElement).style.display="block";

    (document.getElementById("stockinputfieldset")as HTMLFieldSetElement).style.display="none";
    (document.getElementById("PhotoContainer")as HTMLDivElement).style.display="none";

  }


  function funpurchase()
  { 
    displayproduct22();

    (document.getElementById("bodyconatiner")as HTMLDivElement).style.display="block";
    (document.getElementById("PhotoContainer")as HTMLDivElement).style.display="block";

    (document.getElementById("produsctdisDIv")as HTMLDivElement).style.display="none";
    (document.getElementById("stockinputfieldset")as HTMLFieldSetElement).style.display="none";


  }

function rechargewallet()
{ alert("your current balance "+CurrenLoggerUser.walletBalance );
  (document.getElementById("rechargeWalletID")as HTMLDivElement).style.display="block";
}

  function funInputrechargeAmountbutton()
  {
    

    let rechargeAmount=Number((document.getElementById("InputrechargeAmount") as HTMLInputElement).value);
    let Am=CurrenLoggerUser.walletBalance+rechargeAmount;
    const updatuser:UserDetails={
      userID:CurrenLoggerUser.userID,
      userName:CurrenLoggerUser.userName,
      password:CurrenLoggerUser.password,
      mailID:CurrenLoggerUser.mailID,
      phoneNumber:CurrenLoggerUser.phoneNumber,
      photo:CurrenLoggerUser.photo,
      walletBalance:Am,
      address:CurrenLoggerUser.address
    }
    updatUserInfo(CurrenLoggerUser.userID,updatuser);
    alert("wallet recharge Amount Success full  "+Am); 
    (document.getElementById("rechargeWalletID")as HTMLDivElement).style.display="none";
    
  }

  // __________________________________________________________________________________________________________________________________

var tList:Array<OrderDetails> =new Array<OrderDetails>;
var tempId:any;
var tempList:number[]=[];



// _________________________________________________________________________________________________________________




async function AddtocartB(id:any)
  {
    
            tempList.push(id);
            
  }

  

  async function displaycart()
  {

    const producList=await fetchProductDetails();
    let displaycart=(document.getElementById("Tbody22")as HTMLTableElement);
    displaycart.innerHTML="";
    

    let i:any=0;
    producList.forEach(function(product)
   {
     
                    if(tempList[i]==product.productID)
                      {
                      
                        const row=document.createElement('tr');
                        row.innerHTML=`
                                     <td>${product.productName}</td>
                                     <td>${product.pricePerQuantity}</td>
                                     <td><input type="number" id="inputcartcount"></td>
                                     <td><input type="button" value="add" onclick="funcheck(${product.productID})"></td>
                                    `
                                     displaycart.appendChild(row);
                                     i++; 
                      };
    
    
    });
  }

 
function funshowcarttable()
  { 
    displaycart();
    (document.getElementById("cartTablediv")as HTMLDivElement).style.display="block";


    (document.getElementById("bodyconatiner")as HTMLDivElement).style.display="none";
    (document.getElementById("produsctdisDIv")as HTMLDivElement).style.display="none";  
    (document.getElementById("stockinputfieldset")as HTMLFieldSetElement).style.display="none";
    
  }


 let currentcratitemprice:any=0;
 
 const countlist:Array<cartitems> =new Array<cartitems>();



  async function funcheck(id:any)
  {
    const producList=await  fetchProductDetails();

    let cxcount=Number((document.getElementById("inputcartcount")as HTMLInputElement).value);
    let flag1quantity:boolean=true;
    let flag2balnace:boolean=true;


      producList.forEach(function(p)
    {
      if(id==p.productID)

        {
          if(p.quantityAvailable>=cxcount)
            { 
              flag1quantity=false;
              if(p.pricePerQuantity<=CurrenLoggerUser.walletBalance)
                {
                  flag2balnace=false;
                  alert("item added");
        
                  
                  currentcratitemprice=currentcratitemprice+(p.pricePerQuantity*cxcount);
                  //alert(currentcratitemprice);
                }
              
              
            }
        }

    });
    if(flag1quantity)

      {
        alert("entered quantity is not available");
      }
    if(flag2balnace)

      {
        alert("insuuffiecent balance  please recharge");
        rechargewallet();

      }

  }





  async function funCartitemBuy()
  {
     
    //const producList=await fetchProductDetails();

    // let i:any=0;
    // producList.forEach(async function(pro)
    //   { 
                
    //           if(pro.productID==tempList[i])
    //             {
                  const neworder:OrderDetails=
                  {
                    orderID:undefined,
                     userID:CurrenLoggerUser.userID,
                      priceOfOrder:currentcratitemprice

                  }
                  addOrderDetails(neworder);
                  alert("cart  succesfully");
                  Abcd();


                  
      


  }

async function Abcd()
{
  const producList=await fetchProductDetails();
  const orderList=await fetchOrderDetails();

  // producList.forEach(async function(pro){

  let currentorderId:number=orderList.length-1;
                  let i:number=0;
    tempList.forEach(function(C)
       {
        
            producList.forEach(function(pro)
          {
            if(C==pro.productID)
              {


                const cart:cartitems=
                    {
                       cartID:undefined,
                       userID:CurrenLoggerUser.userID,
                       orderId:currentorderId,
                       productID:pro.productID,
                       productname:pro.productName,
                       price:pro.pricePerQuantity
  
                     }
                      addCartDetails(cart);
                    
              }
            
          })

       })




                 
}





async function vieworderHistory()
{
  (document.getElementById("orderdetailstable")as HTMLDivElement).style.display="block";
  displayorderhistory();
}



async function displayorderhistory()
{

  let dishistory=(document.getElementById("historybody")as HTMLTableElement);
        //dishistory.innerHTML="";

      const historlist=await fetchOrderDetails();

      const cartlist=await fetchCartDetails();

      historlist.forEach(function(order)
    {
        if(CurrenLoggerUser.userID==order.userID)
          {
            cartlist.forEach(function(cart)
            {
              if(order.orderID==cart.orderId)
                {

                  let row=document.createElement('tr');
                  row.innerHTML+=`<td>${cart.productname}</td>
                                  <td>${2}</td>
                                  <td>${cart.price}</td> `;
                                          alert(cart.orderId);
                                          dishistory.appendChild(row);
                                          alert("succeess");
                }
               
            });
          }
            
              
    });






   
      
}




  







   































































/*___________________________________________________________________________________________________________________________----*/

//to add  details
async function addUserDetails(user:UserDetails):Promise<void> {
    const response=await fetch('http://localhost:5057/api/UserDetailsControllers' ,{
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

async function addOrderDetails(order:OrderDetails):Promise<void> {
    const response=await fetch('http://localhost:5057/api/OrderDetailsControllers' ,{
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


async function addProductDetails(product:ProductDetails):Promise<void> {
    const response=await fetch('http://localhost:5057/api/ProductDetailsControllers' ,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(product)
    });
    if(!response.ok)
        {
            throw new Error ('Failed To add product');
            
        }
    
}


async function addCartDetails(item:cartitems):Promise<void> {
  const response=await fetch('http://localhost:5057/api/cartItemControllers' ,{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
  });
  if(!response.ok)
      {
          throw new Error ('Failed To add item');
          
      }
  
}


/*___________________________________________________________________________________________________________________________----*/

//insert data

///show getting details
async function fetchUserDetails(): Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5057/api/UserDetailsControllers';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch user deatils');
    }
    return await response.json();
  }

  async function fetchOrderDetails(): Promise<OrderDetails[]> {
    const apiUrl = 'http://localhost:5057/api/OrderDetailsControllers';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch oder deatils');
    }
    return await response.json();
  }


  
  async function fetchProductDetails(): Promise<ProductDetails[]> {
    const apiUrl = 'http://localhost:5057/api/ProductDetailsControllers';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch product deatils');
    }
    return await response.json();
  }


  async function fetchCartDetails(): Promise<cartitems[]> {
    const apiUrl = 'http://localhost:5057/api/cartItemControllers';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch cart deatils');
    }
    return await response.json();
  }



  /*___________________________________________________________________________________________________________________________----*/
  //update

async function updatUserInfo(id: number, user: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5057/api/UserDetailsControllers/${id}`, {
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


  async function updateOrderInfo(id: number, order: OrderDetails): Promise<void> {
    const response = await fetch(`http://localhost:5057/api/OrderDetailsControllers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    if (!response.ok) {
      throw new Error('Failed to update order');
    }
    
  }

  
  async function updateProductInfo(id: number, order: OrderDetails): Promise<void> {
    const response = await fetch(`http://localhost:5057/api/ProductDetailsControllers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    
  }



  /*_________________________________________________________________________________________________________________________________*/
 //delete
  
 async function deleteUseriInfo(id: any): Promise<void> {
    const response = await fetch(`http://localhost:5057/api/UserDetailsControllers/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    
  }


  async function deleteOrderiInfo(id: any): Promise<void> {
    const response = await fetch(`http://localhost:5057/api/OrderDetailsControllers/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
    
  }


  async function deleteProductiInfo(id: any): Promise<void> {
    const response = await fetch(`http://localhost:5057/api/ProductDetailsControllers/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    
  }




