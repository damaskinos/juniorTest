
// Function to do visible all divs with hidden.


function visible(){
    
                document.getElementById("box").style.height = "700px";
                document.getElementById("full").style.visibility = "visible";
                document.getElementById("logoBox").style.visibility = "visible";
                document.getElementById("infoBox").style.visibility = "visible";
                document.getElementById("reposBox").style.visibility = "visible";
                document.getElementById("iconsBox").style.visibility = "visible";
                document.getElementById("reposFull").style.visibility = "visible";
                document.getElementById("userGit").style.border = "1px solid #848484";
}

// Function to do visible all divs hidden again if the search fails.

function noVisible(){
                document.getElementById("box").style.height = "100px";
                document.getElementById("full").style.visibility = "hidden";
                document.getElementById("logoBox").style.visibility = "hidden";
                document.getElementById("infoBox").style.visibility = "hidden";
                document.getElementById("reposBox").style.visibility = "hidden";
                document.getElementById("iconsBox").style.visibility = "hidden";
                document.getElementById("reposFull").style.visibility = "hidden";
}
    
//Function to clear all info if another user is searched

function clear(){
    
    document.getElementById("username").innerHTML = "";
    document.getElementById("tableRepos").innerHTML = "";   
    document.getElementById("name").innerHTML = "";   
    document.getElementById("username").innerHTML = "";   
    document.getElementById("logoBox").innerHTML = "";   
    document.getElementById("bio").innerHTML = "";   
    document.getElementById("warning").style.visibility = "hidden";
    
    
}


//function onclick MAIN function
    
document.getElementById("submit").onclick = function userAsk(){
 
    clear(); 

    var user = document.getElementById("userGit").value;

    //to get all info
    
    var api ='https://api.github.com/users/' + user + '/repos';
    var apiName ='https://api.github.com/users/' + user;


    gotDataRep(api);
    gotDataUser(api);

    //function connect API Github 
    
    function gotDataRep (){

         var xmlhttp = new XMLHttpRequest(), json;

        xmlhttp.onreadystatechange = function() {
            
            // 4 & 200 == OK 
            
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                
                
                visible();


                json = JSON.parse(xmlhttp.responseText);


                var numero = json.length;
                console.log(json);    

                for (var i = 0; i< numero; i++) {


                    //for to post all repos + forks + favs in a table with links and images    

                    document.getElementById('tableRepos').innerHTML  += "<tr>"   +   "<td class='repo'> " +  "<img src='images/logo.png' id='iconsIMG'> "  + "<a href=" + "'" + json[i].html_url + "' target=_blank>" + json[i].name +  "</a>"  + "<hr>" + "</td>" + "<td class = 'repo'>" +  "<img src='images/fork.png' id='iconsIMG'> "  + json[i].forks + " <img src='images/star.png' id='iconsIMG'> " + json[i].stargazers_count + "<hr>" + "</td>" + "</tr>" ;




                }



            }


        }

        //Get api github
    xmlhttp.open('GET', api, true);
    xmlhttp.send();



    }


    function gotDataUser (){

    var xmlhttp = new XMLHttpRequest(), json;

        xmlhttp.onreadystatechange = function() {

            if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {

                
                               
                json = JSON.parse(xmlhttp.responseText);


                document.getElementById("username").innerHTML = json.name;
                document.getElementById("logoBox").innerHTML = "<img src=" + json.avatar_url + "id='logoImage'>;";
                document.getElementById("name").innerHTML = "@" + user;
                
                //if the status is 200 == user finded == visible all the content
                
                visible();

                    if (json.bio === null) {

                        // If BIO == NULL then shows "nothing to show" to the client
                        
                        document.getElementById("bio").innerHTML= "Nothing to show";
                        }

                    else{

                        document.getElementById("bio").innerHTML = json.bio;
                        }


                    }

            
            // AT status 404 == not found -  For not found users // warning visible and function novisible to hide all
            
            if(xmlhttp.readyState === 4 && xmlhttp.status === 404) {

                document.getElementById("warning").style.visibility = "visible";
                document.getElementById("warning").innerHTML = "<span> Does not Exist </span>"            
                document.getElementById("name").innerHTML = "";
                noVisible();
                document.getElementById("userGit").style.border = "1px solid red";
                
            }            
        }


    xmlhttp.open('GET', apiName, true);
    xmlhttp.send();


    }




 
}





    
    

