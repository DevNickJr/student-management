'use client'
import React, { useRef } from "react";
import { ITableColumn } from "@/interfaces"
import Button from "../Button";

interface Props<T = any> { 
  data: T[] 
  columns: ITableColumn[]
  className?: string 
} 



const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = (date: number) => {
  const newDate = new Date(date * 1000); // convert to milliseconds
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  return `${day} ${months[month+1]} ${year}`;
};


const Table = <T extends any>({ data, columns, className }: Props) => {
  const [filtererdData, setFilteredData] = React.useState<null | T[]>(null);
  const [search, setSearch] = React.useState<string>("");

  const handleFilter = () => {
    const value = search;
    const filtered: any = data?.filter((item: any) => {
      return Object.keys(item).some((key) => {
        return item[key]?.toString().toLowerCase().includes(value?.toLowerCase());
      });
    });
    setFilteredData(filtered);
  };

  // const debounce =  (func, wait) => {
  //   let timeout;
  //   return function executedFunction(...args) {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       clearTimeout(timeout);
  //       func(...args);
  //     }, wait);
  //   };
  // };
  
  // const search = debounce(handleFilter, 1000)

  return (
      <div className="overflow-hidden">
        {/* <div className="flex items-center gap-8 w-full mb-8">
         <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="search" className="my-2 w-full border-black/20 md:pl-4 p-2 py-2.5 rounded-lg border-2 outline-none" />
         <Button onClick={handleFilter} className="text-white px-4 sm:px-8 py-2.5 rounded-lg">Search</Button>
        </div> */}
        <div className="overflow-x-auto pb-10 text-sm">
          <table className="min-w-full text-left text-sm font-light table-auto border-collapse rounded-t-lg">
            <thead className="font-normal rounded-t border-l border-r">
              <tr className="bg-[#1B5390] rounded-t-lg"> 
                <th colSpan={4} className="border-none rounded-t-lg">
                  <div className="flex justify-between items-center gap-4 md:gap-8 px-4 py-3 bg-[#1B5390] text-white rounded-t-lg">
                    <span>Registered Courses</span>
                    <div className="flex items-center gap-4">
                      <span>Total Courses: 10</span>
                      <span>Total Units: 29</span>
                    </div>
                  </div>
                </th>
              </tr>
              <tr className="bg-[#ECF5FF]">
                {columns?.map((item, index) => (
                 <th key={index} scope="col" className="px-4 py-3 font-medium whitespace-nowrap border border-primary/90">{item?.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[#737B7B] text-xs md:text-sm">
              {data?.length > 0 ? (filtererdData || data)?.map((item, index) => (
                <tr key={index} className={`text-xs border border-primary ${index % 2 !== 0 && 'bg-[#ECF5FF]'}`}>
                  {columns?.map((column, index) => {
                    // console.log("column", column)
                    if (column?.extra && column?.custom) {
                      return ( 
                        <td key={index} className="whitespace-nowrap px-4 py-3 border border-primary/90">
                          {column?.custom(item[column?.name as keyof T], item)}
                        </td>
                      )
                    } else if (column?.name === "updated_at" || column?.name === "created_at" || column?.name === "created") {
                      return <td key={index} className="whitespace-nowrap px-4 py-3 border border-primary/90">{formatDate(Number(item[column?.name as keyof T]))}</td>
                    }
                    return <td key={index} className="whitespace-nowrap px-4 py-3 border border-primary/90">{item[column?.name as keyof T]}</td>
                  }
                  )}
                </tr>
              )
              ): 
              <tr>
                  <td colSpan={columns?.length} className="text-center py-10">
                    <p className="text-[#737B7B] text-sm">No data found</p>
                  </td>
                </tr>
                }
              {/* {data?.length <= 0  && (
                <tr>
                  <td colSpan={columns?.length} className="text-center py-10">
                    <p className="text-[#737B7B] text-sm">No data found</p>
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </div>
  )
};

export default Table;