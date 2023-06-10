import React, { useEffect, useRef, useState } from "react";
import GameBotton from "./GameBotton";
import greenSound from "/sounds/s01.mp3";
import redSound from "/sounds/s02.mp3";
import yellowSound from "/sounds/s03.mp3";
import blueSound from "/sounds/s04.mp3";
// import errorSound from "./sounds"

const colors = ["green", "red", "yellow", "blue"];

function SimonGame() {
  // States
  const [sequence, setSequence] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(0);

  // Sounds
  const greenSoundRef = useRef(new Audio(greenSound));
  const redSoundRef = useRef(new Audio(redSound));
  const yellowSoundRef = useRef(new Audio(yellowSound));
  const blueSoundRef = useRef(new Audio(blueSound));


  // refs
  const greenRef = useRef(null);
  const redRef = useRef(null);
  const yellowRef = useRef(null);
  const blueRef = useRef(null);

  // functions

  const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  };

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handNextLevel = () => {
    if (!playing) {
      setPlaying(true);
      addNewColor();
    }
  };

  const handColorClick = (e) => {
    if (playing) {
      e.target.classList.add("opacity-50");

      setTimeout(() => {

        e.target.classList.remove("opacity-50")

        const clickColor = e.target.getAttribute("color");

        // clicked sound
        switch (clickColor) {
          case "green":
            greenSoundRef.current.play();
            break;
          case "red":
            redSoundRef.current.play();
            break;
          case "yellow":
            yellowSoundRef.current.play();
            break;
          case "blue":
            blueSoundRef.current.play();
            break;
          default:
            break;
        }

        //   clicked the correct color of the sequence
        if (sequence[playingIdx] === clickColor) {
          // click the last color of the sequence
          if (playingIdx === sequence.length - 1) {
            setTimeout(() => {
              setPlayingIdx(0);
              addNewColor();
            }, 250);
          }
          // missing some colors of the sequence to be clicked
          else {
            setPlayingIdx(playingIdx + 1);
          }
        }
        // clicked the incorrect color of the sequence
        else {
          resetGame();
          // alert('Gameover')
        }
      }, 250);
    }
  };

  useEffect(() => {
    // Show sequence
    if (sequence.length > 0) {
      const showSequence = (idx = 0) => {
        let ref = null;

        if (sequence[idx] === "green") ref = greenRef;
        if (sequence[idx] === "red") ref = redRef;
        if (sequence[idx] === "yellow") ref = yellowRef;
        if (sequence[idx] === "blue") ref = blueRef;

        // hightligth the ref
        setTimeout(() => {
          ref.current.classList.add("brightness-[2.5]");

          setTimeout(() => {
            ref.current.classList.remove("brightness-[2.5]");
            if (idx < sequence.length - 1) showSequence(idx + 1);
          }, 250);
        }, 250);
      };
      showSequence();
    }
  }, [sequence]);

  return (
    // Main container
    <div className="flex justify-center items-center bg-neutral-800 text-white w-screen h-screen">
      {/* Game container */}
      <div className="relative flex flex-col justify-center items-center">
        {/* Green and red container */}
        <div>
          {/* Green button */}
          <GameBotton
            color="green"
            border="rounded-tl-full"
            bg="bg-green-500"
            onClick={handColorClick}
            ref={greenRef}
          />

          {/* Red button */}
          <GameBotton
            color="red"
            border="rounded-tr-full"
            bg="bg-red-500"
            onClick={handColorClick}
            ref={redRef}
          />
        </div>

        {/* yellow and blue container */}
        <div>
          {/* Yellow button */}
          <GameBotton
            color="yellow"
            border="rounded-bl-full"
            bg="bg-yellow-400"
            onClick={handColorClick}
            ref={yellowRef}
          />

          {/* Blue button */}
          <GameBotton
            color="blue"
            border="rounded-br-full"
            bg="bg-blue-500"
            onClick={handColorClick}
            ref={blueRef}
          />
        </div>

        {/* Play button */}
        <button
          className="absolute bg-neutral-900 text-white text-xl sm:text-2xl font-bold rounded-full w-[150px] sm:w-[175px] h-[150px] sm:h-[175px] duration-200 hover:scale-105"
          onClick={handNextLevel}
        >
          Play
        </button>
        <div>
          {sequence.length === 0 ? "Level: 0" : "Level: " + sequence.length}
        </div>
      </div>
    </div>
  );
}

export default SimonGame;
