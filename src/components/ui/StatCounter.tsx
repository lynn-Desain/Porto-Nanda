import { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";
import { useInView } from "react-intersection-observer";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const countRef = useRef<HTMLSpanElement>(null);
  const { start } = useCountUp({
    ref: countRef as React.RefObject<HTMLElement>,
    end: value,
    duration: 1.6,
    suffix,
    startOnMount: false,
  });

  useEffect(() => {
    if (inView) {
      start();
    }
  }, [inView, start]);

  return (
    <div
      ref={inViewRef}
      className="flex flex-col"
    >
      <span className="font-display font-extrabold text-display-md text-[#2563EB]">
        <span ref={countRef}>{inView ? undefined : `0${suffix}`}</span>
      </span>
      <span className="font-utility text-caption uppercase tracking-wide opacity-70 mt-1">
        {label}
      </span>
    </div>
  );
}