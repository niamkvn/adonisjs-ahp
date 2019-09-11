'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Kriteria extends Model {
    static get table(){
        return "kriteria"
    }

    // bandingKriteria(){
    //     return this.hasMany("App/Models/BandingKriteria")
    // }
}

module.exports = Kriteria
