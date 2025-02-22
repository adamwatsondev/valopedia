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

interface MapDescription {
  displayName: string;
  description: string;
  images?: string[];
}

const mapDescriptions: MapDescription[] = [
  {
    displayName: "Ascent",
    description:
      "An open playground for small wars of position and attrition divide two sites on Ascent. Each site can be fortified by irreversible bomb doors; once they’re down, you’ll have to destroy them or find another way. Yield as little territory as possible.",
    images: [
      "/images/ascent/one.webp",
      "/images/ascent/two.jpg",
      "/images/ascent/three.jpg",
      "/images/ascent/four.jpg",
      "/images/ascent/five.webp",
    ],
  },
  {
    displayName: "Bind",
    description:
      "Two sites. No middle. Gotta pick left or right. What’s it going to be then? Both offer direct paths for attackers and a pair of one-way teleporters make it easier to flank.",
    images: [
      "/images/bind/one.jpg",
      "/images/bind/two.png",
      "/images/bind/three.jpg",
      "/images/bind/four.avif",
      "/images/bind/five.webp",
      "/images/bind/six.webp",
    ],
  },
  {
    displayName: "Haven",
    description:
      "Beneath a forgotten monastery, a clamour emerges from rival Agents clashing to control three sites. There’s more territory to control, but defenders can use the extra real estate for aggressive pushes.",
    images: ["/images/ascent/one.jpg", "/images/ascent/two.jpg"],
  },
  {
    displayName: "Sunset",
    description:
      "A disaster at a local kingdom facility threatens to engulf the whole neighborhood. Stop at your favorite food truck then fight across the city in this traditional three lane map.",
    images: ["/images/ascent/one.jpg", "/images/ascent/two.jpg"],
  },
  {
    displayName: "Icebox",
    description:
      "Your next battleground is a secret Kingdom excavation site overtaken by the arctic. The two plant sites protected by snow and metal require some horizontal finesse. Take advantage of the ziplines and they’ll never see you coming.",
    images: ["/images/ascent/one.jpg", "/images/ascent/two.jpg"],
  },
  {
    displayName: "Lotus",
    description:
      "A mysterious structure housing an astral conduit radiates with ancient power. Great stone doors provide a variety of movement opportunities and unlock the paths to three mysterious sites.",
    images: ["/images/ascent/one.jpg", "/images/ascent/two.jpg"],
  },
  {
    displayName: "Pearl",
    description:
      "Attackers push down into the Defenders on this two-site map set in a vibrant, underwater city. Pearl is a geo-driven map with no mechanics. Take the fight through a compact mid or the longer range wings in our first map set in Omega Earth.",
    images: ["/images/ascent/one.jpg", "/images/ascent/two.jpg"],
  },
  {
    displayName: "Fracture",
    description:
      "A top secret research facility split apart by a failed radianite experiment. With defender options as divided as the map, the choice is yours: meet the attackers on their own turf or batten down the hatches to weather the assault.",
    images: ["/images/ascent/one.jpg", "/images/ascent/two.jpg"],
  },
  {
    displayName: "Breeze",
    description:
      "Take in the sights of historic ruins or seaside caves on this tropical paradise. But bring some cover. You&apos;ll need them for the wide open spaces and long range engagements. Watch your flanks and this will be a Breeze.",
    images: ["/images/breeze/one.webp", "/images/ascent/two.jpg"],
  },
  {
    displayName: "Split",
    description:
      "If you want to go far, you’ll have to go up. A pair of sites split by an elevated center allows for rapid movement using two rope ascenders. Each site is built with a looming tower vital for control. Remember to watch above before it all blows sky-high.",
    images: [
      "/images/split/one.webp",
      "/images/split/two.png",
      "/images/split/three.webp",
      "/images/split/four.jpg",
      "/images/split/five.webp",
      "/images/split/six.avif",
    ],
  },
  {
    displayName: "Drift",
    description:
      "Drift is one of the new Team Deathmatch maps in VALORANT. The origin of the map is Breeze.",
    images: ["/images/ascent/one.jpg", "/images/ascent/two.jpg"],
  },
  {
    displayName: "District",
    description:
      "District is one of the first three Team Deathmatch maps in VALORANT. The origin of the Map is Split.",
    images: ["/images/ascent/one.jpg", "/images/ascent/two.jpg"],
  },
  {
    displayName: "Glitch",
    description:
      "Glitch is one of the new Team Deathmatch maps in VALORANT. The origins of the map is Haven and Sunset.",
    images: ["/images/ascent/one.jpg", "/images/ascent/two.jpg"],
  },
  {
    displayName: "Kasbah",
    description:
      "Kasbah is one of the first three Team Deathmatch maps in VALORANT. The origin of the Map is Bind.",
    images: ["/images/ascent/one.jpg", "/images/ascent/two.jpg"],
  },
  {
    displayName: "Piazza",
    description:
      "Piazza is one of the first three Team Deathmatch maps in VALORANT. The origin of the Map is Ascent.",
    images: ["/images/ascent/one.jpg", "/images/ascent/two.jpg"],
  },
];

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
                        className="border border-valoranttext rounded-lg"
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
