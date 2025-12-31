import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Slider, Button } from "@mui/material";
import { getCroppedImg } from "../../../utils/canvasUtils";

interface ImageCropperProps {
  imageSrc: string;
  onCancel: () => void;
  onCropComplete: (croppedFile: File) => void;
}

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface Point {
  x: number;
  y: number;
}

export default function ImageCropper({
  imageSrc,
  onCancel,
  onCropComplete,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleSave = async () => {
    try {
      if (!croppedAreaPixels) return;
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedFile) {
        onCropComplete(croppedFile);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
        <h3 className="text-xl font-bold mb-4 text-[#2a1b45]">Edit Image</h3>
        <div className="relative h-64 w-full bg-gray-100 rounded-lg overflow-hidden mb-6">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={onZoomChange}
          />
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Zoom</p>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(_e, zoom) => onZoomChange(Number(zoom))}
            sx={{ color: "#2a1b45" }}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ color: "#2a1b45", borderColor: "#2a1b45" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ bgcolor: "#2a1b45", "&:hover": { bgcolor: "#1a0f2e" } }}
          >
            Save Profile Picture
          </Button>
        </div>
      </div>
    </div>
  );
}
