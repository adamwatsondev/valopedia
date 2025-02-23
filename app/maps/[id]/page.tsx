"use client";

import { getMaps } from "@/lib/valorantapi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { mapDescriptions } from "@/data/descriptions";

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

  // Find map description by displayName
  const mapDescription = mapDescriptions.find(
    (desc) => desc.displayName === map?.displayName
  );

  return (
    <>
      {map && mapDescription && (
        <>
          <div className="flex flex-col gap-10 items-center">
            {/* Map Title */}
            <div className="relative rounded-xl flex items-center justify-center">
              {/* Background Image */}
              <Image
                src={map.listViewIcon}
                alt="Map Marker"
                width={800}
                height={600}
                className="z-0 blur-sm rounded-lg"
              />

              {/* Text (Higher z-index) */}
              <span className="absolute text-white uppercase font-tungsten text-8xl z-10">
                {map.displayName}
              </span>
            </div>

            {/* Description */}
            <span className="text-[#0f1923] text-center text-3xl font-tungsten">
              {mapDescription.description}
            </span>

            {/* Map Container (Relative for Absolute Positioning) */}
            <span className="text-[#0f1923] text-6xl font-tungsten">
              Map & Callouts
            </span>
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

          {/* Image Carousel for the Map */}
          <div className="flex flex-col items-center justify-center pt-10 gap-8">
            <span className="text-[#0f1923] text-center text-6xl font-tungsten">
              Gallery
            </span>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl h-full"
            >
              <CarouselContent>
                {mapDescription.images?.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Image
                        src={image}
                        alt={`Map Image ${index + 1}`}
                        width={1000}
                        height={600}
                        className="border min-h-[500px] border-valoranttext rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </>
      )}
    </>
  );
};

export default MapPage;
