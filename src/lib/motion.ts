export const TRANSITION_EASE = [0.22, 1, 0.36, 1] as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.65, ease: TRANSITION_EASE },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: TRANSITION_EASE },
};
