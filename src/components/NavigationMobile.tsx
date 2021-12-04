import type { FC, PointerEvent } from "react";
import React, { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";

const SELECTED_VARIANT = "selected";

const DEFAULT_VARIANT = "default";

const VARIANTS = {
  [SELECTED_VARIANT]: {
    fontSize: "1.5rem",
    fontWeight: 500,
    opacity: 1,
  },
  [DEFAULT_VARIANT]: {
    fontSize: "0.75rem",
    fontWeight: 500,
    opacity: 0.4,
  },
};

interface Page {
  id: string;
  title: string;
}

interface Props {
  pages: Page[];
}

export const NavigationMobile: FC<Props> = ({ pages }) => {
  const [items, setItems] = useState(pages);
  const [selectedPageId, setSelectedPageId] = useState(pages[0].id);
  const [visibleSection, setVisibleSection] = useState([0, 2]);
  const dragControl = useDragControls();

  const handlePagination = (page: Page) => {
    const index = items.indexOf(page);
    const endIndex = index + 2;

    setSelectedPageId(page.id);

    if (index === 0) return setVisibleSection([index, endIndex]);

    setVisibleSection([index - 1, endIndex]);
  };

  const getVisibleSection = () => {
    const [start, end] = visibleSection;
    return items.slice(start, end);
  };

  const getSelectedStyle = (page: Page) => {
    return page.id === selectedPageId ? SELECTED_VARIANT : DEFAULT_VARIANT;
  };

  const isSelectedPageTheFirstItem = () => {
    const index = items.findIndex((page) => page.id === selectedPageId);
    return index === 0;
  };

  const isSelectedPageTheLastItem = () => {
    const index = items.findIndex((page) => page.id === selectedPageId);
    return index === items.length - 1;
  };

  return (
    <nav className="flex flex-col gap-1 uppercase">
      <Reorder.Group values={items} onReorder={setItems}>
        {isSelectedPageTheFirstItem() && <div className="text-xs ">&nbsp;</div>}
        {getVisibleSection().map((page) => (
          <Reorder.Item
            key={page.id}
            value={page}
            initial={DEFAULT_VARIANT}
            variants={VARIANTS}
            className="cursor-pointer"
            transition={{ ease: "easeInOut" }}
            animate={getSelectedStyle(page)}
            onClick={() => handlePagination(page)}
            dragListener={false}
            dragControls={dragControl}
          >
            {page.title}
          </Reorder.Item>
        ))}
        {isSelectedPageTheLastItem() && <div className="text-xs ">&nbsp;</div>}
      </Reorder.Group>
    </nav>
  );
};
