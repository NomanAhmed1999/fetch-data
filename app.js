


var namee = document.getElementById("name");
var email = document.getElementById("email");
var age = document.getElementById("age");
var db = firebase.firestore();


let register = () => {
    let userInfoObj = {
        userName : namee.value,
        userEmail : email.value,
        userAge : age.value
    }
    
    
    db.collection("users").add(userInfoObj)

    .then(()=>{
        // console.log("user data store");
        fetchData();
    })
    .catch(()=>{
        console.log("user data does not store");
    })
    
}

let changeData;

let fetchData = () => {
    db.collection("users")
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                let changeData = change.doc.data();
                changeData.id = change.doc.id;
                console.log("user data", changeData);
                showDataInDOM(changeData);
            }

            if (change.type === "modified") {
                console.log("user data", change.doc.data());
                // editItemsFromDOM(change.doc.data())
            }


            if (change.type === "removed") {
                // console.log("Removed city: ", change.doc.data());
                removeItemsFromDOM(change.doc.id)
            }
        });
    });
}

let oList = document.getElementById("oList");

let showDataInDOM = (cd) => {
    let str = JSON.stringify(cd, null, 4);
    let li = document.createElement('li');
    li.setAttribute("id",cd.id);
    let taskText = document.createTextNode(str);
    let delBtn = document.createElement('button');
    let delBtnText = document.createTextNode("delete");
    let editBtn = document.createElement('button');
    let editBtnText = document.createTextNode("Edit");
    delBtn.appendChild(delBtnText);
    delBtn.setAttribute("onClick","deleteItems(this)");
    li.appendChild(delBtn);
    editBtn.appendChild(editBtnText);
    editBtn.setAttribute("onClick","editItems(this)");
    li.appendChild(editBtn);
    
    li.appendChild(taskText);
    oList.appendChild(li);


    
    // console.log(str)
    // console.log(cd.id)


}




let deleteItems = (delBtn) => {
    let itemsId = delBtn.parentNode.id;
    db.collection("users").doc(itemsId).delete();

}

let removeItemsFromDOM = (changeId) => {
    let objId = document.getElementById(changeId);
    oList.removeChild(objId);
}



// let editItemsFromDOM = (cData) => {
//     console.log(cData);

// }






let editItems = (objItems) => {
    let editData = db.collection("users");
    console.log(objItems.parentNode.firstChild.nodeValue);
    // console.log(editData);
    // console.log(objItems);

}






