import React, { useState, useEffect } from 'react'
import InitialLoader from '@bit/vitorbarbosa19.ziro.initial-loader'
import ErrorBoundary from '@bit/vitorbarbosa19.ziro.error-boundary'
import Router from './Router'

export const App = () => {
	const [loading, setLoading] = useState(true)
	setTimeout(function(){ setLoading(false); }, 2000);
	if (loading) return <InitialLoader />
	return (
		<ErrorBoundary>
				<Router isLogged={true} />
		</ErrorBoundary>
	)
}