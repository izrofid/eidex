import { config, SpringValue, useSpring } from "react-spring";
import frames from "@/data/animationFrames.json";
import { useMemo } from "react";
import animMaps from "./animMaps.ts";

type AnimFrames = number[][];

interface AnimationConfig {
  //@ts-ignore
  config: (frame: number) => Record<string, any>; // Replace `unknown` with the actual return type of `baselineConfig` if known
  interpolations: (springConfigs: Record<string, any>) => {
    [x: string]: SpringValue<number>;
  };
}
type AnimationMap = {
  [key: string]: AnimationConfig;
};

const animConfigs = (id: number): [AnimFrames, AnimationConfig | undefined] => {
  const pkmn = frames.find((fd) => fd.dexID === id);

  if (pkmn === undefined || pkmn.frames === undefined) {
    console.error("No animation for", id);
    return [[[0, 0]], undefined];
  }
  const anim = pkmn.animation || "ANIM_H_VIBRATE";
  //@ts-ignore
  const { animationType } = animMaps[anim];
  console.log(animationType);
  const weight = pkmn.weight || 30;

  const toReturn = [
    pkmn.frames as AnimFrames,
    createConfig(weight)[animationType] as AnimationConfig,
  ];
  //@ts-ignore
  return toReturn;
};
const useAnimConfig = (index: number, frame: number): [AnimFrames, any] => {
  const [animeFrames, animConfig] = useMemo(() => animConfigs(index), [index]);
  const [springProps] = useSpring(
    () =>
      animConfig && {
        ...animConfig.config(frame),
      },
    [frame],
  );
  if (animConfig === undefined) {
    return [animeFrames, undefined];
  }
  // debugger;
  return [animeFrames, animConfig.interpolations(springProps)];
};

// type AnimationType =
//   | "slide--"
//   | "shake--"
//   | "stretch--"
//   | "rotate--"
//   | "bounce--"
//   | "glow--"
//   | "swing"
//   | "grow--"
//   | "pivot--"
//   | "path--";

