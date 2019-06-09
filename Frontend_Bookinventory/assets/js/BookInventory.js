
var saveButton = document.getElementById('saveBook');
var delButton = document.getElementById('delAuth');
var retbksAuth = document.getElementById('retbksAuth');
var retbkinfo = document.getElementById('retbkinfo');

function createBookDetails()
    {
    // e.preventDefault();
    var bookname = document.getElementById('book_name').value;
    var bookid = document.getElementById('book_id').value;
    var authorname = document.getElementById('auth_name').value;
    var authoremail = document.getElementById('auth_email').value;
    var result = document.getElementById('result');
    var bookNameError = document.getElementById('name-error');    
    var bookIdError = document.getElementById('id-error');
    var authorNameError = document.getElementById('authname-error');
    var authorEmailError = document.getElementById('authemail-error');    

    result.innerHTML = "";
    bookNameError.style.fontWeight = "normal";
    bookIdError.style.fontWeight = "normal";
    authorNameError.style.fontWeight = "normal";
    authorEmailError.style.fontWeight = "normal";

    if(bookname != "" && bookid != "" && authorname != "" && authoremail != "")
    {
        bookNameError.innerHTML = "";
        bookIdError.innerHTML = "";
        authorNameError.innerHTML = "";
        authorEmailError.innerHTML = "";

        let url = "http://localhost:1337/addBooktoInventory722?";
        let fullURL = url + "bookName=" + bookname + "&bookId=" + bookid + "&authorName=" +authorname+ "&authorEmail=" + authoremail;
        console.log(fullURL);
        
        var xhttp = new XMLHttpRequest();
        console.log("GONNA MAKE AJAX");
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
                console.log("yess");
                console.log(this.responseText);
            }
        }
        xhttp.open("POST",fullURL, true);
        xhttp.send();

        result.style.marginTop = "5%";
        result.style.color = "black";
        result.style.fontWeight = "bold";
        result.innerHTML = "Book has been successfully added!";
    }
    else {
        if(bookname == "")
        {
            bookIdError.innerHTML = "";
            authorNameError.innerHTML = "";
            authorEmailError.innerHTML = "";
            bookNameError.style.color = "red";
            bookNameError.innerHTML = "Please enter the Book name!";  
        }
        else if(bookid == "")
        {
            bookNameError.innerHTML = "";
            authorNameError.innerHTML = "";
            authorEmailError.innerHTML = "";
            bookIdError.style.color = "red";
            bookIdError.innerHTML = "Please enter the Book id!";
        }
        else if(authorname == "")
        {
            bookNameError.innerHTML = "";
            bookIdError.innerHTML = "";
            authorEmailError.innerHTML = "";
            authorNameError.style.color = "red";
            authorNameError.innerHTML = "Please enter the Author name!";
        }
        else if(authoremail == "")
        {
            bookNameError.innerHTML = "";
            bookIdError.innerHTML = "";
            authorNameError.innerHTML = "";
            authorEmailError.style.color = "red";
            authorEmailError.innerHTML = "Please enter the Author email!";
        }

    }
}

    function deleteAuthInfo(){
    var delauthname = document.getElementById('delauthname').value;
    var delresult = document.getElementById('delresult');
    delresult.style.fontWeight = "normal";

   if(delauthname != "") 
   {
        let url = "http://localhost:1337/removeAuthorInfo722?";
        let fullURL = url + "&authorName=" + delauthname;
        console.log(fullURL);
        var output;
        var xhttp = new XMLHttpRequest();
        console.log("GONNA MAKE AJAX");
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
                console.log("yess");
                console.log(this.responseText);
                output = JSON.parse(this.responseText);
                console.log("output vandhu: ",output);
                console.log("boolean vandhu: ",output.deleted);
                if(output.deleted === true){
                    console.log("delete aaiduchu da");
                    delresult.style.marginTop = "2%";
                    delresult.style.color = "black";
                    delresult.style.fontWeight = "bold";
                    delresult.innerHTML = "Details about the Author have been successfully erased!";
                    // alert("Deleted successfully!");
                }
                else{
                    console.log("delete aagala da");
                    delresult.style.color = "red";
                    delresult.innerHTML = "Author not found!";
                    // alert("Oops! Author not found");
                }
          
            }
        }
        xhttp.open("DELETE",fullURL, true);
        xhttp.send();

   }

   else {
    delresult.style.color = "red";
    delresult.innerHTML = "Please enter the Author name!";
   }
    
}

    function retrieveAuthBooks(){

        var retbksauthname = document.getElementById('retbksauthname').value;
        var retbksauthresult = document.getElementById('retbksauthresult');
        retbksauthresult.innerHTML = "";
        retbksauthresult.style.fontWeight = "normal";

        if(retbksauthname != "") 
        {
             let url = "http://localhost:1337/retrieveBooksofAuthor722?";
             let fullURL = url + "&authorName=" + retbksauthname;
             console.log(fullURL);
             var output;
             var xhttp = new XMLHttpRequest();
             console.log("GONNA MAKE AJAX");
             xhttp.onreadystatechange = function () {
                 if(this.readyState == 4 && this.status == 200){
                     console.log("yess");
                     console.log(this.responseText);
                     output = JSON.parse(this.responseText);
                     console.log("Json output is",output);
                     if(output.found === false){
                         //console.log("Author not found", output);
                         retbksauthresult.style.color = "red";
                         retbksauthresult.innerHTML = "Author not found!";
                     }
                     else{
                         //console.log("Author found", output);
                         var len = output.length;
                         retbksauthresult.style.marginTop = "2%";
                         retbksauthresult.style.color = "black";
                         retbksauthresult.style.fontWeight = "bold";
                         //retbksauthresult.innerHTML = "Hi";
                        var list = document.createElement('ul');
                        list.setAttribute("id","list");
                        document.getElementById('retbksauthresult').appendChild(list);
                        for(var i=0; i<len-1 ; i++){
                            var no = i+1;
                            var item = document.createElement('li');
                            var out = "Book " + no + ": " + output[i].book_name + " , " + "Book ID:" + " " + output[i].book_id;
                            var content = document.createTextNode(out);
                            item.appendChild(content);
                            document.getElementById('list').appendChild(item);
                        }
                     }
               
                 }
             }
             xhttp.open("GET",fullURL, true);
             xhttp.send();
     
        }
     
        else {
            retbksauthresult.style.color = "red";
            retbksauthresult.innerHTML = "Please enter the Author name!";
        }
      

    }

    function retrieveBookInfo() {

        var retbkname = document.getElementById('retbkname').value;
        var retbkinforesult = document.getElementById('retbkinforesult');
        retbkinforesult.innerHTML = "";
        retbkinforesult.style.fontWeight = "normal";

        if(retbkname != "") 
        {
             let url = "http://localhost:1337/retrieveBookInformation722?";
             let fullURL = url + "bookName=" + retbkname;
             console.log(fullURL);
             var output;
             var xhttp = new XMLHttpRequest();
             console.log("GONNA MAKE AJAX");
             xhttp.onreadystatechange = function () {
                 if(this.readyState == 4 && this.status == 200){
                     console.log("yess");
                     console.log(this.responseText);
                     output = JSON.parse(this.responseText);
                     console.log("Json output is",output);
                     if(output.found === false){
                         //console.log("Author not found", output);
                         retbkinforesult.style.color = "red";
                         retbkinforesult.innerHTML = "Book not found!";
                     }
                     else{
                         //console.log("Author found", output);
                         //var len = output.length;
                         retbkinforesult.style.marginTop = "2%";
                         retbkinforesult.style.color = "black";
                         retbkinforesult.style.fontWeight = "bold";
                         //retbksauthresult.innerHTML = "Hi";
                        var list = document.createElement('ul');
                        list.setAttribute("id","bookinfolist");
                        document.getElementById('retbkinforesult').appendChild(list);
                        var item = document.createElement('li');
                        var out = "Book ID: " + output.bookId;
                        var content = document.createTextNode(out);
                        item.appendChild(content);
                        document.getElementById('bookinfolist').appendChild(item);
                        var item = document.createElement('li');
                        var out = "Author Name: " + output.authorName;
                        var content = document.createTextNode(out);
                        item.appendChild(content);
                        document.getElementById('bookinfolist').appendChild(item);
                        var item = document.createElement('li');
                        var out = "Author Email: " + output.authorEmail;
                        var content = document.createTextNode(out);
                        item.appendChild(content);
                        document.getElementById('bookinfolist').appendChild(item);
                     }
                 }
             }
             xhttp.open("GET",fullURL, true);
             xhttp.send();
        }
     
        else {
            retbkinforesult.style.color = "red";
            retbkinforesult.innerHTML = "Please enter the Book name!";
        }
      
    }

    saveButton.addEventListener("click",createBookDetails);
    delButton.addEventListener("click",deleteAuthInfo);
    retbksAuth.addEventListener("click",retrieveAuthBooks);
    retbkinfo.addEventListener("click",retrieveBookInfo);
