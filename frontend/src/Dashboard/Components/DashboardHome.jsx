import React from 'react'




import DashboardStatsGrid from '../Stats/DashboardStatsGrid'
import PieChartComponent from '../Stats/CategoryPieChart'

export default function DashboardHome() {
	return (
        <>
		<div className="flex flex-col gap-4">
			
			<PieChartComponent/>
			<DashboardStatsGrid />
			
			
		
			
		
		</div>
        </>
	)
}

     