import { DndProvider } from "react-dnd";
import CourseComponent from "../components/course.component";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useCallback, useState } from "react";

const CourseListPage = () => {
  const [coursesList, setcoursesList] = useState(coursesListData);

  const moveCourseItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = coursesList[dragIndex];
      const hoverItem = coursesList[hoverIndex];

      setcoursesList((courses) => {
        const updatedCourseList = [...courses];
        updatedCourseList[dragIndex] = hoverItem;
        updatedCourseList[hoverIndex] = dragItem;
        return updatedCourseList;
      });
    },
    [coursesList]
  );

  // const deleteCourseItem = useCallback((index: number) => {});

  return (
    <div className="min-h-screen bg-[#D2E3C8] flex items-center justify-center">
      <div className="container px-4 flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-[#4F6F52] text-center">
          Chai aur Code
        </h1>
        <div className="bg-white  px-4 py-6 rounded-md  w-full">
          <h2 className="text-3xl font-bold">Manage Bundle</h2>
          <p className="text-slate-500 text-sm">
            Change orders of the products based on priority
          </p>
          <DndProvider backend={HTML5Backend}>
            <div className="overflow-auto ">
              <div className="grid gap-3 mt-4 ">
                {coursesList.map((course, index) => (
                  <CourseComponent
                    index={index}
                    course={course}
                    key={index}
                    moveCourseItem={moveCourseItem}
                  />
                ))}
              </div>
            </div>
          </DndProvider>
        </div>
      </div>
    </div>
  );
};

const coursesListData: {
  name: string;
  image: string;
  free: boolean;
  price?: number;
  type: "Course" | "Mock Test";
}[] = [
  {
    name: "Web Development Bootcamp",
    image:
      "https://images.pexels.com/photos/15835599/pexels-photo-15835599/free-photo-of-shocked-man-holding-his-head.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    free: false,
    price: 999,
    type: "Course",
  },
  {
    name: "Data Structures and Algorithms",
    image:
      "https://images.pexels.com/photos/15835599/pexels-photo-15835599/free-photo-of-shocked-man-holding-his-head.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    free: true,
    type: "Course",
  },
  {
    name: "Full Stack Development Mock Test",
    image:
      "https://images.pexels.com/photos/15835599/pexels-photo-15835599/free-photo-of-shocked-man-holding-his-head.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    free: false,
    price: 49,
    type: "Mock Test",
  },
  {
    name: "Free Coding Challenge",
    image:
      "https://images.pexels.com/photos/15835599/pexels-photo-15835599/free-photo-of-shocked-man-holding-his-head.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    free: true,
    type: "Mock Test",
  },
] as const;

export default CourseListPage;
