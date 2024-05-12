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
let CurrentLoggedUser;
function newUserB() {
    document.getElementById("UserRegistrationdfeildset").style.display = "block";
    document.getElementById("userloginfeildset").style.display = "none";
}
function existing_User_Button() {
    document.getElementById("UserRegistrationdfeildset").style.display = "none";
    document.getElementById("userloginfeildset").style.display = "block";
}
let formm = document.getElementById("asdf");
formm.addEventListener('submit', (event) => {
    event.preventDefault();
    let Ipusername = document.getElementById("inputUsername").value;
    let Ippassword = document.getElementById("inputPassword").value;
    let IpGender = document.getElementById("inputGender").value;
    let IpDepartment = document.getElementById("inputDepartment").value;
    let IpPhoneNumber = document.getElementById("inputPhoneNumber").value;
    let IpwalletBalance = Number(document.getElementById("inputwalletBalance").value);
    let IpMailID = document.getElementById("inputMailID").value;
    let IPLPIC = document.getElementById("inputpicture");
    const reader = new FileReader();
    reader.readAsDataURL(IPLPIC.files[0]);
    reader.onload = function (event) {
        var _a;
        const base64string = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
        const newuser = {
            userID: undefined,
            userName: Ipusername,
            gender: IpGender,
            department: IpDepartment,
            mobileNumber: IpPhoneNumber,
            mailID: IpMailID,
            walletBalance: IpwalletBalance,
            password: Ippassword,
            picture: [base64string]
        };
        addUserDetails(newuser);
        alert("sucsedd");
    };
});
function registrationformsubmitB() {
    return __awaiter(this, void 0, void 0, function* () {
    });
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
function loginsubmitB() {
    return __awaiter(this, void 0, void 0, function* () {
        const userList = yield fetchUserDetails();
        let Iplusername = document.getElementById("logininputusername").value;
        let Iplpassword = document.getElementById("logininputpassword").value;
        let flag = true;
        let a = document.getElementById("222");
        userList.forEach(function (user) {
            if (user.userName == Iplusername && user.password == Iplpassword) {
                flag = false;
                CurrentLoggedUser = user;
                alert("login Successfull");
                a.src = user.picture[0];
                document.getElementById("submenudiv").style.display = "block";
                document.getElementById("userloginfeildset").style.display = "none";
            }
        });
        if (flag) {
            alert("please check details");
        }
    });
}
function walletrecharge() {
    document.getElementById("rechargeWalletDiv1").style.display = "block";
    document.getElementById("DisbookhistoryID").style.display = "none";
    document.getElementById("borrowbookdivID").style.display = "none";
    alert(CurrentLoggedUser.walletBalance);
}
function funInputrechargeAmountB() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserDetailsList = yield fetchUserDetails();
        let IPamount = parseInt(document.getElementById("InputrechargeAmount").value);
        UserDetailsList.forEach(function (user) {
            if (CurrentLoggedUser.userID == user.userID) {
                user.walletBalance = user.walletBalance + IPamount;
                const user2 = {
                    userName: user.userName,
                    userID: user.userID,
                    walletBalance: user.walletBalance,
                    password: user.password,
                    mobileNumber: user.mobileNumber,
                    mailID: user.mailID,
                    gender: user.gender,
                    department: user.department,
                    picture: user.picture
                };
                updatUserInfo(user.userID, user2);
                alert("your recharge is Succesfully  and your current balance is  " + user.walletBalance);
            }
        });
        document.getElementById("rechargeWalletDiv1").style.display = "none";
    });
}
function showBorrowedhistory() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("DisbookhistoryID").style.display = "block";
        document.getElementById("rechargeWalletDiv1").style.display = "none";
        document.getElementById("borrowbookdivID").style.display = "none";
        const BorrowDetailsList = yield fetchBorrowDetails();
        let IPTborrowlist = document.getElementById("borrowlist");
        IPTborrowlist.innerHTML = "";
        BorrowDetailsList.forEach(function (borrow) {
            if (CurrentLoggedUser.userID == borrow.userID) {
                const row = document.createElement('tr');
                row.innerHTML =
                    `<td>${borrow.borrowID}</td>
             <td>${borrow.bookID}</td>
             <td>${borrow.userID}</td>
             <td>${borrow.borrowedDate.toString().substring(0, 10)}</td>
             <td>${borrow.borrowBookCount}</td>
             <td>${borrow.status}</td>
             <td>${borrow.paidFineAmount}</td>`;
                IPTborrowlist.appendChild(row);
            }
        });
    });
}
function Borrowbook() {
    document.getElementById("borrowbookdivID").style.display = "block";
    document.getElementById("DisbookhistoryID").style.display = "none";
    document.getElementById("rechargeWalletDiv1").style.display = "none";
    displaybookdetails();
}
function displaybookdetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const bookdeatailsList = yield fetchBookDetails();
        const ShowbookTable = document.getElementById("bookdetailstable");
        ShowbookTable.innerHTML = "";
        bookdeatailsList.forEach(function (book) {
            const row = document.createElement('tr');
            row.innerHTML =
                `<td>${book.bookID}</td>
                     <td>${book.bookName}</td>
                     <td>${book.authorName}</td>
                     <td>${book.bookCount}</td>
                     <td><input type="button" name="showbutton" onclick="Borrowbookfrmtable(${book.bookID})" value="select" id="addingbook"></td>

                     `;
            ShowbookTable.appendChild(row);
        });
    });
}
function Borrowbookfrmtable(id) {
}
function download() {
    return __awaiter(this, void 0, void 0, function* () {
        const userList = yield fetchUserDetails();
        //let str:string="UserID,Username,Gender,Department,MobileNumber,UserEmail,UserPassword,WalletBalance,Profiele Picture/n";
        let str = "";
        userList.forEach(function (user) {
            str += `${user.userID},${user.userName},${user.gender},${user.department},${user.mobileNumber},${user.mailID},${user.password},${user.walletBalance}\n`;
        });
        var blob = new Blob([str], { type: "text/csv" });
        var Url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.href = Url;
        link.click();
        link.download = "file.CSV";
        URL.revokeObjectURL(Url);
        // var Url=URL.createObjectURL(blob);
        // link.href="Url";
        // link.download="file.csv";
    });
}
/*__________________________________________________________________________________________________________________________*/
//Add user 
function addUserDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5182/api/UserDetails', {
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
function addBookDetails(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5182/api/BookDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed To add book');
        }
    });
}
function addBorrowDetails(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5182/api/BorrowDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed To add book');
        }
    });
}
/*_________________________________________________________________________________________________________________________________*/
////show getting details
function fetchUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5182/api/UserDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchBookDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5182/api/BookDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch userinfo');
        }
        return yield response.json();
    });
}
function fetchBorrowDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5182/api/BorrowDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch bookdeatails');
        }
        return yield response.json();
    });
}
/*_________________________________________________________________________________________________________________________________*/
//update
function updatUserInfo(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5182/api/UserDetails/${id}`, {
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
function updatBookInfo(id, book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5182/api/BookDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    });
}
function updatBorrowInfo(id, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5182/api/BookDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    });
}
/*_________________________________________________________________________________________________________________________________*/
//delete
function deleteUseriInfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5182/api/UserDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
    });
}
function deleteBookIInfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5182/api/BookDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    });
}
function deleteBorrowIInfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5182/api/BookDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete borrow');
        }
    });
}
