//request(requisição), tudo que vem do cliente (front - end)
//response(resposta), oque sera devolvido para o cliente
// Princiais métodos HTTP: get("buscar informação"), post("Criar uma Informação"), put("editar uma informação"), delete("deletar uma informação")
// tipos de parâmetros:

//Query params: request.query (Filtros, ordenação, paginação, . . .)
//Route params: request.params (Identificar um recurso na alteração ou remoção)
//body: request.body(Dados para Criação ou Alteração de um registro)

// MongoDB (não-relacional)
// possui 5 métodos Index, Show, Store, Update, Destroy
const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },
    async store (request, response){
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const {name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            
             dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
        return response.json(dev);
    },
    async update( request, response){

       const { github_username, techs, latitude, longitude } = request.body;

       let dev = await Dev.findOne({github_username});

       if(!dev){
           dev = await Dev.update({
               techs,
               latitude,
               longitude,
           })
       }
       return response.json(dev);
    },
    async destroy( request, response){

        const { github_username} = request.query;

        if(!dev){
            await Dev.deleteOne(
                await Dev.findOne({
                    github_username
                }));
        }
        return response.json(dev);
     }

};

