import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas';
import { useState } from 'react';
import { Loading } from "../loading";

interface ScreenshotExport{
  screenshot: string | null;
  onScreenshotPic: (screenshot: string | null) => void;
}


export function ScreenShotButton({screenshot,onScreenshotPic}: ScreenshotExport){
const[isTakingScreenShot, setIsTakingScreenshot] = useState(false)

async function handleTakeScreenShot(){
  setIsTakingScreenshot(true)

  const canvas = await html2canvas(document.querySelector('html')!)
  const base64image = canvas.toDataURL('image/png')
  onScreenshotPic(base64image)

  setIsTakingScreenshot(false)
}
  if(screenshot){
    return(
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={()=> onScreenshotPic(null)}
        style={{backgroundImage: `url(${screenshot})`,
                backgroundPosition: 'right bottom',
                backgroundSize: 180,}}
       >
            <Trash weight="fill"/>
      </button>
    )
  }
  return (
    <button
    type="button"
    className="p-2 bg-zinc-900 rounded-md border-transparent hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    onClick={handleTakeScreenShot}>
        {isTakingScreenShot 
        ?(<Loading/>) 
        :(<Camera className="w-6 h-6"/>)
        }

     
  </button>
  )

}