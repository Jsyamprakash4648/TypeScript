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
let userIDAutoIncrement = 1000;
let medicineIDAutoIncrement = 2000;
let orderIDAutoIncreament = 3000;
let CurrentUser;
let CurrentmedicineID;
let current_MID;
let currentm_Name;
let currentm_Price;
let currentm_Count;
let currentm_Expiry;
//displaying singup form
function dis_singupform() {
    let Sign_up_form_display = document.getElementById('Sign_up_form');
    Sign_up_form_display.style.display = "block";
    let homeform_display = document.getElementById('homeform');
    homeform_display.style.display = "none";
}
// //displaying sing ip form
function dis_singinform() {
    let homeform_display = document.getElementById('homeform');
    homeform_display.style.display = "none";
    let Sign_ip_form_display = document.getElementById('Sign_in_form');
    Sign_ip_form_display.style.display = "block";
}
// const traveDetailsList=await fetchTravel();
function addDefaultmedicinedata() {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchmedicineDetails();
        let a = document.getElementById("medicinetable");
        a.innerHTML = `<tr><th>Medicine ID</th>
     <th>Medicine Name</th>
     <th> Price</th>
     <th>Quantity</th> 
     <th>Medicine Expiry</th>
     <th>choose</th>
 </tr> `;
        MedicineList.forEach(function (medicine) {
            let date = medicine.medicineExpiry.toString().substring(0, 10);
            a.innerHTML +=
                `<tr>
            <td>${medicine.medicineID}</td>   
            <td>${medicine.medicineName}</td>
            <td>${medicine.medicinePrice}</td>
            <td>${medicine.medicineCount}</td>
            <td>${date}</td>
            <td><input type="button" onclick="EditMedcine('${medicine.medicineID}')" id="Edit" value="edit    ">
            <input type="button" onclick="DeleteMedcine('${medicine.medicineID}')" id="Delete" value="delete"></td>
            
   </tr>`;
        });
    });
}
//Adddefault orderdetails
function Adddefaultorderdetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const orderdetailList = yield fetchorderDetails();
        orderdetailList.forEach(function (order) {
            let b = document.getElementById("orderdetails_table");
            if (CurrentUser.userEmail == order.userName) {
                b.innerHTML += `<tr>  
    
                             <td>${order.orderID}</td> 
                             <td>${order.userName}</td> 
                             <td>${order.medicinName}</td> 
                             <td>${order.orderTotalPrice}</td> 
                             <td>${order.orderStatus}</td> 
                    </tr>`;
            }
        });
    });
}
//sign up form validation and taking user details
function signup_submitdetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchuserDetails();
        let uservalidationStatus = true;
        let Email = document.getElementById('email').value;
        let regex = /^([a-z 0-9\.-]+)@([a-z0-9\-]+).([a-z]{2,8})$/;
        if (!regex.test(Email)) {
            alert("please enter valid email address......");
            uservalidationStatus = false;
        }
        let password1 = document.getElementById('password').value;
        let password2 = document.getElementById('Confirm_Password').value;
        let regex2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
        if (password1 != password2 || !regex2.test(password1)) {
            alert("please enter valid  password......");
            uservalidationStatus = false;
        }
        let userPhoneNumber = document.getElementById('phonenumber').value;
        let regex3 = /^[7-9]\d{9}$/;
        if (!regex3.test(userPhoneNumber)) {
            alert("please enter valid phone number......");
            uservalidationStatus = false;
        }
        if (uservalidationStatus) {
            const newuser = {
                userID: userIDAutoIncrement++,
                userEmail: Email,
                userPassword: password1,
                userPhoneNumber: userPhoneNumber,
                walletBalance: 0,
            };
            //adding user
            addUserDetails(newuser);
            alert(".......registration Successfull.......");
            let homeform_display = document.getElementById('homeform');
            homeform_display.style.display = "block";
            let Sign_up_form_display = document.getElementById('Sign_up_form');
            Sign_up_form_display.style.display = "none";
        }
    });
}
function signin_details() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchuserDetails();
        let userinputemail = document.getElementById("userinput_email").value;
        let userinputpassword = document.getElementById("userinput_password").value;
        //alert(userinputemail);
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userEmail == userinputemail && UserArrayList[i].userPassword == userinputpassword) {
                CurrentUser = UserArrayList[i];
                addDefaultmedicinedata();
                alert("login...Succesfulll......");
                displayuserhome();
            }
        }
    });
}
function displayuserhome() {
    let Sign_ip_form_display = document.getElementById('Sign_in_form');
    Sign_ip_form_display.style.display = "none";
    let showhome = (document.getElementById("user_home"));
    showhome.style.display = "block";
}
function display_medicine_detail() {
    let showhome = (document.getElementById("user_home"));
    showhome.style.display = "block";
    let show_Medicine_Details_table = document.getElementById("Medicine_Details_table");
    show_Medicine_Details_table.style.display = "block";
    let showbalancedisplay = document.getElementById("balance_table");
    showbalancedisplay.style.display = "none";
    let showwalletrechargeportal = (document.getElementById("walletrecharge"));
    showwalletrechargeportal.style.display = "none";
    let showtableorderdetails = document.getElementById("orderdetails_table");
    showtableorderdetails.style.display = "none";
    let tableshow = document.getElementById("purchase_Medicine_Div");
    tableshow.style.display = "none";
    let CancelorderDiv = document.getElementById("Cancel_Medicine_Div");
    CancelorderDiv.style.display = "none";
}
function gotouserhome() {
    alert("balance diplayed successfully");
    let showhome = (document.getElementById("user_home"));
    showhome.style.display = "block";
    let showbalancedisplay = document.getElementById("balance_table");
    showbalancedisplay.style.display = "none";
}
function logout() {
    let homeform_display = document.getElementById('homeform');
    homeform_display.style.display = "block";
    let showhome = (document.getElementById("user_home"));
    showhome.style.display = "none";
    let showtableorderdetails = document.getElementById("orderdetails_table");
    showtableorderdetails.style.display = "none";
    let showwalletrechargeportal = (document.getElementById("walletrecharge"));
    showwalletrechargeportal.style.display = "none";
    let showbalancedisplay = document.getElementById("balance_table");
    showbalancedisplay.style.display = "none";
    let show_Medicine_Details_table = document.getElementById("Medicine_Details_table");
    show_Medicine_Details_table.style.display = "none";
    let tableshow = document.getElementById("purchase_Medicine_Div");
    tableshow.style.display = "none";
    let showtableorderdetails1 = document.getElementById("orderdetails_table");
    showtableorderdetails1.style.display = "none";
    let CancelorderDiv = document.getElementById("Cancel_Medicine_Div");
    CancelorderDiv.style.display = "none";
}
function walletrechargebutton() {
    let showwalletrechargeportal = document.getElementById("walletrecharge");
    showwalletrechargeportal.style.display = "block";
}
function Rechargeamountinside(amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchuserDetails();
        // CurrentUser.walletBalance+=amount;
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userID == CurrentUser.userID) {
                const newuser = {
                    userID: CurrentUser.userID,
                    userEmail: CurrentUser.userEmail,
                    userPassword: CurrentUser.userPassword,
                    userPhoneNumber: CurrentUser.userPhoneNumber,
                    walletBalance: CurrentUser.walletBalance + amount
                };
                updateuserinfo(CurrentUser.userID, newuser);
                displayuserhome();
            }
        }
    });
}
function walletRecharge() {
    let rechargeamount = parseInt(document.getElementById("input_amount").value);
    Rechargeamountinside(rechargeamount);
    alert("recharge succeessfull....");
    let showwalletrechargeportal = document.getElementById("walletrecharge");
    showwalletrechargeportal.style.display = "none";
}
function Show_Balancebutton() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchuserDetails();
        let tableshow = document.getElementById("balance_table");
        tableshow.style.display = "block";
        let balance = document.getElementById("current_balance");
        UserArrayList.forEach(function (user) {
            if (CurrentUser.userID == user.userID) {
                // const userr:UserInfo={
                //     userID:user.userID,
                //     userEmail:user.userEmail,
                //      userPassword:user.userPassword,
                //       userPhoneNumber: user.userPhoneNumber,
                //       walletBalance:user.walletBalance
                // }
                // updateuserinfo(user.userID,userr)
                balance.innerHTML = user.walletBalance.toString();
                alert(balance.innerHTML);
            }
        });
    });
}
function oder_historybutton() {
    Adddefaultorderdetails();
    let showtableorderdetails = document.getElementById("orderdetails_table");
    showtableorderdetails.style.display = "block";
}
function showingPurchasemedinedetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchmedicineDetails();
        MedicineList.forEach(function (medicine) {
            let date = medicine.medicineExpiry.toString().substring(0, 10);
            let a = document.getElementById("purchase_Medicine_Details_table");
            a.innerHTML +=
                `<tr>
            <td>${medicine.medicineID}</td>   
            <td>${medicine.medicineName}</td>
            <td>${medicine.medicinePrice}</td>
            <td>${medicine.medicineCount}</td>
            <td>${date}</td>
            <td><input type="button" onclick="BuyMedicine('${medicine.medicineID}')" id="Edit" value="Buy    "></td>
            
   </tr>`;
        });
    });
}
function PurchaseButton() {
    showingPurchasemedinedetails();
    let tableshow = document.getElementById("purchase_Medicine_Div");
    tableshow.style.display = "block";
}
function BuyMedicine(medicineID) {
    let tableshow = document.getElementById("medicinecount_div");
    tableshow.style.display = "block";
    CurrentmedicineID = medicineID;
}
// addUserDetails(newuser) 
function medicinecountinputSubmit() {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchmedicineDetails();
        let flag1 = 0;
        let flag2 = 0;
        let Medicineinputcount = Number(document.getElementById("medicineinputcount").value);
        MedicineList.forEach(function (med) {
            if (med.medicineID == CurrentmedicineID) {
                if (Medicineinputcount <= med.medicineCount) {
                    if (med.medicinePrice <= CurrentUser.walletBalance) {
                        med.medicineCount -= Medicineinputcount;
                        CurrentUser.walletBalance = CurrentUser.walletBalance - med.medicinePrice * Medicineinputcount;
                        const neworder = {
                            orderID: orderIDAutoIncreament++,
                            userName: CurrentUser.userEmail,
                            medicinName: med.medicineName,
                            orderTotalPrice: med.medicinePrice,
                            orderStatus: "Ordered"
                        };
                        addOrder(neworder);
                        //MedicineList.push(new MedicineInfo(med.medicineName,med.medicinePrice,med.medicineCount,med.medicineExpiry));
                        updatemedicineinfo(med.medicineID, med);
                        updateuserinfo(CurrentUser.userID, CurrentUser);
                        addDefaultmedicinedata();
                        alert("item Added Succesfully.....");
                        let medicineCountdiv = document.getElementById("medicinecount_div");
                        medicineCountdiv.style.display = "none";
                        let tableshow1 = document.getElementById("purchase_Medicine_Div");
                        tableshow1.style.display = "none";
                    }
                    else {
                        alert("Insufficient Wallet_Balance please Rechange wallet.....");
                        walletrechargebutton();
                    }
                }
                else {
                    alert("___entered quantity is not available___");
                }
            }
        });
    });
}
function showcancelordertable() {
    return __awaiter(this, void 0, void 0, function* () {
        const orderdetailList = yield fetchorderDetails();
        orderdetailList.forEach(function (order) {
            let b = document.getElementById("Cancel_Medicine_Details_table");
            if (CurrentUser.userEmail == order.userName) {
                b.innerHTML += `<tr>  
    
                             <td>${order.orderID}</td> 
                             <td>${order.userName}</td> 
                             <td>${order.medicinName}</td> 
                             <td>${order.orderTotalPrice}</td> 
                             <td>${order.orderStatus}</td>
                             <td><input type="button" onclick="CancelorderID('${order.orderID}')" id="Edit" value="cancel    "></td>

                    </tr>`;
            }
        });
    });
}
// addOrder(neworder)
function CancelorderID(tableorderID) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderdetailList = yield fetchorderDetails();
        orderdetailList.forEach(function (order) {
            if (tableorderID == order.orderID) {
                if (order.orderStatus == "Ordered") {
                    const neworder = {
                        orderID: orderIDAutoIncreament++,
                        userName: order.userName,
                        medicinName: order.medicinName,
                        orderTotalPrice: order.orderTotalPrice,
                        orderStatus: "cancelled"
                    };
                    updateorderinfo(order.orderID, neworder);
                    alert("your order has been cancelled");
                    let CancelorderDiv = document.getElementById("Cancel_Medicine_Div");
                    CancelorderDiv.style.display = "none";
                }
            }
        });
    });
}
function cancelbutton() {
    let CancelorderDiv = document.getElementById("Cancel_Medicine_Div");
    CancelorderDiv.style.display = "block";
    let showbalancedisplay = document.getElementById("balance_table");
    showbalancedisplay.style.display = "none";
    let showwalletrechargeportal = (document.getElementById("walletrecharge"));
    showwalletrechargeportal.style.display = "none";
    let showtableorderdetails = document.getElementById("orderdetails_table");
    showtableorderdetails.style.display = "none";
    let tableshow = document.getElementById("purchase_Medicine_Div");
    tableshow.style.display = "none";
    let show_Medicine_Details_table = document.getElementById("Medicine_Details_table");
    show_Medicine_Details_table.style.display = "none";
    showcancelordertable();
}
function Home() {
    let showhome = (document.getElementById("user_home"));
    showhome.style.display = "block";
    let showbalancedisplay = document.getElementById("balance_table");
    showbalancedisplay.style.display = "none";
    let CancelorderDiv = document.getElementById("Cancel_Medicine_Div");
    CancelorderDiv.style.display = "none";
    let tableshow = document.getElementById("medicinecount_div");
    tableshow.style.display = "none";
    let showtableorderdetails = document.getElementById("orderdetails_table");
    showtableorderdetails.style.display = "none";
    let tableshow2 = document.getElementById("purchase_Medicine_Div");
    tableshow2.style.display = "none";
    let showwalletrechargeportal = document.getElementById("walletrecharge");
    showwalletrechargeportal.style.display = "none";
    let show_Medicine_Details_table = document.getElementById("Medicine_Details_table");
    show_Medicine_Details_table.style.display = "none";
    let displayeditmedicineform = document.getElementById("Editmedicinediv");
    displayeditmedicineform.style.display = "none";
}
function Addmedicinebutton() {
    let displayAddmedcineform = document.getElementById("Addmedicinediv");
    displayAddmedcineform.style.display = "block";
    let show_Medicine_Details_table = document.getElementById("Medicine_Details_table");
    show_Medicine_Details_table.style.display = "none";
}
function Addmedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchmedicineDetails();
        let M_name = document.getElementById("input_medicineName");
        let M_price = document.getElementById("Medcine_price");
        let M_count = document.getElementById("Medcine_Count");
        let M_EDate = document.getElementById("medicine_Expiry_Date");
        // let date=M_EDate
        const medicine = {
            medicineID: medicineIDAutoIncrement++,
            medicineName: String(M_name.value),
            medicinePrice: parseInt(M_price.value),
            medicineCount: parseInt(M_count.value),
            medicineExpiry: new Date(M_EDate.value.toString())
        };
        const MedicineListt = yield addMedicine(medicine);
        addMedicine(medicine);
        //fetchmedicineDetails()
        let a = document.getElementById("medicinetable");
        a.innerHTML = "";
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
        let displayAddmedcineform = document.getElementById("Addmedicinediv");
        displayAddmedcineform.style.display = "none";
        let show_Medicine_Details_table = document.getElementById("Medicine_Details_table");
        show_Medicine_Details_table.style.display = "block";
        alert("Succesfully Added");
    });
}
function EditMedcine(m_Id) {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchmedicineDetails();
        current_MID = m_Id;
        let displayeditmedicineform = document.getElementById("Editmedicinediv");
        displayeditmedicineform.style.display = "block";
        let show_Medicine_Details_table = document.getElementById("Medicine_Details_table");
        show_Medicine_Details_table.style.display = "none";
        MedicineList.forEach(function (medicine) {
            if (medicine.medicineID == m_Id) {
                document.getElementById("edit_input_medicineName").value = medicine.medicineName;
                let A = document.getElementById("edit_Medcine_price");
                A.value = medicine.medicinePrice.toString();
                let B = document.getElementById("edit_Medcine_Count");
                B.value = medicine.medicineCount.toString();
                let c = document.getElementById("edit_medicine_Expiry_Date");
                c.value = medicine.medicineExpiry.toString().substring(0, 10);
                //addDefaultmedicinedata();
            }
        });
    });
}
function EditMedicineSubmitbutton() {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchmedicineDetails();
        let ab = document.getElementById("edit_input_medicineName").value;
        let b = (document.getElementById("edit_Medcine_price").value);
        let pric = Number(b);
        let c = (document.getElementById("edit_Medcine_Count").value);
        let countt = Number(c);
        let M_EDate = document.getElementById("edit_medicine_Expiry_Date");
        //let dat11=new Date(M_EDate.value);
        // console.log(M_EDate.value);
        MedicineList.forEach(function (medicine) {
            if (medicine.medicineID == current_MID) {
                let datearray = M_EDate.value.split('-');
                console.log(datearray);
                const medicinee = {
                    medicineID: medicine.medicineID,
                    medicineName: ab,
                    medicinePrice: pric,
                    medicineCount: countt,
                    medicineExpiry: new Date(Number(datearray[0]), Number(datearray[1]), Number(datearray[2]))
                    //new date(2024-12-2)
                };
                //"medicineID":2003,"medicineName":"tab","medicinePrice":16,"medicineCount":32,"medicineExpiry":"2024-05-16T00:00:00
                console.log(medicinee);
                updatemedicineinfo(medicine.medicineID, medicinee);
                addDefaultmedicinedata();
                let displayeditmedicineform = document.getElementById("Editmedicinediv");
                displayeditmedicineform.style.display = "none";
                let show_Medicine_Details_table = document.getElementById("Medicine_Details_table");
                show_Medicine_Details_table.style.display = "block";
            }
        });
        alert("Succuss fully Edited");
    });
}
//DeleteMedcine('${medicine.medicineID}')"
function DeleteMedcine(medId) {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchmedicineDetails();
        MedicineList.forEach(function (medi) {
            if (medi.medicineID == medId) {
                deletemedicineinfo(medId);
                //updatemedicineinfo(medId,medi);
                //addDefaultmedicinedata();
                let show_Medicine_Details_table = document.getElementById("Medicine_Details_table");
                show_Medicine_Details_table.style.display = "block";
            }
        });
    });
}
/*---------------------------------------------------------------------------------------------------------------------*/
//add
function addUserDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5230/api/UserInfo', {
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
//add method for order
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5230/api/OrderInfo', {
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
//add method for medicine
function addMedicine(medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5230/api/MedicineInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed To add order');
        }
    });
}
/*-----------------------------------------------------------------------------------------------------------------*/
//show
function fetchuserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5230/api/UserInfo';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchorderDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5230/api/OrderInfo';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchmedicineDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5230/api/MedicineInfo';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
/*_________________________________________________________________________________________________________________________*/
//update
function updatemedicineinfo(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5230/api/MedicineInfo/${id}`, {
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
    });
}
function updateuserinfo(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5230/api/UserInfo/${id}`, {
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
    });
}
function updateorderinfo(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5230/api/OrderInfo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
/*_____________________________________________________________________________________________________________________________*/
//delete
function deleteorderinfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5230/api/OrderInfo/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete Order');
        }
    });
}
function deleteuserinfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5230/api/UserInfo/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
    });
}
function deletemedicineinfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5230/api/MedicineInfo/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete medicine');
        }
        addDefaultmedicinedata();
    });
}
