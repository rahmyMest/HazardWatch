import Swal from "sweetalert2";
import { apiNewHazardReporter } from "../services/auth";

type HazardFormProps = {
  onSuccess: () => void;
};

import React from "react";

export default function HazardForm(props: HazardFormProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      await apiNewHazardReporter(formData);

      props.onSuccess();

      Swal.fire({
        icon: "success",
        title: "Hazard Reported Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Report Hazard",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl">
      <div className="w-full p-8 space-y-6">
        <form onSubmit={handleSubmit}>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />

          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="images"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            multiple
            accept="image/*"
          />

          <input
            type="text"
            id="country"
            name="country"
            value="Ghana"
            className="hidden mt-1 w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />

          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="city"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />

          <input
            type="number"
            step="any"
            id="longitude"
            name="longitude"
            value="0.1734"
            className="hidden mt-1 w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />

          <input
            type="number"
            step="any"
            id="latitude"
            name="latitude"
            value="5.6221"
            className="hidden mt-1 w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />

          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="hazardtype"
          >
            Hazard Type
          </label>
          <select
            id="hazardtype"
            name="hazardtype"
            className="mt-1 block w-full px-3 py-2 mb-4 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="environmental">Environmental</option>
            <option value="noise">Noise</option>
            <option value="accident">Accident</option>
            <option value="flood">Flood</option>
          </select>

          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the hazard here"
            className="mt-1 block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={4}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-[#E6FCF9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Hazard
          </button>
        </form>
      </div>
    </div>
  );
}
