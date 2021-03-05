export default class JeuxVideo {
  constructor(id = null, nom = null, plateforme = null, nbExemplairesVendus = null, editeur = null) {
    this.id = id
    this.nom = nom
    this.plateforme = plateforme
    this.nbExemplairesVendus = nbExemplairesVendus
    this.editeur = editeur
  }

  get id() {
    return this._id
  }
  set id(id) {
    this._id = id
    return this
  }

  get nom() {
    return this._nom
  }
  set nom(nom) {
    this._nom = nom
    return this
  }

  get plateforme() {
    return this._plateforme
  }
  set plateforme(plateforme) {
    this._plateforme = plateforme
    return this
  }

  get nbExemplairesVendus() {
    return this._nbExemplairesVendus
  }
  set nbExemplairesVendus(nbExemplairesVendus) {
    this._nbExemplairesVendus = nbExemplairesVendus
    return this
  }

  get editeur() {
    return this._editeur
  }
  set editeur(editeur) {
    this._editeur = editeur
    return this
  }
}