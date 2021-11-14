const { link,brand } = require('../../models')

exports.addLink = async (req,res) => {
    try {
        let userId = req.user.id;
        const thumbnail = req.file.filename;
        const title = req.body.title;
        const description = req.body.description;
        const  brands = await brand.create({title,thumbnail,userId,description})

        const brandId = brands.id;

        const facebook = req.body.facebook;
        const twitter = req.body.twitter;
        const instagram = req.body.instagram;
        const youtube = req.body.youtube;
        const whatsapp = req.body.whatsapp;

        const  links = await link.create({facebook,twitter,instagram,youtube,whatsapp,brandId})
        
        res.send({
            status: 'success',
            message: 'Add link success',
            data :{
            brands :{
              brands, 
            },
            links :{
                links
            }
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getLink = async (req, res) => {
    try {
        const { id } = req.params
        let data = await link.findOne({
            where: {
                brandId : id
            },
            include: 
        {
          model: brand,
          as: "brand",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
        },
        attributes: {
        exclude: ["createdAt", "updatedAt","id"]
      },
        });
        data = JSON.parse(JSON.stringify(data));  
        data = {...data,
                thumbnail : process.env.FILE_PATH + data.brand.thumbnail
            }
        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateLink = async (req, res) => {
   try {
        let {id} = req.params;
        let userId = req.user.id;
        const thumbnail = req.file.filename;
        const title = req.body.title;
        const description = req.body.description;
        const  brands = await brand.update({title,thumbnail,userId,description},
            {where : {id}})

        const facebook = req.body.facebook;
        const twitter = req.body.twitter;
        const instagram = req.body.instagram;
        const youtube = req.body.youtube;
        const whatsapp = req.body.whatsapp;

        const  links = await link.update({facebook,twitter,instagram,youtube,whatsapp},
            {where :{brandId:id}})
        
        res.send({
            status: 'success',
            message: 'Update link success',
            data :{
            brands :{
              brands, 
            },
            links :{
                links
            }
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}


exports.deleteLink = async (req, res) => {
    try {
        const { id } = req.params
        await link.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            data :{
                id
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}