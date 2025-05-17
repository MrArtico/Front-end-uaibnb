import React from 'react';
import RentalList from '../components/rentalList';
import { RentalAdd } from '../components/rentalAdd';

function Rental() {
	return (
		<div>
			<h1>Rental Page</h1>
			<p>Welcome to the rental page!</p>

			<div>
				<RentalAdd/>
		        <RentalList/>
			</div>
		</div>
	);
}

export default Rental;

