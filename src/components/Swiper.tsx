import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { FC, ReactElement, useState } from "react";
import React from "react";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const swipeConfidenceThreshold = 10000;

interface Props {
  children: ReactElement[];
}

export const Swiper: FC<Props> = ({ children = [] }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [direction, setDirection] = useState(0);

  return (
    <div className="flex flex-col w-full gap-6 overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <div className="flex flex-row w-full">
          {children.map(
            (element, index) =>
              index === selectedItem && (
                <motion.div
                  key={`slide-${index}`}
                  className="w-full"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      setDirection(1);
                      setSelectedItem(0);
                    } else if (swipe > swipeConfidenceThreshold) {
                      setDirection(-1);
                      setSelectedItem(1);
                    }
                  }}
                >
                  {element}
                </motion.div>
              )
          )}
        </div>
      </AnimatePresence>
      <AnimatePresence>
        <div className="flex gap-4 justify-center items-center">
          {children.map((element, index) =>
            index === selectedItem ? (
              <motion.i
                key={`page-${index}-selected`}
                className="block w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500"
              ></motion.i>
            ) : (
              <motion.i
                key={`page-${index}-unselected`}
                className="block w-2 h-2 rounded-full bg-white opacity-50"
              ></motion.i>
            )
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};
