import { getDashboardDataAction } from "@/actions"
import { useQueries } from "@tanstack/react-query"




const useGetDashboardData = (date) => {
    return useQueries({
        queries: [
            { queryKey: ['carddata', date.from, date.to], queryFn: () => getDashboardDataAction(date) }

        ]
    })
}



export {
    useGetDashboardData
}