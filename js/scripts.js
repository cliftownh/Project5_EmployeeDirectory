
const gallery = document.getElementById('gallery');
let staff;
let body = document.querySelector('body');
let contain = document.createElement('div');

$(contain).addClass('modal-container');
$(body).append(contain);
$('.search-container').append('<form action="#" method="get" />');
$('form').append('<input type="search" id="search-input" class="search-input" placeholder="Search...">');
$('form').append('<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">');

fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(function (data) {
    staff = data.results;
    return staff.map(function(staff) {
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
      $(name).attr({id:'name', class:'card-name cap'}).html(`${staff.name.first} ${staff.name.last}`);
      $(mail).addClass('card-text').html(staff.email);
      $(city).addClass('card-text cap').html(`${staff.location.city}, ${staff.location.state}`);

      $(gallery).append(card);
      $(card).append(div);
      $(div).append(img);
      $(card).append(info);
      $(info).append(name);
      $(info).append(mail);
      $(info).append(city);

      let modal   = document.createElement('div'),
          btn     = document.createElement('button'),
          mInfo   = document.createElement('div'),
          mImg    = document.createElement('img'),
          mName   = document.createElement('h3'),
          mEmail  = document.createElement('p'),
          mCity   = document.createElement('p'),
          phone   = document.createElement('p'),
          street  = document.createElement('p'),
          bday    = document.createElement('p');
      $(modal).addClass('modal');
      $(btn).attr({type:'button', id:'modal-close-btn', class:'modal-close-btn'}).append('<strong>&times</strong>');
      $(mInfo).addClass('modal-info-container');
      $(mImg).attr({class:'modal-img', src:staff.picture.large, alt:'profile picture'});
      $(mName).attr({id:'name', class:'modal-name cap'}).html(`${staff.name.first} ${staff.name.last}`);
      $(mEmail).addClass('modal-text').html(staff.email);
      $(mCity).addClass('modal-text').html(staff.location.city);
      $(phone).addClass('modal-text').html(staff.cell);
      $(street).addClass('modal-text').html(`${staff.location.street}, ${staff.location.city}, ${staff.location.state}, ${staff.location.postcode}`);
      $(bday).addClass('modal-text').html(`Birthday: ${staff.dob.date}`);

      $(contain).append(modal);
      $(modal).append(btn, mInfo);
      $(mInfo).append(mImg, mName, mEmail, mCity, '<hr>', phone, street, bday);
    })
  })
  .catch(function(error) {
    console.log(error);
  });

const cards = document.getElementsByClassName('card');
const modals = document.getElementsByClassName('modal');

contain.style.display = 'none';
for (let i = 0; i < modals.length; i++) {
  modals[i].style.display = 'none';
}

// gallery.addEventListener('click', (event) => {
//   let clicked = event.target;
//   if (clicked.className === 'card') {
//     console.log(event.target);
//     for (let i = 0; i < cards.length; i++) {
//       if (clicked = cards[i]) {
//         modals[i].style.display = '';
//       }
//     }
//   }
// });
