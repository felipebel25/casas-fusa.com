import { tesloApi } from "axiosApi"


export const removeHouse = async (product = {}) => {
    console.log(product);
    
    const { data } = await tesloApi({
        url: "/admin/products",
        method: "DELETE", // si tenemos un _id, entonces actualizar , si no crear
        data: product
    })
    console.log(data);

    return product;
}