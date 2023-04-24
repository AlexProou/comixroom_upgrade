let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');    
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
}

let cartItem = document.querySelector('.cart-item-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');    
    searchForm.classList.remove('active');
   
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}


let cart ={
    'plus' :2,
    'minus' :2,
};

document.onclick = event => {
    console.log(event.target.classList);
    if(event.target.classList.contains('plus')) {
        plusFunction(event.target.dataset.id);
    }
    if(event.target.classList.contains('minus')) {
        plusFunction(event.target.dataset.id);
    }
}
const plusFunction = id => {
    cart[id]++;
    renderCart();
}

const minusFunction = id => {
    cart[id]--;
    renderCart();
}

const renderCart = () => {
    console.log(cart);
}

renderCart();