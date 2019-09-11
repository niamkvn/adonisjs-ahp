 'use strict'

const Schema = use('Schema')

class BobotKriteriaSchema extends Schema
{
    up()
    {
        this.create('bobot_kriteria', (table) => {
        
            table.engine ('InnoDB')
            table.increments('id').notNullable()
            table.float('bobot').notNullable().defaultTo('0')
            table.integer('kriteria_id').unsigned().notNullable()
            table.integer('user_id').unsigned().notNullable()

            table.index(["kriteria_id"], 'fk_bobot_kriteria_kriteria2_idx')

            table.index(["user_id"], 'fk_bobot_kriteria_users2_idx')
            table.timestamps()


            table.foreign('kriteria_id', 'fk_bobot_kriteria_kriteria2_idx')
                .references('id').on('kriteria')
                .onDelete('no action')
                .onUpdate('no action')

            table.foreign('user_id', 'fk_bobot_kriteria_users2_idx')
                .references('id').on('users')
                .onDelete('no action')
                .onUpdate('no action')
        })
    }

    
     down()
     {
       this.drop('bobot_kriteria')
     }
}

module.exports = BobotKriteriaSchema
