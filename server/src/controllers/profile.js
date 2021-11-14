const { user } = require('../../models')

exports.getProfile = async (req, res) => {
    try {
        let id = req.user.id;
        let dataUser = await user.findOne({
        attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
        }, 
            where: {id}
        });
        
        res.send({
            status: 'success',
            data : {
                 name : dataUser.name,
                 email : dataUser.email,
                 id : dataUser.id
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

exports.updateProfile = async (req, res) => {
    try {
        let id = req.user.id;
        
        await user.update(req.body, {
            where: {
                id
            }
        })
        res.send({
            status: 'success',
            message: `Update user id: ${id} finished`,
            data: req.body
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await user.destroy({
            where: {
                id
            }
        })
        res.send({
            status: 'success',
            message: `Delete user id: ${id} finished`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}