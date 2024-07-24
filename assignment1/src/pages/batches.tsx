import React, { useEffect, useState } from "react";

interface ICourse {
  name: string;
  img: string;
  startDate: Date;
  endDate: Date;
  price: number;
  validity: number; //in days
  status: "Published" | "Unpublished";
}
const BatchesPage = () => {
  const [query, setQuery] = useState<string>("");
  const [courses, setCourses] = useState<ICourse[]>(coursesListData);
  const [recordPerPage, setRecordPerPage] = useState<string>("2");
  const [currentPage, setcurrentPage] = useState<number>(1);

  useEffect(() => {
    const newCourses = coursesListData.filter((course) =>
      course.name.toLowerCase().includes(query.toLowerCase())
    );

    setCourses(
      newCourses.slice(
        (currentPage - 1) * Number(recordPerPage),
        Number(recordPerPage) * currentPage
      )
    );
  }, [query, recordPerPage, currentPage]);

  return (
    <div className="min-h-screen bg-[#E2BBE9] flex items-center justify-center">
      <div className="container px-4 flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-[#444B79] text-center">
          Chai aur Code
        </h1>
        <div className="bg-white  px-4 py-6 rounded-md  w-full">
          <h2 className="text-3xl font-bold ">Batches</h2>
          <p className="text-sm text-slate-500">
            Create learner’s batch and share information at the same time.
          </p>
          <div className="my-3 flex gap-2">
            <input
              className="border rounded px-2 py-1"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              type="text"
              placeholder="search.."
            />
            <button className="bg-[#6C6BAF] py-1 px-2 rounded text-white font-medium">
              Search
            </button>
          </div>

          <div className="overflow-auto">
            <table className="w-full batches ">
              <thead>
                <tr className="">
                  <th className=" px-3 py-2">Title</th>
                  <th className="px-3 py-2">Start Date</th>
                  <th className="px-3 py-2">End Date</th>
                  <th className="px-3 py-2">Price</th>
                  <th className="px-3 py-2">Validity/Expiry</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 ">{course.name}</td>
                    <td className="px-3 py-2 ">
                      {course.startDate.toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 ">
                      {course.endDate.toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 ">{course.price}</td>
                    <td className="px-3 py-2 ">{course.validity} days</td>
                    <td className="px-3 py-2 ">{course.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex mt-3 justify-end">
            <div>
              <span> Rows per page:</span>
              <select
                className="border rounded bg-slate-300"
                name=""
                id=""
                value={recordPerPage}
                onChange={(e) => {
                  setRecordPerPage(e.target.value);
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <button
                onClick={() => setcurrentPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="disabled:text-slate-200"
              >
                <i className="bx text-2xl bx-chevron-left"></i>
              </button>
              <button
                onClick={() => setcurrentPage(currentPage + 1)}
                disabled={
                  currentPage * Number(recordPerPage) >= coursesListData.length
                }
                className="disabled:text-slate-200"
              >
                <i className="bx bx-chevron-right text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const coursesListData: ICourse[] = [
  {
    name: "React Development Course",
    img: "https://example.com/react-course.jpg",
    startDate: new Date(2024, 6, 1), // July 1, 2024
    endDate: new Date(2024, 11, 31), // December 31, 2024
    price: 999,
    validity: 365,
    status: "Published",
  },
  {
    name: "Python Programming Course",
    img: "https://example.com/python-course.png",
    startDate: new Date(2024, 5, 15), // June 15, 2024
    endDate: new Date(2025, 4, 14), // May 14, 2025
    price: 799,
    validity: 330,
    status: "Unpublished",
  },
  {
    name: "Data Science Bootcamp",
    img: "https://example.com/data-science.jpg",
    startDate: new Date(2024, 7, 1), // August 1, 2024
    endDate: new Date(2025, 6, 30), // July 30, 2025
    price: 1299,
    validity: 365,
    status: "Published",
  },
];

export default BatchesPage;
