"use client";

import React, { useEffect, useState } from "react";
import { getMaps } from "@/lib/valorantapi"; // import the API function
import Image from "next/image";
import Link from "next/link";

interface maps {
  uuid: string;
  displayName: string;
  splash: string;
}

const Maps = () => {
  const [maps, setmaps] = useState<maps[]>([]); // Adjust the type as needed

  useEffect(() => {
    const fetchmaps = async () => {
      const data = await getMaps();
      if (data) {
        setmaps(data.data);
      }
    };

    fetchmaps();
  }, []); // Only run once on component mount

  return (
    <div className="flex flex-col gap-12">
      <span className="text-8xl text-center text-[#0f1923] font-tungsten items-center justify-center">
        Maps
      </span>
      <div className="grid grid-cols-3 gap-10">
        {maps.map((map: maps) => (
          <Link
            className="relative flex items-center justify-center"
            key={map.uuid}
            href={`/maps/${map.uuid}`}
          >
            <Image
              src={map.splash}
              alt={map.displayName}
              width={600}
              height={600}
              className="w-full h-auto border border-valoranttext object-cover rounded-none"
            />
            <span className="absolute text-4xl md:text-7xl text-white font-valorant rounded-lg">
              {map.displayName}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Maps;
