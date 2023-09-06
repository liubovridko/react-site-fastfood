import React from "react";

export default function Categories() {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const categories = ["Усі", "М'ясні", "Веган", "Гриль", "Гострі", "Закриті"];
	const onClickCategory = (index) => {
		setActiveIndex(index);
	};
	return (
		<div className="sort__category">
			<ul>
				{categories.map((value, i) => (
					<li
						key={i}
						onClick={() => onClickCategory(i)}
						className={activeIndex == i ? "active" : ""}
					>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
}
