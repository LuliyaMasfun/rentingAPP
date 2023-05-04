import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import {
  add,
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  differenceInDays,
  startOfToday,
  isWithinInterval,
  isBefore,
} from "date-fns";
import Image from "next/image";
import { Fragment, useState } from "react";

const bookings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-11T13:00",
    endDatetime: "2022-05-11T14:30",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-20T09:00",
    endDatetime: "2022-05-20T11:30",
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-20T17:00",
    endDatetime: "2022-05-20T18:30",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-06-09T13:00",
    endDatetime: "2022-06-09T14:30",
  },
  {
    id: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-13T14:00",
    endDatetime: "2022-05-13T14:30",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const today = startOfToday();
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();
  const [isRentable, setIsRentable] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function handleDateClick(date) {
    if (!startDay) {
      setStartDay(date);
    } else if (!endDay) {
      setEndDay(date);
    } else {
      setStartDay(date);
      setEndDay(null);
    }
  }

  function swapDates(startDay, endDay) {
    setStartDay(endDay);
    setEndDay(startDay);
  }

  // const daysBetween = eachDayOfInterval({
  //   start: new Date(startDay),
  //   end: new Date(endDay),
  // });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDaybookings = bookings.filter((booking) =>
    isSameDay(parseISO(booking.startDatetime), startDay)
  );

  return (
    <div className="pt-16 bg-dgray">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 ">
        <div className="md:grid md:grid-cols-1 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <h2 className="text-white text-xs">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-2 text-xs leading-6 text-center text-white">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    {
                      /* detta är style för varje datum i kalender */
                    },
                    "pt-1",
                    "justify-center",
                    "items-center",
                    "rounded-full",
                    "pl-5"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => handleDateClick(day)}
                    className={classNames(
                      isEqual(day, startDay) && "text-white",
                      !isEqual(day, startDay) && isToday(day) && "text-red-500",
                      !isEqual(day, startDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-white",
                      !isEqual(day, startDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",

                      isEqual(day, startDay) && isToday(day) && "bg-red-500",
                      isEqual(day, startDay) &&
                        !isToday(day) &&
                        "bg-yellow-500 rounded-full w-7 pr-10 ",

                      isEqual(day, endDay) &&
                        "bg-yellow-500 rounded-full w-7 pr-2 ",

                      // console.log(
                      //   isWithinInterval(format(day, "yyyy-MM-dd"), {
                      //     start: format(startDay, "yyyy-MM-dd"),
                      //     end: format(endDay, "yyyy-MM-dd"),
                      //   })
                      // ),

                      isEqual(day, startDay) &&
                        isEqual(day, endDay) &&
                        isWithinInterval(format(day, "yyyy-MM-dd"), {
                          start: format(startDay, "yyyy-MM-dd"),
                          end: format(endDay, "yyyy-MM-dd"),
                        }) &&
                        // differenceInDays(endDay, startDay) == 2 &&
                        "bg-white"

                      //   // isBefore(endDay, startDay) && swapDates(startDay, endDay),
                      //   // differenceInDays(endDay, startDay) > 2 &&
                      //   //   setIsRentable(false),
                      //   !isEqual(day, startDay) &&
                      //     !isEqual(day, endDay) &&
                      //     "hover:bg-indigo-500",
                      //   (isEqual(day, startDay) || isToday(day)) &&
                      //     "font-semibold",
                      //   "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1">
                    {bookings.some((booking) =>
                      isSameDay(parseISO(booking.startDatetime), day)
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-300">
              Schedule for{" "}
              <time dateTime={format(today, "yyyy-MM-dd")}>
                {format(today, "MMM dd, yyy")}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDaybookings.length > 0 ? (
                selectedDaybookings.map((booking) => (
                  <Booking booking={booking} key={booking.id} />
                ))
              ) : (
                <p>No booking for today.</p>
              )}
            </ol>
          </section> */}
          <div className="flex justify-center items-center border-none pt-20">
            <button className=" text-lg font-semibold bg-yellows px-10 sm:px-2 sm:w-1/3 rounded-md h-10 mb-10 whitespace-nowrap">
              Make Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Booking({ booking }) {
  const startDateTime = parseISO(booking.startDatetime);
  const endDateTime = parseISO(booking.endDatetime);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <Image
        src={booking.imageUrl}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      />
      <div className="flex-auto">
        <p className="text-gray-900">{booking.name}</p>
        <p className="mt-0.5">
          <time dateTime={booking.startDatetime}>
            {format(startDateTime, "h:mm a")}
          </time>{" "}
          -{" "}
          <time dateTime={booking.endDatetime}>
            {format(endDateTime, "h:mm a")}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
