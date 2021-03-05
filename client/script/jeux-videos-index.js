import JeuxVideo from './JeuxVideo.js'
const myListe = document.querySelector('#myListe')
const eltForm = document.querySelector('form')
const eltNom = document.querySelector('#nom')
const eltPlateforme = document.querySelector('#plateforme')
const eltEditeur = document.querySelector('#editeur')
const eltNbExemplairesVendus = document.querySelector('#nb-exemplaires-vendus')
const listEltErreur = document.querySelectorAll('small')

function insererNouveauJeuxVideo(nouveauJeuxVideo) {
  myListe.insertAdjacentHTML('afterbegin', `
    <tr id="jv-${nouveauJeuxVideo.id}">
      <td>${nouveauJeuxVideo.id}</td>
      <td>${nouveauJeuxVideo.nom}</td>
      <td>${nouveauJeuxVideo.plateforme}</td>
      <td>${nouveauJeuxVideo.editeur}</td>
      <td>${nouveauJeuxVideo.nbExemplairesVendus}</td>
      <td><a href="/pages/modifier-jeux-video.html?id=${nouveauJeuxVideo.id}" class="btn btn-warning">Modifier</a></td>
      <td><a class="btn btn-danger">Supprimer</a></td>
    </tr>
  `)
  myListe.querySelector('tr:first-child a.btn-danger').addEventListener('click', () => {
    supprimer(nouveauJeuxVideo.id)
  })
}

// Suppréssion d'un jeux vidéo
function supprimer(id) {
  if (confirm('êtes vous sur de vouloir supprimer ?')) {
    fetch(`/api/jeux-video/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .catch((err) => {
        alert(err)
      })
      .then((data) => {
        if (data.ok) {
          myListe.querySelector(`#jv-${id}`).remove()
          return
        }
        data.json().then((data) => {alert(data.message)})
      })
  }
}

// Récupération des jeux vidéos en bdd et insertion dans le tableau
fetch('/api/jeux-video')
  .catch((err) => {
    alert(err)
  })
  .then((data) => {
    if (data.ok) {
      return data.json()
    }
    data.json().then((data) => {alert(data.message)})
  })
  .then((data) => {
    data.forEach(jeuxVideo => {
      const nouveauJeuxVideo = new JeuxVideo(jeuxVideo._id, jeuxVideo.nom, jeuxVideo.plateforme, jeuxVideo.nbExemplairesVendus, jeuxVideo.editeur)
      insererNouveauJeuxVideo(nouveauJeuxVideo)
    })
  })

// Envoie du nouveau jeux vidéo depuis le formulaire
eltForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const nom = eltNom.value
  const plateforme = eltPlateforme.value
  const editeur = eltEditeur.value
  const nbExemplairesVendus = eltNbExemplairesVendus.value

  const nouveauJeuxVideo = {
    nom,
    plateforme,
    editeur,
    nbExemplairesVendus
  }

  fetch('/api/jeux-video', {
    method: 'POST',
    body: JSON.stringify(nouveauJeuxVideo),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .catch((err) => {
      alert(err)
    })
    .then((data) => {
      listEltErreur.forEach(element => {
        element.innerText = ''
      })
      if (data.ok) {
        return data.json()
      }
      data.json().then((data) => {
        for (const key in data.errors) {
          document.querySelector(`#erreur-${key}`).innerText = data.errors[key].message
        }
      })
    })
    .then((data) => {
      if (data != undefined) {
        const nouveauJeuxVideo = new JeuxVideo(data._id, data.nom, data.plateforme, data.nbExemplairesVendus, data.editeur)
        insererNouveauJeuxVideo(nouveauJeuxVideo)
        eltNom.value = ''
        eltPlateforme.value = ''
        eltEditeur.value = ''
        eltNbExemplairesVendus.value = ''
      }
    })
})