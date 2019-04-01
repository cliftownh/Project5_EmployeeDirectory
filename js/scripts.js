// $.ajax({
//   url: 'https://randomuser.me/api/',
//   dataType: 'json',
//   success: function(data) {
//     console.log(data);
//   }
// });
const gallery = document.getElementById('gallery');
let staff;

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
      // img.className  = 'card-img';
      // img.src = staff.picture.large;
      // img.alt = 'profile picture';
      $(info).addClass('card-info-container');
      $(name).attr({id:'name', class:'card-name cap'}).html(`${staff.name.first} ${staff.name.last}`);
      // name.id = 'name';
      // name.className = 'card-name cap';
      $(mail).addClass('card-text').html(staff.email);
      $(city).addClass('card-text cap').html(`${staff.location.city}, ${staff.location.state}`);
      // mail.className = 'card-text';
      // mail.innerHTML = staff.email;
      // city.className = 'card-text cap';
      // city.innerHTML = `${staff.location.city}, ${staff.location.state}`;

      $(gallery).append(card);
      $(card).append(div);
      $(div).append(img);
      $(card).append(info);
      $(info).append(name);
      $(info).append(mail);
      $(info).append(city);

      let contain = document.createElement('div'),
          modal   = document.createElement('div'),
          btn     = document.createElement('button'),
          mInfo   = document.createElement('div'),
          mImg    = document.createElement('img'),
          mName   = document.createElement('h3'),
          mEmail  = document.createElement('p'),
          mCity   = document.createElement('p'),
          phone   = document.createElement('p'),
          bday    = document.createElement('p');
    contain.className = 'modal-container';
    modal.className = 'modal';
    $(btn).attr({type:'button', id:'modal-close-btn', class:'modal-close-btn'}).append('<strong>X</strong>');

    })
  })
  .catch(function(error) {
    console.log(error);
  });



// <div class="modal-container">
//     <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//             <h3 id="name" class="modal-name cap">name</h3>
//             <p class="modal-text">email</p>
//             <p class="modal-text cap">city</p>
//             <hr>
//             <p class="modal-text">(555) 555-5555</p>
//             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//             <p class="modal-text">Birthday: 10/21/2015</p>
//         </div>
//     </div>
