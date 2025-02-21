/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchOrdersAction, handleOrderStatusChange, handleRefundAction } from "@/actions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "./use-toast"
import { SetStateAction } from "react"

const useGetOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => fetchOrdersAction(),
    })
}


const useChangeOrderStatus = (setStatus: { (value: SetStateAction<undefined>): void; (arg0: any): void }) => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    return useMutation({
        mutationFn: ({ orderId, orderStatus }: { orderId: string, orderStatus: string }) => handleOrderStatusChange(orderId, orderStatus),
        onSuccess: (status) => {

            setStatus(status?.order?.orderStatus)
            // Refetch orders to reflect the updated status
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            })
            queryClient.invalidateQueries({
                queryKey: ["recentorders"],
            })
            toast({
                title: "Order Management",
                description: "Order status updated successfully!",
            });
        },
        onError: (error) => {
            console.error('Error updating order status:', error)
            toast({
                title: "Order Management",
                description: "an error occurred while updating order",
            });
        },


    })
}


const useRefund = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    return useMutation({
        mutationFn: ({ orderId, refundAmount }: {
            orderId: string, refundAmount: number
        }) => handleRefundAction(orderId, refundAmount),
        onSuccess: () => {
            // Refetch orders to reflect the updated status
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            })
            toast({
                title: "Order Management",
                description: "Order refunded successfully!",
            });
        },
        onError: (error) => {
            console.error('Error refunding order:', error)
            toast({
                title: "Order Management",
                description: "an error occurred while refunding order",
            });
        },
    })
}





export {
    useGetOrders, useChangeOrderStatus, useRefund
}