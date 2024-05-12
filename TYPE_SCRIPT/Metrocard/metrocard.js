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
let UserCradNumIncrement = 1000;
let travelIDIncrement = 2000;
let ticketIDIdIncrement = 3000;
let currentUser22;
//CMRL1001	Ravi	9848812345	1000
//CMRL1002	Baskaran	9948854321	1000
//
////Add Default Data
function newUserButtonn() {
    let diplayuserregform = document.getElementById("newuserregistrationformDiv");
    diplayuserregform.style.display = "block";
    let diplayloginform = document.getElementById("ExistinguserDiv");
    diplayloginform.style.display = "none";
}
function fun_existing_User_Button() {
    let diplayloginform = document.getElementById("ExistinguserDiv");
    diplayloginform.style.display = "block";
    let diplayuserregform = document.getElementById("newuserregistrationformDiv");
    diplayuserregform.style.display = "none";
}
function funnewuserformSubmitbutton() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserDetailsList = yield fetchuser();
        let inputnewusername = document.getElementById("username").value;
        let inputnewPhonenumber = document.getElementById("UserPhoneNumber").value;
        let inputnewBalance = Number(document.getElementById("UserBalance").value);
        let regex3 = /^[7-9]\d{9}$/;
        if (!regex3.test(inputnewPhonenumber)) {
            alert("please enter valid phone number......");
        }
        else {
            //0const User1=new UserDetails(inputnewusername,parseInt(inputnewPhonenumber),inputnewBalance)
            //UserDetailsList.push(User1);
            const user = {
                userCardNumber: 4,
                userName: inputnewusername,
                phoneNumber: inputnewPhonenumber,
                walletBalance: inputnewBalance,
            };
            addUser(user);
            alert("Succesfully registeered.....your card number is " + user.userCardNumber);
            document.getElementById("username").value = "";
            document.getElementById("UserPhoneNumber").value = "";
            document.getElementById("UserBalance").value = "";
            let diplayuserregform = document.getElementById("newuserregistrationformDiv");
            diplayuserregform.style.display = "none";
        }
    });
}
function funsubmitExistingusercardNumberButton() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserDetailsList = yield fetchuser();
        let inputesixtingCardnumber = document.getElementById("ExistingusercardNumber").value;
        UserDetailsList.forEach(function (userr) {
            if (userr.userName == inputesixtingCardnumber) {
                currentUser22 = userr;
                addDefaulticketdetails();
                greetings();
                let displayusersubmenu = document.getElementById("UserSubmenu");
                displayusersubmenu.style.display = "block";
                let displaymainMenuDiv = document.getElementById("mainMenuDiv");
                displaymainMenuDiv.style.display = "none";
                let diplayloginform = document.getElementById("ExistinguserDiv");
                diplayloginform.style.display = "none";
            }
        });
    });
}
function funTravelButton() {
    let dis = document.getElementById("ticketfairdetailstable");
    dis.style.display = "block";
    let displayhistory = document.getElementById("travelHistory");
    displayhistory.style.display = "none";
    let ballancepotal = document.getElementById("ballance");
    ballancepotal.style.display = "none";
    let displrechargpotal = document.getElementById("rechargeWalletDiv1");
    displrechargpotal.style.display = "none";
}
function addDefaulticketdetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const ticketDetailsList = yield fetchTicket();
        let num = 0;
        let displayticketsdetails = document.getElementById("ticketfairdetailtable222");
        ticketDetailsList.forEach(function (ticket) {
            num++;
            displayticketsdetails.innerHTML += `<tr>
        <td>${num}</td>
        <td>${ticket.fromLocation}</td>
        <td>${ticket.toLocation}</td>
        <td>'${ticket.ticketPrice}'</td>
        <td> <input type="button"  id="buyticket" onclick="Userbuyticket('${ticket.ticketID}')"   value="Buy  ">
        </tr>
        `;
        });
    });
}
function Userbuyticket(ticket) {
    return __awaiter(this, void 0, void 0, function* () {
        const ticketDetailsList = yield fetchTicket();
        const traveDetailsList = yield fetchTravel();
        let flag = true;
        ticketDetailsList.forEach(function (tic) {
            if (tic.ticketID == (Number(ticket))) {
                // travelID:number,
                // cardNumber:number,
                // fromLocation:string,
                // toLocation:string,
                // date:Date,
                // travelCost:number
                if (currentUser22.walletBalance >= tic.ticketPrice) {
                    flag = false;
                    const travel = {
                        travelID: 5,
                        cardNumber: currentUser22.userCardNumber,
                        fromLocation: tic.fromLocation,
                        toLocation: tic.toLocation,
                        date: new Date(),
                        travelCost: tic.ticketPrice
                    };
                    addtravel(travel);
                    currentUser22.walletBalance = currentUser22.walletBalance - tic.ticketPrice;
                    alert("succesfullu purachsed ticket....");
                    let dis = document.getElementById("ticketfairdetailstable");
                    dis.style.display = "none";
                    let displayusersubmenu = document.getElementById("UserSubmenu");
                    displayusersubmenu.style.display = "block";
                }
            }
        });
        if (flag) {
            alert("Insufiiecient Balance please recharge your wallet..");
            funRecharge();
        }
    });
}
function funRecharge() {
    let displrechargpotal = document.getElementById("rechargeWalletDiv1");
    displrechargpotal.style.display = "block";
    let dis = document.getElementById("ticketfairdetailstable");
    dis.style.display = "none";
    let displayhistory = document.getElementById("travelHistory");
    displayhistory.style.display = "none";
    let ballancepotal = document.getElementById("ballance");
    ballancepotal.style.display = "none";
}
function funInputrechargeAmountbutton() {
    let rechargeAmount = document.getElementById("InputrechargeAmount");
    let a = parseInt(rechargeAmount.value);
    currentUser22.walletBalance = currentUser22.walletBalance + a;
    let displrechargpotal = document.getElementById("rechargeWalletDiv1");
    displrechargpotal.style.display = "none";
    let displayusersubmenu = document.getElementById("UserSubmenu");
    displayusersubmenu.style.display = "block";
}
function funBalance_Check() {
    let ballancepotal = document.getElementById("ballance");
    ballancepotal.style.display = "block";
    let displrechargpotal = document.getElementById("rechargeWalletDiv1");
    displrechargpotal.style.display = "none";
    let dis = document.getElementById("ticketfairdetailstable");
    dis.style.display = "none";
    let displayhistory = document.getElementById("travelHistory");
    displayhistory.style.display = "none";
    document.getElementById("ballancespan").innerHTML = "Your Current Wallet Balance: " + currentUser22.walletBalance;
}
function Balancebackbutton() {
    let ballancepotal = document.getElementById("ballance");
    ballancepotal.style.display = "none";
    let displayusersubmenu = document.getElementById("UserSubmenu");
    displayusersubmenu.style.display = "block";
}
function funView_Travel_History() {
    return __awaiter(this, void 0, void 0, function* () {
        const traveDetailsList = yield fetchTravel();
        let displayhistory = document.getElementById("travelHistory");
        displayhistory.style.display = "block";
        let ballancepotal = document.getElementById("ballance");
        ballancepotal.style.display = "none";
        let displrechargpotal = document.getElementById("rechargeWalletDiv1");
        displrechargpotal.style.display = "none";
        let dis = document.getElementById("ticketfairdetailstable");
        dis.style.display = "none";
        traveDetailsList.forEach(function (travel) {
            if (travel.cardNumber == currentUser22.userCardNumber) {
                // let displayhistoryy=document.getElementById("travelHistorytable222") as HTMLTableElement;
                let d = document.getElementById("travelHistorytable222");
                d.innerHTML += `<tr>
                
                <td>${travel.travelID}</td>
                <td>${travel.cardNumber}</td>
                <td>${travel.fromLocation}</td>
                <td>${travel.toLocation}</td>
                <td>${travel.date.toString()}</td>
                <td>${travel.travelCost}</td>
                </tr>`;
            }
        });
    });
}
function funHome() {
    let displayusersubmenu = document.getElementById("UserSubmenu");
    displayusersubmenu.style.display = "block";
    let displayhistory = document.getElementById("travelHistory");
    displayhistory.style.display = "none";
    let ballancepotal = document.getElementById("ballance");
    ballancepotal.style.display = "none";
    let displrechargpotal = document.getElementById("rechargeWalletDiv1");
    displrechargpotal.style.display = "none";
    let dis = document.getElementById("ticketfairdetailstable");
    dis.style.display = "none";
}
function funExit() {
    let mainMenu = document.getElementById("mainMenuDiv");
    mainMenu.style.display = "block";
    let displayusersubmenu = document.getElementById("UserSubmenu");
    displayusersubmenu.style.display = "none";
    let displayhistory = document.getElementById("travelHistory");
    displayhistory.style.display = "none";
    let ballancepotal = document.getElementById("ballance");
    ballancepotal.style.display = "none";
    let displrechargpotal = document.getElementById("rechargeWalletDiv1");
    displrechargpotal.style.display = "none";
    let dis = document.getElementById("ticketfairdetailstable");
    dis.style.display = "none";
}
function greetings() {
    let greet = document.getElementById("greetings");
    greet.innerHTML = "Welcome " + currentUser22.userName;
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5072/api/userdetails', {
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
function addtravel(Travel) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5072/api/TravelDetailsControllers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Travel)
        });
        if (!response.ok) {
            throw new Error('Failed To add travel');
        }
    });
}
function addticket(Ticket) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5072/api/TicketFairControllers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Ticket)
        });
        if (!response.ok) {
            throw new Error('Failed To add travel');
        }
    });
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
function fetchuser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5072/api/userdetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchTravel() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5072/api/TravelDetailsControllers';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchTicket() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5072/api/TicketFairControllers';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
