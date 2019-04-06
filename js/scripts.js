
const gallery = document.getElementById('gallery');
let staff;
let body = document.querySelector('body');
let contain = document.createElement('div');
contain.style.display = 'none';

// Build the search bar
$(contain).addClass('modal-container');
$(body).append(contain);
$('.search-container').append('<form action="#" method="get" />');
$('form').append('<input type="search" id="search-input" class="search-input" placeholder="Search...">');

fetch('https://randomuser.me/api?nat=us&results=12')
  .then(response => response.json())
  .then(function (data) {
    staff = data.results;
    return staff.map(function(staff) {
      // Build the employee cards
      let card = document.createElement('div'),
          div  = document.createElement('div'),
          img  = document.createElement('img'),
          info = document.createElement('div'),
          name = document.createElement('h3'),
          mail = document.createElement('p'),
          city = document.createElement('p');
      $(card).addClass('card');
      $(div).addClass('card-img-container');
      $(img).attr({class:'card-img',
        src:staff.picture.large, alt:'profile picture'});
      $(info).addClass('card-info-container');
      $(name).addClass('card-name cap').html(`${staff.name.first} ${staff.name.last}`);
      $(mail).addClass('card-text').html(staff.email);
      $(city).addClass('card-text cap').html(staff.location.city);

      $(gallery).append(card);
      $(card).append(div);
      $(div).append(img);
      $(card).append(info);
      $(info).append(name);
      $(info).append(mail);
      $(info).append(city);
      // Build the modal windows
      let modal   = document.createElement('div'),
          btn     = document.createElement('button'),
          mInfo   = document.createElement('div'),
          mImg    = document.createElement('img'),
          mName   = document.createElement('h3'),
          mEmail  = document.createElement('p'),
          mCity   = document.createElement('p'),
          phone   = document.createElement('p'),
          street  = document.createElement('p'),
          bday    = document.createElement('p'),
          dob     = new Date(staff.dob.date),
          nav     = document.createElement('div'),
          prev    = document.createElement('button'),
          next    = document.createElement('button');

      $(modal).addClass('modal');
      $(btn).attr({type:'button', class:'modal-close-btn'}).append('<strong>&times</strong>');
      $(mInfo).addClass('modal-info-container');
      $(mImg).attr({class:'modal-img', src:staff.picture.large, alt:'profile picture'});
      $(mName).addClass('modal-name cap').html(`${staff.name.first} ${staff.name.last}`);
      $(mEmail).addClass('modal-text').html(staff.email);
      $(mCity).addClass('modal-text cap').html(staff.location.city);
      $(phone).addClass('modal-text').html(staff.cell);
      $(street).addClass('modal-text cap').html(`${staff.location.street} ${staff.location.state} ${staff.location.postcode}`);
      $(bday).addClass('modal-text').html(`${dob.getMonth()+1}/${dob.getDate()}/${dob.getFullYear()}`);
      $(nav).addClass('modal-btn-container');
      $(prev).attr({type:'button', class:'modal-prev btn'}).html('Prev');
      $(next).attr({type:'button', class:'modal-next btn'}).html('Next');

      $(contain).append(modal);
      $(modal).append(btn, mInfo, nav);
      $(mInfo).append(mImg, mName, mEmail, mCity, '<hr>', phone, street, bday);
      $(nav).append(prev, next);
    })
  })
  .catch(function(error) {
    console.log(error);
  });

const cards = document.getElementsByClassName('card');
const modals = document.getElementsByClassName('modal');
const close = document.getElementsByClassName('modal-close-btn');
const prev = document.getElementsByClassName('modal-prev');
const next = document.getElementsByClassName('modal-next');
let active;

// When any part of a card is clicked,
// the corresponding modal window will pop up
// and the index will be stored in the variable "active"
gallery.addEventListener('click', (event) => {
  let clicked = event.target;
  $(prev[0]).hide();
  $(next[11]).hide();
  for (let i = 0; i < modals.length; i++) {
    $(modals[i]).hide();
  }
  for (let j = 0; j < cards.length; j++) {
    if (clicked === cards[j]) {
      $(contain).show();
      $(modals[j]).show();
      active = j;
    } else if ($(clicked).hasClass('card-img-container')
            || $(clicked).hasClass('card-info-container')) {
            if (clicked.parentNode === cards[j]) {
              $(contain).show();;
              $(modals[j]).show();
              active = j;
            }
    } else if ($(clicked).hasClass('card-img')
            || $(clicked).hasClass('cap')
            || $(clicked).hasClass('card-text')) {
            if (clicked.parentNode.parentNode === cards[j]) {
              $(contain).show();;
              $(modals[j]).show();
              active = j;
            }
    }
  }
});
const input = document.getElementById('search-input');
const nameTags = document.getElementsByClassName('card-name');
let name;
// Only show cards that contain what is in the search bar
function search (event) {
  if (input.value == "") {
    for (let i = 0; i < cards.length; i++) {
      $(cards[i]).show();
    }
  } else {
    for (let j = 0; j < cards.length; j++) {
      $(cards[j]).hide();
    }
    for (let n = 0; n < nameTags.length; n++) {
      name = nameTags[n].textContent;
      if (name.indexOf(input.value.toLowerCase()) > -1) {
          cards[n].style.display = '';
      }
    }
  }
}
contain.addEventListener('click', (event) => {
  let clicked = event.target;
  // Hide the modal if the close button is clicked
  if (clicked.className === 'modal-close-btn' || clicked.tagName === 'STRONG') {
    $(contain).hide();
    for (let i = 0; i < modals.length; i++) {
      $(modals[i]).hide();
    }
  }
  // Switch to the previous modal when "prev" is clicked,
  // unless the current modal is the first one
  if (clicked.classList.contains('modal-prev')) {
    if (active > 0) {
      $(modals[active]).hide();
      $(modals[active - 1]).show();
      active -= 1;
    }
  }
  // Switch to the next modal when "next" is clicked,
  // unless the current modal is the last one
  if (clicked.classList.contains('modal-next')) {
    if (active < 11) {
      $(modals[active]).hide();
      $(modals[active + 1]).show();
      active += 1;
    }
  }
});
// Call the search function when something is typed in the search bar
input.addEventListener('keyup', (event) => {
  search(event);
});
