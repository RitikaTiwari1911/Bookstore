const { roles } = require('../roles')

class RoleAuthorization{
    /**
     * grantAccess allows users with certain roles access to the routes
     * roles.can(req.user.role)[action](resource) method determines if the user role's has sufficient permissions to perform the specified action of the provided resource
     * @param {*} action action will have value such as readAny, deleteAny, etc.
     * @param {*} resource resource represents what resource the defined action has permission to operate on
     * @returns 
     */
   grantAccess = (action, resource) =>{
        return async(req, res, next) =>{
            try{
                const permission = roles.can(req.user.role)[action](resource);
                if(!permission.granted){
                    return res.status(403).json({
                        error: "You do not have the permission to perform this action!"
                    })
                }
                next()
            }catch(error){
                    next(error)
                }
            }   
        }
    
        /**
         * allowIfLoggedIn middleware will filter and only grant access to users that are logged in
         * res.locals.loggedInUser variable holds the details of the loggin-in user
         */
        allowIfLoggedin =async(req, res, next) => {
            try{
                const user = res.locals.loggedInUser;
                if(!user)
                return res.status(403).json({
                    error: "You need to be logged in to access this route"
                })
                req.user = user;
                next();
            }catch(error){
                next(error)
            }
        }
}

module.exports = new RoleAuthorization();
