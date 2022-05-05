import { CloseButton } from "../CloseButton";

import bugImageUrl from '../WidgetForm/assets/bug.svg'
import ideaImageUrl from '../WidgetForm/assets/idea.svg'
import thoughtImageUrl from '../WidgetForm/assets/thought.svg'
import { useState } from 'react';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStap";

export const feedBackTypes = {
   BUG:{
     title: 'Problema',
     image:{
       source:bugImageUrl,
       alt:'Imagem de um inseto'
     } 
  },
   IDEA:{
     title: 'Ideia',
     image:{
       source:ideaImageUrl,
       alt:'Imagem de uma lampada'
     }
    },
   OTHER:{
     title:'Outro',
     image:{
       source:thoughtImageUrl,
       alt:'Imagem de um balão de pensamento'
     }},

}

export type FeedbackType = keyof typeof feedBackTypes;

export function WidgetForm(){
const [feedBackType, setFeedbackType] = useState<FeedbackType| null>(null)
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">


      {!feedBackType ? ( 
        
        <FeedbackTypeStep alterarVariavelDeControle={setFeedbackType}/>     
        
     ):(
          <FeedbackContentStep feedbacktype={feedBackType}/>
        )}

      <footer className="text-xs text-neutral-400">
      Feito com S2 pela Rocketseat <a className="underline underline-offset-1" href="https://rocketseat.com.br">Rocketseat</a>

      </footer >
      
    </div>
  )
}