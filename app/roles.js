const accessControl = require('accesscontrol')
const ac = new accessControl()

exports.roles = ()=>{
    ac.grant('user')
        .readAny('profile')
        .updateOwn('profile')
        .deleteOwn('profile')

    ac.grant('admin')
        .extend('user')
        .updateAny('profile')
        .deleteAny('profile')   
    
    return ac;
}