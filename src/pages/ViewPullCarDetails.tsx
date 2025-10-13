import { getPullcarById } from "@/service/apiPullcar";
import { useQuery } from "@tanstack/react-query";
import {
  FaCar,
  FaMoneyBillWave,
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bhara.co.in/";

interface PullCar {
  id: number;
  name: string;
  description: string;
  car_details: string;
  price: string;
  capacity: number;
  journey_start_time: string;
  location_start: string;
  location_end: string;
  created_at: string;
  updated_at: string;
  image1?: string | null;
  image2?: string | null;
  image3?: string | null;
  image4?: string | null;
}

export default function ViewPullCarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery<PullCar>({
    queryKey: ["pullcar", id],
    queryFn: () => getPullcarById(id!),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-zinc-600">
        Loading pull car details...
      </div>
    );

  if (isError || !car)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Failed to load car details.
      </div>
    );

  const images = [car.image1, car.image2, car.image3, car.image4]
    .filter(Boolean)
    .map((img) => `${BASE_URL}${img}`);

  return (
    <div className="min-h-screen p-6 bg-zinc-50 flex justify-center items-start">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-3xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-4">
            <FaCar className="text-red-500 text-3xl" />
            <h1 className="text-3xl font-bold text-zinc-900">{car.name}</h1>
          </div>
          <span className="text-sm text-zinc-500">Car ID: #{car.id}</span>
        </div>

        <div className="mb-6">
          <p className="text-zinc-700">{car.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DetailCard
            icon={<FaMoneyBillWave className="text-green-500 text-2xl" />}
            label="Price"
            value={`₹${car.price}`}
          />

          <DetailCard
            icon={<FaUsers className="text-blue-500 text-2xl" />}
            label="Capacity"
            value={`${car.capacity} Seats`}
          />

          <DetailCard
            icon={<FaCalendarAlt className="text-purple-500 text-2xl" />}
            label="Journey Date"
            value={car.journey_start_time}
          />

          <DetailCard
            icon={<FaClock className="text-yellow-500 text-2xl" />}
            label="Journey Time"
            value={car.journey_start_time}
          />

          <DetailCard
            icon={<FaMapMarkerAlt className="text-red-400 text-2xl" />}
            label="From"
            value={car.location_start}
          />

          <DetailCard
            icon={<FaMapMarkerAlt className="text-green-400 text-2xl" />}
            label="To"
            value={car.location_end}
          />

          <DetailCard
            icon={<FaFileAlt className="text-indigo-500 text-2xl" />}
            label="Car Details"
            value={car.car_details}
          />
        </div>

        {images.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-zinc-800 mb-4">
              Car Images
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Car ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-xl bg-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-300 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center p-5 bg-zinc-50 rounded-xl shadow hover:shadow-md transition gap-4">
      {icon}
      <div>
        <p className="text-sm text-zinc-500">{label}</p>
        <p className="text-lg font-semibold text-zinc-900">{value}</p>
      </div>
    </div>
  );
}
