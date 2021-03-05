import JeuxVideo from './JeuxVideo.js'
const eltForm = document.querySelector('form')
const eltNom = document.querySelector('#nom')
const eltPlateforme = document.querySelector('#plateforme')
const eltEditeur = document.querySelector('#editeur')
const eltNbExemplairesVendus = document.querySelector('#nb-exemplaires-vendus')
const idJeuxVideo = (new URL(window.location.href)).searchParams.get('id')
const listEltErreur = document.querySelectorAll('small')

// Vérification de l'id
if (idJeuxVideo == null || idJeuxVideo == '' || idJeuxVideo.length != 24) {
  window.location.href = '/'
} else {
  // Récupération du jeux vidéo en bdd
  fetch(`/api/jeux-video/${idJeuxVideo}`)
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
      const nouveauJeuxVideo = new JeuxVideo(data._id, data.nom, data.plateforme, data.nbExemplairesVendus, data.editeur)
      eltNom.value = nouveauJeuxVideo.nom
      eltPlateforme.value = nouveauJeuxVideo.plateforme
      eltEditeur.value = nouveauJeuxVideo.editeur
      eltNbExemplairesVendus.value = nouveauJeuxVideo.nbExemplairesVendus
    })

  eltForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const nom = eltNom.value
    const plateforme = eltPlateforme.value
    const editeur = eltEditeur.value
    const nbExemplairesVendus = eltNbExemplairesVendus.value
  
    const jeuxVideomodifie = {
      nom,
      plateforme,
      editeur,
      nbExemplairesVendus
    }

    fetch(`/api/jeux-video/${idJeuxVideo}`, {
      method: 'PUT',
      body: JSON.stringify(jeuxVideomodifie),
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
        if (confirm('Le jeux vidéo à bien été modifié, revenir à la liste des jeux ?')) {
          return window.location.href = '/pages/jeux-videos.html'
        }
      }
      data.json().then((data) => {
        for (const key in data.errors) {
          document.querySelector(`#erreur-${key}`).innerText = data.errors[key].message
        }
      })
    })
  })
}