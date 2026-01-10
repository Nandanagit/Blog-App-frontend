"use client";
import Particles from "react-tsparticles";

export default function ParticleBackground() {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: { value: "#000000" },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            outModes: { default: "out" },
          },
          number: {
            value: 80,
            density: { enable: true, area: 800 },
          },
          opacity: { value: 0.3 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
        fullScreen: { enable: false },
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
    />
  );
}
