"use client";

import { useEffect } from "react";
import { saveUTMParams } from "@/lib/utm";

export default function UTMTracker() {
  useEffect(() => {
    saveUTMParams();
  }, []);

  return null;
}