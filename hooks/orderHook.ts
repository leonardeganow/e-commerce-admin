import { fetchOrdersAction } from "@/actions"
import { useQuery } from "@tanstack/react-query"

const useGetOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => fetchOrdersAction(),
    })
}





export {
    useGetOrders
}