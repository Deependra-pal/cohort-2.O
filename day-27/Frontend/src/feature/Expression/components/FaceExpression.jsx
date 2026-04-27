import { useEffect, useRef, useState } from "react";
import { initFaceLandmarker, detectFace, getExpression } from "../utils/util";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("Click button");

  useEffect(() => {
    async function setup() {
      await initFaceLandmarker();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
 
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }

    setup();
  }, []);

  const handleDetect = async () => {
    const result = await detectFace(videoRef.current);

    if (result?.faceBlendshapes?.length > 0) {
      const blendshapes = result.faceBlendshapes[0].categories;
      const exp = getExpression(blendshapes);
      setExpression(exp);
    } else {
      setExpression("No face 😶");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Expression</h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "400px" }}
      />

      <br />
      <br />

      <button onClick={handleDetect}>Detect Expression</button>

      <h3>{expression}</h3>
    </div>
  );
}
