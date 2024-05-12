"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let CurrenLoggerUser;
// CartID" serial primary key,
//   "UserID" int,
//   "OrderId" int,
//   "ProductID" int,
//   "Productname" varchar(250),
//   "Price" numeric(10,2))
function newUserB() {
    document.getElementById("UserRegistrationdfeildset").style.display = "block";
    document.getElementById("userloginfeildset").style.display = "none";
}
function existing_User_Button() {
    document.getElementById("UserRegistrationdfeildset").style.display = "none";
    document.getElementById("userloginfeildset").style.display = "block";
}
let formm = document.getElementById("formID");
formm.addEventListener('submit', (event) => {
    event.preventDefault();
    let Ipusername = document.getElementById("inputUsername").value;
    let Ippassword = document.getElementById("inputPassword").value;
    let IpMailID = document.getElementById("inputMailID").value;
    let IpPhoneNumber = document.getElementById("inputPhoneNumber").value;
    let IpAddress = document.getElementById("inputAddress").value;
    let IpwalletBalance = Number(document.getElementById("inputwalletBalance").value);
    let IpPic = document.getElementById("inputpicture");
    const reader = new FileReader();
    reader.readAsDataURL(IpPic.files[0]);
    reader.onload = function (event) {
        var _a;
        const base64string = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
        const newuser = {
            userID: undefined,
            userName: Ipusername,
            phoneNumber: IpPhoneNumber,
            mailID: IpMailID,
            walletBalance: IpwalletBalance,
            password: Ippassword,
            address: IpAddress,
            photo: [base64string]
        };
        addUserDetails(newuser);
        alert("successfully registred");
    };
});
function loginsubmitB() {
    return __awaiter(this, void 0, void 0, function* () {
        const userList = yield fetchUserDetails();
        let Ipusername = document.getElementById("logininputusername").value;
        let Ippassword = document.getElementById("logininputpassword").value;
        let flag = true;
        userList.forEach(function (user) {
            if (user.userName == Ipusername && user.password == Ippassword) {
                flag = false;
                displaysubmenu();
                let greet = document.getElementById("greetings");
                greet.innerHTML = `<span><img src="${user.photo[0]}" alt="myself" id="profileimage"></span><h1 id="greetings">${user.userName}</h1>`;
                CurrenLoggerUser = user;
                alert("logged Succesfully");
            }
        });
        if (flag) {
            alert("please check details properly");
        }
    });
}
function displaysubmenu() {
    document.getElementById("SubMenuheaderID").style.display = "block";
    document.getElementById("mainMenuID").style.display = "none";
    document.getElementById("userloginfeildset").style.display = "none";
}
function funaddstacok() {
    document.getElementById("stockinputfieldset").style.display = "block";
    document.getElementById("produsctdisDIv").style.display = "none";
}
let formm22 = document.getElementById("stockinputform");
formm22.addEventListener('submit', (event) => {
    event.preventDefault();
    let Ippname = document.getElementById("inputmaterilname").value;
    let Ipavailablequantity = Number(document.getElementById("inputavailablequantity").value);
    let Ipunitprice = Number(document.getElementById("inputunitprice").value);
    let ippurchasedate = document.getElementById("inputpurchasedate").value;
    let Ipexpairydate = document.getElementById("inputexpairydate").value;
    let Ipdesci = document.getElementById("inputmaterialdesciption").value;
    let Ippicture = document.getElementById("inputpicture22");
    /////////////////////////////////////////////////////////////////
    const reader = new FileReader();
    reader.readAsDataURL(Ippicture.files[0]);
    reader.onload = function (event) {
        var _a;
        const base64string2 = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
        const newproduct = {
            productID: undefined,
            productName: Ippname,
            productDescription: Ipdesci,
            productImage: [base64string2],
            quantityAvailable: Ipavailablequantity,
            pricePerQuantity: Ipunitprice,
            expiryDate: new Date(Ipexpairydate.toString()),
            Purchasedate: new Date(ippurchasedate.toString()),
        };
        addProductDetails(newproduct);
        alert("product added Successfully");
    };
});
function displayproducttable() {
    return __awaiter(this, void 0, void 0, function* () {
        const producList = yield fetchProductDetails();
        let displaydetails = document.getElementById("tbody1");
        displaydetails.innerHTML = "";
        producList.forEach(function (p) {
            // let date1=p.Purchasedate.toString().substring(0,10);
            // let date12=p.expiryDate.toString().substring(0,10);
            const row = document.createElement('tr');
            row.innerHTML = `
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
        });
    });
}
function displayproduct22() {
    return __awaiter(this, void 0, void 0, function* () {
        const producList = yield fetchProductDetails();
        const car = document.getElementById("bodyconatiner");
        car.innerHTML = "";
        producList.forEach(function (B) {
            const row = document.createElement('div');
            row.innerHTML += `
                             <div id="card">
                                 <img src="${B.productImage[0]}" alt="">
                                 <p>Price: ${B.productName}</p>
                                 <p>price: ${B.pricePerQuantity}</p>
                                 
                                 <input type="button" value="AddtoCart" onclick="AddtocartB(${B.productID})">

                            
                               </div>`;
            car.appendChild(row);
        });
    });
}
function funshowstacok() {
    displayproducttable();
    document.getElementById("produsctdisDIv").style.display = "block";
    document.getElementById("stockinputfieldset").style.display = "none";
    document.getElementById("PhotoContainer").style.display = "none";
}
function funpurchase() {
    displayproduct22();
    document.getElementById("bodyconatiner").style.display = "block";
    document.getElementById("PhotoContainer").style.display = "block";
    document.getElementById("produsctdisDIv").style.display = "none";
    document.getElementById("stockinputfieldset").style.display = "none";
}
function rechargewallet() {
    alert("your current balance " + CurrenLoggerUser.walletBalance);
    document.getElementById("rechargeWalletID").style.display = "block";
}
function funInputrechargeAmountbutton() {
    let rechargeAmount = Number(document.getElementById("InputrechargeAmount").value);
    let Am = CurrenLoggerUser.walletBalance + rechargeAmount;
    const updatuser = {
        userID: CurrenLoggerUser.userID,
        userName: CurrenLoggerUser.userName,
        password: CurrenLoggerUser.password,
        mailID: CurrenLoggerUser.mailID,
        phoneNumber: CurrenLoggerUser.phoneNumber,
        photo: CurrenLoggerUser.photo,
        walletBalance: Am,
        address: CurrenLoggerUser.address
    };
    updatUserInfo(CurrenLoggerUser.userID, updatuser);
    alert("wallet recharge Amount Success full  " + Am);
    document.getElementById("rechargeWalletID").style.display = "none";
}
// __________________________________________________________________________________________________________________________________
var tList = new Array;
var tempId;
var tempList = [];
// _________________________________________________________________________________________________________________
function AddtocartB(id) {
    return __awaiter(this, void 0, void 0, function* () {
        tempList.push(id);
    });
}
function displaycart() {
    return __awaiter(this, void 0, void 0, function* () {
        const producList = yield fetchProductDetails();
        let displaycart = document.getElementById("Tbody22");
        displaycart.innerHTML = "";
        let i = 0;
        producList.forEach(function (product) {
            if (tempList[i] == product.productID) {
                const row = document.createElement('tr');
                row.innerHTML = `
                                     <td>${product.productName}</td>
                                     <td>${product.pricePerQuantity}</td>
                                     <td><input type="number" id="inputcartcount"></td>
                                     <td><input type="button" value="add" onclick="funcheck(${product.productID})"></td>
                                    `;
                displaycart.appendChild(row);
                i++;
            }
            ;
        });
    });
}
function funshowcarttable() {
    displaycart();
    document.getElementById("cartTablediv").style.display = "block";
    document.getElementById("bodyconatiner").style.display = "none";
    document.getElementById("produsctdisDIv").style.display = "none";
    document.getElementById("stockinputfieldset").style.display = "none";
}
let currentcratitemprice = 0;
const countlist = new Array();
function funcheck(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const producList = yield fetchProductDetails();
        let cxcount = Number(document.getElementById("inputcartcount").value);
        let flag1quantity = true;
        let flag2balnace = true;
        producList.forEach(function (p) {
            if (id == p.productID) {
                if (p.quantityAvailable >= cxcount) {
                    flag1quantity = false;
                    if (p.pricePerQuantity <= CurrenLoggerUser.walletBalance) {
                        flag2balnace = false;
                        alert("item added");
                        currentcratitemprice = currentcratitemprice + (p.pricePerQuantity * cxcount);
                        //alert(currentcratitemprice);
                    }
                }
            }
        });
        if (flag1quantity) {
            alert("entered quantity is not available");
        }
        if (flag2balnace) {
            alert("insuuffiecent balance  please recharge");
            rechargewallet();
        }
    });
}
function funCartitemBuy() {
    return __awaiter(this, void 0, void 0, function* () {
        //const producList=await fetchProductDetails();
        // let i:any=0;
        // producList.forEach(async function(pro)
        //   { 
        //           if(pro.productID==tempList[i])
        //             {
        const neworder = {
            orderID: undefined,
            userID: CurrenLoggerUser.userID,
            priceOfOrder: currentcratitemprice
        };
        addOrderDetails(neworder);
        alert("cart  succesfully");
        Abcd();
    });
}
function Abcd() {
    return __awaiter(this, void 0, void 0, function* () {
        const producList = yield fetchProductDetails();
        const orderList = yield fetchOrderDetails();
        // producList.forEach(async function(pro){
        let currentorderId = orderList.length - 1;
        let i = 0;
        tempList.forEach(function (C) {
            producList.forEach(function (pro) {
                if (C == pro.productID) {
                    const cart = {
                        cartID: undefined,
                        userID: CurrenLoggerUser.userID,
                        orderId: currentorderId,
                        productID: pro.productID,
                        productname: pro.productName,
                        price: pro.pricePerQuantity
                    };
                    addCartDetails(cart);
                }
            });
        });
    });
}
function vieworderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("orderdetailstable").style.display = "block";
        displayorderhistory();
    });
}
function displayorderhistory() {
    return __awaiter(this, void 0, void 0, function* () {
        let dishistory = document.getElementById("historybody");
        //dishistory.innerHTML="";
        const historlist = yield fetchOrderDetails();
        const cartlist = yield fetchCartDetails();
        historlist.forEach(function (order) {
            if (CurrenLoggerUser.userID == order.userID) {
                cartlist.forEach(function (cart) {
                    if (order.orderID == cart.orderId) {
                        let row = document.createElement('tr');
                        row.innerHTML += `<td>${cart.productname}</td>
                                  <td>${2}</td>
                                  <td>${cart.price}</td> `;
                        alert(cart.orderId);
                        dishistory.appendChild(row);
                        alert("succeess");
                    }
                });
            }
        });
    });
}
/*___________________________________________________________________________________________________________________________----*/
//to add  details
function addUserDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5057/api/UserDetailsControllers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed To add user');
        }
    });
}
function addOrderDetails(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5057/api/OrderDetailsControllers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed To add order');
        }
    });
}
function addProductDetails(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5057/api/ProductDetailsControllers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error('Failed To add product');
        }
    });
}
function addCartDetails(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5057/api/cartItemControllers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (!response.ok) {
            throw new Error('Failed To add item');
        }
    });
}
/*___________________________________________________________________________________________________________________________----*/
//insert data
///show getting details
function fetchUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5057/api/UserDetailsControllers';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch user deatils');
        }
        return yield response.json();
    });
}
function fetchOrderDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5057/api/OrderDetailsControllers';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch oder deatils');
        }
        return yield response.json();
    });
}
function fetchProductDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5057/api/ProductDetailsControllers';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch product deatils');
        }
        return yield response.json();
    });
}
function fetchCartDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5057/api/cartItemControllers';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch cart deatils');
        }
        return yield response.json();
    });
}
/*___________________________________________________________________________________________________________________________----*/
//update
function updatUserInfo(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5057/api/UserDetailsControllers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    });
}
function updateOrderInfo(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5057/api/OrderDetailsControllers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to update order');
        }
    });
}
function updateProductInfo(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5057/api/ProductDetailsControllers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
    });
}
/*_________________________________________________________________________________________________________________________________*/
//delete
function deleteUseriInfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5057/api/UserDetailsControllers/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
    });
}
function deleteOrderiInfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5057/api/OrderDetailsControllers/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
    });
}
function deleteProductiInfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5057/api/ProductDetailsControllers/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
    });
}
