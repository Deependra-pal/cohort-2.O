import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

let landmarker = null;

// init function
export async function initFaceLandmarker() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
  );

  landmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
  });
}

// detect function
export async function detectFace(video) {
  if (!landmarker) return null;

  const result = await landmarker.detectForVideo(video, performance.now());

  return result;
}

// expression logic
export function getExpression(blendshapes) {
  const map = {};
  blendshapes.forEach((b) => {
    map[b.categoryName] = b.score;
  });

  if ((map.mouthSmileLeft || 0) > 0.2 && (map.mouthSmileRight || 0) > 0.2) {
    return "😄 Happy";
  }

  if ((map.jawOpen || 0) > 0.3) {
    return "😲 Surprise";
  }

  if ((map.eyeBlinkLeft || 0) > 0.5 && (map.eyeBlinkRight || 0) > 0.5) {
    return "😑 Blink";
  }

  return "😐 Neutral";
}
