type OgMarkProps = {
  size: number;
};

/** Original crescent-and-square mark for generated icons. Not a third-party logo. */
export function OgMark({ size }: OgMarkProps) {
  const crescent = Math.round(size * 0.42);
  const hole = Math.round(size * 0.34);
  const square = Math.max(3, Math.round(size * 0.14));
  const gap = Math.max(2, Math.round(size * 0.06));
  const radius = Math.round(size * 0.22);

  return (
    <div
      style={{
        width: size,
        height: size,
        background: "#805D93",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: crescent,
            height: crescent,
            borderRadius: crescent,
            background: "#FBF9FA",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              width: hole,
              height: hole,
              borderRadius: hole,
              background: "#805D93",
              marginRight: -Math.round(size * 0.1),
            }}
          />
        </div>
        <div
          style={{
            width: square,
            height: square,
            background: "#D87110",
            marginLeft: gap,
          }}
        />
      </div>
    </div>
  );
}
