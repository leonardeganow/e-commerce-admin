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

export const getDashboardDataAction = async (date) => {

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