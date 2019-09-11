 'use strict'

const Schema = use('Schema')

class BandingKriteriaSchema extends Schema
{
    up()
    {
        this.create('banding_kriteria', (table) => {
        
            table.engine ('InnoDB')
            table.increments('id').notNullable()
            table.float('nilai').notNullable().defaultTo('0')
            table.integer('user_id').unsigned().notNullable()
            table.string('k_banding', 45).collate('utf8_unicode_ci').notNullable()
            table.string('k_pembanding', 45).collate('utf8_unicode_ci').notNullable()

            table.index(["k_banding"], 'fk_banding_kriteria_kriteria1_k_banding')

            table.index(["k_pembanding"], 'fk_banding_kriteria_kriteria2_k_pembanding')

            table.index(["user_id"], 'fk_banding_kriteria_users1_idx')
            table.timestamps()


            table.foreign('user_id', 'fk_banding_kriteria_users1_idx')
                .references('id').on('users')
                .onDelete('no action')
                .onUpdate('no action')

            table.foreign('k_banding', 'fk_banding_kriteria_kriteria1_k_banding')
                .references('kode').on('kriteria')
                .onDelete('no action')
                .onUpdate('no action')

            table.foreign('k_pembanding', 'fk_banding_kriteria_kriteria2_k_pembanding')
                .references('kode').on('kriteria')
                .onDelete('no action')
                .onUpdate('no action')
        })
    }

    
     down()
     {
       this.drop('banding_kriteria')
     }
}

module.exports = BandingKriteriaSchema
