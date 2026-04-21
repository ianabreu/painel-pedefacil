import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  emptyComponent?: React.ReactNode;
}
export function List<T>({
  items,
  renderItem,
  keyExtractor,
  emptyComponent = null,
}: ListProps<T>) {
  if (items.length === 0) return <>{emptyComponent}</>;

  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={keyExtractor(item, index)}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </>
  );
}
