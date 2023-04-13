
let addList = document.querySelector('.addList')
let modal = document.querySelector('.modal')
let image  =document.querySelector('.img')
let title = document.querySelector('.title')
let year = document.querySelector('.year')
let imdb = document.querySelector('.imdb')
let  type =document.querySelector('.type')
let desk = document.querySelector('.desk')
let addMovie = document.querySelector('.addMovie')
let close = document.querySelector('.closeModal')
let users = document.querySelector('.users')
let currentPage = 1;
let pageLength = 1;
let prevBtn = document.querySelector('#prevBtn')
let nextBtn = document.querySelector('#nextBtn')
let filterBtns = document.querySelectorAll('.filter_btn')
let filterValue = 'ALL'
let detailsImage = document.querySelector('#detailsImg')
let detailsName = document.querySelector('#modalRight h2')
let detailsYear = document.querySelector('#modalRight h3')
let detailsDesc = document.querySelector('#modalRight p') 
let closeDetails = document.querySelector('#closeBtn')
let modalDetails = document.querySelector('#modal')
let detailsTrailer = document.querySelector('.trailer iframe')
let trailer =document.querySelector('.trailer')

// ! ============= SEARCH ================
let  inp = document.querySelector('#inp')
inp.addEventListener('input', ()=>{
let a = inp.value.trim().toLowerCase()
let b = fetch('http://localhost:8005/Search/')
users.innerHTML = ''
b.then((res)=>{
  return res.json()
}).then((info,)=>{
  if(a!= ''){
  info.forEach((elem,)=>{
    if(elem.Title.toLowerCase().includes(a)){
     console.log(elem.Title)
     users.innerHTML +=`
     <div class="user-n" >
     <img
     src="${elem.Poster}"
      alt="user"
       width="100"/>
     <h5>${elem.Title}</h5>
     <h6> Year : ${elem.Year}</h6>
     <h6>ImdbID :${elem.imdbID}</h6>
     <h6 id ="last">Type :${elem.Type}</h6>
     <button class="btn_model_close"></button>
     `
    }

  })}
  else{
    users.innerHTML =''
    info.forEach((elem)=>{
      users.innerHTML +=`
      <div class="user-n" >
      <img
      src="${elem.Poster}"
       alt="user"
        width="100"/>
      <h5>${elem.Title}</h5>
      <h6> Year : ${elem.Year}</h6>
      <h6>ImdbID :${elem.imdbID}</h6>
      <h6 id ="last">Type :${elem.Type}</h6>
      <button  class="btn_model_close"></button>
      `
    })
  }
}).catch()

})


addList.addEventListener('click',()=>{
  modal.style.display = "block"
})

// todo ============CRUD==============
// ! ============Добавление новой карточки =====


addMovie.addEventListener('click',()=>{
  let b = fetch('http://localhost:8005/Search')
  b.then((res)=>{
    return res.json()
  }).then((data)=>{
  console.log(title.value)
  if(title.value !=''&&year.value!=''&&imdb.value!=''&&type.value!=''&&image.value!=''&&desk.value !='')
  {  
  let objAdd =  {
    "Title": title.value,
    "Year": year.value,
    "imdbID": imdb.value,
    "Type": type.value,
    "Poster": image.value,
    "Desk":desk.value,
    "Trailer":trailer.value
  }
  console.log(objAdd);
  fetch('http://localhost:8005/Search',{
    method:"POST",
    headers:{
      "Content-type":"application/json" 
    },
    body:JSON.stringify(objAdd)
  })
  modal.style.display = 'none'
  readMov()
}
else{
  alert('Заполните поля для ввода данных')
  return
}

})
})



close.addEventListener('click',()=>{
  modal.style.display = 'none '
})


// ! ============ delete  card ============

function deleteCard (id) {
 fetch(`http://localhost:8005/Search/${id}`,{
  method:'DELETE',
  headers:{
    'Content-type':'application/json'
  }
 })
 readMov()
}

// ! =============ADMIN=====
// ! =============LOG IN TO ADMIN============
// ! PASSWORD ==== 1234
let admin =document.querySelector('.admin')
admin.addEventListener('click',()=>{
  let inpPrompt =prompt('ADD PASSWORD')
  console.log(inpPrompt);
  fetch('http://localhost:8005/Admin/').then((res)=>{
    return res.json()
  }).then((info,)=>{
    if(inpPrompt==info.password){
// console.log('Верно');
let obj = {
  "name": "admin",
  "password": "1234",
  "status": "true"
}
console.log(obj);
fetch(`http://localhost:8005/Admin/` , { 
  method:"PATCH", 
  headers:{ 
    "Content-Type": "application/json; charset=utf-8" 
  },   
  body:JSON.stringify(obj ), 
})
document.location.reload()
    }
  })
})
// ! ======LOG OUT FROM ADMIN======
let user = document.querySelector('#user1')
user.addEventListener('click',()=>{
  let obj = {
    "name": "admin",
    "password": "1234",
    "status": "false"
  }
  fetch(`http://localhost:8005/Admin/` , { 
  method:"PATCH", 
  headers:{ 
    "Content-Type": "application/json; charset=utf-8" 
  },   
  body:JSON.stringify(obj ), 
})
document.location.reload()
})


