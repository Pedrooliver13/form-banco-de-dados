const db = require('../../config/db')
const {
    age,
    date
} = require('../../lib/utils')


module.exports = {
    all(callback) {
                //ISSO SERVE PARA QUASE TODOS(lENDO CÓDIGO ABAIXO)
                //seleciona tudo de members ,  e do instructors só o nome ... e muda para instructors_name
                //pega a tabela members
                //Faça a junção da tabela instructors ON (relação das tabelas que vão fazer elas se interligarem
        db.query(`
        SELECT members.*, instructors.name AS instructors_name 
        FROM members
        LEFT JOIN instructors ON (instructors.id = members.instructors_id)
        `, (err, results) => {
            if (err) throw `Database is ERRO ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO members(
            avatar_url,
            name,
            birth,
            email,
            sex,
            blood,
            weight,
            height,
            instructors_id
            ) VALUES($1, $2, $3, $4, $5, $6 , $7 , $8 , $9 )
         RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.sex,
            data.blood,
            data.weight,
            data.height,
            data.instructor
        ]


        db.query(query, values, (err, results) => {
            if (err) throw `Database is error ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
        SELECT members.*, instructors.name AS instructors_name
        FROM members 
        LEFT JOIN instructors ON (members.instructors_id = instructors.id)
        WHERE members.id = $1`, [id], (err, results) => {
            if (err) throw `Database is ERROR ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE members SET
            avatar_url=($1),
            name=($2),
            email=($3),
            sex=($4),
            birth=($5),
            blood=($6),
            weight=($7),
            height=($8),
            instructors_id=($9)
        WHERE id = $10
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.sex,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id,
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database is ERROR ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database is error ${err}`

            callback()
        })
    },
    instructorSelectOption(callback) {
        db.query(`SELECT name,id FROM instructors`, (err, results) => {
            if (err) throw `Database is ${err}`

            callback(results.rows)
        })
    }
}
