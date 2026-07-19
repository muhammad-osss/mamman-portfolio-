"use client";

import { useCallback, useState } from "react";

// Wraps the browser Geolocation API. Never called automatically — only in
// response to a user action (e.g. tapping "Use my location" when booking an
// appointment). If permission is denied or unsupported, the site continues
// to work normally with `status` reflecting the outcome.

export default function useGeolocation() {
  const [status, setStatus] = useState("idle"); // idle | requesting | granted | denied | unsupported | error
  const [coords, setCoords] = useState(null);

  const request = useCallback(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setStatus("unsupported");
      return;
    }

    setStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setStatus("granted");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setStatus("denied");
        } else {
          setStatus("error");
        }
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  return { status, coords, request };
}
