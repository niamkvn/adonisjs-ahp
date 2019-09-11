'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('/ahp/tes', "AhpController.tes")

Route.group("Kriteria routes", ()=>{
    Route.get("form-pembobotan", "KriteriaController.showFormPembobotan").as("kriteria.showFormPembobotan")
    Route.post("pembobotan", "KriteriaController.pembobotan").as("kriteria.pembobotan")
    Route.post("pembobotan/simpan", "KriteriaController.simpanPembobotan").as("kriteria.simpanPembobotan")
}).prefix("kriteria")

Route.group("Api routes", ()=>{
    // Route.get("kriteria", "KriteriaController.index").as("kriteria.index")
    // Route.post("kriteria", "KriteriaController.store").as("kriteria.store")
    
    Route.get("kriteria", "KriteriaController.index").as("kriteria.index")
    Route.post('kriteria', 'KriteriaController.store').as('kriteria.store')
    Route.get('kriteria/:id', 'KriteriaController.edit').as('kriteria.edit')
    Route.put('kriteria/:id', 'KriteriaController.update').as('kriteria.update')
    Route.delete('kriteria/:id', 'KriteriaController.destroy').as('kriteria.destroy')
    
    Route.get("banding-kriteria", "BandingKriteriaController.index").as("banding-kriteria.index")
    Route.post('banding-kriteria', 'BandingKriteriaController.store').as('banding-kriteria.store')
    Route.get('banding-kriteria/:id', 'BandingKriteriaController.edit').as('banding-kriteria.edit')
    Route.put('banding-kriteria/:id', 'BandingKriteriaController.update').as('banding-kriteria.update')
    Route.delete('banding-kriteria/:id', 'BandingKriteriaController.destroy').as('banding-kriteria.destroy')

    Route.get("user", "UserController.index").as("user.index")
    Route.post("user", "UserController.store").as("user.store")

    // Route.post('kategori', 'KategoriController.store').as('kategori.store')
    // Route.get('kategori/:id', 'KategoriController.edit').as('kategori.edit')
    // Route.put('kategori/:id', 'KategoriController.update').as('kategori.update')
    // Route.delete('kategori/:id', 'KategoriController.destroy').as('kategori.destroy')

    
}).prefix("api")
