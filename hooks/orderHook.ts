import { fetchOrdersAction, handleOrderStatusChange } from "@/actions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "./use-toast"

const useGetOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => fetchOrdersAction(),
    })
}


const useChangeOrderStatus = (setStatus) => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    return useMutation({
        mutationFn: ({ orderId, orderStatus }: { orderId: string, orderStatus: string }) => handleOrderStatusChange(orderId, orderStatus),
        onSuccess: (status) => {

            setStatus(status?.order?.orderStatus)
            // Refetch orders to reflect the updated status
            queryClient.invalidateQueries({
                queryKey: ["orders",],
            })
            toast({
                title: "Order Management",
                description: "Order status updated successfully!",
            });
        },
        onError: (error) => {
            console.error('Error updating order status:', error)
        },

    })
}





export {
    useGetOrders, useChangeOrderStatus
}