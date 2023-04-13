let users = document.querySelector('.users')





let  inp = document.querySelector('#inp')
inp.addEventListener('input', ()=>{
let a = inp.value.trim().toLowerCase()
let b = fetch('http://localhost:8005/Search?_page=1&_limit=5')
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



let addList = document.querySelector('.addList')
let modal = document.querySelector('.modal')
let image  =document.querySelector('.img')
let title = document.querySelector('.title')
let year = document.querySelector('.year')
let imdb = document.querySelector('.imdb')
let  type =document.querySelector('.type')
let addMovie = document.querySelector('.addMovie')
let close = document.querySelector('.closeModal')






addList.addEventListener('click',()=>{
  modal.style.display = "block"
})


// todo Добавление новой карточки 




addMovie.addEventListener('click',()=>{
  let b = fetch('http://localhost:8005/Search')
  b.then((res)=>{
    return res.json()
  }).then((data)=>{
  console.log(title.value)
  if(title.value !=''&&year.value!=''&&imdb.value!=''&&type.value!=''&&image.value!='')
  {  
  let objAdd =  {
    "Title": title.value,
    "Year": year.value,
    "imdbID": imdb.value,
    "Type": type.value,
    "Poster": image.value
    
  }
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


// ! delete  card

function deleteCard (id) {
 fetch(`http://localhost:8005/Search/${id}`,{
  method:'DELETE',
  headers:{
    'Content-type':'application/json'
  }
 })
 readMov()
}





const readMov=()=>{
  fetch('http://localhost:8005/Search').then(res=>res.json()).then(data=>{
    users.innerHTML=``;
  data.forEach((elem)=>{
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
      <button onclick= "deleteCard(${elem.id})" class="btn_model_close"></button>
      <button onclick= "editCard(${elem.id})" class="btn_model_edit">EDIT</button>

      `
  })
})

}
readMov()



// ! ================EDIT - CARD=================


let modalEdit = document.querySelector('.modal_block_edit')
let editMovie =document.querySelector('.editMovie')
let closeEdit =document.querySelector('.closeModal_edit')
let image1  =document.querySelector('.img_ed')
let title1 = document.querySelector('.title_ed')
let year1= document.querySelector('.year_ed')
let imdb1= document.querySelector('.imdb_ed')
let  type1 =document.querySelector('.type_ed')


closeEdit.addEventListener('click',()=>{
  modalEdit.style.display ='none'
})


function editCard (index) {
  modalEdit.style.display ='flex'
  additlisChange(index);
  


   editMovie.addEventListener('click',()=>{
    if(title1.value !=''&&year1.value!=''&&imdb1.value!=''&&type1.value!=''&&image1.value!='')
    {  
    let objAdd_ed =  {
      "Title": title1.value,
      "Year": year1.value,
      "imdbID": imdb1.value,
      "Type": type1.value,
      "Poster": image1.value
      
    }
    
    console.log(objAdd_ed);
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
  readMov()
}



// todo пагинация для кажой карточки 


