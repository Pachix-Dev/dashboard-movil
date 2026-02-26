// lib/auth/AuthProvider.tsx
import React from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

// Si ya tienes tu env en otra parte (constants/env, lib/env, etc.)
// puedes reemplazar esta línea por tu import.
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  // Ojo: esto no rompe build en runtime, pero sí te avisa fuerte en dev.
  console.warn(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add it to your .env and restart Expo."
  );
}

/**
 * Clerk token cache recomendado para Expo
 * (mantiene la sesión entre reinicios con SecureStore)
 */
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.warn("SecureStore getToken error:", err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.warn("SecureStore saveToken error:", err);
    }
  },
};

type Props = {
  children: React.ReactNode;
};

/**
 * AuthProvider (wrapper)
 * Hoy: Clerk
 * Mañana: puedes cambiar a tu JwtProvider sin tocar layouts/rutas.
 */
export function AuthProvider({ children }: Props) {
  // FUTURO: aquí podrías hacer un switch por config
  // const AUTH_DRIVER = process.env.EXPO_PUBLIC_AUTH_DRIVER ?? "clerk";
  // if (AUTH_DRIVER === "jwt") return <JwtProvider>{children}</JwtProvider>;

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY ?? ""}
      tokenCache={tokenCache}
    >
      {children}
    </ClerkProvider>
  );
}