/* Hira Circle mark — official brand PNGs.
   Two artworks: a lighter one for dark surfaces, a deeper one for light
   surfaces. Both are rendered and CSS shows the right one per theme. */

const QMark = ({ size = 64, className = '', style = {}, variant = 'gradient' }) => {
  const cls = `qmark-img ${className}`.trim();
  return (
    <span className={cls} style={{ width: size, height: size, ...style }} data-variant={variant}>
      <img className="qmark-dark"  src="assets/hira-mark-dark.png"  alt="Hira Circle" width={size} height={size} draggable={false} />
      <img className="qmark-light" src="assets/hira-mark-light.png" alt="Hira Circle" width={size} height={size} draggable={false} />
    </span>
  );
};

window.QMark = QMark;
