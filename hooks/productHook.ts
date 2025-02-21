import { deleteProductAction, fetchAllProductsAction } from "@/actions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "./use-toast"


const useFetchAllProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => fetchAllProductsAction(),
    })
}

const useDeleteProduct = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ productId }: { productId: string }) => deleteProductAction(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'], exact: true,
            })

            toast({
                title: "Product deleted",
                description: "Product has been successfully deleted.",
            })
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
            })
        }
    })
}

export {
    useDeleteProduct, useFetchAllProducts
}

