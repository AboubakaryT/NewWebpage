/** Renders text, highlighting any **wrapped** segments as numbers. */
export function Rich({ text }: { text: string }) {
  const parts = text.split('**')
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-num">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
