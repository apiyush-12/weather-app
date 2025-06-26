"use server";

import { WeatherData } from "@/types/weather";
import { z } from "zod";

const weatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    humidity: z.number(),
    feels_like: z.number(),
    pressure: z.number(), // ✅ newly added
  }),
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  wind: z.object({
    speed: z.number(),
  }),
  visibility: z.number(), // ✅ newly added
  sys: z.object({
    sunrise: z.number(), // ✅ newly added
    sunset: z.number(),  // ✅ newly added
  }),
});


export async function getWeatherData(lat: number, lon: number): Promise<{
  data?: WeatherData;
  error?: string;
}> {
  try {
    if (!lat || !lon) {
      return { error: "Latitude and Longitude are required" };
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      return { error: "API key is missing in environment variables" };
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!res.ok) {
      throw new Error("Location not found");
    }

    const rawData = await res.json();
    const data = weatherSchema.parse(rawData);

    return { data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid weather data received" };
    }

    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch weather data",
    };
  }
}
