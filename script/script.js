function closeModal() {
document.getElementById("addCustomerModal").style.display = "none";
}
function openModal() {
	document.getElementById("addCustomerModal").style.display = "inline";
	}
var dropArea;
var imagePath ;

dropArea = document.getElementById("dragArea");
dropArea.addEventListener("dragenter", dragenter, false);
dropArea.addEventListener("dragover", dragover, false);
dropArea.addEventListener("drop", drop, false);
function dragenter(e) {
	
    e.stopPropagation();
    e.preventDefault();
}
function dragover(e) {
	
    e.stopPropagation();
    e.preventDefault();
}
function drop(e) {
	

    e.stopPropagation();
    e.preventDefault();

    
    const file = (e.dataTransfer).files;
    imageReader(file);
}

function imageReader(files) {
	console.log("in handling files");

    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith('image/')){ continue }

        const img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;

        const reader = new FileReader();
        reader.onload = (function(aImg) 
        { return function(e) { 
    aImg.src = e.target.result; 
    imagePath = e.target.result;
    alert('Image Dragged Successfully.');
    var image= '<img src="'+imagePath+'" height="80%" width= "80%" alt="pic">';
      document.getElementById('dragArea').innerHTML = image;
	console.log(imagePath);

		}; 
        })(img);
        reader.readAsDataURL(file);
    }
}

	
    function validateForm(e){
    e.preventDefault();
    var namevalidation = /^[A-Za-z\s]+$/;
    var emailvalidation = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    
    if(name === ""||!namevalidation.test(name)) {
        document.getElementById("name").focus();
        document.getElementById("warningmsg").innerHTML = "Please enter valid name";
        return false;
    }else if(email===""||!emailvalidation.test(email)){
        document.getElementById("email").focus();
        document.getElementById("warningmsg").innerHTML = "Please enter valid email";
        return false;
    }
    else{
          
	var dataObject={
		"name":name,
		"email": email,
		"img":imagePath
        };
    var getdata = getData();
    getdata.push(dataObject);
        // adding data in local storage
        localStorage.setItem('customerDetail', JSON.stringify(getdata));
        alert("Saved!");
        document.getElementById("addCustomer").reset();
        location.reload();
    }
}       

function getData() {
	
    var getdata = new Array;
    var getdata_str = localStorage.getItem('customerDetail');
    if(getdata_str !== null){
        
        getdata = JSON.parse(getdata_str); 
        return getdata;
    }
    
    return getdata; 
}   

(function(){
    display();
   })();

     function display(){
     	
    var datastring = localStorage.getItem('customerDetail');
     
    if(!datastring){
        alert("No data added. Please add new Customer!!");

        return  false;
    }else{
    	//if data exists
        var getdata = JSON.parse(datastring);
        
        var myData = getdata.map((el,index)=>
   
        '<li id="viewlistdata">'+
    '<div class="text" id="'+index+'" onclick ="showThis('+index+')">'+
    '<h3>'+el.name+'</h3>'+
    '<h4>'+el.email+'</h4>'+
    '</div>'+
    '<div class="img">'+
    '<div id="imgcontainer">'+
    '<img src="'+el.img+'" height="80" width="20%" alt="pic" >'+
    '</div>'+
    '</div>'+
    '</li>' 
    );
    
        document.getElementById('viewlist').innerHTML = myData;
    
    }
    
}
function showThis(index){

	    var getDetail =  JSON.parse(localStorage.customerDetail)[index];
  
    var myDetail =
'<div id="detailView">'+
'   <div id="viewdata">'+
'      	<div class="text">'+
' 			<h3>Name:  '+getDetail.name+'</h3>'+'<br><br><br>'+
' 			<h4>Email Id: '+getDetail.email+'</h4>'+
'       </div>'+
'   	<div class="img">'+
'       	<div id="imgcontainer2">'+
'           <img src="'+getDetail.img+'" height="230px" width="40%" alt="pic" >'+
'       	</div>'+
'   	</div>'+
'   </div>'+
'</div>';
    document.getElementById('customerdetail').innerHTML = myDetail;
}
//for searching based on names.
function mySearch(){
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    ul = document.getElementById("viewlist");
    li = ul.getElementsByTagName('li');

    
    for (i = 0; i < li.length; i++) {
        div = li[i].getElementsByTagName("div")[0];
        h3 = div.getElementsByTagName("h3")[0];
        txtValue = h3.textContent || h3.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
		li[i].style.display = "block";
        } else {
		li[i].style.display = "none";
        }
    }
}