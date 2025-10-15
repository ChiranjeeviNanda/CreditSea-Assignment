import React from "react";
import { Archive, ChevronRight } from "lucide-react";
import { smartPruneData } from "../utils/dataUtils";
import { formatDeepDetailValue, getCleanLabel } from "../utils/uiUtils";

/**
 * Recursive component for displaying complex, nested JSON data in a user-friendly,
 * collapsible format, automatically handling formatting and empty data pruning.
 */
const NestedDataDisplay = ({ title, data, openByDefault = false }) => {
	// 1. Data Processing
	const prunedData = smartPruneData(data);

	if (
		!prunedData ||
		(typeof prunedData === "object" && Object.keys(prunedData).length === 0)
	) {
		return null;
	}

	const entries = Array.isArray(prunedData)
		? prunedData.map((item, index) => [String(index), item])
		: Object.entries(prunedData);

	const uniqueId = title
		? title.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase() + "-collapse"
		: `nested-data-${Math.random().toString(36).substring(2, 9)}`;

	// Sub-Section Renderer (When title is null - Renders clean list items)
	if (!title) {
		// If the data is an array of primitives, show it simply
		if (
			Array.isArray(prunedData) &&
			entries.every(
				([key, value]) => !(typeof value === "object" && value !== null)
			)
		) {
			const listContent = entries.map(([key, value]) => (
				<li key={key} className="text-sm text-base-content/70">
					- {formatDeepDetailValue(key, value)}
				</li>
			));
			return (
				<ul className="bg-base-200/50 p-3 rounded-lg border border-base-content/10 space-y-1 ml-4 list-disc list-inside">
					{listContent}
				</ul>
			);
		}

		// Complex object/array sub-section rendering
		return (
			<div className="bg-base-100/70 p-4 rounded-lg border border-base-content/10 space-y-3">
				{entries.map(([key, value], index) => {
					const displayKey = getCleanLabel(key);
					const isComplex =
						typeof value === "object" &&
						value !== null &&
						Object.keys(value).length > 0;

					if (isComplex) {
						return (
							<div
								key={key + index}
								className="mt-2 pt-2 border-t border-base-content/10"
							>
								<h4 className="text-base font-bold mb-2 text-secondary flex justify-between items-center">
									<ChevronRight className="size-4 mr-1 text-secondary flex-shrink-0" />
									{displayKey}
									<span className="badge badge-sm badge-ghost opacity-70">
										{Array.isArray(value)
											? `${value.length} Items`
											: "Object"}
									</span>
								</h4>
								<div className="pl-3">
									<NestedDataDisplay
										title={null} // Continue with sub-section style
										data={value}
										openByDefault={false}
									/>
								</div>
							</div>
						);
					}

					// Primitive value display
					return (
						<div
							key={key + index}
							className="flex justify-between py-1.5 text-sm"
						>
							<span className="font-medium text-base-content/70">
								{displayKey}:
							</span>
							<span className="text-right font-semibold text-base-content">
								{formatDeepDetailValue(key, value)}
							</span>
						</div>
					);
				})}
			</div>
		);
	}

	// Main Top-Level Component (When title is present - uses the collapse)
	return (
		<div className="card bg-base-100 shadow-xl border border-base-content/10">
			<div className="collapse collapse-arrow">
				<input
					type="checkbox"
					id={uniqueId}
					defaultChecked={openByDefault}
					className="peer"
				/>

				<label
					htmlFor={uniqueId}
					className={`collapse-title text-xl font-bold bg-base-200/80 text-base-content p-4 transition-all cursor-pointer hover:bg-base-300 rounded-t-lg flex items-center`}
				>
					<Archive className="w-6 h-6 mr-3 text-secondary flex-shrink-0" />
					{title}
				</label>

				{/* Content - Default background and generous padding */}
				<div className="collapse-content bg-base-100 p-6">
					<div className="space-y-4">
						{entries.map(([key, value], index) => {
							const displayKey = getCleanLabel(key);
							const isComplex =
								typeof value === "object" &&
								value !== null &&
								Object.keys(value).length > 0;

							// 1. Handle Complex Data (Objects/Arrays)
							if (isComplex) {
								const isArrayOfObjects =
									Array.isArray(value) &&
									value.length > 0 &&
									typeof value[0] === "object";

								if (isArrayOfObjects) {
									return (
										<div
											key={key + index}
											className="border-t border-base-content/10 pt-4"
										>
											<h3 className="text-xl font-bold mb-3 text-secondary border-b border-base-content/20 pb-2">
												{displayKey}
												<span className="text-base font-normal opacity-70 ml-2">
													({value.length} Records)
												</span>
											</h3>

											{/* Iterate through array items, rendering each as a sub-collapse */}
											<div className="space-y-3 mt-4">
												{value.map(
													(item, itemIndex) => (
														<div
															key={itemIndex}
															className="collapse collapse-arrow bg-base-200 border border-base-content/10"
														>
															<input
																type="checkbox"
																id={`${uniqueId}-${key}-${itemIndex}`}
																className="peer"
															/>
															<label
																htmlFor={`${uniqueId}-${key}-${itemIndex}`}
																className="collapse-title text-base font-semibold text-base-content/80 hover:text-base-content"
															>
																{displayKey.replace(
																	/S$/,
																	""
																)}{" "}
																Details (
																{itemIndex + 1})
															</label>
															<div className="collapse-content p-4">
																<NestedDataDisplay
																	title={null} // Use clean Sub-Section Renderer
																	data={item}
																	openByDefault={
																		false
																	}
																/>
															</div>
														</div>
													)
												)}
											</div>
										</div>
									);
								}

								// Case 2: Simple Nested Object or Array of Primitives
								return (
									<div
										key={key + index}
										className="border-t border-base-content/10 pt-4"
									>
										<h3 className="text-xl font-bold mb-3 text-base-content border-b border-base-content/20 pb-2">
											{displayKey}
										</h3>
										<NestedDataDisplay
											title={null}
											data={value}
											openByDefault={false}
										/>
									</div>
								);
							}

							// 2. Primitive Value
							return (
								<div
									key={key + index}
									className="flex justify-between border-b border-base-content/10 py-2 text-base transition-colors duration-150 hover:bg-base-200/50 rounded-sm px-2"
								>
									<span className="font-semibold text-base-content/80">
										{displayKey}:
									</span>
									<span className="text-right font-extrabold text-base-content">
										{formatDeepDetailValue(key, value)}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NestedDataDisplay;
