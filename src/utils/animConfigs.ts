import { config, SpringValue, useSpring, Interpolation, SpringProps } from "react-spring";
import frames from "@/data/animationFrames.json";
import { useMemo } from "react";
import { AnimMaps } from "./animMaps.ts";

type AnimFrames = number[][];

// Define possible spring value shapes for different animations
interface SpringValues {
  val?: SpringValue<number>;
  scale?: SpringValue<number>;
  x?: SpringValue<number>;
  y?: SpringValue<number>;
  z?: SpringValue<number>;
  [key: string]: SpringValue<number> | undefined;
}

// Define the structure of each animation type
interface AnimationConfig {
  config: (frame: number) => SpringProps;
  interpolations: (s: SpringValues) => {
    [key: string]:
      | string
      | SpringValue<string>
      | Interpolation<any, string>
      | { [key: string]: SpringValue<string> };
  };
}

// Define the AnimationMap type
interface AnimationMap {
  [key: string]: AnimationConfig;
}

const animConfigs = (id: number): [AnimFrames, AnimationConfig | undefined] => {
  let pkmn = frames.find((fd) => fd.dexID === id);

  if (pkmn === undefined || pkmn.frames === undefined) {
    /**
     Return a default animation because going from an undefined animaiton to a 
      defined one can cause a crash
     *  */
    console.warn("No animation for", id);
    pkmn = {
      dexID: 0,
      form: null,
      id: 0,
      speciesName: "",
      animation: "ANIM_H_VIBRATE",
      weight: 30,
      frames: [
        [0, 10],
        [1, 15],
        [0, 10],
      ],
    };
    // return [[[0, 0]], { config: () => {}, interpolations: () => {} }];
  }
  const anim = pkmn.animation || "ANIM_H_VIBRATE";

  const { animationType } = AnimMaps[anim];
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
  console.log(animConfig);
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


// This will be called in this file which has access to weights.
// it will return a function with calculations that could only be done in this file, therefore.
// I think they all have to have the same spring props ie scale & val or problems arise when switching mons
// Define the structure of each animation type

// Define the AnimationMap type

// Create the config function with proper annotations
const createConfig = (weight: number = 30): AnimationMap => {
  return {
    shake: {
      config: (frame: number) => ({
        config: {
          mass: Math.log(weight),
        },
        scale: frame === 0 ? 0 : 1,
        val: frame === 0 ? 0 : 1,
      }),
      //@ts-ignore
      interpolations: (s: SpringValues) => ({
        transform: s.val
          ?.to(
            [0, 0.1, 0.25, 0.4, 0.5, 0.6, 0.75, 0.9, 1],
            [0, 2, 0, -2, 0, 2, 0, -1, 0],
          )
          .to(
            (x: number) =>
              `translate(${x}px, 0px) scale(${s.val
                ?.to([0, 0.25, 0.5, 0.75, 1], [1, 1.01, 1, 1, 1])
                .toJSON()})`,
          ),
        filter: s.val?.to(
          () => `drop-shadow(2px 5px 15px var(--color-gray-700))`,
        ),
      }),
    },
    slide: {
      config: (frame: number) => ({
        transformOrigin: "top right",
        config: { mass: Math.log10(weight) + 1, clamp: true },
        scale: frame === 0 ? 0 : 1,
        val: frame === 0 ? 0 : 1,
      }),
      //@ts-ignore
      interpolations: (s: SpringValues) => ({
        transform: s.val
          ?.to([0, 1], [0, -8])
          .to((x: number) => `translateX(${x}px)`),
        filter: s.val?.to(
          (s: number) =>
            `drop-shadow(${2 + s}px ${5 + s}px 5px var(--color-gray-600))`,
        ),
      }),
    },
    pivot: {
      config: () => ({
        transformOrigin: "35% 35%",
        precision: 0.01,
        config: (key: string) =>
          key === "x"
            ? config.wobbly
            : { mass: Math.log10(weight), precision: 0.01 },
        from: { val: 0, x: 0 },
        to: async (next: (props: { val?: number; x?: number }) => Promise<void>) => {
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
      //@ts-ignore
      interpolations: (s: SpringValues) => ({
        transform: s.val
          ?.to([0, 1, 2], [0, 2, 4])
          .to((angle: number) => `translateX(${angle}px) rotate(${angle}deg)`),
        filter: s.val?.to(
          (s: number) =>
            `drop-shadow(${2 + s}px ${5 + s}px 5px var(--color-gray-600))`,
        ),
      }),
    },
    path: {
      config: () => ({
        precision: 0.01,
        config: { mass: Math.log10(weight), precision: 0.01 },
        loop: true,
        from: { x: -2, y: -2, z: 1 },
        to: async (next: (props: { x?: number; y?: number; config?: any }) => Promise<void>) => {
          await next({ x: 3, y: -3, config: config.stiff });
          await next({ x: -3, y: 0 });
          await next({ x: 5, y: 3, config: config.stiff });
          await next({ x: -2, y: -1, config: config.wobbly });
        },
      }),
      //@ts-ignore
      interpolations: (s: SpringValues) => ({
        transform: s.x?.to(
          (x: number) => `translateX(${x}px) translateY(${s.y?.toJSON()}px)`,
        ),
        filter: s.z?.to(
          (s: number) =>
            `drop-shadow(${2 + s}px ${5 + s}px 5px var(--color-gray-600))`,
        ),
      }),
    },
    stretch: {
      config: (frame: number) => ({
        transformOrigin: "top right",
        config: { mass: Math.log10(weight) },
        val: frame === 0 ? 0 : 1,
      }),
      //@ts-ignore
      interpolations: (s: SpringValues) => ({
        transform: s.val
          ?.to([0, 1, 0], [0, 1, 0])
          .to((x: number) => `translateX(${x}px) skewX(-${x}deg)`),
        filter: s.val
          ?.to([0, 1], [1, 8])
          .to(
            (s: number) =>
              `drop-shadow(${s / 2}px ${s + 1}px 10px var(--color-gray-700))`,
          ),
      }),
    },
    rotate: {
      config: (frame: number) => ({
        transformOrigin: "top right",
        config: { mass: Math.log10(weight) },
        reverse: true,
        val: frame === 0 ? 0 : 1,
      }),
      //@ts-ignore
      interpolations: (s: SpringValues) => ({
        transform: s.val
          ?.to([0, 1, 0], [0, 1, 0])
          .to((x: number) => `translateX(${x}px) rotate(-${x * 2}deg)`),
        filter: s.val?.to(
          (s: number) => `drop-shadow(3px ${s}px 10px var(--color-gray-800))`,
        ),
      }),
    },
    bounce: {
      config: (frame: number) => ({
        config: { mass: Math.log10(weight), ...config.wobbly },
        scale: frame === 0 ? 0 : 1,
        val: frame === 0 ? 0 : 1,
        transformOrigin: "bottom left",
      }),
      //@ts-ignore
      interpolations: (s: SpringValues) => ({
        scale: s.scale?.to([0, 1], [1, 1.05]),
        transform: s.scale
          ?.to([0, 1], [1, 8])
          .to((s: number) => `translate(-${s - 1}px, -${s * 1.5}px)`),
        filter: s.scale
          ?.to([0, 1], [2, 8])
          .to(
            (s: number) =>
              `drop-shadow(${s}px ${s * 3}px ${s}px var(--color-gray-700))`,
          ),
      }),
    },
    grow: {
      config: (frame: number) => ({
        config:(key) => key === 'scale' ? {...config.slow} :{
          mass: Math.log(weight),
          precision: 0.1,
        },
        scale: frame === 0 ? 0 : 1,
        val: frame === 0 ? 0 : 1,
      }),
      //@ts-ignore
      interpolations: (s: SpringValues) => ({
        transform: s.val?.to([0, 1], [1, 1.02]).to((s: number) => `scale(${s})`),
        filter: s.scale
          ?.to([0, 1], [2, 8])
          .to(
            (shadow: number) =>
              `drop-shadow(${shadow}px ${shadow * 1.5}px ${shadow}px var(--color-gray-700))`,
          ),
      }),
    },
    swing: {
      config: (frame: number) => ({
        transformOrigin: "50% 0%",
        config: {
          mass: Math.log(weight),
          precision: 0.1,
        },
        val: frame === 0 ? 0 : 1,
      }),
      //@ts-ignore
      interpolations: (s: SpringValues) => ({
        transform: s.val
          ?.to([0, 1], [0, 1.02])
          .to((s: number) => `rotate(${s}deg)`),
        filter: s.val
          ?.to([0, 1], [1, 4])
          .to(
            (shadow: number) =>
              `drop-shadow(1px ${shadow * 3}px 10px var(--color-gray-700))`,
          ),
      }),
    },
    glow: {
      config: (frame: number) => ({
        config: {
          mass: Math.log(weight),
          precision: 0.01,
          clamp: true,
        },
        val: frame === 0 ? 0 : 1,
      }),
      //@ts-ignore
      interpolations: (s: SpringValues) => ({
        scale: s.val?.to({
          range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
          output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
        }),
        filter: s.val
          ?.to([0, 1], [1, 8])
          .to(
            (shadow: number) =>
              `drop-shadow(1px ${shadow * 3}px ${shadow}px var(--color-gray-700)) brightness(${s.val
                ?.to([0, 0.2, 0.6, 0.7, 1], [100, 150, 225, 160, 100])
                .toJSON()}%)`,
          ),
      }),
    },
  };
};
export default createConfig;

export { animConfigs, useAnimConfig };
