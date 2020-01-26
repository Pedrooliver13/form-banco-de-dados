const { age , date } = require('../../lib/utils')//arquivo de logica de ano e idade
const Instructors = require('../models/instructors')

module.exports = {
    index(req, res){
        Instructors.all(function(instructors){
            return res.render('instructors/index' , { instructors })
        })
    },
    show(req , res){
       Instructors.find(req.params.id , function(instructor){
            if(!instructor) return res.send("Instructors is not found")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(',')
            instructor.create_at = Intl.DateTimeFormat('pt-BR').format(instructor.create_at)

           return res.render('instructors/show' , { instructor })
       })
    },
    create(req , res){
        return res.render('instructors/create')
    },
    post(req , res){
        const keys = Object.keys(req.body)

        for(const key of keys){
            if(req.body[key] == "") return res.send('Please, fill all fields!')
        }

       Instructors.create(req.body , (instructor)=>{
           return res.redirect(`/instructors/${ instructor.id }`)
       })
    },
    edit(req, res) {
        Instructors.find(req.params.id, (instructor) =>{
            instructor.birth = date(instructor.birth).iso
            
            return res.render('instructors/edit' , { instructors: instructor })
        })
    },
    put(req, res) {
        Instructors.update(req.body , ()=>{
            return res.redirect(`instructors/${ req.body.id }`)
        })
    },
    delete(req, res){
        Instructors.delete(req.body.id , ()=>{
            return res.redirect('/instructors')
        })
    }
}
