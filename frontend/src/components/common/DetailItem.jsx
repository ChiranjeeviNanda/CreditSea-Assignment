import React from "react";

/**
 * Reusable component for displaying a single detail item with an icon, title, and value.
 */
const DetailItem = ({
	icon: Icon,
	title,
	value,
	detail,
	colorClass = "text-primary",
}) => (
	<div className="flex items-center p-3 bg-base-100 rounded-lg border border-base-content/10 shadow-sm">
		<Icon className={`size-6 ml-2 mr-4 ${colorClass} flex-shrink-0`} />
		<div className="flex flex-col">
			<span className="text-xs font-semibold uppercase text-base-content/60">
				{title}
			</span>
			<span className="text-lg font-mono text-base-content">{value}</span>
			<span className="text-xs text-base-content/40 mt-0.5">
				{detail}
			</span>
		</div>
	</div>
);

export default DetailItem;