async function Amdin() {
  let res = await fetch('http://localhost:8005/Admin/')
  let data = await res.json()
  if(data.status == 'false'){
    addList.style.display ='none'
    let btns = document.querySelectorAll('.btn_model_edit')
      btns.forEach((elem)=>{
    elem.style.display='none'
  })
    let btns1 = document.querySelectorAll('.btn_model_close')
      btns1.forEach((elem)=>{
    elem.style.display='none'
  })
 
} 
else{
  addList.style.display ='block'
  let btns = document.querySelectorAll('.btn_model_edit')
    btns.forEach((elem)=>{
  elem.style.display='block'
})
  let btns1 = document.querySelectorAll('.btn_model_close')
    btns1.forEach((elem)=>{
  elem.style.display='block'
})
}

 }
 setTimeout( Amdin,300)



// ! READ & SHOW Чтение и отображение
async function readMov(){
    let res = filterValue !== "ALL"? await fetch(`http://localhost:8005/Search?_page=${currentPage}&_limit=5&Type=${filterValue}`) : await fetch(`http://localhost:8005/Search?_page=${currentPage}&_limit=5`)
    let data = await res.json();

//   fetch(`http://localhost:8005/Search?_page=${currentPage}&_limit=5&Type=${filterValue}`).then(res=>res.json()).then(data=>{
    users.innerHTML=``;
    data.forEach((elem)=>{
    users.innerHTML +=`
      <div class="user-n" >
      <img
      src="${elem.Poster}"
       alt="user"
        width="100" onclick="showDetailsModal(${elem.id})"/>
      <h5>${elem.Title}</h5>
      <h6> Year :  ${elem.Year}</h6>
      <h6>ImdbID :${elem.imdbID}</h6>
      <h6 id ="last">Type :${elem.Type}</h6>
      <button onclick= "deleteCard(${elem.id})" class="btn_model_close"></button>
      <button onclick= "editCard(${elem.id})" class="btn_model_edit">EDIT</button>

      `
  });
countPage();
}
readMov();



// ! ================EDIT - CARD=================


let modalEdit = document.querySelector('.modal_block_edit')
let editMovie =document.querySelector('.editMovie')
let closeEdit =document.querySelector('.closeModal_edit')
let image1  =document.querySelector('.img_ed')
let title1 = document.querySelector('.title_ed')
let year1= document.querySelector('.year_ed')
let imdb1= document.querySelector('.imdb_ed')
let  type1 =document.querySelector('.type_ed')
let desk1 = document.querySelector('.desk_ed')
let trailer1 =document.querySelector('.trailer_ed')


closeEdit.addEventListener('click',()=>{
  modalEdit.style.display ='none'
})


function editCard (index) {
  modalEdit.style.display ='flex'
  additlisChange(index);
  


   editMovie.addEventListener('click',()=>{
    if(title1.value !=''&&year1.value!=''&&imdb1.value!=''&&type1.value!=''&&image1.value!=''&& desk1.value!='')
    {  
    let objAdd_ed =  {
      "Title": title1.value,
      "Year": year1.value,
      "imdbID": imdb1.value,
      "Type": type1.value,
      "Poster": image1.value,
      "Desk":desk1.value,
      "Trailer":trailer1.value

    }
    console.log(index);

    fetch(`http://localhost:8005/Search/${index}` , { 
      method:"PATCH", 
      headers:{ 
        "Content-Type": "application/json; charset=utf-8" 
      },   
      body:JSON.stringify(objAdd_ed ), 
      
  })
  

    modalEdit.style.display="none"
    readMov()
  }
  else{
    alert('Заполните поля редактирования ')
    return
  }
    
  })
  
};


// todo отображение данных из карточик  для редактиования 

async function additlisChange(index) {
  let res = await fetch(`http://localhost:8005/Search/${index}`)
  let data =await res.json()
  console.log(data.id);
  title1.value = data.Title
  year1.value = data.Year
  imdb1.value = data.imdbID
  type1.value = data.Type
  image1.value = data.Poster
  desk1.value = data.Desk
  trailer1.value=data.Trailer
  readMov()
}



// todo ================= PAGINATION ===================================== 

async function countPage() {
    let res = await fetch('http://localhost:8005/Search');
    let data = await res.json();
    pageLength = Math.ceil(data.length/5)
}

prevBtn.addEventListener('click', ()=> {
    if(currentPage<=1)return;
    currentPage--;
    readMov();
    console.log(currentPage);
})



nextBtn.addEventListener('click',()=>{
    if(currentPage>=pageLength)return;
    currentPage++;
    readMov();
    console.log(currentPage);
})


// ! =========== FILTER ================
filterBtns.forEach((elem)=>{
    elem.addEventListener('click',()=>{
        filterValue = elem.innerText;
        readMov()
    })
})


// ! ====================== Details - детальное отображение данных =============

async function showDetailsModal(id) {
    console.log(id);
    modalDetails.style.display = "flex";
    let res = await fetch(`http://localhost:8005/Search/${id}`);
    let data = await res.json();
    console.log(data);
    console.log(detailsImage.src);
    detailsImage.src = data.Poster;
    detailsName.innerHTML = data.Title;
    detailsYear.innerHTML = data.Year;
    detailsDesc.innerHTML = data.Desk;
    detailsTrailer.src =data.Trailer
    
  }
  
  closeBtn.addEventListener('click', ()=> {
    modalDetails.style.display = "none";
  })


  

