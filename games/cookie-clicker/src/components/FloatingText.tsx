interface Props {
  texts: { id: number; text: string; x: number; y: number }[];
}

export default function FloatingText({ texts }: Props) {
  return (
    <>
      {texts.map((ft) => (
        <div
          key={ft.id}
          className="fixed pointer-events-none text-yellow-300 font-black text-lg z-[60] animate-float-up"
          style={{ left: ft.x, top: ft.y }}
        >
          {ft.text}
        </div>
      ))}
    </>
  );
}
