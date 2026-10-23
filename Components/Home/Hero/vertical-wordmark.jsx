export default function VerticalWordmark() {
  return (
    <div className="pointer-events-none absolute right-4 top-[11vh] flex select-none flex-col items-center gap-3 md:right-[3.5%]">
      <h1 className="text-[clamp(3.5rem,7vw,8rem)] font-medium leading-[0.85] tracking-[-0.045em] text-white [writing-mode:vertical-rl]">
        <span className="text-[#a8af7e]">+</span>Velmora
      </h1>

      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white text-[8px] font-medium leading-none text-white md:h-5 md:w-5 md:text-[9px]">
        R
      </span>
    </div>
  );
}