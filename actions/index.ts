/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEV_SERVER_URL } from "@/app/constants";
import axios from "axios";


export const fetchOrdersAction = async () => {
    const response = await axios.get(
        `${DEV_SERVER_URL}/order/getorders`
    );
    if (response.status === 200) {
        return response.data.orders;
    }
};

export const getDashboardDataAction = async (date: { from: any; to: any; }) => {

    const response = await axios.post(
        `${DEV_SERVER_URL}/dashboard/getanalytics`
        , {
            startDate: date.from,
            endDate: date.to,
        }
    );

    if (response.status === 200) {
        return response.data;
    }
}
export const getSalesOverviewAction = async (year: string) => {

    const response = await axios.post(
        `${DEV_SERVER_URL}/dashboard/salesoverview`
        , { year }
    );

    if (response.status === 200) {
        return response.data;
    }
}
export const getUserSignUpsActions = async (year: string) => {

    const response = await axios.post(
        `${DEV_SERVER_URL}/dashboard/usersignups`
        , { year }
    );

    if (response.status === 200) {
        return response.data;
    }
}
export const getRecentOrdersAction = async () => {

    const response = await axios.get(
        `${DEV_SERVER_URL}/dashboard/getrecentorders`
    );

    if (response.status === 200) {
        return response.data;
    }
}

export const handleOrderStatusChange = async (orderId: string, orderStatus: string) => {
    const response = await axios.post(
        `${DEV_SERVER_URL}/order/changeorderstatus`,
        {
            orderId, orderStatus
        }
    );

    if (response.status === 200) {
        return response.data;
    }
}

export const handleRefundAction = async (orderId: string, refundAmount: number) => {
    const response = await axios.post(
        `${DEV_SERVER_URL}/order/refundorder`,
        {
            orderId, refundAmount
        }
    );

    if (response.status === 200) {
        return response.data;
    }
}


export const deleteProductAction = async (productId: string ) => {
    const response = await axios.delete(
        `${DEV_SERVER_URL}/product/products/${productId}`
    );
    if (response.status === 200) {
        return response.data;
    }
}



export const fetchAllProductsAction = async () => {
    const response = await axios.get(
        `${DEV_SERVER_URL}/product/products/allproducts`
    );
    if (response.status === 200) {
        return response?.data?.productsWithCategoryNames;
    }
}