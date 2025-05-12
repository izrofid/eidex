export default {
    ANIM_V_SQUISH_AND_BOUNCE: {
      animationType: "stretch",
      animationProps: {
        direction: "v",
        scale: 1.2,
        frameCount: 30,
        bounce: true,
      },
    },
    ANIM_CIRCULAR_STRETCH_TWICE: {
      animationType: "stretch",
      animationProps: {
        direction: "circular",
        scale: 1.2,
        frameCount: 30,
        repeat: 2,
      },
    },
    ANIM_H_VIBRATE: {
      animationType: "shake",
      animationProps: {
        direction: "h",
        intensity: 5,
        frameCount: 6,
        repeat: "Infinity",
      },
    },
    ANIM_H_SLIDE: {
      animationType: "slide",
      animationProps: { direction: "h", distance: 20, frameCount: 30 },
    },
    ANIM_V_SLIDE: {
      animationType: "slide",
      animationProps: { direction: "v", distance: 20, frameCount: 30 },
    },
    ANIM_BOUNCE_ROTATE_TO_SIDES: {
      animationType: "bounce",
      animationProps: {
        direction: "v",
        height: 20,
        frameCount: 36,
        rotate: true,
      },
    },
    ANIM_V_JUMPS_H_JUMPS: {
      animationType: "bounce",
      animationProps: { direction: "v", height: 20, frameCount: 36 },
    },
    ANIM_ROTATE_TO_SIDES: {
      animationType: "rotate",
      animationProps: { angle: 90, frameCount: 60, repeat: "Infinity" },
    },
    ANIM_ROTATE_TO_SIDES_TWICE: {
      animationType: "rotate",
      animationProps: { angle: 90, frameCount: 60, repeat: 2 },
    },
    ANIM_GROW_VIBRATE: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 42, stutter: true },
    },
    ANIM_ZIGZAG_FAST: {
      animationType: "path",
      animationProps: { type: "zigzag", frameCount: 12 },
    },
    ANIM_SWING_CONCAVE: {
      animationType: "swing",
      animationProps: { angle: 15, frameCount: 60, concave: true },
    },
    ANIM_SWING_CONCAVE_FAST: {
      animationType: "swing",
      animationProps: { angle: 15, frameCount: 30, concave: true },
    },
    ANIM_SWING_CONVEX: {
      animationType: "swing",
      animationProps: { angle: 15, frameCount: 60, concave: false },
    },
    ANIM_SWING_CONVEX_FAST: {
      animationType: "swing",
      animationProps: { angle: 15, frameCount: 30, concave: false },
    },
    ANIM_H_SHAKE: {
      animationType: "shake",
      animationProps: {
        direction: "h",
        intensity: 5,
        frameCount: 6,
        repeat: "Infinity",
      },
    },
    ANIM_V_SHAKE: {
      animationType: "shake",
      animationProps: {
        direction: "v",
        intensity: 5,
        frameCount: 6,
        repeat: "Infinity",
      },
    },
    ANIM_CIRCULAR_VIBRATE: {
      animationType: "shake",
      animationProps: {
        direction: "circular",
        intensity: 5,
        frameCount: 6,
        repeat: "Infinity",
      },
    },
    ANIM_TWIST: {
      animationType: "rotate",
      animationProps: { angle: 45, frameCount: 30, repeat: "Infinity" },
    },
    ANIM_SHRINK_GROW: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 42 },
    },
    ANIM_CIRCLE_C_CLOCKWISE: {
      animationType: "path",
      animationProps: { type: "circle", frameCount: 60 },
    },
    ANIM_GLOW_BLACK: {
      animationType: "glow",
      animationProps: { color: "black", frameCount: 48 },
    },
    ANIM_H_STRETCH: {
      animationType: "stretch",
      animationProps: { direction: "h", scale: 1.2, frameCount: 30 },
    },
    ANIM_V_STRETCH: {
      animationType: "stretch",
      animationProps: { direction: "v", scale: 1.2, frameCount: 30 },
    },
    ANIM_RISING_WOBBLE: {
      animationType: "bounce",
      animationProps: {
        direction: "v",
        height: 20,
        frameCount: 36,
        wobble: true,
      },
    },
    ANIM_V_SHAKE_TWICE: {
      animationType: "shake",
      animationProps: { direction: "v", intensity: 5, frameCount: 6, repeat: 2 },
    },
    ANIM_TIP_MOVE_FORWARD: {
      animationType: "pivot",
      animationProps: { angle: 10, frameCount: 36, shake: true },
    },
    ANIM_H_PIVOT: {
      animationType: "pivot",
      animationProps: { angle: 10, frameCount: 36 },
    },
    ANIM_V_SLIDE_WOBBLE: {
      animationType: "slide",
      animationProps: {
        direction: "v",
        distance: 20,
        frameCount: 30,
        wobble: true,
      },
    },
    ANIM_H_SLIDE_WOBBLE: {
      animationType: "slide",
      animationProps: {
        direction: "h",
        distance: 20,
        frameCount: 30,
        wobble: true,
      },
    },
    ANIM_V_JUMPS_BIG: {
      animationType: "bounce",
      animationProps: { direction: "v", height: 40, frameCount: 36 },
    },
    ANIM_SPIN_LONG: {
      animationType: "rotate",
      animationProps: { angle: 360, frameCount: 90, repeat: 1 },
    },
    ANIM_GLOW_ORANGE: {
      animationType: "glow",
      animationProps: { color: "orange", frameCount: 48 },
    },
    ANIM_GLOW_RED: {
      animationType: "glow",
      animationProps: { color: "red", frameCount: 48 },
    },
    ANIM_GLOW_BLUE: {
      animationType: "glow",
      animationProps: { color: "blue", frameCount: 48 },
    },
    ANIM_GLOW_YELLOW: {
      animationType: "glow",
      animationProps: { color: "yellow", frameCount: 48 },
    },
    ANIM_GLOW_PURPLE: {
      animationType: "glow",
      animationProps: { color: "purple", frameCount: 48 },
    },
    ANIM_BACK_AND_LUNGE: {
      animationType: "slide",
      animationProps: { direction: "h", distance: 30, frameCount: 30 },
    },
    ANIM_BACK_FLIP: {
      animationType: "rotate",
      animationProps: { angle: 360, frameCount: 60, repeat: 1 },
    },
    ANIM_FLICKER: {
      animationType: "glow",
      animationProps: { color: "white", frameCount: 12 },
    },
    ANIM_BACK_FLIP_BIG: {
      animationType: "rotate",
      animationProps: { angle: 360, frameCount: 90, repeat: 1 },
    },
    ANIM_FRONT_FLIP: {
      animationType: "rotate",
      animationProps: { angle: 360, frameCount: 60, repeat: 1 },
    },
    ANIM_TUMBLING_FRONT_FLIP: {
      animationType: "rotate",
      animationProps: { angle: 360, frameCount: 60, repeat: 1 },
    },
    ANIM_FIGURE_8: {
      animationType: "path",
      animationProps: { type: "figure-8", frameCount: 60 },
    },
    ANIM_FLASH_YELLOW: {
      animationType: "glow",
      animationProps: { color: "yellow", frameCount: 12 },
    },
    ANIM_SWING_CONCAVE_FAST_SHORT: {
      animationType: "swing",
      animationProps: { angle: 10, frameCount: 20, concave: true },
    },
    ANIM_SWING_CONVEX_FAST_SHORT: {
      animationType: "swing",
      animationProps: { angle: 10, frameCount: 20, concave: false },
    },
    ANIM_ROTATE_UP_SLAM_DOWN: {
      animationType: "rotate",
      animationProps: { angle: 90, frameCount: 30, repeat: 1 },
    },
    ANIM_DEEP_V_SQUISH_AND_BOUNCE: {
      animationType: "stretch",
      animationProps: {
        direction: "v",
        scale: 1.4,
        frameCount: 30,
        bounce: true,
      },
    },
    ANIM_H_JUMPS: {
      animationType: "bounce",
      animationProps: { direction: "h", height: 20, frameCount: 36 },
    },
    ANIM_H_JUMPS_V_STRETCH: {
      animationType: "bounce",
      animationProps: { direction: "h", height: 20, frameCount: 36 },
    },
    ANIM_ROTATE_TO_SIDES_FAST: {
      animationType: "rotate",
      animationProps: { angle: 90, frameCount: 30, repeat: "Infinity" },
    },
    ANIM_ROTATE_UP_TO_SIDES: {
      animationType: "rotate",
      animationProps: { angle: 90, frameCount: 60, repeat: "Infinity" },
    },
    ANIM_FLICKER_INCREASING: {
      animationType: "glow",
      animationProps: { color: "white", frameCount: 12 },
    },
    ANIM_TIP_HOP_FORWARD: {
      animationType: "pivot",
      animationProps: { angle: 10, frameCount: 36, shake: true },
    },
    ANIM_PIVOT_SHAKE: {
      animationType: "pivot",
      animationProps: { angle: 10, frameCount: 36, shake: true },
    },
    ANIM_TIP_AND_SHAKE: {
      animationType: "pivot",
      animationProps: { angle: 10, frameCount: 36, shake: true },
    },
    ANIM_VIBRATE_TO_CORNERS: {
      animationType: "shake",
      animationProps: {
        direction: "circular",
        intensity: 10,
        frameCount: 6,
        repeat: "Infinity",
      },
    },
    ANIM_GROW_IN_STAGES: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 42, stutter: true },
    },
    ANIM_V_SPRING: {
      animationType: "bounce",
      animationProps: { direction: "v", height: 20, frameCount: 36 },
    },
    ANIM_V_REPEATED_SPRING: {
      animationType: "bounce",
      animationProps: {
        direction: "v",
        height: 20,
        frameCount: 36,
        repeat: "Infinity",
      },
    },
    ANIM_SPRING_RISING: {
      animationType: "bounce",
      animationProps: { direction: "v", height: 20, frameCount: 36 },
    },
    ANIM_H_SPRING: {
      animationType: "bounce",
      animationProps: { direction: "h", height: 20, frameCount: 36 },
    },
    ANIM_H_REPEATED_SPRING_SLOW: {
      animationType: "bounce",
      animationProps: {
        direction: "h",
        height: 20,
        frameCount: 60,
        repeat: "Infinity",
      },
    },
    ANIM_H_SLIDE_SHRINK: {
      animationType: "slide",
      animationProps: { direction: "h", distance: 20, frameCount: 30 },
    },
    ANIM_LUNGE_GROW: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 42 },
    },
    ANIM_CIRCLE_INTO_BG: {
      animationType: "path",
      animationProps: { type: "circle", frameCount: 60 },
    },
    ANIM_RAPID_H_HOPS: {
      animationType: "bounce",
      animationProps: { direction: "h", height: 10, frameCount: 12 },
    },
    ANIM_FOUR_PETAL: {
      animationType: "path",
      animationProps: { type: "four-petal", frameCount: 60 },
    },
    ANIM_V_SQUISH_AND_BOUNCE_SLOW: {
      animationType: "stretch",
      animationProps: {
        direction: "v",
        scale: 1.2,
        frameCount: 60,
        bounce: true,
      },
    },
    ANIM_H_SLIDE_SLOW: {
      animationType: "slide",
      animationProps: { direction: "h", distance: 20, frameCount: 60 },
    },
    ANIM_V_SLIDE_SLOW: {
      animationType: "slide",
      animationProps: { direction: "v", distance: 20, frameCount: 60 },
    },
    ANIM_BOUNCE_ROTATE_TO_SIDES_SMALL: {
      animationType: "bounce",
      animationProps: {
        direction: "v",
        height: 10,
        frameCount: 36,
        rotate: true,
      },
    },
    ANIM_BOUNCE_ROTATE_TO_SIDES_SLOW: {
      animationType: "bounce",
      animationProps: {
        direction: "v",
        height: 20,
        frameCount: 60,
        rotate: true,
      },
    },
    ANIM_BOUNCE_ROTATE_TO_SIDES_SMALL_SLOW: {
      animationType: "bounce",
      animationProps: {
        direction: "v",
        height: 10,
        frameCount: 60,
        rotate: true,
      },
    },
    ANIM_ZIGZAG_SLOW: {
      animationType: "path",
      animationProps: { type: "zigzag", frameCount: 60 },
    },
    ANIM_H_SHAKE_SLOW: {
      animationType: "shake",
      animationProps: {
        direction: "h",
        intensity: 5,
        frameCount: 12,
        repeat: "Infinity",
      },
    },
    ANIM_V_SHAKE_SLOW: {
      animationType: "shake",
      animationProps: {
        direction: "v",
        intensity: 5,
        frameCount: 12,
        repeat: "Infinity",
      },
    },
    ANIM_TWIST_TWICE: {
      animationType: "rotate",
      animationProps: { angle: 45, frameCount: 30, repeat: 2 },
    },
    ANIM_CIRCLE_C_CLOCKWISE_SLOW: {
      animationType: "path",
      animationProps: { type: "circle", frameCount: 90 },
    },
    ANIM_V_SHAKE_TWICE_SLOW: {
      animationType: "shake",
      animationProps: { direction: "v", intensity: 5, frameCount: 12, repeat: 2 },
    },
    ANIM_V_SLIDE_WOBBLE_SMALL: {
      animationType: "slide",
      animationProps: {
        direction: "v",
        distance: 10,
        frameCount: 30,
        wobble: true,
      },
    },
    ANIM_V_JUMPS_SMALL: {
      animationType: "bounce",
      animationProps: { direction: "v", height: 10, frameCount: 36 },
    },
    ANIM_SPIN: {
      animationType: "rotate",
      animationProps: { angle: 360, frameCount: 60, repeat: 1 },
    },
    ANIM_TUMBLING_FRONT_FLIP_TWICE: {
      animationType: "rotate",
      animationProps: { angle: 360, frameCount: 60, repeat: 2 },
    },
    ANIM_DEEP_V_SQUISH_AND_BOUNCE_TWICE: {
      animationType: "stretch",
      animationProps: {
        direction: "v",
        scale: 1.4,
        frameCount: 30,
        bounce: true,
        repeat: 2,
      },
    },
    ANIM_H_JUMPS_V_STRETCH_TWICE: {
      animationType: "bounce",
      animationProps: { direction: "h", height: 20, frameCount: 36, repeat: 2 },
    },
    ANIM_V_SHAKE_BACK: {
      animationType: "shake",
      animationProps: {
        direction: "v",
        intensity: 5,
        frameCount: 6,
        repeat: "Infinity",
      },
    },
    ANIM_V_SHAKE_BACK_SLOW: {
      animationType: "shake",
      animationProps: {
        direction: "v",
        intensity: 5,
        frameCount: 12,
        repeat: "Infinity",
      },
    },
    ANIM_V_SHAKE_H_SLIDE_SLOW: {
      animationType: "shake",
      animationProps: {
        direction: "v",
        intensity: 5,
        frameCount: 12,
        repeat: "Infinity",
      },
    },
    ANIM_V_STRETCH_BOTH_ENDS_SLOW: {
      animationType: "stretch",
      animationProps: { direction: "v", scale: 1.2, frameCount: 60 },
    },
    ANIM_H_STRETCH_FAR_SLOW: {
      animationType: "stretch",
      animationProps: { direction: "h", scale: 1.4, frameCount: 60 },
    },
    ANIM_V_SHAKE_LOW_TWICE: {
      animationType: "shake",
      animationProps: { direction: "v", intensity: 3, frameCount: 6, repeat: 2 },
    },
    ANIM_H_SHAKE_FAST: {
      animationType: "shake",
      animationProps: {
        direction: "h",
        intensity: 10,
        frameCount: 3,
        repeat: "Infinity",
      },
    },
    ANIM_H_SLIDE_FAST: {
      animationType: "slide",
      animationProps: { direction: "h", distance: 20, frameCount: 12 },
    },
    ANIM_H_VIBRATE_FAST: {
      animationType: "shake",
      animationProps: {
        direction: "h",
        intensity: 5,
        frameCount: 3,
        repeat: "Infinity",
      },
    },
    ANIM_H_VIBRATE_FASTEST: {
      animationType: "shake",
      animationProps: {
        direction: "h",
        intensity: 5,
        frameCount: 2,
        repeat: "Infinity",
      },
    },
    ANIM_V_SHAKE_BACK_FAST: {
      animationType: "shake",
      animationProps: {
        direction: "v",
        intensity: 5,
        frameCount: 3,
        repeat: "Infinity",
      },
    },
    ANIM_V_SHAKE_LOW_TWICE_SLOW: {
      animationType: "shake",
      animationProps: { direction: "v", intensity: 3, frameCount: 12, repeat: 2 },
    },
    ANIM_V_SHAKE_LOW_TWICE_FAST: {
      animationType: "shake",
      animationProps: { direction: "v", intensity: 3, frameCount: 3, repeat: 2 },
    },
    ANIM_CIRCLE_C_CLOCKWISE_LONG: {
      animationType: "path",
      animationProps: { type: "circle", frameCount: 90 },
    },
    ANIM_GROW_STUTTER_SLOW: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 60, stutter: true },
    },
    ANIM_V_SHAKE_H_SLIDE: {
      animationType: "shake",
      animationProps: {
        direction: "v",
        intensity: 5,
        frameCount: 6,
        repeat: "Infinity",
      },
    },
    ANIM_V_SHAKE_H_SLIDE_FAST: {
      animationType: "shake",
      animationProps: {
        direction: "v",
        intensity: 5,
        frameCount: 3,
        repeat: "Infinity",
      },
    },
    ANIM_TRIANGLE_DOWN_SLOW: {
      animationType: "path",
      animationProps: { type: "triangle", frameCount: 90 },
    },
    ANIM_TRIANGLE_DOWN: {
      animationType: "path",
      animationProps: { type: "triangle", frameCount: 60 },
    },
    ANIM_TRIANGLE_DOWN_TWICE: {
      animationType: "path",
      animationProps: { type: "triangle", frameCount: 60, repeat: 2 },
    },
    ANIM_GROW: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 42 },
    },
    ANIM_GROW_TWICE: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 42, repeat: 2 },
    },
    ANIM_H_SPRING_FAST: {
      animationType: "bounce",
      animationProps: { direction: "h", height: 20, frameCount: 12 },
    },
    ANIM_H_SPRING_SLOW: {
      animationType: "bounce",
      animationProps: { direction: "h", height: 20, frameCount: 60 },
    },
    ANIM_H_REPEATED_SPRING_FAST: {
      animationType: "bounce",
      animationProps: {
        direction: "h",
        height: 20,
        frameCount: 12,
        repeat: "Infinity",
      },
    },
    ANIM_H_REPEATED_SPRING: {
      animationType: "bounce",
      animationProps: {
        direction: "h",
        height: 20,
        frameCount: 36,
        repeat: "Infinity",
      },
    },
    ANIM_SHRINK_GROW_FAST: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 24 },
    },
    ANIM_SHRINK_GROW_SLOW: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 60 },
    },
    ANIM_V_STRETCH_BOTH_ENDS: {
      animationType: "stretch",
      animationProps: { direction: "v", scale: 1.2, frameCount: 30 },
    },
    ANIM_V_STRETCH_BOTH_ENDS_TWICE: {
      animationType: "stretch",
      animationProps: { direction: "v", scale: 1.2, frameCount: 30, repeat: 2 },
    },
    ANIM_H_STRETCH_FAR_TWICE: {
      animationType: "stretch",
      animationProps: { direction: "h", scale: 1.4, frameCount: 30, repeat: 2 },
    },
    ANIM_H_STRETCH_FAR: {
      animationType: "stretch",
      animationProps: { direction: "h", scale: 1.4, frameCount: 30 },
    },
    ANIM_GROW_STUTTER_TWICE: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 42, stutter: true, repeat: 2 },
    },
    ANIM_GROW_STUTTER: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 42, stutter: true },
    },
    ANIM_CONCAVE_ARC_LARGE_SLOW: {
      animationType: "swing",
      animationProps: { angle: 20, frameCount: 90, concave: true },
    },
    ANIM_CONCAVE_ARC_LARGE: {
      animationType: "swing",
      animationProps: { angle: 20, frameCount: 60, concave: true },
    },
    ANIM_CONCAVE_ARC_LARGE_TWICE: {
      animationType: "swing",
      animationProps: { angle: 20, frameCount: 60, concave: true, repeat: 2 },
    },
    ANIM_CONVEX_DOUBLE_ARC_SLOW: {
      animationType: "swing",
      animationProps: { angle: 15, frameCount: 90, concave: false },
    },
    ANIM_CONVEX_DOUBLE_ARC: {
      animationType: "swing",
      animationProps: { angle: 15, frameCount: 60, concave: false },
    },
    ANIM_CONVEX_DOUBLE_ARC_TWICE: {
      animationType: "swing",
      animationProps: { angle: 15, frameCount: 60, concave: false, repeat: 2 },
    },
    ANIM_CONCAVE_ARC_SMALL_SLOW: {
      animationType: "swing",
      animationProps: { angle: 10, frameCount: 90, concave: true },
    },
    ANIM_CONCAVE_ARC_SMALL: {
      animationType: "swing",
      animationProps: { angle: 10, frameCount: 60, concave: true },
    },
    ANIM_CONCAVE_ARC_SMALL_TWICE: {
      animationType: "swing",
      animationProps: { angle: 10, frameCount: 60, concave: true, repeat: 2 },
    },
    ANIM_H_DIP: {
      animationType: "slide",
      animationProps: { direction: "h", distance: 10, frameCount: 30 },
    },
    ANIM_H_DIP_FAST: {
      animationType: "slide",
      animationProps: { direction: "h", distance: 10, frameCount: 12 },
    },
    ANIM_H_DIP_TWICE: {
      animationType: "slide",
      animationProps: { direction: "h", distance: 10, frameCount: 30, repeat: 2 },
    },
    ANIM_SHRINK_GROW_VIBRATE_FAST: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 24, stutter: true },
    },
    ANIM_SHRINK_GROW_VIBRATE: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 42, stutter: true },
    },
    ANIM_SHRINK_GROW_VIBRATE_SLOW: {
      animationType: "grow",
      animationProps: { scale: 1.2, frameCount: 60, stutter: true },
    },
    ANIM_JOLT_RIGHT_FAST: {
      animationType: "slide",
      animationProps: { direction: "h", distance: 15, frameCount: 12 },
    },
    ANIM_JOLT_RIGHT: {
      animationType: "slide",
      animationProps: { direction: "h", distance: 15, frameCount: 30 },
    },
    ANIM_JOLT_RIGHT_SLOW: {
      animationType: "slide",
      animationProps: { direction: "h", distance: 15, frameCount: 60 },
    },
    ANIM_SHAKE_FLASH_YELLOW_FAST: {
      animationType: "glow",
      animationProps: { color: "yellow", frameCount: 12, shake: true },
    },
    ANIM_SHAKE_FLASH_YELLOW: {
      animationType: "glow",
      animationProps: { color: "yellow", frameCount: 30, shake: true },
    },
    ANIM_SHAKE_FLASH_YELLOW_SLOW: {
      animationType: "glow",
      animationProps: { color: "yellow", frameCount: 60, shake: true },
    },
    ANIM_SHAKE_GLOW_RED_FAST: {
      animationType: "glow",
      animationProps: { color: "red", frameCount: 12, shake: true },
    },
    ANIM_SHAKE_GLOW_RED: {
      animationType: "glow",
      animationProps: { color: "red", frameCount: 30, shake: true },
    },
    ANIM_SHAKE_GLOW_RED_SLOW: {
      animationType: "glow",
      animationProps: { color: "red", frameCount: 60, shake: true },
    },
    ANIM_SHAKE_GLOW_GREEN_FAST: {
      animationType: "glow",
      animationProps: { color: "green", frameCount: 12, shake: true },
    },
    ANIM_SHAKE_GLOW_GREEN: {
      animationType: "glow",
      animationProps: { color: "green", frameCount: 30, shake: true },
    },
    ANIM_SHAKE_GLOW_GREEN_SLOW: {
      animationType: "glow",
      animationProps: { color: "green", frameCount: 60, shake: true },
    },
    ANIM_SHAKE_GLOW_BLUE_FAST: {
      animationType: "glow",
      animationProps: { color: "blue", frameCount: 12, shake: true },
    },
    ANIM_SHAKE_GLOW_BLUE: {
      animationType: "glow",
      animationProps: { color: "blue", frameCount: 30, shake: true },
    },
    ANIM_SHAKE_GLOW_BLUE_SLOW: {
      animationType: "glow",
      animationProps: { color: "blue", frameCount: 60, shake: true },
    },
    ANIM_SHAKE_GLOW_BLACK_SLOW: {
      animationType: "glow",
      animationProps: { color: "black", frameCount: 60, shake: true },
    },
    ANIM_SHAKE_GLOW_WHITE_SLOW: {
      animationType: "glow",
      animationProps: { color: "white", frameCount: 60, shake: true },
    },
    ANIM_SHAKE_GLOW_PURPLE_SLOW: {
      animationType: "glow",
      animationProps: { color: "purple", frameCount: 60, shake: true },
    },
  };