import DoctorCard from "@/components/DoctorCard";
import { GET_DOCTORS } from "@/lib/request";
import { Button, Input, Textarea } from "@mantine/core";
import { IconArrowUp, IconChevronRight } from "@tabler/icons-react";
import { Cross as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useClient } from "urql";

export default function Home() {
  // States

  const [showRecommendations, setShowRecommendations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState(null);
  const [_prompt, setPrompt] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const [doctors, setDoctors] = useState([]);

  // Other hooks
  const graphqlClient = useClient();

  // Functions
  const handleSendPrompt = async () => {
    setShowRecommendations(false);
    setPrompt(issue);
    setLoading(true);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ issue }),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const { specialist } = await res.json();
    setSpecialist(specialist);

    // Filter doctors based on specialization
    graphqlClient
      .query(GET_DOCTORS, {
        speciality: specialist,
      })
      .toPromise()
      .then(({ data, error }) => {
        if (data && !error) {
          setDoctors(data?.retrieveHealthWorkers?.items);
          console.log(data?.retrieveHealthWorkers?.items);
          return;
        }
        return;
      })
      .catch((err) => console.error(err));

    setTimeout(() => {
      setIssue(null);
      setLoading(false);
      setShowRecommendations(true);
    }, 2000);
  };

  return (
    <main className=" h-screen relative">
      <div className="p-6 sticky top-0 bg-white w-full">
        <Hamburger size={20} onToggle={(toggled) => console.log(toggled)} />
      </div>

      <img
        src="/logo.svg"
        className={`w-[36px] opacity-30 fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${
          showRecommendations && "hidden"
        }`}
      />

      {/* OPENAI results */}
      <div className={`p-4 space-y-4  ${!showRecommendations && "hidden"}`}>
        <div
          className={`bg-slate-100 p-4 rounded-md min-w-[200px] w-[300px] float-right`}>
          <p className="text-slate-600">{_prompt}</p>
        </div>
        <div
          className={`bg-[#00857C]  p-4 rounded-md min-w-[200px] w-[300px] float-left `}>
          <p className="text-slate-100">
            Looks like you need to see a <strong>{specialist}</strong>. Here is
            list of the best {specialist}s we recommed.
          </p>
        </div>
        <div className={`  w-full float-left `}>
          <br />
          <div className="flex items-center justify-between">
            <h1 className="font-bold">Recommendations</h1>
            <Button
              className="-z-10"
              variant="subtle"
              color="#00857C"
              size="sm"
              rightSection={<IconChevronRight size={16} />}>
              <p>See all 2500 doctors</p>
            </Button>
          </div>
          <br />
          <div className="space-y-4 mt-2">
            {doctors?.map((doctor, i) => (
              <DoctorCard key={i} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-0 w-full p-4 bg-white">
        <div
          className={`${
            _prompt && "hidden"
          } flex flex-nowrap gap-x-4 max-w-[100vw] overflow-x-auto`}>
          {[
            "I noticed a strange rash on my arm that hasn't gone away",
            "My stomach has been upset after meals, and I feel bloated all the time.",
            "I've noticed my joints are stiff and painful, especially in the morning.",
          ].map((example, i) => (
            <div
              onClick={() => setIssue(example)}
              key={i}
              className="bg-slate-100 p-4 rounded-md min-w-[200px] ">
              <p className="text-slate-600">{example}</p>
            </div>
          ))}
        </div>
        <br />

        <div className="flex justify-between">
          <Textarea
            value={issue}
            w={"85%"}
            onChange={(e) => setIssue(e.target.value)}
            // className="max-w-[calc(100%-60px)]"
            size="lg"
            radius={"lg"}
            variant="filled"
            placeholder="Describe your issue"
          />
          <Button
            w={50}
            h={50}
            radius={50}
            p={0}
            color="#00857C"
            disabled={loading}
            onClick={handleSendPrompt}>
            {!loading ? (
              <IconArrowUp size={24} />
            ) : (
              <Bars
                height="24"
                width="24"
                color="#00857C"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
