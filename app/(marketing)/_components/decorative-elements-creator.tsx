"use client";

import Image from 'next/image';

type DecorativeElementCreator = {
  src: string;
  width: number;
  height: number;
  className: string;
};

const DECORATIVE_ELEMENTS_CREATOR: DecorativeElementCreator[] = [
  {
    src: "/elem/Ellipse1.png",
    width: 270,
    height: 180,
    className: "absolute left-0 -bottom-10"
  },
  {
    src: "/elem/Ellipse2.png",
    width: 270,
    height: 180,
    className: "absolute left-25 bottom-10"
  },
  {
    src: "/elem/Ellipse3.png",
    width: 175,
    height: 90,
    className: "absolute left-0 -bottom-4"
  },
  {
    src: "/elem/Ellipse4.png",
    width: 190,
    height: 180,
    className: "absolute right-0 -bottom-1"
  },
  {
    src: "/elem/Ellipse5.png",
    width: 320,
    height: 180,
    className: "absolute right-0 -bottom-40"
  }
];

export function DecorativeElements() {
  return (
    <>
      {DECORATIVE_ELEMENTS_CREATOR.map((element, index) => (
        <Image
          key={`ellipse-${index + 1}`}
          src={element.src}
          alt="Decorative element"
          width={element.width}
          height={element.height}
          className={`${element.className} hidden xl:block`}
        />
      ))}
    </>
  );
} 