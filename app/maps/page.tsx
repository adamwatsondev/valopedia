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
    <div className="grid grid-cols-3 gap-20">
      {maps.map((map: maps) => (
        <Link
          className="flex flex-col gap-4 items-center justify-center"
          key={map.uuid}
          href={`/maps/${map.uuid}`}
        >
          <Image
            src={map.splash}
            alt={map.displayName}
            width={400}
            height={400}
          />
          <span className="text-5xl text-white font-valorant">
            {map.displayName}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Maps;
