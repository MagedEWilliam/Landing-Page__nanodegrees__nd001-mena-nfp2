/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll("body > main > section");
const navbarMenu = document.querySelector('#navbar__list');
let menuItems = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * return ready to use menu link
 *
 * @param  {link}  string
 * @param  {label}  string
 * @return {String}
 */
const menuLink = (link, label)=> `<li><a href="#${link}" class="menu__link">${label}</a></li>`;

/**
 * Is Element Visible In Viewport
 * {@link: https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport}
 *
 * @param  {el}  html element
 * @return {Boolean}
 */
function isElementVisibleInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNavMenu = ()=>{
	sections.forEach(section=>{
		navbarMenu.innerHTML += menuLink(section.id, section.getAttribute('data-nav'));
	})
}


// Scroll to anchor ID using scrollTO event
const scrollToSection = () =>{
	menuItems = document.querySelectorAll('.menu__link');
	menuItems.forEach(menuItem =>{
		menuItem.addEventListener('click', event =>{
			// prevent the default behavior
			event.preventDefault();

			// prepare section top position
			let sectionLink = new URL(event.target.href).hash;
			let sectionXPosition = document.querySelector(sectionLink).offsetTop;

			window.scrollTo({top:sectionXPosition, behavior: 'smooth'});
		})
	})
}

// Add class 'active' to section when near top of viewport
const setSectionAsActive = ()=>{

	window.addEventListener('scroll', ()=>{
		// To escape adding active class to multible sections
		// we'll add the active class only to one at a time
		let activeOnce = true;

		menuItems.forEach((menuItem, index)=>{
			let sectionLink = new URL(menuItem.href).hash;
			let section = document.querySelector(sectionLink);
			//if section title visible set section 
			if(activeOnce && isElementVisibleInViewport(section)){
				// add active class to active section and menu link
				section.classList.add('active-section');
				menuItem.classList.add('active');

				// update current url hash to match section position
				let currentUrl= new URL(window.location.href);
				window.history.pushState({}, 
                    document.querySelector('title'),
                    currentUrl.pathname + sectionLink);

				activeOnce = false;
			}else{
				// remove active state from inactive section and menu item
				section.classList.remove('active-section');
				menuItem.classList.remove('active');
			}
		})
	});
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavMenu()

// Scroll to section on link click
scrollToSection()

// Set sections as active
setSectionAsActive()

