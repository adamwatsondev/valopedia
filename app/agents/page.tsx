"use client";

import React, { useEffect, useState } from "react";
import { getAgents } from "@/lib/valorantapi"; // import the API function
import Image from "next/image";
import Link from "next/link";

interface Agents {
  uuid: string;
  displayName: string;
  fullPortraitV2: string;
}

const AgentList = () => {
  const [agents, setAgents] = useState<Agents[]>([]); // Adjust the type as needed

  useEffect(() => {
    const fetchAgents = async () => {
      const data = await getAgents();
      if (data) {
        setAgents(data.data);
      }
    };

    fetchAgents();
  }, []); // Only run once on component mount

  return (
    <div className="grid grid-cols-3 gap-20">
      {agents.map((agent: Agents) => (
        <Link
          className="flex flex-col gap-4 items-center justify-center"
          key={agent.uuid}
          href={`/agents/${agent.uuid}`}
        >
          <Image
            src={agent.fullPortraitV2}
            alt={agent.displayName}
            width={400}
            height={400}
          />
          <span className="text-5xl text-white font-valorant">
            {agent.displayName}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default AgentList;
