import {
  FaCar,
  FaMoneyBillWave,
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

interface PullCar {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  journey_start_date: string;
  journey_start_time: string;
  location_start: string;
  location_end: string;
}

export default function ViewPullCarDetails() {
  const car: PullCar = {
    id: "PC001",
    name: "Toyota Innova",
    description:
      "Comfortable 7-seater car perfect for city and long trips, equipped with AC and WiFi.",
    price: 2500,
    capacity: 7,
    journey_start_date: "01/01/2005",
    journey_start_time: "09:00 AM",
    location_start: "Delhi",
    location_end: "Agra",
  };

  return (
    <div className="min-h-screen p-6 bg-zinc-50 flex justify-center items-start">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-3xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-4">
            <FaCar className="text-red-500 text-3xl" />
            <h1 className="text-3xl font-bold text-zinc-900">{car.name}</h1>
          </div>
          <span className="text-sm text-zinc-500">ID: {car.id}</span>
        </div>

        <p className="mb-8 text-zinc-600">{car.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center p-5 bg-zinc-100 rounded-xl shadow hover:shadow-md transition gap-4 ">
            <FaMoneyBillWave className="text-green-500 text-2xl" />
            <div>
              <p className="text-sm text-zinc-500">Price</p>
              <p className="text-lg font-semibold text-zinc-900">
                ₹{car.price}
              </p>
            </div>
          </div>

          <div className="flex items-center p-5 bg-zinc-50 rounded-xl shadow hover:shadow-md transition gap-4">
            <FaUsers className="text-blue-500 text-2xl" />
            <div>
              <p className="text-sm text-zinc-500">Capacity</p>
              <p className="text-lg font-semibold text-zinc-900">
                {car.capacity} Seats
              </p>
            </div>
          </div>

          <div className="flex items-center p-5 bg-zinc-50 rounded-xl shadow hover:shadow-md transition gap-4">
           <FaCalendarAlt className="text-purple-500 text-2xl" />
            <div>
              <p className="text-sm text-zinc-500">Start Date</p>
              <p className="text-lg font-semibold text-zinc-900">
                {car.journey_start_date}
              </p>
            </div>
          </div>

          <div className="flex items-center p-5 bg-zinc-50 rounded-xl shadow hover:shadow-md transition gap-4">
            <FaClock className="text-yellow-500 text-2xl" />
            <div>
              <p className="text-sm text-zinc-500">Start Time</p>
              <p className="text-lg font-semibold text-zinc-900">
                {car.journey_start_time}
              </p>
            </div>
          </div>

          <div className="flex items-center p-5 bg-zinc-50 rounded-xl shadow hover:shadow-md transition gap-4">
            <FaMapMarkerAlt className="text-red-400 text-2xl" />
            <div>
              <p className="text-sm text-zinc-500">From</p>
              <p className="text-lg font-semibold text-zinc-900">
                {car.location_start}
              </p>
            </div>
          </div>

          <div className="flex items-center p-5 bg-zinc-50 rounded-xl shadow hover:shadow-md transition gap-4">
            <FaMapMarkerAlt className="text-green-400 text-2xl" />
            <div>
              <p className="text-sm text-zinc-500">To</p>
              <p className="text-lg font-semibold text-zinc-900">
                {car.location_end}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button className="px-6 py-2 rounded-xl bg-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-300 transition">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
