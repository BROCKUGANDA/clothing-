/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('bg-header'); else header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER HOME ===============*/
let homeSwiper = new Swiper(".home__swiper", {
    spaceBetween: 30,
    loop: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollY = window.pageYOffset

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true,
})

sr.reveal(`.home__data`)
sr.reveal(`.home__video`, {delay: 300})
sr.reveal(`.home__images`, {delay: 500})
sr.reveal(`.new__card, .products__card`, {interval: 100})
sr.reveal(`.collection__data, .collection__images`, {interval: 100})

/*=============== CART ===============*/
const cartShop = document.getElementById('cart-shop'),
      cart = document.getElementById('cart'),
      cartClose = document.getElementById('cart-close')

/* Cart show */
if(cartShop){
    cartShop.addEventListener('click', () =>{
        cart.classList.add('show-cart')
    })
}

/* Cart hidden */
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cart.classList.remove('show-cart')
    })
}

/*=============== ADD TO CART ===============*/
const products = [
    {
        id: 1,
        name: 'Leather Jacket',
        price: 890,
        image: 'assets/img/clothing-1.png'
    },
    {
        id: 2,
        name: 'Silk Blouse',
        price: 450,
        image: 'assets/img/clothing-2.png'
    },
    {
        id: 3,
        name: 'Cashmere Coat',
        price: 1250,
        image: 'assets/img/clothing-3.png'
    },
    {
        id: 4,
        name: 'Signature Blazer',
        price: 780,
        image: 'assets/img/clothing-1.png'
    },
    {
        id: 5,
        name: 'Classic Oxford Shirt',
        price: 320,
        image: 'assets/img/clothing-2.png'
    },
    {
        id: 6,
        name: 'Premium Denim',
        price: 450,
        image: 'assets/img/clothing-3.png'
    },
    {
        id: 7,
        name: 'Luxury Scarf',
        price: 280,
        image: 'assets/img/clothing-4.png'
    }
]

let cartItems = []

function addToCart(productId) {
    const product = products.find(p => p.id === productId)
    if(product) {
        const existingItem = cartItems.find(item => item.id === productId)
        if(existingItem) {
            existingItem.quantity++
        } else {
            cartItems.push({
                ...product,
                quantity: 1
            })
        }
        updateCart()
    }
}

function updateCart() {
    const cartContainer = document.querySelector('.cart__container')
    const cartPricesItem = document.querySelector('.cart__prices-item')
    const cartPricesTotal = document.querySelector('.cart__prices-total')
    
    cartContainer.innerHTML = ''
    let total = 0
    let itemsCount = 0

    cartItems.forEach(item => {
        total += item.price * item.quantity
        itemsCount += item.quantity

        cartContainer.innerHTML += `
            <div class="cart__card">
                <div class="cart__box">
                    <img src="${item.image}" alt="cart image" class="cart__img">
                </div>

                <div class="cart__details">
                    <h3 class="cart__title">${item.name}</h3>
                    <span class="cart__price">$${item.price}</span>
                </div>

                <div class="cart__amount-content">
                    <div class="cart__amount-box">
                        <i class="ri-subtract-line cart__amount-trash" onclick="updateQuantity(${item.id}, -1)"></i>
                    </div>

                    <span class="cart__amount">${item.quantity}</span>

                    <div class="cart__amount-box">
                        <i class="ri-add-line cart__amount-trash" onclick="updateQuantity(${item.id}, 1)"></i>
                    </div>
                </div>
            </div>
        `
    })

    cartPricesItem.textContent = `${itemsCount} items`
    cartPricesTotal.textContent = `$${total.toFixed(2)}`
}

function updateQuantity(productId, change) {
    const item = cartItems.find(item => item.id === productId)
    if(item) {
        item.quantity += change
        if(item.quantity <= 0) {
            cartItems = cartItems.filter(item => item.id !== productId)
        }
        updateCart()
    }
}

// Add click event listeners to all product buttons
document.querySelectorAll('.products__button').forEach((button, index) => {
    button.addEventListener('click', () => {
        addToCart(products[index].id)
        cart.classList.add('show-cart')
    })
})
