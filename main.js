// call to all Elements
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let search = document.getElementById('search');
let searchbytitle = document.getElementById('searchbytitle');
let searchbycategory = document.getElementById('searchbycategory');
let update = document.getElementById('update');
let delet = document.getElementById('delete');
let mood = 'create';
let temp;
// Get Total price
function GetTotal(){
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        if(total.value != ''){
            total.style.backgroundColor = 'green';
        }    
    }
    else{
        total.innerHTML = ''
        total.style.backgroundColor = ' rgb(187, 9, 9)';
    }

}
// Create Product && Save data in LocalStorage
let Arrayofproduct;

if(localStorage.product != null)
{
    Arrayofproduct = JSON.parse(localStorage.product);
}
else
{
    Arrayofproduct = [];
}
create.onclick = function(){
    let newproduct = {
        title   :title.value.toLowerCase(),
        price   :price.value,
        tax     : taxes.value,
        ad      : ads.value,
        discount:discount.value,
        total   :total.innerHTML,
        count   : count.value,
        category: category.value.toLowerCase()
    };
    console.log(newproduct.count);
    if(
        title.value != '' 
        && price.value != '' 
        && category.value != ''){
        if (mood === 'create')
        {
            // count n time of product 
            if(newproduct.count > 1){
            for(let i = 0; i < newproduct.count; i++)
            {
                Arrayofproduct.push(newproduct);
            }
            }
            else
            {
                Arrayofproduct.push(newproduct);
            }
        }
        else
        {
            Arrayofproduct[temp] = newproduct;
            mood = 'create';
            create.innerHTML = 'Create';
            count.style.display = 'block';
            create.style.backgroundColor = 'rgb(102, 13, 129)';
        }
    }
    else
    {
        ClearData();
    }
    localStorage.setItem('product', JSON.stringify(Arrayofproduct));
    ClearInput();
    ShowData();
}
// Clear data from inputs after Created it
function ClearInput(){
    title.value = '',
    price.value = '',
    taxes.value = '',
    ads.value  = '',
    discount.value = '',
    total.innerHTML = '',
    total.style.backgroundColor = ' rgb(187, 9, 9)',
    count.value = '',
    category.value = ''
}
// read data in output section after clic creat 
function ShowData(){
    let table = '';
    for(let i = 0; i < Arrayofproduct.length; i++)
    {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${Arrayofproduct[i].title}</td>
            <td>${Arrayofproduct[i].price}</td>
            <td>${Arrayofproduct[i].tax}</td>
            <td>${Arrayofproduct[i].ad}</td>
            <td>${Arrayofproduct[i].discount}</td>
            <td>${Arrayofproduct[i].total}</td>
            <td>${Arrayofproduct[i].category}</td>
            <td><button onclick ='updateDataitem(${i})'  id="update">update</button></td>
            <td><button onclick = 'deleteitem(${i})' id="delete">delete</button></td>
        </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    // delete all butun
    let deletall = document.getElementById('deletall');
    if (Arrayofproduct.length > 0)
    {
        deletall.innerHTML = `
        <button onclick = 'deleteall()'>Delete All (${Arrayofproduct.length})</button>
        `
    }
    else
    {
        deletall.innerHTML = '';
    }
    

}
ShowData();
// Delete
function deleteitem(i){
    Arrayofproduct.splice(i, 1);
    localStorage.product = JSON.stringify(Arrayofproduct);
    ShowData();
}
function deleteall(){
    Arrayofproduct.splice(0);
    localStorage.clear();
    ShowData();
}
// Update
function updateDataitem(i){
    title.value = Arrayofproduct[i].title;
    price.value = Arrayofproduct[i].price;
    taxes.value = Arrayofproduct[i].tax;
    ads.value = Arrayofproduct[i].ad;
    discount.value = Arrayofproduct[i].discount ;
    GetTotal();
    count.style.display = 'none';
    category.value = Arrayofproduct[i].category;
    create.innerHTML = 'Update';
    temp = i;
    mood = 'update';
    create.style.backgroundColor = 'darkgreen';
    scroll({
        top:0,
        behavior:"smooth"
    })
   
}
// Search
let searchmood = 'title';
function Searchmood(id){

    if(id == 'searchbytitle')
    {
        searchmood = 'title'
        
    }
    else
    {
        searchmood = 'category'
        search.placeholder = 'Search By Category'
    }
    search.placeholder = 'Search By ' + searchmood;
    search.focus();
    search.value = '';
    ShowData();
}
function Search(value){
    let table = '';
    for(let i = 0; i < Arrayofproduct.length; i++){
        if( searchmood == 'title')
        {
        // search by title
        
            if(Arrayofproduct[i].title.includes(value.toLowerCase()))
                {
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${Arrayofproduct[i].title}</td>
                        <td>${Arrayofproduct[i].price}</td>
                        <td>${Arrayofproduct[i].tax}</td>
                        <td>${Arrayofproduct[i].ad}</td>
                        <td>${Arrayofproduct[i].discount}</td>
                        <td>${Arrayofproduct[i].total}</td>
                        <td>${Arrayofproduct[i].category}</td>
                        <td><button onclick ='updateDataitem(${i})'  id="update">update</button></td>
                        <td><button onclick = 'deleteitem(${i})' id="delete">delete</button></td>
                    </tr>`
            }
        }
        else
        {
            // search by category
            if(Arrayofproduct[i].category.includes(value.toLowerCase()))
            {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${Arrayofproduct[i].title}</td>
                    <td>${Arrayofproduct[i].price}</td>
                    <td>${Arrayofproduct[i].tax}</td>
                    <td>${Arrayofproduct[i].ad}</td>
                    <td>${Arrayofproduct[i].discount}</td>
                    <td>${Arrayofproduct[i].total}</td>
                    <td>${Arrayofproduct[i].category}</td>
                    <td><button onclick ='updateDataitem(${i})'  id="update">update</button></td>
                    <td><button onclick = 'deleteitem(${i})' id="delete">delete</button></td>
                </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
// Clean Data