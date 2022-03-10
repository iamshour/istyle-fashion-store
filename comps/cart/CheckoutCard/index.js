export default function CheckoutCard({ balance }) {
	return (
		<div className='checkout-card'>
			<div className='balance'>
				<h1>My total balance</h1>
				<p>${Math.floor(balance)}</p>
			</div>
			<button className='btn btn-medium'>Checkout</button>
		</div>
	)
}
