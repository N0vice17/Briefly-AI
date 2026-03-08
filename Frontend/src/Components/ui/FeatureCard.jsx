import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-7 transition-all duration-500 hover:border-primary/20 hover:shadow-[0_0_40px_-12px_hsl(var(--primary)/0.15)]"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/10">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>

        <h3 className="mb-2 font-display text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>

        <p className="text-[13px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;