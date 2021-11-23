import type { FC } from "react";
import React, { useState } from "react";
import { Reorder } from "framer-motion";

const VARIANTS = {
  selected: {
    fontSize: "1.5rem",
    fontWeight: 500,
    opacity: 1,
  },
  default: {
    fontSize: "0.8rem",
    fontWeight: 500,
    opacity: 0.4,
  },
};

interface Props {
  navigationItems?: string[];
  pages?: number;
}

export const NavigationMobile: FC<Props> = ({
  navigationItems = [],
  pages = 3,
}) => {
  const [items, setItems] = useState(navigationItems);

  const handlePagination = (index: number) => {
    const middleIndex = Math.floor(pages / 2);

    if (index === middleIndex) return;

    if (index < middleIndex) {
      const last = items.at(-1);
      if (!last) return;
      const filteredItem = items.filter((element) => element != last);
      return setItems([last, ...filteredItem]);
    }

    const [first, ...rest] = items;
    return setItems([...rest, first]);
  };

  const getVisibleItems = () => {
    return items.slice(0, pages);
  };

  const getSelectedStyle = (index: number) => {
    return index === 1 ? "selected" : "default";
  };

  return (
    <nav className="flex flex-col gap-1 uppercase">
      <Reorder.Group values={items} onReorder={setItems}>
        {getVisibleItems().map((element, index) => (
          <Reorder.Item
            key={element}
            value={element}
            initial="default"
            variants={VARIANTS}
            className="cursor-pointer"
            transition={{ ease: "easeInOut" }}
            animate={getSelectedStyle(index)}
            onClick={() => handlePagination(index)}
            dragListener={false}
          >
            {element}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </nav>
  );
};
