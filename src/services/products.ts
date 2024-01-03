import { tesloApi } from "axiosApi"


export const removeHouse = async (product = {}) => {
    const response = await tesloApi({
        url: "/admin/products",
        method: "DELETE", // si tenemos un _id, entonces actualizar , si no crear
        data: product
    })
    return response;
}