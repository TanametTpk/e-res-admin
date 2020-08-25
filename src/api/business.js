import axios from 'axios';
import config from '../configs/network';

const createURL = (businessID) => {
    const MENU_URL = `${config.SERVER}/business/${businessID}`
    return MENU_URL
}

export default {

    getBusiness: async () => {
        let res = await axios.get(`${config.SERVER}/business`)
        return res.data
    },

    getProducts: async (businessId) => {
        let res = await axios.get(`${createURL(businessId)}/products`);
        return res.data
    },

    addProduct: async (businessId, name, detail, photo, price) => {
        let product = {
            name,
            detail,
            photo,
            price,
            business: businessId
        }
        let res = await axios.post(`${createURL(businessId)}/products`, product)
        return res.data
    },

    removeProduct: async (businessId, productId) => {
        let res = await axios.delete(`${createURL(businessId)}/products/${productId}`)
        return res.data
    },

    updateProduct: async (businessId, productId, product) => {
        let res = await axios.put(`${createURL(businessId)}/products/${productId}`, product)
        return res.data
    },

    removeAllORder: async (businessId) => {
        let res = await axios.post(`${createURL(businessId)}/orders/removeAll`)
        return res.data
    },

    getOrders: async (businessId, isConfirm) => {
        let confirmOrder = isConfirm ? "?confirm=true" : ""
        let res = await axios.get(`${createURL(businessId)}/orders${confirmOrder}`)
        return res.data
    },

    updateStatusOrder: async (businessId, orderId, status) => {
        let order = {
            status
        }
        let res = await axios.put(`${createURL(businessId)}/orders/${orderId}`, order)
        return res.data
    },

    getZones: async (businessId) => {
        let res = await axios.get(`${createURL(businessId)}/zones`)
        return res.data
    },

    createZone: async (businessId, name, detail) => {
        let zone = {name, detail, business: businessId}
        let res = await axios.post(`${createURL(businessId)}/zones`, zone)
        return res.data
    },

    updateZone: async (businessId, zoneId, zone) => {
        let res = await axios.put(`${createURL(businessId)}/zones/${zoneId}`, zone)
        return res.data
    },

    removeZone: async (businessId, zoneId) => {
        let res = await axios.delete(`${createURL(businessId)}/zones/${zoneId}`)
        return res.data
    },

    getZoneBilling: async (businessId, zoneId) => {
        let res = await axios.get(`${createURL(businessId)}/zones/${zoneId}/billing`)
        return res.data
    },

}