"use client";

import React, { useEffect, useState } from "react";
import { getWeapons } from "@/lib/valorantapi"; // Import API function
import Image from "next/image";
import Link from "next/link";

interface Weapon {
  uuid: string;
  displayName: string;
  displayIcon: string;
  shopData?: {
    cost: number;
    category: string;
  };
}

const Weapons = () => {
  const [weaponCategories, setWeaponCategories] = useState<{
    [category: string]: Weapon[];
  }>({});

  useEffect(() => {
    const fetchWeapons = async () => {
      const data = await getWeapons();
      if (data) {
        const categorizedWeapons: { [category: string]: Weapon[] } = {};

        data.data.forEach((weapon: Weapon) => {
          const category = weapon.shopData?.category || "Other"; // Handle missing category
          if (!categorizedWeapons[category]) {
            categorizedWeapons[category] = [];
          }
          categorizedWeapons[category].push(weapon);
        });

        setWeaponCategories(categorizedWeapons);
      }
    };

    fetchWeapons();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <span className="text-8xl text-center text-white font-valorant items-center justify-center">
        Weapons
      </span>
      {Object.entries(weaponCategories).map(([category, weapons]) => (
        <div key={category} className="flex flex-col gap-8">
          {/* Category Title */}
          <h2 className="text-6xl text-white font-valorant">{category}</h2>

          {/* Weapons Grid */}
          <div className="grid grid-cols-3 gap-20">
            {weapons.map((weapon) => (
              <Link
                className="flex flex-col gap-4 aspect-square items-center justify-center"
                key={weapon.uuid}
                href={`/weapons/${weapon.uuid}`}
              >
                <Image
                  src={weapon.displayIcon}
                  alt={weapon.displayName}
                  width={600}
                  height={600}
                />
                <span className="text-5xl text-white font-valorant">
                  {weapon.displayName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Weapons;
