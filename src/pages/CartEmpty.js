export default function CartEmpty(){
	<div className="container--cart">
					<div className="cart cart--empty">
						<h2>Кошик порожній <icon>😕</icon></h2>
						<p>
							Найімовірніше, ви не замовляли ще піцу.<br />
							Щоб замовити піцу, перейди на головну сторінку.
						</p>
						<picture><source srcset="img/cart-empty.webp" type="image/webp"><img src="img/cart-empty.png" alt="Empty cart" /></picture>
						<a href="/" className="button button--black">
							<span>Повернутися назад</span>
						</a>
					</div>
				</div>
}