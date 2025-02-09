"use client";

import { getMaps } from "@/lib/valorantapi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Callout {
  regionName: string;
  superRegionName: string;
  location: {
    x: number;
    y: number;
  };
}

interface Map {
  uuid: string;
  displayName: string;
  displayIcon: string;
  callouts: Callout[];
  listViewIcon: string;
}

const MapPage = () => {
  const { id } = useParams();
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const fetchMap = async () => {
      if (id) {
        const data = await getMaps();
        const foundMap: Map | undefined = data?.data.find(
          (map: Map) => map.uuid === id
        );
        setMap(foundMap || null);
      }
    };

    fetchMap();
  }, [id]);

  // Determine min/max values for normalization
  const getMinMaxCoordinates = () => {
    if (!map) return { minX: 0, maxX: 1, minY: 0, maxY: 1 };
    const xValues = map.callouts.map((c) => c.location.x);
    const yValues = map.callouts.map((c) => c.location.y);
    return {
      minX: Math.min(...xValues),
      maxX: Math.max(...xValues),
      minY: Math.min(...yValues),
      maxY: Math.max(...yValues),
    };
  };

  const { minX, maxX, minY, maxY } = getMinMaxCoordinates();

  return (
    <>
      {map && (
        <>
          <div className="flex flex-col gap-10 items-center">
            {/* Map Title */}
            <div className="relative flex items-center justify-center">
              {/* Background Image */}
              <Image
                src={map.listViewIcon}
                alt="Map Marker"
                width={400}
                height={300}
                className="z-0 opacity-50 rounded-lg"
              />

              {/* Text (Higher z-index) */}
              <span className="absolute text-white font-valorant text-6xl z-10">
                {map.displayName}
              </span>
            </div>

            {/* Map Container (Relative for Absolute Positioning) */}
            <div className="relative w-[600px] h-[600px]">
              {/* Map Image */}
              <Image
                src={map.displayIcon}
                alt="Map"
                layout="fill"
                objectFit="contain"
                className="z-0 rotate-90"
              />

              {/* Callout Markers */}
              {map.callouts.map((callout, index) => {
                const xPos =
                  ((callout.location.x - minX) / (maxX - minX)) * 100;
                const yPos =
                  ((callout.location.y - minY) / (maxY - minY)) * 100;

                return (
                  <div
                    key={index}
                    className="absolute bg-valoranttext text-white text-xs font-bold px-2 py-1 rounded-full"
                    style={{
                      left: `${xPos}%`,
                      top: `${yPos}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {callout.regionName}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-8"></div>
        </>
      )}
    </>
  );
};

export default MapPage;
