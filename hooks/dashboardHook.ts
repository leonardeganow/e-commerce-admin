import { getDashboardDataAction, getRecentOrdersAction, getSalesOverviewAction, getUserSignUpsActions } from "@/actions"
import { useQueries } from "@tanstack/react-query"




const useGetDashboardData = (date, year) => {

    return useQueries({
        queries: [
            { queryKey: ['carddata', date.from, date.to], queryFn: () => getDashboardDataAction(date) },
            { queryKey: ['saleoverview', 2], queryFn: () => getSalesOverviewAction(year) },
            { queryKey: ['usersignups', 3], queryFn: () => getUserSignUpsActions(year) },
            { queryKey: ['recentorders', 4], queryFn: () => getRecentOrdersAction(), staleTime: 2000 }

        ]
    })
}



export {
    useGetDashboardData
}