
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Header() {
	const navigate = useNavigate()

	return (
		<div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
			
			<div className="flex mx-auto gap-2 mr-14 p-4">
			<Link
                  to="/"
                  className="text-white bg-green-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-4 py-2 focus:outline-none"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
               Go To HomePage
                </Link>
				
				
			
			</div>
		</div>
	)
}
