'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BandingKriteria extends Model {
    static get table(){
        return "banding_kriteria"
    }

    kBanding(){
        return this.belongsTo("App/Models/Kriteria", "k_banding", "kode")
    }
    kPembanding(){
        return this.belongsTo("App/Models/Kriteria", "k_pembanding", "kode")
    }
}

module.exports = BandingKriteria