// This will be called in this file which has access to weights.
// it will return a function with calculations that could only be done in this file, therefore.
// I think they all have to have the same spring props ie scale & val or problems arise when switching mons
const createConfig = (weight: number = 30): AnimationMap => {
  return {
    shake: {
      config: (frame) => ({
        config: {
          mass: Math.log(weight), // Knock it down to a small number
        },
        scale: frame === 0 ? 0 : 1,
        val: frame === 0 ? 0 : 1,
      }),
      interpolations: (s) => ({
        transform: s.val
          .to(
            [0, 0.1, 0.25, 0.4, 0.5, 0.6, 0.75, 0.9, 1],
            [0, 2, 0, -2, 0, 2, 0, -1, 0],
          )
          .to(
            (x: any) =>
              `translate(${x}px, 0px) scale(${s.val
                .to([0, 0.25, 0.5, 0.75, 1], [1, 1.01, 1, 1, 1])
                .toJSON()})`,
          ),
        filter: s.val.to(
          () => `drop-shadow(2px 5px 15px var(--color-gray-700))`,
        ),
      }),
    },
    slide: {
      config: (frame) => ({
        transformOrigin: "top right",
        config: { mass: Math.log10(weight) + 1, clamp: true },
        scale: frame === 0 ? 0 : 1,
        val: frame === 0 ? 0 : 1,
      }),
      interpolations: (s) => ({
        transform: s.val
          .to([0, 1], [0, -8])
          .to((x: any) => `translateX(${x}px)`),
        filter: s.val.to(
          (s: any) =>
            `drop-shadow(${2 + s}px ${5 + s}px 5px var(--color-gray-600))`,
        ),
      }),
    },
    pivot: {
      config: () => ({
        transformOrigin: "35% 35%",
        precision: 0.01,
        config: (key: any) =>
          key === "x"
            ? config.wobbly
            : { mass: Math.log10(weight), precision: 0.01 },
        from: { val: 0, x: 0 },
        to: async (next: any) => {
          await next({ val: 1, x: -1 });
          await next({ val: 0, x: 0 });
          await next({ val: -1, x: -1 });
          await next({ val: 0, x: 1 });
          await next({ val: 0, x: -2 });
          await next({ val: 2, x: -1 });
          await next({ val: -1, x: -1 });
          await next({ val: 0, x: 1 });
        },
        loop: true,
      }),
      interpolations: (s) => ({
        transform: s.val
          .to([0, 1, 2], [0, 2, 4]) // Rotate from 0° to 15° and back
          .to((angle: any) => `translateX(${angle}px) rotate(${angle}deg)`),
        filter: s.val.to(
          (s: any) =>
            `drop-shadow(${2 + s}px ${5 + s}px 5px var(--color-gray-600))`,
        ),
      }),
    },
    path: {
      config: () => ({
        // loop: { reverse: true },
        precision: 0.01,
        config: { mass: Math.log10(weight), precision: 0.01 },
        loop: true,
        from: { x: -2, y: -2, z: 1 },
        to: async (next: any) => {
          await next({ x: 3, y: -3, config: config.stiff });
          await next({ x: -3, y: 0 });
          await next({ x: 5, y: 3, config: config.stiff });
          await next({ x: -2, y: -1, config: config.wobbly });
        },
      }),
      interpolations: (s) => ({
        transform: s.x.to(
          (x: any) => `translateX(${x}px) translateY(${s.y?.toJSON()}px)`,
        ),
        filter: s.z.to(
          (s: any) =>
            `drop-shadow(${2 + s}px ${5 + s}px 5px var(--color-gray-600))`,
        ),
      }),
    },
    stretch: {
      config: (frame) => ({
        transformOrigin: "top right",
        config: { mass: Math.log10(weight) },
        val: frame === 0 ? 0 : 1,
      }),
      interpolations: (s) => ({
        transform: s.val
          .to([0, 1, 0], [0, 1, 0])
          .to((x: any) => `translateX(${x}px) skewX(-${x}deg)`),
        filter: s.val
          .to([0, 1], [1, 8])
          .to(
            (s: any) =>
              `drop-shadow(${s / 2}px ${s + 1}px 10px var(--color-gray-700))`,
          ),
      }),
    },
    rotate: {
      config: (frame) => ({
        transformOrigin: "top right",
        config: { mass: Math.log10(weight) },
        reverse: true,
        val: frame === 0 ? 0 : 1,
      }),
      interpolations: (s) => ({
        transform: s.val
          .to([0, 1, 0], [0, 1, 0])
          .to((x: any) => `translateX(${x}px) rotate(-${x * 2}deg)`),
        filter: s.val.to(
          (s: any) => `drop-shadow(3px ${s}px 10px var(--color-gray-800))`,
        ),
      }),
    },
    /** Bulbasaur */
    bounce: {
      config: (frame) => ({
        config: { mass: Math.log10(weight), ...config.wobbly },
        scale: frame === 0 ? 0 : 1,
        // clamp: true,
        val: frame === 0 ? 0 : 1,
        transformOrigin: "bottom left",
      }),
      interpolations: (s) => ({
        scale: s.scale.to([0, 1], [1, 1.05]),
        transform: s.scale
          .to([0, 1], [1, 8])
          .to((s: any) => `translate(-${s - 1}px, -${s * 1.5}px)`),
        filter: s.scale
          .to([0, 1], [2, 8])
          .to(
            (s: any) =>
              `drop-shadow(${s}px ${s * 3}px ${s}px var(--color-gray-700))`,
          ),
      }),
    },
    grow: {
      config: (frame) => ({
        config: {
          mass: Math.log(weight), // Knock it down to a small number

          precision: 0.1,
        },
        scale: frame === 0 ? 0 : 1,
        val: frame === 0 ? 0 : 1,
      }),
      interpolations: (s) => ({
        transform: s.val.to([0, 1], [1, 1.02]).to((s: any) => `scale(${s})`),
        filter: s.val
          .to([0, 1], [1, 4])
          .to(
            (shadow: any) =>
              `drop-shadow(1px ${shadow * 3}px ${shadow}px var(--color-gray-700)) `,
          ),
      }),
    },
    swing: {
      config: (frame) => ({
        transformOrigin: "50% 0%",
        config: {
          mass: Math.log(weight), // Knock it down to a small number
          precision: 0.1,
        },
        val: frame === 0 ? 0 : 1,
      }),
      interpolations: (s) => ({
        transform: s.val
          .to([0, 1], [0, 1.02])
          .to((s: any) => `rotate(${s}deg)`),
        filter: s.val
          .to([0, 1], [1, 4])
          .to(
            (shadow: any) =>
              `drop-shadow(1px ${shadow * 3}px 10px var(--color-gray-700)) `,
          ),
      }),
    },
    glow: {
      config: (frame) => ({
        config: {
          mass: Math.log(weight), // Knock it down to a small number
          precision: 0.01,
          clamp: true,
        },
        val: frame === 0 ? 0 : 1,
      }),
      interpolations: (s) => ({
        scale: s.val.to({
          range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
          output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
        }),
        filter: s.val
          .to([0, 1], [1, 8])
          .to(
            (shadow: any) =>
              `drop-shadow(1px ${shadow * 3}px ${shadow}px var(--color-gray-700)) brightness(${s.val
                .to([0, 0.2, 0.6, 0.7, 1], [100, 150, 225, 160, 100])
                .toJSON()}%)`,
          ),
      }),
    },
  };
};
// ANIM_CIRCULAR_STRETCH_TWICE: (frame: number) => ({
export { animConfigs, useAnimConfig };
