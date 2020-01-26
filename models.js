const { age , date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback){
        db.query(`SELECT * FROM instructors` , function(err , results){
            if(err) return  res.send('Database is error')

            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `
        INSERT INTO instructors (
            name,
            avatar_url,
            sex,
            services,
            birth,
            create_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.sex,
            data.services,
            date(data.birth).iso,
            date(data.create_at).iso,
        ]

        db.query(query, values, function(err , results){
            if(err) return res.send('erro')

            callback(results.rows[0]);
        })
    },
    find(id , callback){
       
        db.query(`SELECT * FROM instructors WHERE id = $1` , [id] , (err ,results) =>{
            if(err) return res.send('Database is erro')

            callback( results.rows[0] )
        })
    },
    update(data, callback){
        const query = `
        UPDATE instructors SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            sex=($4),
            services=($5)
        WHERE id= $6
        ` 
        
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.sex,
            data.services,
            data.id,
        ]
        
        db.query(query, values , function(err , results){
            if(err) throw `DATABASE IS ERRO  ${err}`

            callback()
        })
    },
    delete(id , callback){
        db.query(`DELETE FROM instructors WHERE id= $1` , [id] , (err, results)=>{
            if(err) throw `Database is error ${err}`

            callback()
        })
    }
}
