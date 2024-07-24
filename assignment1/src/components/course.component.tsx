import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useClickAway } from "@uidotdev/usehooks";

interface ICourse {
  name: string;
  image: string;
  free: boolean;
  price?: number;
  type: "Course" | "Mock Test";
}

const CourseComponent = ({
  course,
  index,
  moveCourseItem,
  deleteCourseItem,
}: {
  course: ICourse;
  index: number;
  moveCourseItem: (dragIndex: number, hoverIndex: number) => void;
  deleteCourseItem: (name: string) => void;
}) => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [{ isDragging }, dragRef] = useDrag({
    type: "course",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "course",
    drop: (item: { index: number }, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const hoverActualY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

        moveCourseItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });
  const ref = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  dragRef(buttonRef);
  dropRef(ref);
  const opacity = isDragging ? 0 : 1;

  const menuButtonRef = useClickAway<HTMLDivElement>(() => {
    setMenuActive(false);
  });
  return (
    <div
      ref={ref}
      style={{ opacity }}
      className=" border rounded-md shadow px-4 py-2 flex flex-wrap gap-4 "
    >
      <div className="flex-1 flex gap-4 items-center">
        <button ref={buttonRef}>
          <i className="bx bx-grid-vertical"></i>
        </button>
        <img
          className="h-12 aspect-video rounded"
          src={course.image}
          alt="img not found"
        />
        <h2 className="flex-1 font-bold">{course.name}</h2>
      </div>
      <div className="flex gap-3 items-center">
        <p className="min-w-24">{course.free ? "Free " : "₹" + course.price}</p>

        <p className=" min-w-24 flex justify-center">
          <span className="bg-green-200 border border-green-500 rounded py-1 px-2 text-xs text-green-600">
            {course.type}
          </span>
        </p>
        <div className="relative " ref={menuButtonRef}>
          <button
            className="min-w-10"
            onClick={() => setMenuActive(!menuActive)}
          >
            <i className="bx bx-dots-vertical-rounded"></i>
          </button>
          {menuActive ? (
            <div className="border rounded p-2  absolute bg-white z-10 min-w-28 flex flex-col items-center gap-1">
              <button
                className="text-sm lex items-center gap-1"
                onClick={() => {
                  setMenuActive(false);
                  index - 1 > 0 ? moveCourseItem(index, index - 1) : null;
                }}
              >
                <i className="bx bx-up-arrow-alt"></i>
                Move Up
              </button>
              <button
                className="text-sm lex items-center gap-1"
                onClick={() => {
                  moveCourseItem(index, index + 1);
                  setMenuActive(false);
                }}
              >
                <i className="bx bx-down-arrow-alt"></i>
                Move Down
              </button>
              <button
                className="text-sm flex items-center gap-1 text-red-500 "
                onClick={() => {
                  deleteCourseItem(course.name);
                  setMenuActive(false);
                }}
              >
                {" "}
                <i className="bx bx-trash-alt"></i> Remove
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
