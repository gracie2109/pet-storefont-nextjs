export const endPoint = {
    // service//

    getListServices:"services/get-all",
    createService:"services/new-service",
    getDetailService:"services/get-service-by-id",
    deleteService:"services/delete",





    // roles//
    getListRoles:"roles/get-roles",
    getDetailRole:"roles/get-role-detail",
    deleteRole:"roles/delete-role",
    createRole: "roles/createRole",

    // permissions //
    getListPermissions:"permissions/get-permissions",


    //pets
    getListPet: "pets/get-all",
    createPet: "pets/new-pets",
    deletePet: "pets/delete-pet",
    updatePet: "pets/edit-pets",

    getListPetWeight: "weight/get-all-weight",
    assignPetWeights: "weight/assign-weights",


    //service and price
    setServicePriceForPet:"services/set-service-price-of-pet",
    serviceOfPet:"services/get-service-of-pet",
    updatePriceOfService:"/services/update-service-of-pet",


    //news
    createNewPost:"news/new-post",
    getListPost:"news/get-all",
    deletePost:"news/delete-post",
    updatePost:"news/edit-post",
    getDetailPost:"news/get-by-id",
    getDetailPostBySlug:"news/get-by-slug",

    //categories
    getListCategories:"categories/get-all-categories",

}