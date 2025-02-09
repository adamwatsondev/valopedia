"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAgents } from "@/lib/valorantapi";
import Image from "next/image";

interface Agent {
  uuid: string;
  displayName: string;
  displayIcon: string;
  background: string;
  backgroundGradientColors: string[];
  fullPortraitV2: string;
  abilities: Array<{
    displayName: string;
    description: string;
    displayIcon: string;
  }>;
  role: { displayName: string; description: string; displayIcon: string };
}

const AgentPage = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    const fetchAgent = async () => {
      if (id) {
        const data = await getAgents();
        const foundAgent: Agent | undefined = data?.data.find(
          (agent: Agent) => agent.uuid === id
        );
        setAgent(foundAgent || null);
      }
    };

    fetchAgent();
  }, [id]);

  return (
    <>
      {agent && (
        <div className="flex flex-col gap-20">
          {/* Agent About */}
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2">
              <div
                className="relative"
                style={{
                  background: `linear-gradient(90deg, ${agent.backgroundGradientColors
                    .map((color) => `#${color}`)
                    .join(", ")})`,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  display: "inline-block",
                  fontSize: "4rem",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                <span className="text-transparent font-valorant bg-clip-text">
                  {agent.displayName}
                </span>
              </div>
              <div className="flex gap-8">
                <Image
                  src={agent.role.displayIcon}
                  alt={agent.displayName}
                  width={100}
                  height={75}
                />
                <div className="flex flex-col">
                  <span className="text-lg text-white">
                    {agent.role.displayName}
                  </span>
                  <span className="text-lg text-white">
                    {agent.role.description}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center relative">
              {/* Background image */}
              <div className="relative w-[600px] h-[600px]">
                <Image
                  src={agent.background}
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className="z-0"
                />
              </div>
              {/* Portrait image */}
              <div className="absolute z-10">
                <Image
                  src={agent.fullPortraitV2}
                  alt={agent.displayName}
                  width={600}
                  height={600}
                  className="z-10"
                />
              </div>
            </div>
          </div>

          {/* Agent Abilities */}
          <div className="flex flex-col gap-8">
            <span className="text-6xl font-extrabold text-white">
              Abilities
            </span>
            <div className="flex flex-col gap-4">
              {agent.abilities.map((ability, index) => (
                <div className="flex flex-col gap-4" key={index}>
                  <div className="flex gap-4 items-center">
                    <Image
                      src={ability.displayIcon}
                      alt={ability.displayName}
                      width={50}
                      height={50}
                    />
                    <div
                      className="relative"
                      style={{
                        background: `linear-gradient(90deg, ${agent.backgroundGradientColors
                          .map((color) => `#${color}`)
                          .join(", ")})`,
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        display: "inline-block",
                        fontSize: "4rem",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                    >
                      <span className="text-3xl text-transparent font-valorant bg-clip-text">
                        {ability.displayName}
                      </span>
                    </div>
                  </div>
                  <span className="text-xl text-white font-normal">
                    {ability.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentPage;
