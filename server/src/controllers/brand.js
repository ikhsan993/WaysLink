const { link,brand } = require('../../models')

exports.getBrand = async (req, res) => {
    try {
        let userId = req.user.id;
        let brands = await brand.findAll({
            where: {
                userId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
    brands = JSON.parse(JSON.stringify(brands));    
    brands = brands.map(item=>{return {
        ...item,
        thumbnail : process.env.FILE_PATH + item.thumbnail, 
        }
    })
        res.send({
            status: 'success',
            data: {
                brands
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

exports.deleteBrand = async (req, res) => {
    try {
        const { id } = req.params
        await brand.destroy({
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