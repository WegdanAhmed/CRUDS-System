var productName = document.getElementById("productName"); //input kolo
var productPrice= document.getElementById("productPrice");
var productTaxes= document.getElementById("productTaxes");
var productAds= document.getElementById("productAds");
var descount= document.getElementById("descount");
var totalPrice= document.getElementById("totalPrice");
var productCount= document.getElementById("count");
var productCategury= document.getElementById("Categury");
var creatProduct = document.getElementById("creatProduct");
var mood='create';
var temp ;
var searchMod = 'title';
//get total fun
function getTotal(){
    if(productPrice.value !=""){
        let result = (Number(productPrice.value ) + Number(productTaxes.value )+ Number(productAds.value )) - Number(descount.value );
        totalPrice.innerHTML =result;
        totalPrice.style.background = 'hsl(120, 95% , 26%)';
        console.log (result);
    }
    else{
        totalPrice.innerHTML="";
        totalPrice.style.background='red';
    }
}
   // creat fun 
   if(localStorage.product != null){
    proData = JSON.parse(localStorage.product);
   }else{
    var proData= [];
   }
    creatProduct.onclick =function(){
        var newProduct ={
           name:  productName.value,
           price: productPrice.value,
           taxes: productTaxes.value,
           ads: productAds.value,
           desc: descount.value,
           total: totalPrice.innerHTML,
           count: productCount.value,
           Categury :productCategury.value,
        }
        // count
         if(mood ==='create'){
            if(newProduct.count>1){
                for(i=0 ;i<newProduct.count;i++){
                    proData.push(newProduct);
                }
              }
              else{
                proData.push(newProduct);
              }
            }
         else{
            proData[temp]=newProduct;
            mood='create';
            count.style.display='block';
            document.getElementById("creatProduct").innerHTML='create';
          }
          //save in local storage 
        localStorage.setItem( 'product' ,JSON.stringify(proData));
        clearInput()
        showData()
    }
    //clear input
    function clearInput(){
        productName.value ="";
        productPrice.value="";
        productTaxes.value="";
        productAds.value="";
        descount.value="";
        totalPrice.innerHTML="";
        productCount.value="";
        productCategury.value="";
    }
//read fun 
function showData(){
    var table ='';
     for(i=0 ;i <proData.length ;i++){
        table+=` <tr>
         <td>${i} </td>
         <td>${proData[i].name}</td>
         <td>${proData[i].price}</td>
         <td>${proData[i].taxes}</td>
         <td>${proData[i].ads}</td>
         <td>${proData[i].desc}</td>
         <td>${proData[i].Categury}</td>
         <td><button onclick="updateData(${i})" id="update">Update</button></td>
         <td><button onclick="deletePro(${i})" id="delete">Delete</button></td>
         </tr> `
     }
    document.getElementById("tbody").innerHTML= table;
    if( proData.length>0 ){
        document.getElementById("btnDeleteAll").innerHTML=`<button onclick="deleteAll()"> Delete All</button>`;
    }
    else{
        document.getElementById("btnDeleteAll").innerHTML='';
        }
}
showData();
//delete fun
function deletePro(i){
    proData.splice(i,1);
    localStorage.product =JSON.stringify(proData);
    showData()
}
function deleteAll(){
 localStorage.clear();
 proData.splice(0);
 showData()
}
// update fun
function updateData(i){
   productName.value =proData[i].name;
   productPrice.value =proData[i].price;
   productTaxes.value =proData[i].taxes;
   productAds.value =proData[i].ads;
   descount.value =proData[i].desc;
   productCategury.value =proData[i].Categury;
   getTotal();
   count.style.display='none';
   document.getElementById("creatProduct").innerHTML='Update';
   mood='update';
   temp=i;
   scroll({
    top : 0 ,
    behavior :'smooth' ,
   });
}
//searchfun
function searchMode(id){
    var searchType =document.getElementById("searchBox");
   if(id =='searchTitle'){
    searchMod = 'title'
      searchType.placeholder='search by title';
   }else{
    searchMod ='categury';
    searchType.placeholder='search by categury';
   }
   searchType.focus();
}

function search(value) {
    let table = '';
    if (searchMod === 'title') {
        for (let i = 0; i < proData.length; i++) {
            if (proData[i].name.toLowerCase().includes(value.toLowerCase())) {
                table += `<tr>
                    <td>${i}</td>
                    <td>${proData[i].name}</td>
                    <td>${proData[i].price}</td>
                    <td>${proData[i].taxes}</td>
                    <td>${proData[i].ads}</td>
                    <td>${proData[i].desc}</td>
                    <td>${proData[i].Categury}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deletePro(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        }
    } else {
        for (let i = 0; i < proData.length; i++) {
            if (proData[i].Categury.toLowerCase().includes(value.toLowerCase())) {
                table += `<tr>
                    <td>${i}</td>
                    <td>${proData[i].name}</td>
                    <td>${proData[i].price}</td>
                    <td>${proData[i].taxes}</td>
                    <td>${proData[i].ads}</td>
                    <td>${proData[i].desc}</td>
                    <td>${proData[i].Categury}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deletePro(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        }
    }

    // Display the filtered table
    document.getElementById("tbody").innerHTML = table;
}


   