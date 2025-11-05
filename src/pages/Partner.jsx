import img1 from "../assets/Partner/aiims.png"
import img2 from "../assets/Partner/mcm.png"
import img3 from "../assets/Partner/pgimer.png"
import img4 from  "../assets/Partner/pu.png"
import img5 from  "../assets/Partner/uiet.png"

export default function PhotoExplodedCube() {
  const photos = [
    img1,
    img2,
    img3,
    img4,
    img5
  ];
  return (
    <>
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <style>{`
          /* Heading styling */
          .exploded-heading {
            font-size: 2.6rem;
            font-weight: 800;
            text-align: center;
            background: linear-gradient(90deg, #ffffff, #f0f0f0, #e0e0e0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
            animation: pulse-heading 2s infinite alternate, glow-heading 10s ease-in-out infinite;
          }

          @keyframes pulse-heading {
            0% { opacity: 0.8; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.05); }
          }

          // @keyframes glow-heading {
          //   0%, 100% { text-shadow: 0 0 10px rgba(139,92,246,0.4), 0 0 20px rgba(244,114,182,0.3); }
          //   50% { text-shadow: 0 0 20px rgba(139,92,246,0.7), 0 0 40px rgba(244,114,182,0.5); }
          // }

          .photo-cube-container {
            position: relative;
            width: 400px;
            height: 400px;
            transform-style: preserve-3d;
            animation: rotate-cube 20s infinite linear;
          }

          @keyframes rotate-cube {
            0% { transform: rotateX(-20deg) rotateY(0deg); }
            100% { transform: rotateX(-20deg) rotateY(360deg); }
          }

          .photo-face {
            position: absolute;
            width: 200px;
            height: 200px;
            left: 50%;
            top: 50%;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 40px rgba(59,130,246,0.6);
            border: 3px solid rgba(59,130,246,0.5);
          }

          .photo-face img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .photo-front { animation: explode-front 10s ease-in-out infinite; }
          .photo-back { animation: explode-back 10s ease-in-out infinite; }
          .photo-right { animation: explode-right 10s ease-in-out infinite; }
          .photo-left { animation: explode-left 10s ease-in-out infinite; }
          .photo-bottom { animation: explode-bottom 10s ease-in-out infinite; }

          @keyframes explode-front {
            0%,100% { transform: translate(-50%, -50%) translateZ(0px); opacity: 1; }
            50% { transform: translate(-50%, -50%) translateZ(220px); opacity: 0.95; }
          }

          @keyframes explode-back {
            0%,100% { transform: translate(-50%, -50%) rotateY(180deg) translateZ(0px); opacity: 1; }
            50% { transform: translate(-50%, -50%) rotateY(180deg) translateZ(220px); opacity: 0.95; }
          }

          @keyframes explode-right {
            0%,100% { transform: translate(-50%, -50%) rotateY(90deg) translateZ(0px); opacity: 1; }
            50% { transform: translate(-50%, -50%) rotateY(90deg) translateZ(220px); opacity: 0.95; }
          }

          @keyframes explode-left {
            0%,100% { transform: translate(-50%, -50%) rotateY(-90deg) translateZ(0px); opacity: 1; }
            50% { transform: translate(-50%, -50%) rotateY(-90deg) translateZ(220px); opacity: 0.95; }
          }

          @keyframes explode-bottom {
            0%,100% { transform: translate(-50%, -50%) rotateX(-90deg) translateZ(0px); opacity: 1; }
            50% { transform: translate(-50%, -50%) rotateX(-90deg) translateZ(220px); opacity: 0.95; }
          }

          .energy-line {
            position: absolute;
            width: 2px;
            background: linear-gradient(180deg, rgba(139,92,246,0.8), transparent);
            top: 50%;
            left: 50%;
            transform-origin: top;
            animation: pulse-line 10s ease-in-out infinite;
          }

          .energy-line:nth-child(1) { height: 150px; transform: translate(-50%, -50%) rotate(0deg); }
          .energy-line:nth-child(2) { height: 150px; transform: translate(-50%, -50%) rotate(90deg); }
          .energy-line:nth-child(3) { height: 150px; transform: translate(-50%, -50%) rotate(180deg); }
          .energy-line:nth-child(4) { height: 150px; transform: translate(-50%, -50%) rotate(270deg); }

          @keyframes pulse-line {
            0%,100% { opacity: 0.3; height: 150px; }
            50% { opacity: 1; height: 220px; }
          }

          .glow-effect {
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%);
            border-radius: 50%;
            animation: pulse-glow 10s ease-in-out infinite;
            pointer-events: none;
          }

          @keyframes pulse-glow {
            0%,100% { transform: scale(0.8); opacity: 0.4; }
            50% { transform: scale(1.2); opacity: 0.7; }
          }

          @media (max-width: 768px) {
            .photo-cube-container { width: 300px; height: 300px; }
            .photo-face { width: 150px; height: 150px; }
            .glow-effect { width: 400px; height: 400px; }
            .exploded-heading { font-size: 2rem; margin-bottom: 2rem; }
          }
        `}</style>

        {/* Heading */}
        <h2 className="exploded-heading">
          Organizations We’ve Partnered With
        </h2>

        <div
          className="relative"
          style={{ perspective: "1500px", height: "550px" }}
        >
          <div className="glow-effect" />

          <div className="photo-cube-container">
            <div className="energy-line" />
            <div className="energy-line" />
            <div className="energy-line" />
            <div className="energy-line" />

            <div className="photo-face photo-front">
              <img src={photos[0]} alt="PGIMER" />
            </div>
            <div className="photo-face photo-back">
              <img src={photos[1]} alt="PU" />
            </div>
            <div className="photo-face photo-right">
              <img src={photos[2]} alt="AIIMS" />
            </div>
            <div className="photo-face photo-left">
              <img src={photos[3]} alt="MCM" />
            </div>
            <div className="photo-face photo-bottom">
              <img src={photos[4]} alt="UIET" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}