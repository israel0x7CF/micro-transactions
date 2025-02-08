import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GridNavigationProps } from "@/types/types";
import { CircleUserRound, CreditCard, HandCoins, Settings } from "lucide-react";

const navigationItems = [
  {
    title: "Profile",
    description: "view your profile",
    icon: CircleUserRound,
    href: "/profile",
  },
  {
    title: "pay",
    description: "pay for services",
    icon:HandCoins,
    href: "/pay",
  },
  {
    title: "Settings",
    description: "Adjust your settings",
    icon: Settings,
    href: "/settings",
  },

  {
    title: "Payments History",
    description: "View your payments",
    icon: CreditCard,
    href: "/paymenthistory",
  }
];

export default function GridNavigation({
  items = navigationItems,
  columns = 3,
}: GridNavigationProps) {
  return (
    <div
      className={`grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns}`}
    >
      {items.map((item, index) => (
        <Card
          key={index}
          className="transition-all duration-300 hover:shadow-lg"
        >
          <Link href={item.href} className="block h-full">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary rounded-full">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>
      ))}
    </div>
  );
}