"use client";

import { popupEvents } from "@/components/ui/popup-excel";
import * as React from "react";
import { Button } from "./ui/button";


export default function ButtonImportExcel() {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    popupEvents.open();
  };

  return (
    <Button onClick={handleClick}>
      Importer Excel
    </Button>
  );
}