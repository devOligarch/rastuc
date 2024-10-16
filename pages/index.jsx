import { Button, ColorInput, Input } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import { Cross as Hamburger } from "hamburger-react";
import { useState } from "react";

export default function Home() {
  const [isOpen, setOpen] = useState(false);
  return (
    <main className=" h-screen relative">
      <div className="p-6">
        <Hamburger size={20} onToggle={(toggled) => console.log(toggled)} />
        <img
          src="/logo.svg"
          className="w-[36px] absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
      </div>

      <div className="absolute bottom-4 w-full p-4">
        <div className="flex flex-nowrap gap-x-4 max-w-[100vw] overflow-x-auto">
          {[
            "I noticed a strange rash on my arm that hasn't gone away",
            "My stomach has been upset after meals, and I feel bloated all the time.",
            "I've noticed my joints are stiff and painful, especially in the morning.",
          ].map((example, i) => (
            <div key={i} className="bg-slate-100 p-4 rounded-md min-w-[200px] ">
              <p className="text-slate-600">{example}</p>
            </div>
          ))}
        </div>
        <br />
        <Input
          size="lg"
          radius={"lg"}
          variant="filled"
          placeholder="Describe your issue"
          rightSection={<SendPrompt />}
        />
      </div>
    </main>
  );
}

const SendPrompt = () => {
  return (
    <Button w={50} h={50} radius={50} p={0} color="#00857C">
      <IconArrowUp size={24} />
    </Button>
  );
};
